const Kafka =  require('node-rdkafka');

var index = 0;

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092',
    'message.max.bytes': '104857600'
},{}, {topic: 'test'});



function message(message){
    stream.write(Buffer.from(message), (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Message sent successfully');
        }
    })
}

setInterval(function(){
    // index to string
    message(index.toString());
    index++;
}, 1000);