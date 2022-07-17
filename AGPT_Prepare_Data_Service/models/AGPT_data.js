const mongoose = require('mongoose')

function csvToArray(csvFilePath, callback) {
    const results = [];
    const fs = require("fs");
    const { parse } = require("csv-parse");
    const header = ["AreaRefName", "AreaName", "Country", "MapCode", "AreaTypeCode"];

    fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ";", from_line: 2 }))
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

csvToArray("AGPT_Prepare_Data_Service/countries_data.csv", function(data) {

    let models = [];

    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        
        let name = row.AreaName.replace(" ", "");

        let model = mongoose.model(name,
            new mongoose.Schema({
                DateTime: {
                    type: Date,
                    required: true
                },
                ProductionType: {
                    type: String,
                    required: true
                },
                ActualGenerationOutput: {
                    type: Number,
                    required: true
                }
            },
            {collection: name}
            )
        );
        models.push(model);
    }

    module.exports = models;
});

