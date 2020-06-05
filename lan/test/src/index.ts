import { EventAdapter } from './services/rabbitmq.service';


const eventAdapter = new EventAdapter();
eventAdapter.listen('account.created').subscribe(console.log);
eventAdapter.publish('account.created', { text: 'hallo' })
eventAdapter.active();

