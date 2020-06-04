import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { secret } from '../config/jwt.config'

import db from '../models';
const User = db.User;

export async function getById(id: string) {
  return await User.findById(id);
}

export async function authenticate({ username, password }: any) {
  const user = await User.findOne({ username });

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

export async function update(id: string, userParam: any) {
  const user = await User.findById(id);

  // validate
  if (!user) throw 'User not found';
  if (user.name !== userParam.name && await User.findOne({ name: userParam.name })) {
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

export async function getAll() {
  return await User.find();
}

export async function create(userParam: any) {
  if (await User.findOne({ name: userParam.name })) {
    throw 'Username"' + userParam.name + '"already taken'
  }

  const user = new User(userParam);
  if (userParam.password) {
    user.passwordHash = bcrypt.hashSync(userParam.password, 10);
  }
  return await user.save();
}

export async function _delete(id: string) {
  await User.findByIdAndRemove(id);
}