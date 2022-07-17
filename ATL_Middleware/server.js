require('dotenv').config();
const express = require('express');
const router = express.Router();
const Kafka = require('node-rdkafka');
const app = express();
app.use(express.json());


var global_client_id = 0;
var global_data = {};


const request_data_producer = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092',
    'message.max.bytes': '104857600'
},{}, {topic: 'ATL_request_data'});

const debug_producer = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092',
    'message.max.bytes': '104857600'
},{}, {topic: 'Debug_topic'});

const ATLReplyConsumer = Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
    'max.partition.fetch.bytes': '104857600',
},
{}, {});
ATLReplyConsumer.connect();

ATLReplyConsumer.on('ready', function() {
    console.log('ATLReplyConsumer is ready');
    ATLReplyConsumer.subscribe(['ATL_reply_data']);
    ATLReplyConsumer.consume();
}).on('event.error', function(err) {
    console.log('Error from ATLReplyConsumer');
    console.log(err);
}).on('data', function(data) {
    var myobj = JSON.parse(data.value.toString());
    
    global_data[myobj.client_id] = true;
    global_data['data' + myobj.client_id] = myobj.data;

});


function send_request(message){
    request_data_producer.write(Buffer.from(JSON.stringify(message)), (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Message sent successfully');
        }
    })
}

function send_debug(message){
    debug_producer.write(Buffer.from(JSON.stringify(message)), (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Message sent successfully');
        }
    })
}

app.use('/:dateFrom&:country', (req, res) => {

    var my_client_id = global_client_id;
    global_client_id++;
    var dateFrom = req.params.dateFrom;
    dateFrom = new Date(dateFrom);
    const country = req.params.country;
    const request = { client_id: my_client_id, country: country, dateFrom: dateFrom };
    send_request(request);
    let debug = {
        message: 'ATL Middleware sent message to kafka requesting: ' + country + ' from ' + dateFrom + ' with client_id: ' + my_client_id,
        data: request,
    }
    send_debug(debug);
    global_data[my_client_id.toString()] = false;
    global_data['data' + my_client_id.toString()] = {};

    let p = new Promise(resolve => {
        function checkFlag() {
          if (global_data[my_client_id.toString()]) {
            resolve();
          } else {
            setTimeout(checkFlag, 100); 
          }
        }
        checkFlag();
    });
    
    p.then(() => {
        debug = {
            message: 'ATL Middleware received message from kafka: ' + country + ' from ' + dateFrom + ' with client_id: ' + my_client_id,
            data: global_data['data' + my_client_id.toString()],
        }
        send_debug(debug);
        res.status(200).json(global_data['data' + (my_client_id).toString()]);
        delete global_data[my_client_id.toString()];
        delete global_data['data' + my_client_id.toString()];
    });

});

app.listen(process.env.ATL_MIDDLEWARE_PORT, () => console.log('Listening on port ' + process.env.ATL_MIDDLEWARE_PORT));