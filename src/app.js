const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// hello
const server0 = http.createServer((req, res) => {
  res.statusCode = 20;
  res.end("hi");
});

// hello
const server1 = http.createServer((req, res) => {
  res.statusCode = 20;
  res.end("hi");
});
// hello
const server2 = http.createServer((req, res) => {
  res.statusCode = 20;
  res.end("hi");
});
// hello
const server3 = http.createServer((req, res) => {
  res.statusCode = 20;
  res.end("hi");
});
