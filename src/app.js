const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const joinRouter = require('./routes/join.js');

const app = express();

// Configure CORS to allow requests from https://legendarywintersports.com
app.use(cors({
    origin: 'https://legendarywintersports.com'
  }));
  
  app.use(bodyParser.json());
  app.use('/api/join', joinRouter);

module.exports = app;