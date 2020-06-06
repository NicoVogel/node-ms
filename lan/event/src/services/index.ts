
import { EventAdapter } from './rabbitmq.service';
import { Model } from 'mongoose';
import { IEvent } from '../models/event.model';
import { IAccount } from '../models/ext.account.model';
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

// UPDATE

export async function completeBilling(eventModel: Model<IEvent>, accountModel: Model<IAccount>, eventId: string, accountId: string) {
    const event = await getById(eventModel, eventId);
    if (event === null) {
        throw `BillingComplete failed, no event with id '${eventId}' exists.`
    }
    const existingAccount = event.registered.find(acc => acc._id === accountId);
    if (existingAccount === undefined) {
        throw `BillingComplete failed, no account with id '${accountId}' exists.`
    }
    existingAccount.registrationComplete = true;
    event.save();
}

export async function register(eventModel: Model<IEvent>, accountModel: Model<IAccount>, eventId: string, accountId: string) {
    let event = await getById(eventModel, eventId);
    if (event === null) {
        throw `Registration failed, no event with id '${eventId}' exists.`
    }
    const account = await accountModel.findById(accountId);
    if (account === null) {
        throw `Registration failed, no account with id '${accountId}' exists.`
    }
    const existingAccount = event.registered.find(acc => acc._id === accountId);
    if (existingAccount === undefined) {
        event.registered.push({ _id: account.id, name: account.name, registrationComplete: false, billingPending: false })
        event = await event.save();
    }
    return { event, account };
}

export async function confirm(eventModel: Model<IEvent>, accountModel: Model<IAccount>, eventId: string, accountId: string) {
    const event = await getById(eventModel, eventId);
    if (event === null) {
        throw `Confirm failed, no event with id '${eventId}' exists.`
    }
    const existingAccount = event.registered.find(acc => acc._id === accountId);
    if (existingAccount === undefined) {
        throw `Confirm failed, no account with id '${accountId}' exists.`
    }
    existingAccount.billingPending = true;
    event.save();
    return { event, account: existingAccount };
}
