import * as mongo from 'mongoose';
import { JSONOptions } from '../config/db.config';

export interface IPayment extends mongo.Document {
  _id: Object;
  transactionDate: Date;
  state: String;
  cart: ICart[];
}

export interface ICart {
  sourceId: String,
  purpose: String,
  amount: Number
}

export const paymentSchema = new mongo.Schema({
  _id: {
    accountId: { type: String, required: true },
    eventId: { type: String, required: true },
  },
  transactionDate: { type: Date, default: Date.now },
  state: String,
  cart: [{
    sourceId: String,
    purpose: String,
    amount: Number
  }]
})

paymentSchema.set('toJSON', JSONOptions);

const Payment = mongo.model<IPayment>('Payment', paymentSchema);
export default Payment;