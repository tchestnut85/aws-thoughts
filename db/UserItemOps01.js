const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "Users";

const username = "Rupal0ps1";
const email = "Rupal@email.com";
const thoughts = [
    "Sagittis orci a scelerisque purus semper eget duis at tellus." 
]


const params = {
    TableName:table,
    Item:{
        "username": username,
        "email": email,
        "thoughts": thoughts
    }
};

console.log("Adding a new item...");
docClient.put(params, (err, data) => {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
