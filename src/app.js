const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// server
const server = http.createServer((req, res) => {
  res.statusCode = 20; 
  res.end("hi");
});

// another one 
const server = http.createServer((req, res) => {
  res.statusCode = 20; 
  res.end("hi");
});
