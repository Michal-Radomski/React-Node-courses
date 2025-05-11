const http = require("http");
const express = require("express");
const crypto = require("crypto");

const app = express();

app.get("/", (req, res) => {
  console.log("req.ip:", req.ip);
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", (_err, _derivedKey) => {
    res.send("Hi there!");
  });
});

app.get("/fast", (req, res) => {
  console.log("req.ip:", req.ip);
  res.send("This was fast!");
});

const port = 3000;

const server = http.createServer(app);
server.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
