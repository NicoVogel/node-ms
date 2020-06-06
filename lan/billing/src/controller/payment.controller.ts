import { Request, Response } from 'express';
import * as db from '../models';
import { ICart } from '../models/payment.model';
import { checkAccount } from './ext.account.controller';
import { eventAdapter } from '../services';
import { runInThisContext } from 'vm';
import { async } from 'rxjs/internal/scheduler/async';
import { resolve } from 'path';
const Payment = db.default.Payment;

export function initPaymentMessaging() {
  eventAdapter.listen('billing.request').subscribe(data => requestPayment(data));
  eventAdapter.listen('billing.pending').subscribe(data => pendingPayment(data._id));
  // eventAdapter.listen('billing.completed').subscribe(data => completedPayment(data._id));
  eventAdapter.listen('billing.addToCart').subscribe(data => addCartElementArray(data._id, data.cart));
  eventAdapter.listen('billing.replaceCart').subscribe(data => addCartElementArray(data._id, data.cart, true));
  eventAdapter.listen('billing.emptyCart').subscribe(data => addCartElementArray(data._id, [], true));
  eventAdapter.listen('billing.removeFromCart').subscribe(data => removeCartElement(data._id, data.sourceId, data.purpose));
}

const findPayment = async (_id: { accountId: string, eventId: string }) =>
  await Payment.findOne({ _id: { accountId: _id.accountId, eventId: _id.eventId } });


export async function requestPayment(paymentObj: object) {
  const payment = new Payment(paymentObj);
  if (!await checkAccount(payment._id.accountId)) {
    console.error(`requestPayment with ${payment._id.accountId} failed: accountId does not exist`)
    return;
  }

  // ignore incoming state
  payment.state = 'REQUESTED';

  payment.save()
    // .then(data => console.log(data))
    .catch(err => {
      console.error(err);
    });
}

export async function pendingPayment(_id: any) {
  if (!await checkAccount(_id.accountId)) {
    console.error(`pendingPayment with ${_id.accountId} failed: accountId does not exist`)
    return;
  }
  setState(_id, "PENDING");
}

export async function completedPayment(_id: any) {
  if (!await checkAccount(_id.accountId)) {
    console.error(`completedPayment with ${_id.accountId} failed: accountId does not exist`)
    return;
  }
  setState(_id, "COMPLETED");
}

async function setState(_id: any, state: string) {
  const target = await findPayment(_id);
  if (!target) {
    console.warn("account-event pair does not exist")
    return;
  }
  target.transactionDate = new Date();
  target.state = state;
  target.save();
}

export async function addCartElementArray(_id: any, cartArray: ICart[], replace = false) {
  if (!await checkAccount(_id.accountId)) {
    console.error(`addCartElementArray with ${_id.accountId} failed: accountId does not exist`)
    return;
  }
  const target = await findPayment(_id);

  if (!target) {
    console.warn("account-event pair does not exist")
    return;
  }
  if (replace) {
    target.cart = cartArray;
  } else {
    target.cart.push(...cartArray);
  }
  target.save();
}

export async function removeCartElement(_id: any, sourceId: string, purpose: string) {
  if (!await checkAccount(_id.accountId)) {
    console.error(`removeCartElement with ${_id.accountId} failed: accountId does not exist`)
    return;
  }
  const target = await findPayment(_id);
  if (!target) {
    console.error("account-event pair does not exist")
    return;
  } else {
    const index = target.cart.findIndex(cartElem => cartElem.sourceId === sourceId && cartElem.purpose === purpose);
    if (index >= 0) {
      target.cart = [...target.cart.slice(0, index), ...target.cart.slice(index + 1)];
      target.save();
    } else console.error("cart with sourceid-purpose pair does not exist")
  }
}

// REST

export async function pay(req: Request, res: Response) {
  try {
    const _id = { accountId: req.body.accountId, eventId: req.body.eventId };
    const target = await findPayment(_id);
    if (target === null) {
      res.sendStatus(422).send(`no invoice for given ids: ${_id}`)
      return;
    }
    target.transactionDate = new Date();
    target.state = "COMPLETED";
    target.save();
    eventAdapter.publish('billing.completed', { _id });
    res.sendStatus(200).send('OK');
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Error in retrieving all Payments',
    });
  }
}


export async function getAllFromAccount(req: Request, res: Response) {
  const idPairs = await Payment.aggregate<{ _id: string, eventIds: string[] }>([
    {
      '$group': {
        '_id': '$_id.accountId',
        'eventIds': {
          '$addToSet': '$_id.eventId'
        }
      }
    }
  ])
    .then(data => data[0])
    .then(data => data.eventIds.map(eventId => {
      return { _id: { accountId: data._id, eventId } }
    }))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Error in retrieving all Payments',
      });
    });
  if (idPairs) {
    const data = await Promise.all(idPairs.map(async (id) => Payment.findOne(id)));
    res.json(data.filter(result => result !== null));
  }
}

export function getById(req: Request, res: Response) {
  const { accountId, eventId } = req.params;
  findPayment({ accountId, eventId })
    .then(data => {
      if (!data) res.status(404).send({ message: `No Payment found with accountId ${accountId}:eventId ${eventId}` });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Error in retrieving payment',
      });
    });
}
