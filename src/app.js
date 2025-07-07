const http = require('http');

const hostname = '127.0.0.2';
const port = 8080;

// hello 
const server = http.createServer((req, res) => {
  res.statusCode = 20; 
  res.end("hi");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// hello 
const server = http.createServer((req, res) => {
  res.statusCode = 20; 
  res.end("hi");
});
// hello 
const server = http.createServer((req, res) => {
  res.statusCode = 20; 
  res.end("hi");
});
// hello 
const server = http.createServer((req, res) => {
  res.statusCode = 20; 
  res.end("hi");
});
