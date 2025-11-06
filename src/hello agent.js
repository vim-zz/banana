var http = require('http');
var axiom = require('axiom');


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
})
.listen(8080);
