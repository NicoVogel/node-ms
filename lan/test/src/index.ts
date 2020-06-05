import { EventAdapter } from './services/rabbitmq.service';
import { rabbitmqURL, mainTopics } from './config/rabbitmq.config';
import * as Amqp from 'amqp-ts';
import { Subject } from 'rxjs';



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
});


connection.completeConfiguration().then(() => {
  // the following message will be received because
  // everything you defined earlier for this connection now exists
  const msg2 = new Amqp.Message('hi');
  accountExchange.send(msg2, 'account.register');
});




// const key = 'account.created';
// const mainTopic = 'account'
// const data = "hi";




// const connection = new Amqp.Connection(rabbitmqURL);
// // const mainExchanges: {
// //   [name: string]: Amqp.Exchange
// // } = {};
// // mainTopics.forEach(topic => {
// //   mainExchanges[topic] = connection.declareExchange(topic, 'topic', { durable: false });
// // });
// const exchange = connection.declareExchange('account', 'topic', {
//   durable: false
// });


// const queue = connection.declareQueue('q1', { durable: false });
// // const exchange = mainExchanges[mainTopic];
// queue.bind(exchange, key)

// // const newSubject = new Subject<any>();
// queue.activateConsumer((message) => {
//   // newSubject.next(message.getContent());
//   console.log(message.getContent())
//   message.ack();
// })

// connection.completeConfiguration().then(() => {
//   console.log('completeConfiguration')

//   const message = new Amqp.Message(data);
//   exchange.send(message, key);
// })






// const eventAdapter = new EventAdapter();
// eventAdapter.subscribe('account.created').subscribe(console.log);
// eventAdapter.active();
// eventAdapter.publish('account.created', "hi")

