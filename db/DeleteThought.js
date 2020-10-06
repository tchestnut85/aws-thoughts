const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "Users";

const username = "Kip.Buckridge";
const email = "Kip.Buckridge@email.com";

const params = {
  TableName: table,
  Key: {
    "username": username,
    "email": email
  },
  ConditionExpression: "thoughts = :t",
  ExpressionAttributeValues: {
    ":t": "Orci phasellus egestas tellus rutrum tellus pellentesque."
  }
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function (err, data) {
  if (err) {
    console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
  }
});