a/src/app.js b/src/app.js
index 44de9904..7987df67 100644
--- a/src/app.js
+++ b/src/app.js
@@ -3,28 +3,24 @@ const http = require('http');
 const hostname = '127.0.0.1';
 const port = 3000;

-// hello 
-const server = http.createServer((req, res) => {
-  res.statusCode = 20; 
+// hello
+const server0 = http.createServer((req, res) => {
+  res.statusCode = 20;
   res.end("hi");
 });

-server.listen(port, hostname, () => {
-  console.log(`Server running at http://${hostname}:${port}/`);
-});
-
-// hello 
-const server = http.createServer((req, res) => {
-  res.statusCode = 20; 
+// hello
+const server1 = http.createServer((req, res) => {
+  res.statusCode = 20;
   res.end("hi");
 });
-// hello 
-const server = http.createServer((req, res) => {
-  res.statusCode = 20; 
+// hello
+const server2 = http.createServer((req, res) => {
+  res.statusCode = 20;
   res.end("hi");
 });
-// hello 
-const server = http.createServer((req, res) => {
-  res.statusCode = 20; 
+// hello
+const server3 = http.createServer((req, res) => {
+  res.statusCode = 20;
   res.end("hi");
 });