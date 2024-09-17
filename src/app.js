a/src/app.js b/src/app.js
index 44de9904..b5d79bb9 100644
--- a/src/app.js
+++ b/src/app.js
@@ -3,28 +3,12 @@ const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

-// hello 
+// hello
const server = http.createServer((req, res) => {
  res.statusCode = 20; 
  res.end("hi");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

-// hello 
-const server = http.createServer((req, res) => {
-  res.statusCode = 20; 
-  res.end("hi");
-});
-// hello 
-const server = http.createServer((req, res) => {
-  res.statusCode = 20; 
-  res.end("hi");
-});
-// hello 
-const server = http.createServer((req, res) => {
-  res.statusCode = 20; 
-  res.end("hi");
-});