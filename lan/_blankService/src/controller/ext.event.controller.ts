import * as db from '../models';
import { Types } from 'mongoose';
import { eventAdapter } from '../services';
const Event = db.default.Event;


export function initEventMessaging() {
    eventAdapter.listen('event.created').subscribe(data => addEvent(data));
}


async function addEvent(eventObj: Object) {
    new Event(eventObj)
        .save()
        .catch(console.error);
}

export async function checkEvent(eventId: string): Promise<boolean> {
    return Types.ObjectId.isValid(eventId) &&
        await Event.findById(eventId) !== null;
}