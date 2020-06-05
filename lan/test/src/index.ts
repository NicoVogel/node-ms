import * as Amqp from "amqp-ts";

var connection = new Amqp.Connection("amqp://localhost");
var exchange = connection.declareExchange("ExchangeName", "fanout");
var queue = connection.declareQueue("QueueName");
queue.bind(exchange);
queue.activateConsumer((message) => {
  console.log("Message received: " + message.getContent());
});

// it is possible that the following message is not received because
// it can be sent before the queue, binding or consumer exist
var msg = new Amqp.Message("Test");
exchange.send(msg);

connection.completeConfiguration().then(() => {
  // the following message will be received because
  // everything you defined earlier for this connection now exists
  var msg2 = new Amqp.Message("Test2");
  exchange.send(msg2);
});