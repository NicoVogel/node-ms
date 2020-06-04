import * as mongo from 'mongoose';

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

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.passwordHash;
  }
});

const User = mongo.model<IUser>('User', userSchema);
export default User;