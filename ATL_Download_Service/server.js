const express = require('express')
const router = express.Router()
const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');
const Kafka = require('node-rdkafka');
require('dotenv').config()

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

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092',
    'message.max.bytes': '104857600'
},{}, {topic: 'ATL_new_data'});

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

// a function that takes the path to a CSV file and returns a json object
function csvToArray(csvFilePath, callback) {
    const results = [];
    const fs = require("fs");
    const { parse } = require("csv-parse");
    const header = ["DateTime", "ResolutionCode", "AreaCode", "AreaTypeCode", "AreaName", "MapCode", "TotalLoadValue", "UpdateTime"];

    fs.createReadStream(csvFilePath)
    .pipe(parse({delimiter: "\t", from_line: 2})
    .on("error", function(err) {
        console.log(err.message);
    }))
    .on("data", function (row) {
        let rowObject = {};
        for (let i = 0; i < row.length; i++) {
            rowObject[header[i]] = row[i];
        }
        results.push(rowObject);
    })
    .on("end", function () {
        callback(results);
    })
}

function queueMessage(){
    const files_location = process.env.STATIC_FILE_FOLDER;
    const path = files_location + 'ATL/' + date.replace('-', '_').replace('-', '_').replace('-', '_') + '_ActualTotalLoad6.1.A.csv';

    csvToArray(path, function(data) {
        //console.log(data);

        stream.write(Buffer.from(JSON.stringify(data)), (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Message sent successfully');

                let debug = {
                    message: 'Time changed to ' + date + ' so ATL_Download_Service downloaded the new data and sent it to Kafka.',
                    data: data,
                }
                send_debug(debug);
            }
        })
    });

}

var prevDate = date;
setInterval(() => {
    if (date != prevDate) {
        prevDate = date;
        queueMessage();
    }
}, 500);