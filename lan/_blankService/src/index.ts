import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as promBundle from 'express-prom-bundle'
import { initAccountMessaging } from './controller/ext.account.controller';
import { initEventMessaging } from './controller/ext.event.controller';
import { eventAdapter } from './services';
const app = express();

app.use(promBundle({ includeMethod: true, includePath: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

initAccountMessaging();
initEventMessaging();

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);

eventAdapter.activate();