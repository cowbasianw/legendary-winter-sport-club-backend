const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const joinRouter = require('./routes/join.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/join', joinRouter);

module.exports = app;