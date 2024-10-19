require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = require('./src/app'); // Import app

const PORT = process.env.PORT || 5001;

// Configure CORS to allow both production and local development
const corsOptions = {
  origin: ['https://legendarywintersports.com', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
  console.log(`http://localhost:${PORT}/galleryPhotos`);
  console.log("Email User:", process.env.EMAIL_USER);
});
