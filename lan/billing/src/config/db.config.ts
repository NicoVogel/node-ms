import { DocumentToObjectOptions } from "mongoose";

const dbCollection = 'node-ms-billing';
const dbUser = 'billing';
const dbPassword = 'billing';

export const dbUrl: string = `mongodb://${dbUser}:${dbPassword}@mongodb:27017/${dbCollection}`;

export const JSONOptions: DocumentToObjectOptions = {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
    delete ret.passwordHash;
  }
};
