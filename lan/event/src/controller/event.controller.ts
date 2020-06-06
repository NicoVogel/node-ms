import { Request, Response, NextFunction } from 'express';
import * as dbService from '../services'
import * as db from '../models';
import { eventAdapter } from '../services';
import { IAccount } from '../models/ext.account.model';
import { IEvent } from '../models/event.model';

const tip = <T>(callback: (d: T) => void) => (data: T): T => {
    callback(data);
    return data;
}

const notFound = (res: Response) => (data: any) =>
    data !== undefined ? res.json(data) : res.sendStatus(404);

const mapToOutput = (event: IEvent, accountId: string) => {
    return {
        id: event.id,
        title: event.title,
        created: event.created,
        description: event.description,
        price: event.price,
        registered: [...event.registered].filter(x => x._id === accountId)
    }
}



export function create(req: Request, res: Response, next: NextFunction) {
    dbService.create(db.default.Event, req.body)
        .then(tip((data) => eventAdapter.publish('event.created', {
            _id: data.id,
            title: data.title
        })))
        .then(data => res.json(data))
        .catch(next)
}

export function getById(req: Request, res: Response, next: NextFunction) {
    dbService.getById(db.default.Event, req.params.id)
        .then(notFound(res))
        .catch(next);
}

export function getAll(req: Request, res: Response, next: NextFunction) {
    dbService.getAll(db.default.Event)
        .then(data => data.map(value => mapToOutput(value, '')))
        .then(data => res.json(data))
        .catch(next);
}

export function register(req: Request, res: Response, next: NextFunction) {
    dbService.register(db.default.Event, db.default.Account, req.body.eventId, req.body.accountId)
        .then(tip(data => eventAdapter.publish('event.registered', {
            eventId: data.event.id,
            accountId: data.account.id
        })))
        .then(tip(data => eventAdapter.publish('billing.request', {
            _id: {
                accountId: data.account.id,
                eventId: data.event.id
            },
            cart: [
                {
                    sourceId: "event",
                    purpose: "Event registration fee",
                    amount: data.event.price
                }
            ]
        })))
        .then(data => mapToOutput(data.event, data.account.id))
        .then(data => res.json(data))
        .catch(next);
}

export function confirmRegistration(req: Request, res: Response, next: NextFunction) {
    dbService.confirm(db.default.Event, db.default.Account, req.body.eventId, req.body.accountId)
        .then(tip(data => eventAdapter.publish('billing.pending', {
            _id: {
                eventId: data.event.id,
                accountId: data.account._id
            }
        })))
        .then(data => mapToOutput(data.event, data.account._id))
        .then(data => res.json(data))
        .catch(next);
}