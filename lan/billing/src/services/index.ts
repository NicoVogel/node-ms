import { EventAdapter } from './rabbitmq.service';
import { topicKeys } from '../config/rabbitmq.config';

export const eventAdapter = new EventAdapter();

export function initAMQP() {
  for (const key in topicKeys) {
    if (topicKeys.hasOwnProperty(key)) {
      const element = topicKeys[key];
      element.forEach(key => {
        eventAdapter.listen(key).subscribe(e => console.log(e));
      });
    }
  }
  eventAdapter.active();
}
