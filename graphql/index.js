const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://mongo/node-ms-rest', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
  console.log('connected to database');
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})