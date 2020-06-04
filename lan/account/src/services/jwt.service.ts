import * as expressJwt from 'express-jwt';
import { getById } from '.';
import { secret } from '../config/jwt.config';
import { Request } from 'express';
import * as db from '../models';


export const jwt: any = () => {
  const options: any = { secret, isRevoked };
  return expressJwt(options).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate',
      '/users/register',
      '/teams/authenticate',
      '/teams/register',
    ]
  });
}

async function isRevoked(req: Request, payload: any, done: any) {
  // revoke token if user no longer exists
  if (!await getById(db.default.User, payload.sub)) {
    return done(null, true);
  } else if (!await getById(db.default.Team, payload.sub)) {
    return done(null, true);
  }

  done();
};
