import * as mongoose from 'mongoose';
import { dbUrl } from '../config/db.config'
import Event from './event.model';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', () => {
  console.log('Service Event connected to database');
})

const db = {
  Event
}
export default db;