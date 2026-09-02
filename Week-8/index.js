// Import express and centralized config using CommonJS require syntax
const express = require('express');
const config = require('./app/config/config');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory users array for practice
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// 1. GET / - Welcome message
app.get('/', (req, res) => {
  res.status(200).json({
    message: `Welcome to ${config.appName}`
  });
});

// 2. GET /users - Fetch all users
app.get('/users', (req, res) => {
  res.status(200).json({
    message: 'Users fetched successfully',
    data: users
  });
});

// 3. POST /users - Create a new user
app.post('/users', (req, res) => {
  const { name } = req.body;

  // Requirement: Validate that name exists
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      message: 'Name is required'
    });
  }

  // Generate new ID
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = {
    id: newId,
    name: name.trim()
  };

  users.push(newUser);

  res.status(201).json({
    message: 'User created successfully',
    data: newUser
  });
});

// 4. PUT /users/:id - Update an existing user's name
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { name } = req.body;

  if (isNaN(userId)) {
    return res.status(400).json({
      message: 'Invalid user ID'
    });
  }

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      message: 'Name is required'
    });
  }

  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      message: 'User not found'
    });
  }

  // Update user name
  users[userIndex].name = name.trim();

  res.status(200).json({
    message: 'User updated successfully',
    data: users[userIndex]
  });
});

// 5. DELETE /users/:id - Delete an existing user
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({
      message: 'Invalid user ID'
    });
  }

  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      message: 'User not found'
    });
  }

  // Delete user from array
  const deletedUser = users.splice(userIndex, 1)[0];

  res.status(200).json({
    message: 'User deleted successfully',
    data: deletedUser
  });
});

// Start the Express server using config port
app.listen(config.port, () => {
  console.log(`${config.appName} is running on port ${config.port} in ${config.nodeEnv} mode`);
});
