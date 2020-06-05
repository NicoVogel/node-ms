import * as Amqp from 'amqp-ts';

const connection = new Amqp.Connection('amqp://rabbitmq');

// definitions
const accountExchange = connection.declareExchange('account', 'topic', {
  durable: false
});
const q1 = connection.declareQueue('q1', { durable: false });
const q2 = connection.declareQueue('q2', { durable: false });
const q3 = connection.declareQueue('q3', { durable: false });

// bindungs
q1.bind(accountExchange, 'account.created');
q2.bind(accountExchange, 'account.created');
q3.bind(accountExchange, 'account.register');


q1.activateConsumer((message) => {
  console.log('Message received q1: ' + message.getContent());
});
q2.activateConsumer((message) => {
  console.log('Message received q2: ' + message.getContent());
});
q3.activateConsumer((message) => {
  console.log('Message received q3: ' + message.getContent());
  message.ack();
});


connection.completeConfiguration().then(() => {
  // the following message will be received because
  // everything you defined earlier for this connection now exists
  const msg2 = new Amqp.Message('hi');
  // accountExchange.send(msg2, 'account.register');
});