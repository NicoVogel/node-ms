const CONN_URL = 'amqp://rabbitmq';
const exchangeName = 'logs';
const waitForSeconds = 11;


const requestCount = 10000;
let closeConnection = null;

setTimeout(async () => {
  try {
    const connection = await require('amqplib').connect(CONN_URL);
    const channel = await connection.createChannel();
    closeConnection = () => {
      channel.close();
      connection.close();
    }
    await channel.assertExchange(exchangeName, 'fanout', { durable: false })
    console.log('start transmission')
    const startTime = Date.now();
    for (let index = 0; index < requestCount; index++) {
      channel.publish(exchangeName, '', Buffer.from(`${index}: 'Hello World!'`))
    }
    channel.publish(exchangeName, '', Buffer.from(`end`))
    console.log(`end transmission after ${Date.now() - startTime}ms`)
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
