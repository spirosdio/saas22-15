const express = require('express')
const router = express.Router()
const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');
const Kafka = require('node-rdkafka');
require('dotenv').config()

var date = '';
setInterval(() => {
    http.get('http:localhost:3020/', (res) => {
        res.on('data', (chunk) => {
            date = JSON.parse(chunk.toString());
            date = date.date;
            //console.log(date);
        });
    })
}, 500);

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': '10.28.241.80:9092',
    'message.max.bytes': '104857600'
},{}, {topic: 'test'});

// a function that takes the path to a CSV file and returns a json object
function csvToArray(csvFilePath, callback) {
    const results = [];
    const fs = require("fs");
    const { parse } = require("csv-parse");
    const header = ["DateTime", "ResolutionCode", "AreaCode", "AreaTypeCode", "AreaName", "MapCode", "TotalLoadValue", "UpdateTime"];

    fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: "\t", from_line: 2, relax_column_count: true})
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
        // do something with the data
        callback(results);
    })
}

function queueMessage(){
    const filename = 'ATL/' + date.replace('-', '_').replace('-', '_').replace('-', '_') + '_ActualTotalLoad6.1.A.csv';
    const file = fs.createWriteStream("ATL-download-service/temp/" + filename);
    const request = http.get(process.env.FILE_SERVER_URL + filename, function(response) {
        response.pipe(file);

        // after download completed close filestream
        file.on("finish", () => {
            file.close();
        });
    });

    // Check if file is empty
    request.on('response', (response) => {
        var path = "ATL-download-service/temp/" + filename;
        if (response.statusCode === 200) {
            console.log("File: " + filename + " downloaded successfully.");
            csvToArray(path, function(data) {
                //console.log(data);

                stream.write(Buffer.from(JSON.stringify(data)), (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('Message sent successfully');
                    }
                })

                try {
                    fs.unlinkSync(path)
                    //file removed
                } catch(err) {
                    console.error(err)
                }
            });
        } else {
            console.log("File: " + filename + " not found.");
            try {
                fs.unlinkSync(path)
                //file removed
            } catch(err) {
                console.error(err)
            }
        }
    });
}

var prevDate = date;
setInterval(() => {
    if (date != prevDate) {
        prevDate = date;
        queueMessage();
    }
}, 500);