require('dotenv').config()
const http = require('http'); // or 'https' for https:// URLs
const express = require('express');
const { type } = require('express/lib/response');
const { exit } = require('process');
const app = express()
app.use(express.json())
const router = express.Router()

var interval = process.env.MAGIC_CLOCK_INTERVAL;
// set date to starting date from env
var temp = process.env.MAGIC_CLOCK_STARTING_DATE.split('-');
var date = new Date(parseInt(temp[0]), parseInt(temp[1])-1, parseInt(temp[2]), parseInt(temp[3]));
date.setHours(date.getHours() + 1);

var dateString = date.toISOString().split('T')[0].replace(/-/g, '_') + '_' + date.toISOString().split('T')[1].split(':')[0];

var myInterval;

if ((parseInt(temp[1]) > 3 || parseInt(temp[1]) < 1) || ((parseInt(temp[1]) == 3 && parseInt(temp[2]) == 7 && parseInt(temp[3]) > 9))) {
    console.log('Invalid starting date. Please check your .env file.');
    exit();
}
else if (temp[1] == '02') {
    http.get(process.env.PREPARE_ATL_DATA_SERVER_URL + "2022_01_31_23_ActualTotalLoad6.1.A.csv");
}
else if (temp[1] == '03') {
    http.get(process.env.PREPARE_ATL_DATA_SERVER_URL + "2022_01_31_23_ActualTotalLoad6.1.A.csv");
    const tempInterval = setInterval(() => {
        http.get(process.env.PREPARE_ATL_DATA_SERVER_URL + "2022_02_28_23_ActualTotalLoad6.1.A.csv");
        clearInterval(tempInterval);
    }, 5000);
    const tempInterval2 = setInterval(() => {
        
        myInterval = setInterval(() => {
            date.setHours(date.getHours() + 1);
            // date format is: YYYY_MM_DD_HH
            dateString = date.toISOString().split('T')[0].replace(/-/g, '_') + '_' + date.toISOString().split('T')[1].split(':')[0];
            console.log(dateString);
        
            http.get(process.env.PREPARE_ATL_DATA_SERVER_URL + dateString + "_ActualTotalLoad6.1.A.csv");
        
            // if date is past the date 2022-03-07-09, stop the interval
            if (dateString.split('_')[0] == '2022' && dateString.split('_')[1] == '03' && dateString.split('_')[2] == '07' && dateString.split('_')[3] == '09') {
                clearInterval(myInterval);
            }
        
        }, interval*1000);

        clearInterval(tempInterval2);
    }, 10000);
}
else {
    myInterval = setInterval(() => {
        date.setHours(date.getHours() + 1);
        // date format is: YYYY_MM_DD_HH
        dateString = date.toISOString().split('T')[0].replace(/-/g, '_') + '_' + date.toISOString().split('T')[1].split(':')[0];
        console.log(dateString);
    
        http.get(process.env.PREPARE_ATL_DATA_SERVER_URL + dateString + "_ActualTotalLoad6.1.A.csv");
    
        // if date is past the date 2022-03-07-09, stop the interval
        if (dateString.split('_')[0] == '2022' && dateString.split('_')[1] == '03' && dateString.split('_')[2] == '07' && dateString.split('_')[3] == '09') {
            clearInterval(myInterval);
        }
    
    }, interval*1000);
}

router.get('/', (req, res) => {
    res.status(200).json({ date: dateString });
})

app.use('/', router)

app.listen(3020, () => console.log('Server started on port 3020'))