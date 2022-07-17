require('dotenv').config()
const http = require('http'); // or 'https' for https:// URLs
const express = require('express');
const { type } = require('express/lib/response');
const { exit } = require('process');
const app = express()
app.use(express.json())
const router = express.Router()
const cors = require('cors')


app.use(cors());

var interval = process.env.MAGIC_CLOCK_INTERVAL
var dateString = process.env.MAGIC_CLOCK_STARTING_DATE
var date = new Date(dateString.substring(0, 10))
date.setHours(date.getHours() + parseInt(dateString.substring(11, 13)))

dateString = date.toISOString().split('T')[0] + '-' + date.toISOString().split('T')[1].substring(0, 2)
console.log(dateString)

// Increase one hour
setInterval(() => {
    date.setHours(date.getHours() + 1)
    dateString = date.toISOString().split('T')[0] + '-' + date.toISOString().split('T')[1].substring(0, 2)
    console.log(dateString)
}, interval * 1000) 
    

router.get('/', (req, res) => {
    res.status(200).json({ date: dateString });
})

app.use('/', router)

app.listen(3020, () => console.log('Server started on port 3020'))