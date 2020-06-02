const CONN_URL = 'amqp://rabbitmq';
const exchangeName = 'logs';
const waitForSeconds = 6;


let channel = null;

setTimeout(async () => {
  try {
    const connection = await require('amqplib').connect(CONN_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'fanout', { durable: false })
    channel.publish(exchangeName, '', Buffer.from('Hello World!'));
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









// setTimeout(() => {
//   const open = require('amqplib').connect(CONN_URL);
//   open.then(connection => connection.createChannel())
//     .then(channel => channel.assertQueue(queueName)
//       .then(() => channel.sendToQueue(queueName), Buffer.from('something to do')).catch(console.warn)
//     ).catch(console.warn);
// }, 1000 * waitForSeconds);


