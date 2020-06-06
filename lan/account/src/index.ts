import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import UserRouter from './routes/user.routes'
import TeamRouter from './routes/team.routes'
import { jwt } from './services/jwt.service'
import { eventAdapter } from './services';
import * as promBundle from 'express-prom-bundle'
import { initEventMessaging } from './controller/ext.event.controller';
const app = express();

app.use(promBundle({ includeMethod: true, includePath: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

initEventMessaging();

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
app.use('/users', UserRouter);
app.use('/teams', TeamRouter);

app.get('/', (req, res) => {
  res.send('hello world');
})
eventAdapter.activate();