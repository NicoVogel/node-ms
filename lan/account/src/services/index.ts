import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { EventAdapter } from './rabbitmq.service';
import { secret } from '../config/jwt.config'

import { Model } from 'mongoose';
import { IUser } from '../models/user.model';

export const eventAdapter = new EventAdapter();

export async function getById(model: Model<IUser>, id: string) {
  return await model.findById(id);
}

export async function authenticate(model: Model<IUser>, { name, password }: any) {
  const user = await model.findOne({ name });
  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    const token = jwt.sign({ sub: user.id }, secret);
    return {
      ...user.toJSON(),
      token
    };
  }
  if (user && user.passwordHash === password) {
    return user.toJSON();
  } return undefined;
}

export async function update(model: Model<IUser>, id: string, userParam: any) {
  const user = await model.findById(id);

  // validate
  if (!user) throw 'model not found';
  if (user.name !== userParam.name && await model.findOne({ name: userParam.name })) {
    throw 'Username "' + userParam.name + '" is already taken';
  }

  // rehash
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }
  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

export async function getAll(model: Model<IUser>) {
  return await model.find();
}

export async function create(model: Model<IUser>, userParam: any) {
  if (await model.findOne({ name: userParam.name })) {
    throw 'Username"' + userParam.name + '"already taken'
  }

  const user = new model(userParam);
  if (userParam.password) {
    user.passwordHash = bcrypt.hashSync(userParam.password, 10);
  }
  return await user.save().then(data => {
    eventAdapter.publish('account.created', { _id: data.id, name: data.name });
  });
}

export async function _delete(model: Model<IUser>, id: string) {
  await model.findByIdAndRemove(id);
}