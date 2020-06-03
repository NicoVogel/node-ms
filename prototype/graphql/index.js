const mongoose = require('mongoose');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();

mongoose.connect('mongodb://mongo/node-ms-rest', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('connected to database');
})


app.use('/graphiql', graphqlHTTP({ schema: require('./schema'), graphiql: true }));

app.listen(3000, () => {
  console.log('Server running on port 3000')
})