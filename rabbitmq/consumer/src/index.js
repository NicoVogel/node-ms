const CONN_URL = 'amqp://rabbitmq';
const exchangeName = 'logs';
const waitForSeconds = 8;

let closeConnection = null;
let startTime;

setTimeout(async () => {
    try {
        const connection = await require('amqplib').connect(CONN_URL);
        const channel = await connection.createChannel();

        const queue = await channel.assertQueue('', {
            exclusive: true
        });

        await channel.assertExchange(exchangeName, 'fanout', { durable: false })
        await channel.bindQueue(queue.queue, exchangeName, '');
        const consumer = await channel.consume(queue.queue, (message) => {
            if (message !== null) {
                const match = message.content.toString().match(/(\d+):/);
                channel.ack(message);
                if (match[1] == 0) {
                    startTime = Date.now()
                } else if (match[1] == 100000) {
                    console.log(`done after: ${Date.now() - startTime}ms`);
                    closeConnection();
                }
            }
        });
        closeConnection = () => {
            channel.close(consumer.consumerTag);
            connection.close();
        }
    } catch (error) {
        console.warn(error);
    }
}, 1000 * waitForSeconds);


const close = () => {
    if (closeConnection) {
        console.log('gracefull exit');
        closeConnection();
    }
}

process.on('SIGINT', close)
process.on('exit', close);
