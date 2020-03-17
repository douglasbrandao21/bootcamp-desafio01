const express = require("express");

const server = express();
server.use(express.json());

// Global Middleware
server.use((request, response, next) => {
  console.time("Request");
  console.log(`Method: ${request.method};\nRoute: ${request.url};`);
  console.timeEnd("Request");

  return next();
});

// Local Middleware
const checkRequestBody = (request, response, next) => {
  const { name } = request.body;

  if (!name)
    return response.status(400).json({
      error: "Name is required"
    });

  return next();
};

// Middleware that add data in the request
const checkUserExists = (request, response, next) => {
  const { id } = request.params;

  const user = users[id];

  if (!user)
    return response.status(404).json({
      error: "User does not exists"
    });

  request.user = user;

  return next();
};

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
server.get("/users/:id", checkUserExists, (request, response) => {
  return response.json(request.user);
});

// Store
server.post("/users", checkRequestBody, (request, response) => {
  const { name } = request.body;

  users.push({
    id: users.length + 1,
    name
  });

  return response.json(users);
});

// Update
server.put(
  "/users/:id",
  checkRequestBody,
  checkUserExists,
  (request, response) => {
    const { id } = request.params;

    const { name } = request.body;

    users[id].name = name;

    return response.json(users[id]);
  }
);

// Destroy
server.delete("/users/:id", checkUserExists, (request, response) => {
  const { id } = request.params;

  users.splice(id, 1);

  return response.json({ message: "User deleted" });
});

server.listen(3000);
