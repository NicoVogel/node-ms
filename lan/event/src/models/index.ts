import * as mongoose from 'mongoose';
import { dbUrl } from '../config/db.config'
import Account from './ext.account.model';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', () => {
  console.log('Service Event connected to database');
})

const db = {
  Account
}
export default db;