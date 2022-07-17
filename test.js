

function csvToArray(csvFilePath, callback) {
    const results = [];
    const fs = require("fs");
    const { parse } = require("csv-parse");
    const header = ["AreaRefName", "AreaName", "Country", "MapCode", "AreaTypeCode"];

    fs.createReadStream(csvFilePath)
    .pipe(parse({delimiter: ";", from_line: 2})
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

csvToArray('prepare-ATL-data-service/countries_data.csv', function(data) {
    
    let newData = {};
    let country_list = [];

    for (let i = 0; i < data.length; i++) {
        newData[data[i].Country] = data[i].AreaName.replace(" ", "");
        country_list.push(data[i].Country);
    }

    console.log(newData);
    console.log(country_list);
});