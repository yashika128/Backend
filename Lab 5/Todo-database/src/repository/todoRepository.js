const Todo = require("../model/Todo");

class TodoRepository {
  async getAll() {
    return await Todo.find();
  }

  async getById(id) {
    return await Todo.findById(id);
  }

  async create(todoData) {
    const todo = new Todo(todoData);
    return await todo.save();
  }

  async update(id, todoData) {
    return await Todo.findByIdAndUpdate(id, todoData, { new: true });
  }

  async delete(id) {
    return await Todo.findByIdAndDelete(id);
  }

  // ✅ Pagination example: skip and limit
  async getPaginated(page = 1, limit = 3) {
    const skip = (page - 1) * limit;
    return await Todo.find().skip(skip).limit(limit);
  }
}

module.exports = new TodoRepository();
