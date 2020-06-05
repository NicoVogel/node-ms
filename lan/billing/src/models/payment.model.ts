import * as mongo from 'mongoose';
import { JSONOptions } from '../config/db.config';

export enum paymentState {
  REQUESTED,
  CONFIRMED
}

export interface IPayment extends mongo.Document {
  userId: string;
  amount: number;
  purposeId: String
  transactionDate: Date;
}

export const paymentSchema = new mongo.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  purposeId: { type: String, required: true },
  state: { type: String },
  transactionDate: { type: Date, default: Date.now }
})

paymentSchema.set('toJSON', JSONOptions);

const Payment = mongo.model<IPayment>('Payment', paymentSchema);
export default Payment;