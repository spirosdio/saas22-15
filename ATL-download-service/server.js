require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

const ATL_data_router = require('./routes/ATL_data')
app.use('/', ATL_data_router)

app.listen(3000, () => console.log('Server started on port 3000'))