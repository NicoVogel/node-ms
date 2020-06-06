import { EventAdapter } from './rabbitmq.service';
import { topicKeys } from '../config/rabbitmq.config';
import { addAccount } from '../controller/ext.account.controller';
export const eventAdapter = new EventAdapter();

export function initAMQP() {
  for (const service in topicKeys) {
    if (topicKeys.hasOwnProperty(service)) {
      const serviceEvent: string[] = topicKeys[service];

      // serviceEvent.forEach(event => {
      //   eventAdapter.listen(event).subscribe(e => console.log(`${event}:\t\t${JSON.stringify(e)}`));
      // });

      if (serviceEvent.includes('account.created')) {
        eventAdapter.listen('account.created').subscribe(data => addAccount(data));
      }

    }
  }
  eventAdapter.activate();
}
