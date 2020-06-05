import { Request, Response } from 'express';
import * as db from '../models';
import { ICart } from '../models/payment.model';
const Payment = db.default.Payment;

export async function requestPayment(paymentObj: Object) {
  const payment = new Payment(paymentObj);
  // ignore incoming state
  payment.state = 'REQUESTED';
  payment.save()
    .then(data => console.log(data))
    .catch(err => {
      console.error(err);
    })
}

export async function pendingPayment(_id: Object) {
  setState(_id, "PENDING");
}

export async function completedPayment(_id: Object) {
  setState(_id, "COMPLETED");
}

export async function setState(_id: Object, state: string) {
  const target = await Payment.findOne({ _id });
  if (!target) {
    console.warn("account-event pair does not exist")
    return;
  }
  target.transactionDate = new Date();
  target.state = state;
  target.save();
}

export async function addCartElementArray(_id: Object, cartArray: ICart[], replace = false) {
  const target = await Payment.findOne({ _id });

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

export async function removeCartElement(_id: Object, sourceId: string, purpose: string) {
  const target = await Payment.findOne({ _id });
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

export function test(req: Request, res: Response) {
  // Payment.collection.drop();
  // addCartElementArray({ accountId: 'account5', eventId: 'event4' }, [{
  //   "sourceId": "aaaa",
  //   "purpose": "purp12",
  //   "amount": 52.5
  // }], true)
  // completedPayment({ accountId: 'account5', eventId: 'event4' });
  removeCartElement({ accountId: 'account5', eventId: 'event4' }, "aaaa", "purp12");
  res.end();
}

export function add(req: Request, res: Response) {
  if (!req.body._id || !req.body._id.accountId || !req.body._id.eventId) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  requestPayment(req.body);
  res.end();
}

export function getAll(req: Request, res: Response) {
  Payment.find()
    .then(data => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Error in retrieving all Payments',
      });
    });
}
export function getById(req: Request, res: Response) {
  const { accountId, eventId } = req.params;
  Payment.findById({ accountId, eventId })
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
