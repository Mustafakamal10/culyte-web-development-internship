// Import express and dotenv using CommonJS require syntax
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Set PORT from environment variables or fallback to 5000
const PORT = process.env.PORT || 5000;

// GET route for root path
app.get('/', (req, res) => {
  res.send('Hello from Node.js and Express!');
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
