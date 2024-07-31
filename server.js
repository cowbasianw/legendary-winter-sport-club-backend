require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5001;

// Default route for undefined routes
app.use((req, res, next) => {
    res.status(404).send('Resource not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
    console.log("Email User:", process.env.EMAIL_USER);
    console.log("Email Pass:", process.env.EMAIL_PASS);

});