const express = require('express');
const morgan = require('morgan');
const config = require('./app/config/config');
const userRoutes = require('./app/routes/user.routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: `Welcome to ${config.appName}`
  });
});

app.use('/api/users', userRoutes);

app.listen(config.port, () => {
  console.log(`${config.appName} is running on port ${config.port} in ${config.nodeEnv} mode`);
});
