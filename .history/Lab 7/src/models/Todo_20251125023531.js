const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Instance method to toggle completion status
todoSchema.methods.toggleComplete = function() {
  this.completed = !this.completed;
  return this.save();
};

// Static method to find incomplete todos
todoSchema.statics.findIncomplete = function() {
  return this.find({ completed: false });
};

// Static method to find by priority
todoSchema.statics.findByPriority = function(priority) {
  return this.find({ priority });
};

module.exports = mongoose.model('Todo', todoSchema);