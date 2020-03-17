const express = require("express");

const server = express();

// Query params = /users/?name="Douglas Brandão"
// Route params = /users/1
// Request body = body das requisições HTTP (POST e PUT)

server.get("/users/:id", (request, response) => {
  const { name } = request.query;
  const { id } = request.params;

  response.json({
    id,
    name
  });
});

server.listen(3000);
