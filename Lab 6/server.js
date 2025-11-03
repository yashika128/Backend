const express = require('express');
const logger = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const todosRouter = require('./routes/todos');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware
app.use(logger);

// Home route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to To-Do List API',
    endpoints: {
      todos: '/api/todos',
      users: '/api/users'
    }
  });
});

// API routes with prefix
app.use('/api/todos', todosRouter);
app.use('/api/users', usersRouter);

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.originalUrl} not found`,
      statusCode: 404
    }
  });
});

// Custom error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   GET    http://localhost:${PORT}/api/todos`);
  console.log(`   GET    http://localhost:${PORT}/api/todos/:id`);
  console.log(`   POST   http://localhost:${PORT}/api/todos`);
  console.log(`   PUT    http://localhost:${PORT}/api/todos/:id`);
  console.log(`   PATCH  http://localhost:${PORT}/api/todos/:id/toggle`);
  console.log(`   DELETE http://localhost:${PORT}/api/todos/:id`);
  console.log(`   GET    http://localhost:${PORT}/api/users\n`);
});