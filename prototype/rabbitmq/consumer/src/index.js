const CONN_URL = 'amqp://rabbitmq';
const exchangeName = 'logs';
const waitForSeconds = 10;

const requestAmount = 10000;
let metaData;


const log = (msg) => console.log(`[${new Date().toISOString().replace(/T/, ' ')}]: ${msg}`)


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

        channel.ack(message);
        const msg = message.content.toString();
        if (msg == 'end') {
          log(`done with receiving after ${Date.now() - metaData.startTime}ms and total match count is ${metaData.matches}/${requestAmount}`);
          channel.close(consumer.consumerTag);
          return;
        }
        const match = msg.match(/(\d+):/);
        const index = match[1];
        if (metaData === undefined) {
          metaData = {
            index: -1,
            startTime: Date.now(),
            matches: 0
          }
        }
        metaData.index++;
        if (index == metaData.index) {
          metaData.matches++;
        }
      }
    });
  } catch (error) {
    console.warn(error);
  }
}, 1000 * waitForSeconds);