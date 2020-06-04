const CONN_URL = 'amqp://rabbitmq';
const exchangeName = 'logs';
const waitForSeconds = 20;

const requestCount = 100000;
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
    let count = 0;
    const consumer = await channel.consume(queue.queue, (message) => {
      if (message !== null) {
        channel.ack(message);
        const msg = message.content.toString();
        if (msg == 'end') {
          console.log(`done after: ${Date.now() - startTime}ms`);
          channel.close(consumer.consumerTag);
          return;
        }
        count++;
        const match = msg.match(/(\d+):/);
        if (!startTime) {
          startTime = Date.now()
        } else if (count % (requestCount / 10) == 0) {
          console.log(`consume prograss: ${(count / requestCount) * 100}% - (index/count -> ${match[1]}/${count - 1})`)
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
