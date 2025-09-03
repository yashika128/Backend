import http from "http";

let todos = [
  { id: 1, task: "Learn HTTP methods" },
  { id: 2, task: "Build REST API with http module" }
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/todos") {
    res.writeHead(200);
    res.end(JSON.stringify(todos));
  } 
  
  else if (req.method === "POST" && req.url === "/todos") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newTodo = { id: todos.length + 1, task: JSON.parse(body).task };
      todos.push(newTodo);
      res.writeHead(201);
      res.end(JSON.stringify(newTodo));
    });
  } 
  
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

//http://localhost:3000/todos(we have to write this on browser in order to see the to do list)