import { EventAdapter } from './rabbitmq.service';
import { topicKeys } from '../config/rabbitmq.config';
import { addAccount } from '../controller/ext.account.controller';
import { pendingPayment, completedPayment, addCartElementArray, removeCartElement } from '../controller/payment.controller';
export const eventAdapter = new EventAdapter();

export function initAMQP() {
  // topicKeys.forEach(key => {
  //   try {
  //     eventAdapter.listen(key).subscribe(e => console.log(`${key}: \t\t${JSON.stringify(e)} `));
  //   } catch (error) {
  //     console.error(`wrong topicKey in config! the wrong key is: ${key}. Error: ${error.getMessage()} `);
  //   }
  // })

  eventAdapter.listen('account.created').subscribe(data => addAccount(data));
  eventAdapter.listen('billing.pending').subscribe(data => pendingPayment(data._id));
  eventAdapter.listen('billing.completed').subscribe(data => completedPayment(data._id));
  eventAdapter.listen('billing.addToCart').subscribe(data => addCartElementArray(data._id, data.cart));
  eventAdapter.listen('billing.replaceCart').subscribe(data => addCartElementArray(data._id, data.cart, true));
  eventAdapter.listen('billing.emptyCart').subscribe(data => addCartElementArray(data._id, [], true));
  eventAdapter.listen('billing.removeFromCart').subscribe(data => removeCartElement(data._id, data.sourceId, data.purpose));

  eventAdapter.activate();
}
