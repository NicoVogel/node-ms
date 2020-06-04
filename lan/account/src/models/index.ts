import * as mongoose from 'mongoose';
import User from './user.model';
import Team from './team.model';
import { dbUrl } from '../config/db.config'

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', () => {
  console.log('Service Account connected to database');
})

const db = {
  User,
  Team
}
export default db;