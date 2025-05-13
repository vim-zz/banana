a/src/agent/api.js b/src/agent/api.js
index 2b22260b..1abaa8a8 100644
--- a/src/agent/api.js
+++ b/src/agent/api.js
@@ -1,3 +1,15 @@
// new api service handler
// change API signature

+const AWS = require('aws-sdk');
+const apiGateway = new AWS.APIGateway();
+
+async function callAWSApi(params) {
+    try {
+        const response = await apiGateway.invoke(params).promise();
+        return response;
+    } catch (error) {
+        console.error('Error calling AWS API:', error);
+        throw error;
+    }
+}