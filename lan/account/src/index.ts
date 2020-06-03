import * as express from 'express';
import * as mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://mongodb:27017/node-ms-account', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', () => {
  console.log('Service Account connected to database');
})
app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);

app.get('/', (req, res) => {
  res.send('hello world');
})