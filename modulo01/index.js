const express = require("express");

const server = express();

// Query params = /users/?name="Douglas Brandão"
// Route params = /users/1
// Request body = body das requisições HTTP (POST e PUT)

const users = [
  {
    id: "1",
    name: "Douglas Brandão"
  },
  {
    id: "2",
    name: "Douglas Canevarollo"
  },
  {
    id: "3",
    name: "Douglas Honda"
  }
];

server.get("/users/:id", (request, response) => {
  const { id } = request.params;

  response.json(users[id]);
});

server.listen(3000);
