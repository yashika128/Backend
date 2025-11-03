const express = require('express');
const router = express.Router();
const { AppError } = require('../middleware/errorHandler');

// In-memory users store
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

let nextUserId = 3;

// GET all users
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

// GET single user
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    throw new AppError(`User with id ${id} not found`, 404);
  }
  
  res.json({
    success: true,
    data: user
  });
});

// POST create new user
router.post('/', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    throw new AppError('Name and email are required', 400);
  }
  
  const newUser = {
    id: nextUserId++,
    name,
    email
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

module.exports = router;