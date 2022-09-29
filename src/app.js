const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  console.log("ok")



  const txt = "hello";
  const reg = /hello/;
  const x = `${txt} is ${typeof txt} ${reg} is ${typeof reg}`;
  console.log(x);
  res.end("hi");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});