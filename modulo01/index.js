const express = require("express");

const server = express();
server.use(express.json());

const users = [
  {
    id: "0",
    name: "Douglas Brandão"
  },
  {
    id: "1",
    name: "Douglas Canevarollo"
  },
  {
    id: "2",
    name: "Douglas Honda"
  }
];

// Query params = /users/?name="Douglas Brandão"
// Route params = /users/1
// Request body = body das requisições HTTP (POST e PUT)

// Index
server.get("/users", (request, response) => {
  return response.json(users);
});

// Show
server.get("/users/:id", (request, response) => {
  const { id } = request.params;

  return response.json(users[id]);
});

// Store
server.post("/users", (request, response) => {
  const { name } = request.body;

  users.push({
    id: users.length + 1,
    name
  });

  return response.json(users);
});

// Update
server.put("/users/:id", (request, response) => {
  const { id } = request.params;

  const { name } = request.body;

  users[id].name = name;

  return response.json(users[id]);
});

// Destroy
server.delete("/users/:id", (request, response) => {
  const { id } = request.params;

  users.splice(id, 1);

  return response.json({ message: "User deleted" });
});

server.listen(3000);
