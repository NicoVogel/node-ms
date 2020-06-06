import { DocumentToObjectOptions } from "mongoose";

const dbCollection = 'node-ms-blank';
const dbUser = 'blank';
const dbPassword = 'blank';

export const dbUrl: string = `mongodb://${dbUser}:${dbPassword}@mongodb:27017/${dbCollection}`;

export const JSONOptions: DocumentToObjectOptions = {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  }
};
