const express = require("express");

const server = express();

server.get("/hello", (request, response) => {
  response.json({
    message: "Hello World"
  });
});

server.listen(3000);
