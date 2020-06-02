const CONN_URL = 'amqp://rabbitmq';
const queueName = 'test';
const waitForSeconds = 6;


let channel = null;

setTimeout(async () => {
  try {
    const connection = await require('amqplib').connect(CONN_URL);
    channel = await connection.createChannel();
    const channelok = await channel.assertQueue(queueName);
    if (!channelok) {
      throw new Error('could not connect to channel');
    }
    channel.sendToQueue(queueName, Buffer.from('something to do'))
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


