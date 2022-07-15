console.log('global consumer...')
const Kafka =  require('node-rdkafka');

const consumer = Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': '10.28.241.80:9092',
    'max.partition.fetch.bytes': '104857600',
},
{}, {});

consumer.connect();

consumer.on('ready', function() {
    console.log('Consumer is ready');
    consumer.subscribe(['test']);
    consumer.consume();
}).on('event.error', function(err) {
    console.log('Error from consumer');
    console.log(err);
}).on('data', function(data) {
    var myobj = JSON.parse(data.value.toString());
    console.log(myobj);
});

