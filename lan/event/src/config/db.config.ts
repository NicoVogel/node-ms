import { DocumentToObjectOptions } from "mongoose";

const dbCollection = 'node-ms-event';
const dbUser = 'event';
const dbPassword = 'event';

export const dbUrl: string = `mongodb://${dbUser}:${dbPassword}@mongodb:27017/${dbCollection}`;

export const JSONOptions: DocumentToObjectOptions = {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  }
};
