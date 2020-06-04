import * as userService from '../services/user.service'
import { Request, NextFunction, Response } from 'express';


export function authenticate(req: Request, res: Response, next: NextFunction) {
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

export function register(req: Request, res: Response, next: NextFunction) {
  userService.create(req.body)
    .then((user) => res.json(user))
    .catch(err => next(err));
}

// hack: req.user is an extension of express-jwt which does not have correct typing available
// better hack: https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request
export function getCurrent(req: any, res: Response, next: NextFunction) {
  console.log(req.user.sub);
  userService.getById(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

export function getById(req: Request, res: Response, next: NextFunction) {
  userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

export function getAll(req: Request, res: Response, next: NextFunction) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

export function update(req: Request, res: Response, next: NextFunction) {
  userService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

export function _delete(req: Request, res: Response, next: NextFunction) {
  userService._delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
