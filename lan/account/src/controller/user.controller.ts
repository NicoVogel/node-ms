import * as dbService from '../services'
import { Request, NextFunction, Response } from 'express';
import * as db from '../models';


export function authenticate(req: Request, res: Response, next: NextFunction) {
  dbService.authenticate(db.default.User, req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

export function register(req: Request, res: Response, next: NextFunction) {
  dbService.create(db.default.User, req.body)
    .then((user) => res.json(user))
    .catch(err => next(err));
}

// hack: req.user is an extension of express-jwt which does not have correct typing available
// better hack: https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request
export function getCurrent(req: any, res: Response, next: NextFunction) {
  dbService.getById(db.default.User, req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

export function getById(req: Request, res: Response, next: NextFunction) {
  dbService.getById(db.default.User, req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

export function getAll(req: Request, res: Response, next: NextFunction) {
  dbService.getAll(db.default.User)
    .then(users => res.json(users))
    .catch(err => next(err));
}

export function update(req: Request, res: Response, next: NextFunction) {
  dbService.update(db.default.User, req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

export function _delete(req: Request, res: Response, next: NextFunction) {
  dbService._delete(db.default.User, req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
