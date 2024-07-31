const express = require('express');
const bodyParser = require('body-parser');
const joinRouter = require('./routes/join.js');

const app = express();

app.use(bodyParser.json());
app.use('/api/join', joinRouter);

// Status route
app.get('/status', (req, res) => {
  res.status(200).send('Server is running successfully on port ${PORT}!');
});

// Default route
app.get('/', (req, res) => {
  res.status(200).send(`Server is running. Accessible domain http://localhost:5173, and https://legendarywintersports.com"`);
});

module.exports = app;

