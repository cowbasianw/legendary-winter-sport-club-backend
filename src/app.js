const express = require('express');
const bodyParser = require('body-parser');
const joinRouter = require('./routes/join.js');
const cors = require('cors');

const app = express();

// Configure CORS in app if not already set
const corsOptions = {
  origin: ['https://legendarywintersports.com', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.use(bodyParser.json());
app.use('/api/join', joinRouter);

// Status route
app.get('/status', (req, res) => {
  res.status(200).send('Server is running successfully !');
});
app.get('/env', (req, res) => {
  res.json({
    PORT: process.env.PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    // Add other environment variables you want to check
  });
});
// Default route
app.get('/', (req, res) => {
  res.status(200).send(`Server is running. Accessible domain http://localhost:5173, and https://legendarywintersports.com"`);
});


module.exports = app;

