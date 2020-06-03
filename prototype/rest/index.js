const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const chefRoutes = require('./routes/chef.routes');
const dishRoutes = require('./routes/dish.routes');
const swaggerRoutes = require('./routes/swagger.routes');

mongoose.connect('mongodb://mongo/node-ms-rest', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.once('open', () => {
  console.log('connected to database');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/chef', chefRoutes);
app.use('/dish', dishRoutes);
app.use('/docs', swaggerRoutes);
app.listen(3000, () => {
  console.log('Server running on port 3000')
})