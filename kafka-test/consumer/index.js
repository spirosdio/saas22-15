console.log('consumer...')
import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

const consumer = Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092'},
{}, {});

consumer.connect();

consumer.on('ready', function() {
    console.log('Consumer is ready');
    consumer.subscribe(['test']);
    consumer.consume();
}).on('data', function(data) {
    console.log("Received message: " + eventType.fromBuffer(data.value));
});