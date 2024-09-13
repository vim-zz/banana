a/src/app.js b/src/app.js
index 44de9904..2c1abd78 100644
--- a/src/app.js
+++ b/src/app.js
@@ -3,28 +3,10 @@ const http = require('http');
 const hostname = '127.0.0.1';
 const port = 3000;

-// hello 
-const server = http.createServer((req, res) => {
-  res.statusCode = 20; 
+// hello
+const server1 = http.createServer((req, res) => {
+  res.statusCode = 20;
   res.end("hi");
 });

-server.listen(port, hostname, () => {
+server1.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
 });