import * as mongo from 'mongoose';
import { JSONOptions } from '../config/db.config';

export interface IEvent extends mongo.Document {
    _id: string;
    title: string;
    created: Date;
    description: string;
    registered: {
        _id: string,
        name: string,
        registrationComplete: boolean,
        billingPending: boolean
    }[];
}

export const eventSchema = new mongo.Schema({
    created: { type: Date, default: Date.now },
    title: String,
    description: String,
    registered: [{
        name: { type: String, required: true },
        _id: Object,
        registrationComplete: Boolean,
        billingPending: Boolean
    }]
})

eventSchema.set('toJSON', JSONOptions);

const Event = mongo.model<IEvent>('Event', eventSchema);
export default Event;
