require('dotenv').config()

const models = require('./models/PF_data.js');
const mongoose = require('mongoose')
const http = require('http');

mongoose.connect(process.env.PF_DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to MongoDB'))

const Kafka =  require('node-rdkafka');

var date = '';
setInterval(() => {
    http.get(process.env.MAGIC_CLOCK_SERVER_URL, (res) => {
        res.on('data', (chunk) => {
            date = JSON.parse(chunk.toString());
            date = date.date;
            //console.log(date);
        });
    })
}, 500);

function processDataAndSave(data) {
    let newData = [];
    let acceptableNames = [];

    const models = require('./models/PF_data');
    for (let i = 0; i < models.length; i++) {
        acceptableNames.push(models[i].collection.name);
    }

    for (let i = 0; i < data.length; i++) {
        if (acceptableNames.includes(data[i].OutAreaName.replace(' ', '') + '_' + data[i].InAreaName.replace(' ', ''))) {
            let row = data[i];
            let newRow = {};
            //Date string is in format "YYYY-MM-DD HH:MM:SS.SSS", replace with "YYYY-MM-DDTHH:MM:SS.SSSZ"
            newRow.DateTime = row.DateTime.replace(" ", "T") + "Z";
            newRow.DateTime = new Date(newRow.DateTime);
            newRow.FlowValue = row.FlowValue;
            newData.push(newRow);
            const model = models.filter(model => model.collection.name === (row.OutAreaName.replace(' ', '') + '_' + row.InAreaName.replace(' ', '')) )[0];
            let entry = new model(newRow);
            const update = { $set: newRow };
            model.collection.updateOne({ DateTime: newRow.DateTime }, update, { upsert: true });
        }
    }
    console.log("Data saved to database.");
}

const PFNewDataConsumer = Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
    'max.partition.fetch.bytes': '104857600',
},
{}, {});
PFNewDataConsumer.connect();

const PFRequestConsumer = Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
    'max.partition.fetch.bytes': '104857600',
},
{}, {});
PFRequestConsumer.connect();


const reply_data_producer = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092',
    'message.max.bytes': '104857600'
},{}, {topic: 'PF_reply_data'});


function send_reply_data(message){
    reply_data_producer.write(Buffer.from(JSON.stringify(message)), (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Message sent successfully');
        }
    })
}

const debug_producer = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092',
    'message.max.bytes': '104857600'
},{}, {topic: 'Debug_topic'});

function send_debug(message){
    debug_producer.write(Buffer.from(JSON.stringify(message)), (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Message sent successfully');
        }
    })
}


PFNewDataConsumer.on('ready', function() {
    console.log('PFNewDataConsumer is ready');
    PFNewDataConsumer.subscribe(['PF_new_data']);
    PFNewDataConsumer.consume();
}).on('event.error', function(err) {
    console.log('Error from PFNewDataConsumer');
    console.log(err);
}).on('data', function(data) {
    var myobj = JSON.parse(data.value.toString());
    //console.log(myobj);
    processDataAndSave(myobj);

    let debug = {
        message: 'PF Prepare Service received new data and is now populating the database with it',
        data: myobj,
    };
    send_debug(debug);
});



async function polish_data(data, callback) {
    let newData = [];

    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        let newRow = {};
        newRow.DateTime = row.DateTime;
        newRow.FlowValue = row.FlowValue;
        newData.push(newRow);
    }

    callback(newData);
}

PFRequestConsumer.on('ready', function() {
    console.log('PFRequestConsumer is ready');
    PFRequestConsumer.subscribe(['PF_request_data']);
    PFRequestConsumer.consume();
}).on('event.error', function(err) {
    console.log('Error from PFRequestConsumer');
    console.log(err);
}).on('data', function(data) {
    // request is somethin like this { client_id: my_client_id, countryFrom: countryFrom, countryTo: countryTo, dateFrom: dateFrom }
    var myobj = JSON.parse(data.value.toString());
    console.log(myobj);

    let debug = {
        message: 'PF Prepare Service received request for data',
        data: myobj,
    };
    send_debug(debug);

    var dateFrom = myobj.dateFrom;
    dateFrom = dateFrom;
    dateFrom = new Date(dateFrom);
    const countryFrom = myobj.countryFrom;
    const countryTo = myobj.countryTo;
    const models = require('./models/PF_data');
    const model = models.filter(model => model.collection.name === (countryFrom + '_' + countryTo))[0];
    console.log(model);
    var dateTo = new Date(date.substring(0,10))
    dateTo.setHours(dateTo.getHours() + parseInt(date.substring(11, 13)));
    model.find({ DateTime: { $gte: dateFrom, $lt: dateTo } }, function(err, data) {
        console.log(data);
        if (err) {
            console.log(err);
            send_reply_data({ "status": "error", "message": err });
        } else {
            polish_data(data, function(newData) {
                send_reply_data({ "client_id": myobj.client_id, "data": newData });
                let debug = {
                    message: 'ATL Prepare Service sent data to client',
                    data: { "client_id": myobj.client_id, "data": newData },
                };
                send_debug(debug);
            });
        }
    }).sort({ DateTime: 1 });

});
