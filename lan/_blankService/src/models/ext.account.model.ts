import * as mongo from 'mongoose';
import { JSONOptions } from '../config/db.config';

export interface IAccount extends mongo.Document {
  name: string;
  _id: string;
}

export const accountSchema = new mongo.Schema({
  name: { type: String, required: true }
})

accountSchema.set('toJSON', JSONOptions);

const Account = mongo.model<IAccount>('Account', accountSchema);
export default Account;