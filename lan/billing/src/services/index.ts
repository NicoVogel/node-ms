import { EventAdapter } from './rabbitmq.service';
import { topicKeys } from '../config/rabbitmq.config';
import { addAccount } from '../controller/ext.account.controller';
export const eventAdapter = new EventAdapter();

export function initAMQP() {
  // topicKeys.forEach(key => {
  //   try {
  //     eventAdapter.listen(key).subscribe(e => console.log(`${key}: \t\t${JSON.stringify(e)} `));
  //   } catch (error) {
  //     console.error(`wrong topicKey in config! the wrong key is: ${key}. Error: ${error.getMessage()} `);
  //   }
  // })

  if (topicKeys.includes('account.created')) {
    eventAdapter.listen('account.created').subscribe(data => addAccount(data));
  }
  eventAdapter.activate();
}
