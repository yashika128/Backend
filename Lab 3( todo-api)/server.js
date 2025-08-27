// server.js
const http = require('http');
const express = require('express');
const todoRoutes = require('./routes/todoRoutes');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json()); 

// Custom logging middleware
app.use(logger);

// Home route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to the Creative To-Do API! 🎯 Manage your tasks like a pro!');
});

// Use routes
app.use('/api/todos', todoRoutes);

// Create server
const server = http.createServer(app);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
