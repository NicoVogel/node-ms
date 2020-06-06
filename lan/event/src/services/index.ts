
import { EventAdapter } from './rabbitmq.service';
import { topicKeys } from '../config/rabbitmq.config';
import { Model } from 'mongoose';
import { IEvent } from '../models/event.model';

export const eventAdapter = new EventAdapter();


export function initAMQP() {
    topicKeys.forEach(key =>
        eventAdapter.listen(key).subscribe(e => console.log(`${key}: \t\t${JSON.stringify(e)} `))
    )
    eventAdapter.activate();
}

// CREATE

export async function create(model: Model<IEvent>, eventParam: IEvent) {
    if (await model.findOne({ title: eventParam.title })) {
        throw `Event ${eventParam.title} already exists`;
    }

    const event = new model(eventParam);
    return await event.save().then(data => {
        eventAdapter.publish('event.created', { _id: data.id, name: data.title });
    });
}

// READ

export async function getById(model: Model<IEvent>, id: string) {
    return await model.findById(id);
}

export async function getAll(model: Model<IEvent>) {
    return await model.find();
}
