import * as Amqp from 'amqp-ts';

const connection = new Amqp.Connection('amqp://rabbitmq');

// definitions
const accountExchange = connection.declareExchange('account', 'topic', {
  durable: false
});
const queue = connection.declareQueue('');

// bindungs
queue.bind(accountExchange, 'account.created');


queue.activateConsumer((message) => {
  console.log('Message received: ' + message.getContent());
});


connection.completeConfiguration().then(() => {
  // the following message will be received because
  // everything you defined earlier for this connection now exists
  const msg2 = new Amqp.Message('Test2');
  accountExchange.send(msg2, 'account.created');
});