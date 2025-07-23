const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// hello 
const server = http.createServer((req, res) => {
  res.statusCode = 20; 
  res.end("hi");
});

server.listen(port, hostname, () => {
  res.end("hi");
});

// another one 
const server = http.createServer((req, res) => {
  res.statusCode = 20; 
  res.end("hi");
});
