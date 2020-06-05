import * as Amqp from 'amqp-ts';

const connection = new Amqp.Connection('amqp://rabbitmq');

// definitions
const accountExchange = connection.declareExchange('account', 'fanout');
const accountCreatedExchange = connection.declareExchange('created', 'fanout');
const queue = connection.declareQueue('');

// bindungs
accountCreatedExchange.bind(accountExchange);
queue.bind(accountCreatedExchange);


queue.activateConsumer((message) => {
  console.log('Message received: ' + message.getContent());
});


connection.completeConfiguration().then(() => {
  // the following message will be received because
  // everything you defined earlier for this connection now exists
  const msg2 = new Amqp.Message('Test2');
  accountExchange.send(msg2);
});