const Kafka = require('node-rdkafka');


const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': '10.28.241.80:9092',
    'message.max.bytes': '104857600'
},{}, {topic: 'test'}).on('error', function(err) {
    console.log(err);
}).on('ready', function() {
    console.log('Producer is ready');
}) ;


stream.write(Buffer.from(JSON.stringify({"test": "test"})) , (err) => {
    if (err) {
        console.log(err);
    }
});