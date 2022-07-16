const express = require('express')
const router = express.Router()
const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');
require('dotenv').config()

async function processDataAndSave(data, callback) {
    let newData = [];
    let acceptableNames = [];

    const models = require('../models/ATL_data');
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
    callback(newData);
}


router.get('/:fileName', (req, res) => {

    let filename = req.params.fileName;
    let data;

    request = http.get(process.env.ATL_DOWNLOAD_SERVER_URL + filename, function(request) {
        // handle error
        if (request.statusCode === 404) {
            return;
        }
    
        // pipe the response to a file
        filename = filename.substring(0, filename.lastIndexOf(".")) + ".json";
        const file = fs.createWriteStream("prepare-ATL-data-service/temp/" + filename);
        request.pipe(file);
    
        // after download completed close filestream
        file.on("finish", () => {
            file.close();
            data = JSON.parse(fs.readFileSync("prepare-ATL-data-service/temp/" + filename));
            processDataAndSave(data, function(newData) {
                //console.log(newData);
                res.status(200).json(newData);
                try {
                    fs.unlinkSync("prepare-ATL-data-service/temp/" + filename)
                    //file removed
                } catch(err) {
                    console.error(err)
                }
            });
        });
    });

    request.on('response', (response) => {
        if (response.statusCode === 200) {
            console.log("File: " + filename + " downloaded successfully.");
            console.log("File: " + filename + " is being processed.");
        }
        if (response.statusCode === 404) {
            console.log("File: " + filename + " not found.");
            res.status(404).json({ message: "File: " + filename + " not found." });
        }
    });
})

module.exports = router