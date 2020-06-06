import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import UserRouter from './routes/user.routes'
import TeamRouter from './routes/team.routes'
import { jwt } from './services/jwt.service'
import { initAMQP } from './services';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

initAMQP();

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
app.use('/users', UserRouter);
app.use('/teams', TeamRouter);

app.get('/', (req, res) => {
  res.send('hello world');
})