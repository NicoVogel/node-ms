import * as db from '../models';
const Account = db.default.Account;

export async function addAccount(accountObj: Object) {
  const account = new Account(accountObj);

  account.save().catch(err => {
    console.error(err);
  });
}

export async function findAccount(accountId: string): Promise<Boolean> {
  const target = await Account.findById(accountId);
  if (target) {
    return true;
  }
  return false;
}