require('dotenv').config()

var express = require('express')
var serveStatic = require('serve-static')

var app = express()

app.use(serveStatic(process.env.STATIC_FILE_FOLDER))
app.listen(8080, () => { console.log('File Server running on port 8080') })
