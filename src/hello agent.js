var http = require('http');


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'}); 
  res.en('Hello World!');
})
.listen(8080);

