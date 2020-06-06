import * as db from '../models';
import { Types } from 'mongoose';
const Account = db.default.Account;

export async function addAccount(accountObj: Object) {
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