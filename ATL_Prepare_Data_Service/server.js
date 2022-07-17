require('dotenv').config()

// require models/ATL_data
const models = require('./models/ATL_data.js');
const mongoose = require('mongoose')
const http = require('http');

mongoose.connect(process.env.ATL_DATABASE_URL)
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

    const models = require('./models/ATL_data');
    for (let i = 0; i < models.length; i++) {
        acceptableNames.push(models[i].collection.name);
    }

    for (let i = 0; i < data.length; i++) {
        if (acceptableNames.includes(data[i].AreaName.replace(" ", ""))) {
            let row = data[i];
            let newRow = {};
            //Date string is in format "YYYY-MM-DD HH:MM:SS.SSS", replace with "YYYY-MM-DDTHH:MM:SS.SSSZ"
            newRow.DateTime = row.DateTime.replace(" ", "T") + "Z";
            newRow.DateTime = new Date(newRow.DateTime);
            newRow.TotalLoadValue = row.TotalLoadValue;
            newData.push(newRow);
            const model = models.filter(model => model.collection.name === row.AreaName.replace(" ", ""))[0];
            let entry = new model(newRow);
            const update = { $set: newRow };
            model.collection.updateOne({ DateTime: newRow.DateTime }, update, { upsert: true });
        }
    }
    console.log("Data saved to database.");
}

const ATLNewDataConsumer = Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
    'max.partition.fetch.bytes': '104857600',
},
{}, {});
ATLNewDataConsumer.connect();

const ATLRequestConsumer = Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
    'max.partition.fetch.bytes': '104857600',
},
{}, {});
ATLRequestConsumer.connect();


const reply_data_producer = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092',
    'message.max.bytes': '104857600'
},{}, {topic: 'ATL_reply_data'});


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


ATLNewDataConsumer.on('ready', function() {
    console.log('ATLNewDataConsumer is ready');
    ATLNewDataConsumer.subscribe(['ATL_new_data']);
    ATLNewDataConsumer.consume();
}).on('event.error', function(err) {
    console.log('Error from ATLNewDataConsumer');
    console.log(err);
}).on('data', function(data) {
    var myobj = JSON.parse(data.value.toString());
    //console.log(myobj);
    processDataAndSave(myobj);

    let debug = {
        message: 'ATL Prepare Service received new data and is now populating the database with it',
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
        newRow.TotalLoadValue = row.TotalLoadValue;
        newData.push(newRow);
    }

    callback(newData);
}

ATLRequestConsumer.on('ready', function() {
    console.log('ATLRequestConsumer is ready');
    ATLRequestConsumer.subscribe(['ATL_request_data']);
    ATLRequestConsumer.consume();
}).on('event.error', function(err) {
    console.log('Error from ATLRequestConsumer');
    console.log(err);
}).on('data', function(data) {
    var myobj = JSON.parse(data.value.toString());
    //console.log(myobj);

    let debug = {
        message: 'ATL Prepare Service received request for data',
        data: myobj,
    };
    send_debug(debug);

    var dateFrom = myobj.dateFrom;
    dateFrom = dateFrom;
    dateFrom = new Date(dateFrom);
    const country = myobj.country;
    const models = require('./models/ATL_data');
    const model = models.filter(model => model.collection.name === country)[0];
    model.find({ DateTime: { $gte: dateFrom, $lt: new Date(date.substring(0,10)) } }, function(err, data) {
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

