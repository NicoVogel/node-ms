import * as mongo from 'mongoose';
import { JSONOptions } from '../config/db.config';

export interface IEvent extends mongo.Document {
  title: string;
  _id: object;
}

export const eventSchema = new mongo.Schema({
  title: { type: String, required: true }
})

eventSchema.set('toJSON', JSONOptions);

const Event = mongo.model<IEvent>('Event', eventSchema);
export default Event;