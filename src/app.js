const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const joinRouter = require('./routes/join.js');

const app = express();

app.use(cors({
  origin: 'https://legendarywintersports.com', // Update with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add methods as needed
  allowedHeaders: ['Content-Type', 'Authorization'] // Add headers as needed
}));
  
  app.use(bodyParser.json());
  app.use('/api/join', joinRouter);

  // Add a status route
app.get('/status', (req, res) => {
  res.status(200).send('Server is running successfully!');
});

// Default route to status
app.get('/', (req, res) => {
  res.status(200).send('Server is running successfully! Default route active.');
});


module.exports = app;