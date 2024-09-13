a/src/hello agent.js b/src/hello agent.js
index dd0d4fe9..fc85b860 100644
--- a/src/hello agent.js
+++ b/src/hello agent.js
@@ -2,8 +2,7 @@ var http = require('http');
 
 
 http.createServer(function (req, res) {
-  res.writeHead(200, {'Content-Type': 'text/plain'});
-  res.end('Hello World!');
+  res.writeHead(200, {'Content-Type': 'text/plain'});
+  res.end('Hello World! This is the agent speaking.');
 })
 .listen(8080);
-