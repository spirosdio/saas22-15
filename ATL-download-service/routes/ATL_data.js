const express = require('express')
const router = express.Router()
const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');
require('dotenv').config()

// a function that takes the path to a CSV file and returns a json object
function csvToArray(csvFilePath, callback) {
    const results = [];
    const fs = require("fs");
    const { parse } = require("csv-parse");
    const header = ["DateTime", "ResolutionCode", "AreaCode", "AreaTypeCode", "AreaName", "MapCode", "TotalLoadValue", "UpdateTime"];

    fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: "\t", from_line: 2 }))
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

router.get('/:fileName', (req, res) => {

    const file = fs.createWriteStream("ATL-download-service/temp/" + req.params.fileName);
    const request = http.get(process.env.FILE_SERVER_URL + req.params.fileName, function(response) {
        response.pipe(file);

        // after download completed close filestream
        file.on("finish", () => {
            file.close();
        });
    });

    // Check if file is empty
    request.on('response', (response) => {
        var path = "ATL-download-service/temp/" + req.params.fileName;
        if (response.statusCode === 200) {
            console.log("File: " + req.params.fileName + " downloaded successfully.");
            csvToArray(path, function(data) {
                //console.log(data);
                res.status(200).json(data);
                try {
                    fs.unlinkSync(path)
                    //file removed
                } catch(err) {
                    console.error(err)
                }
            });
        } else {
            console.log("File: " + req.params.fileName + " not found.");
            res.status(404).json({ message: "File: " + req.params.fileName + " not found." });
            try {
                fs.unlinkSync(path)
                //file removed
            } catch(err) {
                console.error(err)
            }
        }
    });

})



module.exports = router