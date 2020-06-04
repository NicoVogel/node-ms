import * as mongo from 'mongoose';
import { JSONOptions } from '../config/db.config';

export interface IUser extends mongo.Document {
  name: string;
  passwordHash: string;
  createdDate: Date;
};

export const userSchema = new mongo.Schema({
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
});

userSchema.set('toJSON', JSONOptions);

const User = mongo.model<IUser>('User', userSchema);
export default User;