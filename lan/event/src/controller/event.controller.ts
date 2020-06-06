import { Request, Response, NextFunction } from 'express';
import * as dbService from '../services'
import * as db from '../models';
import { eventAdapter } from '../services';

const tip = <T>(callback: (d: T) => void) => (data: T): T => {
    callback(data);
    return data;
}

const notFound = (res: Response) => (data: any) =>
    data !== undefined ? res.json(data) : res.sendStatus(404);

export function create(req: Request, res: Response, next: NextFunction) {
    dbService.create(db.default.Event, req.body)
        // .then(data => tip(() => eventAdapter.publish('event.created', { _id: data.id, name: data.title }), data))
        .then(tip((data) => eventAdapter.publish('event.created', { _id: data.id, name: data.title })))
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
        .then(data => res.json(data))
        .catch(next);
}
