// new api service handler
// chane API signature

const AWS = require('aws-sdk');
const apiGateway = new AWS.APIGateway();

async function callAWSApi(params) {
    try {
        const response = await apiGateway.invoke(params).promise();
        return response;
    } catch (error) {
        console.error('Error calling AWS API:', error);
        throw error;
    }
}
