import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import PaymentRouter from './routes/payment.routes';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);

app.use('/', PaymentRouter);
