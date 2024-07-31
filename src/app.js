const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const joinRouter = require('./routes/join.js');

const app = express();
const PORT = process.env.PORT || 5001; // Make sure PORT is defined here

// Configure CORS
app.use(cors({
  origin: 'https://legendarywintersports.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors({
  origin: 'https://legendarywintersports.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(bodyParser.json());
app.use('/api/join', joinRouter);

// Status route
app.get('/status', (req, res) => {
  res.status(200).send('Server is running successfully!');
});

// Default route
app.get('/', (req, res) => {
  res.status(200).send(`Server is running on port ${PORT}. Email User: ${process.env.EMAIL_USER}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
  console.log("Email User:", process.env.EMAIL_USER);
});

module.exports = app;
