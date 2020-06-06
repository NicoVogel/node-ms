import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import PaymentRouter from './routes/payment.routes';
import { eventAdapter } from './services';
import * as promBundle from 'express-prom-bundle'
import { initAccountMessaging } from './controller/ext.account.controller';
import { initEventMessaging } from './controller/ext.event.controller';
import { initPaymentMessaging } from './controller/payment.controller';
const app = express();

app.use(promBundle({ includeMethod: true, includePath: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

initAccountMessaging();
initEventMessaging();
initPaymentMessaging();

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);

app.use('/', PaymentRouter);
eventAdapter.activate();
