import { EventAdapter } from './rabbitmq.service';
import { topicKeys } from '../config/rabbitmq.config';

export const eventAdapter = new EventAdapter();

export function initAMQP() {
  for (const service in topicKeys) {
    if (topicKeys.hasOwnProperty(service)) {
      const serviceEvent = topicKeys[service];

      serviceEvent.forEach(event => {
        eventAdapter.listen(event).subscribe(e => console.log(`${event}:\t\t${JSON.stringify(e)}`));
      });
    }
  }
  eventAdapter.activate();
}
