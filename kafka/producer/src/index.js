var kafka = require('kafka-node');
var Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({kafkaHost: 'kafka:9092'}),
    consumer = new Consumer(
        client, [{ topic: 'test1', partition: 0 }], { autoCommit: false });
consumer.on('message', function (message) {
    console.log(message);
});