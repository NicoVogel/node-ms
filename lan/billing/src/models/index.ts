import * as mongoose from 'mongoose';
import { dbUrl } from '../config/db.config'
import Payment from './payment.model';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', () => {
  console.log('Service Billing connected to database');
})

const db = {
  Payment
}
export default db;