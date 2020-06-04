import * as expressJwt from 'express-jwt';
import { getById } from '.';
import { secret } from '../config/jwt.config';
import { Request } from 'express';

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
  const user = await getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
};
