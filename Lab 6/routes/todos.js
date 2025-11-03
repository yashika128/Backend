const express = require('express');
const router = express.Router();
const { AppError } = require('../middleware/errorHandler');

// In-memory data store
let todos = [
  { id: 1, title: 'Learn Express.js', completed: false, userId: 1 },
  { id: 2, title: 'Build REST API', completed: false, userId: 1 },
  { id: 3, title: 'Deploy Application', completed: false, userId: 2 }
];

let nextId = 4;

// Middleware to validate todo data
const validateTodo = (req, res, next) => {
  const { title } = req.body;
  
  if (!title || title.trim() === '') {
    throw new AppError('Title is required and cannot be empty', 400);
  }
  
  next();
};

// GET all todos
router.get('/', (req, res) => {
  const { completed, userId } = req.query;
  
  let filteredTodos = [...todos];
  
  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    filteredTodos = filteredTodos.filter(todo => todo.completed === isCompleted);
  }
  
  if (userId) {
    filteredTodos = filteredTodos.filter(todo => todo.userId === parseInt(userId));
  }
  
  res.json({
    success: true,
    count: filteredTodos.length,
    data: filteredTodos
  });
});

// GET single todo by ID (dynamic route)
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    throw new AppError(`Todo with id ${id} not found`, 404);
  }
  
  res.json({
    success: true,
    data: todo
  });
});

// POST create new todo
router.post('/', validateTodo, (req, res) => {
  const { title, userId = 1 } = req.body;
  
  const newTodo = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    userId: parseInt(userId)
  };
  
  todos.push(newTodo);
  
  res.status(201).json({
    success: true,
    message: 'Todo created successfully',
    data: newTodo
  });
});

// PUT update todo
router.put('/:id', validateTodo, (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    throw new AppError(`Todo with id ${id} not found`, 404);
  }
  
  const { title, completed } = req.body;
  
  todos[todoIndex] = {
    ...todos[todoIndex],
    title: title.trim(),
    completed: completed !== undefined ? completed : todos[todoIndex].completed
  };
  
  res.json({
    success: true,
    message: 'Todo updated successfully',
    data: todos[todoIndex]
  });
});

// PATCH toggle todo completion
router.patch('/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    throw new AppError(`Todo with id ${id} not found`, 404);
  }
  
  todo.completed = !todo.completed;
  
  res.json({
    success: true,
    message: 'Todo toggled successfully',
    data: todo
  });
});

// DELETE todo
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    throw new AppError(`Todo with id ${id} not found`, 404);
  }
  
  const deletedTodo = todos.splice(todoIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Todo deleted successfully',
    data: deletedTodo
  });
});

// Nested route: GET todos by user ID
router.get('/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userTodos = todos.filter(t => t.userId === userId);
  
  res.json({
    success: true,
    userId: userId,
    count: userTodos.length,
    data: userTodos
  });
});

module.exports = router;