import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { eventAdapter } from './services';
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
eventAdapter.activate();
