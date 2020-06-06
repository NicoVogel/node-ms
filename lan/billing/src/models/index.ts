import * as mongoose from 'mongoose';
import { dbUrl } from '../config/db.config'
import Payment from './payment.model';
import Account from './ext.account.model';
import Event from './ext.event.model';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', () => {
  console.log('Service Billing connected to database');
})

const db = {
  Payment,
  Account,
  Event
}
export default db;