const request = require('supertest');
const app = require('../../src/app');
const Todo = require('../../src/models/Todo');
require('../setup');

describe('Todo API Integration Tests', () => {
  
  describe('GET /api/todos', () => {
    it('should return empty array when no todos exist', async () => {
      const response = await request(app).get('/api/todos');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.count).toBe(0);
    });
    
    it('should return all todos', async () => {
      await Todo.create([
        { title: 'First Todo' },
        { title: 'Second Todo' }
      ]);
      
      const response = await request(app).get('/api/todos');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(2);
      expect(response.body.data.length).toBe(2);
    });
  });
  
  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const todoData = {
        title: 'New Todo',
        description: 'Test description',
        completed: false,
        priority: 'high'
      };
      
      const response = await request(app)
        .post('/api/todos')
        .send(todoData);
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(todoData.title);
      expect(response.body.data.description).toBe(todoData.description);
      expect(response.body.data.priority).toBe(todoData.priority);
      expect(response.body.data._id).toBeDefined();
    });
    
    it('should create todo with minimal data', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ title: 'Minimal Todo' });
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Minimal Todo');
      expect(response.body.data.completed).toBe(false);
    });
    
    it('should fail without title', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ description: 'No title' });
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
    
    it('should fail with invalid priority', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({
          title: 'Invalid Priority Todo',
          priority: 'urgent'
        });
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
    
    it('should fail with short title', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ title: 'Ab' });
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
  
  describe('GET /api/todos/:id', () => {
    it('should return a specific todo', async () => {
      const todo = await Todo.create({
        title: 'Specific Todo',
        description: 'Test'
      });
      
      const response = await request(app).get(`/api/todos/${todo._id}`);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Specific Todo');
    });
    
    it('should return 404 for non-existent todo', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app).get(`/api/todos/${fakeId}`);
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
    
    it('should handle invalid ID format', async () => {
      const response = await request(app).get('/api/todos/invalid-id');
      
      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });
  
  describe('PUT /api/todos/:id', () => {
    it('should update a todo', async () => {
      const todo = await Todo.create({
        title: 'Original Title',
        completed: false
      });
      
      const updates = {
        title: 'Updated Title',
        completed: true,
        priority: 'high'
      };
      
      const response = await request(app)
        .put(`/api/todos/${todo._id}`)
        .send(updates);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updates.title);
      expect(response.body.data.completed).toBe(true);
      expect(response.body.data.priority).toBe('high');
    });
    
    it('should update partial fields', async () => {
      const todo = await Todo.create({
        title: 'Original Title',
        description: 'Original Description'
      });
      
      const response = await request(app)
        .put(`/api/todos/${todo._id}`)
        .send({ completed: true });
      
      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe('Original Title');
      expect(response.body.data.completed).toBe(true);
    });
    
    it('should return 404 for non-existent todo', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .put(`/api/todos/${fakeId}`)
        .send({ title: 'Updated' });
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
    
    it('should validate on update', async () => {
      const todo = await Todo.create({ title: 'Valid Todo' });
      
      const response = await request(app)
        .put(`/api/todos/${todo._id}`)
        .send({ title: 'AB' }); // Too short
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
  
  describe('DELETE /api/todos/:id', () => {
    it('should delete a todo', async () => {
      const todo = await Todo.create({ title: 'To be deleted' });
      
      const response = await request(app).delete(`/api/todos/${todo._id}`);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      
      const deleted = await Todo.findById(todo._id);
      expect(deleted).toBeNull();
    });
    
    it('should return 404 for non-existent todo', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app).delete(`/api/todos/${fakeId}`);
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
  
  describe('GET /api/todos/incomplete', () => {
    it('should return only incomplete todos', async () => {
      await Todo.create([
        { title: 'Todo 1', completed: false },
        { title: 'Todo 2', completed: true },
        { title: 'Todo 3', completed: false }
      ]);
      
      const response = await request(app).get('/api/todos/incomplete');
      
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(2);
      expect(response.body.data.every(t => !t.completed)).toBe(true);
    });
  });
  
  describe('Root Route', () => {
    it('should return API information', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('To-Do List API');
    });
  });
  
  describe('Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/api/unknown');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
  
  describe('End-to-End Workflow', () => {
    it('should handle complete CRUD workflow', async () => {
      // Create
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'E2E Test Todo', priority: 'high' });
      
      expect(createRes.status).toBe(201);
      const todoId = createRes.body.data._id;
      
      // Read
      const readRes = await request(app).get(`/api/todos/${todoId}`);
      expect(readRes.status).toBe(200);
      expect(readRes.body.data.title).toBe('E2E Test Todo');
      
      // Update
      const updateRes = await request(app)
        .put(`/api/todos/${todoId}`)
        .send({ completed: true, priority: 'low' });
      
      expect(updateRes.status).toBe(200);
      expect(updateRes.body.data.completed).toBe(true);
      expect(updateRes.body.data.priority).toBe('low');
      
      // Delete
      const deleteRes = await request(app).delete(`/api/todos/${todoId}`);
      expect(deleteRes.status).toBe(200);
      
      // Verify deletion
      const verifyRes = await request(app).get(`/api/todos/${todoId}`);
      expect(verifyRes.status).toBe(404);
    });
  });
});