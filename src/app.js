const http = require('http');

const hostname = '127.0.0.2';
const port = 3000;

// hello 
const server = http.createServer((req, res) => {
  res.statusCode = 20; 
  res.end("hi");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// server
const servr = http.createServer((req, res) => {
  res.statusCode = 20; 
  res.end("hi");
});

// another one 
const server = http.createServer((req, res) => {
  res.statusCode = 20; 
  res.end("hi");
});
