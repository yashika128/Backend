const Todo = require('../../src/models/Todo');
require('../setup');

describe('Todo Model Unit Tests', () => {
  
  describe('Todo Creation', () => {
    it('should create a valid todo', async () => {
      const todoData = {
        title: 'Test Todo',
        description: 'This is a test todo',
        completed: false
      };
      
      const todo = await Todo.create(todoData);
      
      expect(todo.title).toBe(todoData.title);
      expect(todo.description).toBe(todoData.description);
      expect(todo.completed).toBe(false);
      expect(todo._id).toBeDefined();
      expect(todo.createdAt).toBeDefined();
    });
    
    it('should create todo with default values', async () => {
      const todo = await Todo.create({ title: 'Simple Todo' });
      
      expect(todo.title).toBe('Simple Todo');
      expect(todo.completed).toBe(false);
      expect(todo.priority).toBe('medium');
    });
    
    it('should fail to create todo without title', async () => {
      const todoData = { description: 'No title' };
      
      await expect(Todo.create(todoData)).rejects.toThrow();
    });
    
    it('should fail with title less than 3 characters', async () => {
      const todoData = { title: 'Ab' };
      
      await expect(Todo.create(todoData)).rejects.toThrow();
    });
    
    it('should trim whitespace from title', async () => {
      const todo = await Todo.create({ title: '  Trimmed Todo  ' });
      
      expect(todo.title).toBe('Trimmed Todo');
    });
  });
  
  describe('Todo Priority', () => {
    it('should accept valid priority values', async () => {
      const priorities = ['low', 'medium', 'high'];
      
      for (const priority of priorities) {
        const todo = await Todo.create({
          title: `Todo with ${priority} priority`,
          priority
        });
        
        expect(todo.priority).toBe(priority);
      }
    });
    
    it('should reject invalid priority', async () => {
      const todoData = {
        title: 'Invalid Priority',
        priority: 'urgent'
      };
      
      await expect(Todo.create(todoData)).rejects.toThrow();
    });
  });
  
  describe('Todo Instance Methods', () => {
    it('should toggle completion status', async () => {
      const todo = await Todo.create({
        title: 'Toggle Test',
        completed: false
      });
      
      await todo.toggleComplete();
      expect(todo.completed).toBe(true);
      
      await todo.toggleComplete();
      expect(todo.completed).toBe(false);
    });
  });
  
  describe('Todo Static Methods', () => {
    beforeEach(async () => {
      // Create test todos
      await Todo.create([
        { title: 'Incomplete Todo 1', completed: false },
        { title: 'Complete Todo', completed: true },
        { title: 'Incomplete Todo 2', completed: false },
        { title: 'High Priority', priority: 'high' },
        { title: 'Low Priority', priority: 'low' }
      ]);
    });
    
    it('should find incomplete todos', async () => {
      const incomplete = await Todo.findIncomplete();
      
      expect(incomplete.length).toBe(4); // 2 explicitly incomplete + 2 with default
      expect(incomplete.every(todo => !todo.completed)).toBe(true);
    });
    
    it('should find todos by priority', async () => {
      const highPriority = await Todo.findByPriority('high');
      
      expect(highPriority.length).toBe(1);
      expect(highPriority[0].title).toBe('High Priority');
    });
  });
  
  describe('Todo Validation', () => {
    it('should validate title length', async () => {
      const longTitle = 'a'.repeat(101);
      
      await expect(Todo.create({ title: longTitle })).rejects.toThrow();
    });
    
    it('should validate description length', async () => {
      const longDescription = 'a'.repeat(501);
      
      await expect(Todo.create({
        title: 'Valid Title',
        description: longDescription
      })).rejects.toThrow();
    });
    
    it('should accept valid due date', async () => {
      const dueDate = new Date('2024-12-31');
      const todo = await Todo.create({
        title: 'Todo with due date',
        dueDate
      });
      
      expect(todo.dueDate).toEqual(dueDate);
    });
  });
  
  describe('Todo Updates', () => {
    it('should update todo fields', async () => {
      const todo = await Todo.create({
        title: 'Original Title',
        completed: false
      });
      
      todo.title = 'Updated Title';
      todo.completed = true;
      await todo.save();
      
      const updated = await Todo.findById(todo._id);
      expect(updated.title).toBe('Updated Title');
      expect(updated.completed).toBe(true);
    });
  });
  
  describe('Todo Deletion', () => {
    it('should delete a todo', async () => {
      const todo = await Todo.create({ title: 'To be deleted' });
      const id = todo._id;
      
      await Todo.findByIdAndDelete(id);
      
      const deleted = await Todo.findById(id);
      expect(deleted).toBeNull();
    });
  });
});