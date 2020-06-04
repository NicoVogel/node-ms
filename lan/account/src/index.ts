import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import UserRouter from './routes/user.routes'
import { jwt } from './services/jwt.service'

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
app.use('/users', UserRouter);


app.get('/', (req, res) => {
  res.send('hello world');
})