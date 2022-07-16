



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

router.get('/:dateFrom&:country', (req, res) => {
    var dateFrom = req.params.dateFrom;
    dateFrom = new Date(dateFrom);
    const country = req.params.country;
    const models = require('../models/ATL_data');
    const model = models.filter(model => model.collection.name === country)[0];
    model.find({ DateTime: { $gte: dateFrom, $lt: new Date("2022-01-04") } }, function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            polish_data(data, function(newData) {
                res.status(200).json(newData);
            });
        }
    }).sort({ DateTime: 1 });
});

module.exports = router