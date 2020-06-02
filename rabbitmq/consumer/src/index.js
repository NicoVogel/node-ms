const CONN_URL = 'amqp://rabbitmq';
const exchangeName = 'logs';
const waitForSeconds = 5;

let channel = null;

setTimeout(async () => {
    try {
        const connection = await require('amqplib').connect(CONN_URL);
        channel = await connection.createChannel();

        const queue = await channel.assertQueue('', {
            exclusive: true
        });

        await channel.assertExchange(exchangeName, 'fanout', { durable: false })
        await channel.bindQueue(queue.queue, exchangeName, '');
        channel.consume(queue.queue, (message) => {
            if (message !== null) {
                console.log(message.content.toString());
                channel.ack(message);
            }
        })
    } catch (error) {
        console.warn(error);
    }
}, 1000 * waitForSeconds);


process.on('exit', () => {
    if (channel) {
        console.log('gracefull exit');
        channel.close();
    }
})
