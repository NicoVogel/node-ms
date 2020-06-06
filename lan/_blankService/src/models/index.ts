import * as mongoose from 'mongoose';
import { dbUrl } from '../config/db.config'
import Event from './ext.event.model';
import Account from './ext.account.model';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', () => {
  console.log('Service Event connected to database');
})

const db = {
  Event,
  Account
}
export default db;