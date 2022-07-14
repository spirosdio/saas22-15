console.log('producer...')
import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'},
{}, {topic: 'test'});

function queueMessage(){
    const event = { category: 'DOG', noise: 'woof' };

    const success = stream.write(eventType.toBuffer(event));
    if(success){
        console.log('Message queued');
    }
    else{
        console.log('Message not queued');
    }
}

setInterval(() => {
    queueMessage();
}, 3000);