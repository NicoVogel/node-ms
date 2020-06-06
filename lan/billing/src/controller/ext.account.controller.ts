import * as db from '../models';
import { Types } from 'mongoose';
import { eventAdapter } from '../services';
const Account = db.default.Account;


export function initAccountMessaging() {
  eventAdapter.listen('account.created').subscribe(data => addAccount(data));
}


async function addAccount(accountObj: Object) {
  const account = new Account(accountObj);

  account.save()
    // .then(data => console.log("account saved with id" + data.id))
    .catch(err => {
      console.error(err);
    });
}


export async function checkAccount(accountId: string): Promise<boolean> {
  return Types.ObjectId.isValid(accountId) &&
    await Account.findById(accountId) !== null;
}