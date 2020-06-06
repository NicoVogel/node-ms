import * as mongo from 'mongoose';
import { JSONOptions } from '../config/db.config';
import { IUser, userSchema } from './user.model'

export interface ITeam extends IUser {
  members: string[];
};

export const teamSchema = new mongo.Schema(
  {
    ...userSchema.obj,
    members: { type: Array }
  })

teamSchema.set('toJSON', JSONOptions);

const Team = mongo.model<IUser>('Team', teamSchema);
export default Team;