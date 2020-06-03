const CONN_URL = 'amqp://rabbitmq';
const exchangeName = 'logs';
const waitForSeconds = 9;


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
    for (let index = 0; index <= 100000; index++) {
      channel.publish(exchangeName, '', Buffer.from(`${index}: 'Hello World!'`))
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
