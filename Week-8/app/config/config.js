// Import dotenv to load environment variables from .env file
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Centralized configuration object with fallbacks
const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME || 'Week-8 REST API'
};

// Export configuration using CommonJS module.exports
module.exports = config;
