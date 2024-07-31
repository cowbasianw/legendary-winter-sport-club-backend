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

app.options('*', cors({
    origin: 'https://legendarywintersports.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
  res.status(200).send(`Server is running on port ${PORT}`);
  res.status(200).send("Email User:", process.env.EMAIL_USER);
});


module.exports = app;
