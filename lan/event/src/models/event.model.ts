import * as mongo from 'mongoose';
import { JSONOptions } from '../config/db.config';

export interface IEvent extends mongo.Document {
    _id: object;
    title: string;
    created: Date;
    description: string;
}

export const eventSchema = new mongo.Schema({
    created: { type: Date, default: Date.now },
    title: String,
    description: String
})

eventSchema.set('toJSON', JSONOptions);

const Event = mongo.model<IEvent>('Event', eventSchema);
export default Event;
