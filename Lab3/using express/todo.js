import express from "express";

const app = express();
app.use(express.json());

let todos = [
  { id: 1, task: "Learn HTTP methods" },
  { id: 2, task: "Build first REST API" }
];

// GET - fetch all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST - add a new todo
app.post("/todos", (req, res) => {
  const newTodo = { id: todos.length + 1, task: req.body.task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});


// DELETE - remove a todo
app.delete("/todos/:id", (req, res) => {
  const {id} = req.params;
  todos = todos.filter(t => t.id !== id);
  res.json({ message: "Todo deleted" });
});

app.listen(8000, () => console.log("Server running on http://localhost:8000"));

//http://localhost:8000/todos