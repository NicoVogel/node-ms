
import { EventAdapter } from './rabbitmq.service';
import { Model } from 'mongoose';
import { IEvent } from '../models/event.model';
export const eventAdapter = new EventAdapter();

// CREATE

export async function create(model: Model<IEvent>, eventParam: IEvent) {
    if (await model.findOne({ title: eventParam.title })) {
        throw `Event ${eventParam.title} already exists`;
    }

    const event = new model(eventParam);
    return await event.save();
}

// READ

export async function getById(model: Model<IEvent>, id: string) {
    return await model.findById(id);
}

export async function getAll(model: Model<IEvent>) {
    return await model.find();
}

