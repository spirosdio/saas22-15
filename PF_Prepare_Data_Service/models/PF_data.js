const mongoose = require('mongoose')

const countries = ['BGCTY', 'GRCTY', 'ITCTY', 'MKCTY', 'TRCTY'];

let models = [];

for (let i = 0; i < countries.length; i++) {
    for (let j = 0; j < countries.length; j++) {
        let country1 = countries[i];
        let country2 = countries[j];
        
        let name = country1 + '_' + country2;

        let model = mongoose.model(name,
            new mongoose.Schema({
                DateTime: {
                    type: Date,
                    required: true
                },
                FlowValue: {
                    type: Number,
                    required: true
                }
            },
            {collection: name}
            )
        );
        models.push(model);
    }
}

module.exports = models;


