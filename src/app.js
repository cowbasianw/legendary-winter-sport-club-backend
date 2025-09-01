const express = require('express');
const bodyParser = require('body-parser');
const joinRouter = require('./routes/join.js');
const waiverRouter = require('./routes/waiver.js');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// Configure CORS in app if not already set
const corsOptions = {
  origin: ['https://legendarywintersports.com', 'https://www.legendarywintersports.com', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.use(bodyParser.json());
app.use('/api/join', joinRouter);
app.use('/api/waiver', waiverRouter);


// MySQL connection pool setup
const dbPool = mysql.createPool({
  connectionLimit: 10, // Number of connections in the pool
  host: 'srv1533.hstgr.io', // or use '82.197.82.40'
  user: 'u666730114_cowbasianw',
  password: 'Warhammer40k@@',
  database: 'u666730114_legendaryDB',
  // Optional: Adjust timeout settings if needed
  connectTimeout: 10000, // 10 seconds timeout for connecting
  acquireTimeout: 10000, // 10 seconds timeout for acquiring connection from pool
  waitForConnections: true, // Queue requests when no connection is available
});

// Function to get a connection from the pool and handle errors
function handleDisconnect() {
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool:', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reconnecting to MySQL due to connection loss...');
        setTimeout(handleDisconnect, 2000); // Retry after 2 seconds
      } else {
        console.error('Error connecting to MySQL:', err);
        setTimeout(handleDisconnect, 2000); // Retry for other connection errors
      }
    } else {
      console.log('MySQL Connected!');
      connection.release(); // Release connection back to the pool
    }
  });
}

// Handle MySQL errors globally
dbPool.on('error', (err) => {
  console.error('MySQL Pool Error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
    console.log('Reconnecting to MySQL due to connection reset...');
    handleDisconnect(); // Attempt to reconnect
  } else {
    throw err; // For unknown errors, crash the process
  }
});

// Initial call to connect to MySQL
handleDisconnect();


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

// Route to fetch galleryPhotos
app.get('/galleryPhotos', (req, res) => {
  console.log('Received a request for gallery photos');

  const query = 'SELECT coach, semster, image_url FROM galleryPhotos';

  dbPool.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
    } else {
      // Transform coach name and semester to URL-friendly format
      const photos = results.map(photo => {
        const formattedCoach = photo.coach.replace(/\s+/g, '_');  // Replace spaces with underscores in coach's name
        const formattedSemester = photo.semster.replace(/\s+/g, '_');  // Replace spaces with underscores in semester
        const imageUrl = `https://legendarywintersports.com/images/${formattedCoach}/${formattedSemester}/${photo.image_url}`;

        return {
          ...photo,
          image_url: imageUrl,  // Include the new formatted URL
        };
      });
      res.json(photos);
    }
  });
});

module.exports = app;

