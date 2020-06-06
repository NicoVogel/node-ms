import { Request, Response, NextFunction } from 'express';
import * as dbService from '../services'
import * as db from '../models';
import { eventAdapter } from '../services';


export function create(req: Request, res: Response, next: NextFunction) {
    dbService.create(db.default.Event, req.body)
        .then(data => eventAdapter.publish('event.created', { _id: data.id, name: data.title }))
        .then(res.json)
        .catch(next)
}

const notFound = (res: Response, data: any) =>
    data !== undefined ? res.json(data) : res.sendStatus(404)

export function getById(req: Request, res: Response, next: NextFunction) {
    dbService.getById(db.default.Event, req.params.id)
        .then(event => notFound(res, event))
        .catch(next);
}

export function getAll(req: Request, res: Response, next: NextFunction) {
    dbService.getAll(db.default.Event)
        .then(res.json)
        .catch(next);
}
