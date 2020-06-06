import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { eventAdapter } from './services';
import * as promBundle from 'express-prom-bundle'
import EventRouter from './routes/event.routes';
import { initAccountMessaging } from './controller/ext.account.controller';
const app = express();

app.use(promBundle({ includeMethod: true, includePath: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// init messaging
initAccountMessaging();


app.use('/', EventRouter);

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
eventAdapter.activate();
