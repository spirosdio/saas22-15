require('dotenv').config()

const models = require('./models/AGPT_data.js');
const mongoose = require('mongoose')
const http = require('http');

mongoose.connect(process.env.AGPT_DATABASE_URL)
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

    const models = require('./models/AGPT_data');
    for (let i = 0; i < models.length; i++) {
        acceptableNames.push(models[i].collection.name);
    }

    for (let i = 0; i < data.length; i++) {
        if (acceptableNames.includes(data[i].AreaName.replace(" ", "") + data[i].ProductionType.replace(new RegExp('/', 'g'), " ").replace(new RegExp('-', 'g'), " ").replace(new RegExp(' ', 'g'), ""))) {
            let row = data[i];
            let newRow = {};
            //Date string is in format "YYYY-MM-DD HH:MM:SS.SSS", replace with "YYYY-MM-DDTHH:MM:SS.SSSZ"
            newRow.DateTime = row.DateTime.replace(" ", "T") + "Z";
            newRow.DateTime = new Date(newRow.DateTime);
            newRow.ActualGenerationOutput = row.ActualGenerationOutput;
            newData.push(newRow);
            const model = models.filter(model => model.collection.name === (row.AreaName.replace(" ", "") + row.ProductionType.replace(new RegExp('/', 'g'), " ").replace(new RegExp('-', 'g'), " ").replace(new RegExp(' ', 'g'), "") ) )[0];
            let entry = new model(newRow);
            const update = { $set: newRow };
            model.collection.updateOne({ DateTime: newRow.DateTime }, update, { upsert: true });
        }
    }
    console.log("Data saved to database.");
}

const AGPTNewDataConsumer = Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
    'max.partition.fetch.bytes': '104857600',
},
{}, {});
AGPTNewDataConsumer.connect();

const AGPTRequestConsumer = Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
    'max.partition.fetch.bytes': '104857600',
},
{}, {});
AGPTRequestConsumer.connect();


const reply_data_producer = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092',
    'message.max.bytes': '104857600'
},{}, {topic: 'AGPT_reply_data'});


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


AGPTNewDataConsumer.on('ready', function() {
    console.log('AGPTNewDataConsumer is ready');
    AGPTNewDataConsumer.subscribe(['AGPT_new_data']);
    AGPTNewDataConsumer.consume();
}).on('event.error', function(err) {
    console.log('Error from AGPTNewDataConsumer');
    console.log(err);
}).on('data', function(data) {
    var myobj = JSON.parse(data.value.toString());
    //console.log(myobj);
    processDataAndSave(myobj);

    let debug = {
        message: 'AGPT Prepare Service received new data and is now populating the database with it',
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
        newRow.ActualGenerationOutput = row.ActualGenerationOutput;
        newData.push(newRow);
    }

    callback(newData);
}

AGPTRequestConsumer.on('ready', function() {
    console.log('AGPTRequestConsumer is ready');
    AGPTRequestConsumer.subscribe(['AGPT_request_data']);
    AGPTRequestConsumer.consume();
}).on('event.error', function(err) {
    console.log('Error from AGPTRequestConsumer');
    console.log(err);
}).on('data', function(data) {
    var myobj = JSON.parse(data.value.toString());
    //console.log(myobj);

    let debug = {
        message: 'AGPT Prepare Service received request for data',
        data: myobj,
    };
    send_debug(debug);

    var dateFrom = myobj.dateFrom;
    dateFrom = dateFrom;
    dateFrom = new Date(dateFrom);
    const country = myobj.country;
    const productionType = myobj.ProductionType;
    console.log(dateFrom, country, productionType);
    const models = require('./models/AGPT_data');
    const model = models.filter(model => model.collection.name === (country + productionType))[0];
    //console.log(model);
    var dateTo = new Date(date.substring(0,10))
    dateTo.setHours(dateTo.getHours() + parseInt(date.substring(11, 13)));
    model.find({ DateTime: { $gte: dateFrom, $lt: dateTo } }, function(err, data) {
        //console.log(data);
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
