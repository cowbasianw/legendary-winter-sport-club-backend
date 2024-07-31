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

  // Add a status route
app.get('/status', (req, res) => {
  res.status(200).send('Server is running successfully!');
});


module.exports = app;