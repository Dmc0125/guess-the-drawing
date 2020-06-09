const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const api = require('./api');
const middlewares = require('./middlewares');

const app = express();

app.use(volleyball);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API for Guess the drawing game.'
  });
});

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
