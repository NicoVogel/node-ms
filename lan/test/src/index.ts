import { EventAdapter } from './services/rabbitmq.service';

const eventAdapter = new EventAdapter();
eventAdapter.subscribe('account.created').subscribe(console.log);
eventAdapter.active();

eventAdapter.publish('account.created', "hi")
