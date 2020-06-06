import * as dbService from '../services'
import { Request, NextFunction, Response } from 'express';
import * as db from '../models';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  dbService.authenticate(db.default.Team, req.body)
    .then(team => team ? res.json(team) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

export function register(req: Request, res: Response, next: NextFunction) {
  dbService.create(db.default.Team, req.body)
    .then((team) => res.json(team))
    .catch(err => next(err));
}

export function getCurrent(req: any, res: Response, next: NextFunction) {
  console.log(req.user.sub);
  dbService.getById(db.default.Team, req.user.sub)
    .then(team => team ? res.json(team) : res.sendStatus(404))
    .catch(err => next(err));
}

export function getById(req: Request, res: Response, next: NextFunction) {
  dbService.getById(db.default.Team, req.params.id)
    .then(team => team ? res.json(team) : res.sendStatus(404))
    .catch(err => next(err));
}

export function getAll(req: Request, res: Response, next: NextFunction) {
  dbService.getAll(db.default.Team)
    .then(teams => res.json(teams))
    .catch(err => next(err));
}

export function update(req: Request, res: Response, next: NextFunction) {
  dbService.update(db.default.Team, req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

export function _delete(req: Request, res: Response, next: NextFunction) {
  dbService._delete(db.default.Team, req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
