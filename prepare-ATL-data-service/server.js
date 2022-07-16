require('dotenv').config()

// require models/ATL_data
const models = require('./models/ATL_data.js');
const mongoose = require('mongoose')

mongoose.connect(process.env.ATL_DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to MongoDB'))

const Kafka =  require('node-rdkafka');

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

const ATLNewDataconsumer = Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
    'max.partition.fetch.bytes': '104857600',
},
{}, {});

ATLNewDataconsumer.connect();

ATLNewDataconsumer.on('ready', function() {
    console.log('Consumer is ready');
    ATLNewDataconsumer.subscribe(['ATL_new_data']);
    ATLNewDataconsumer.consume();
}).on('event.error', function(err) {
    console.log('Error from consumer');
    console.log(err);
}).on('data', function(data) {
    var myobj = JSON.parse(data.value.toString());
    //console.log(myobj);
    processDataAndSave(myobj);
});
