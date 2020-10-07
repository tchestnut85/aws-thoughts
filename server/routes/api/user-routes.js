const AWS = require('aws-sdk');
const router = require('express').Router();  // get an instance of the express Router
const config = require('../../config/config.js');


router.get('/', (req, res, next) => {
  res.send("Hello World");
})





// module.exports = router => {
//Routed to GET /api/users
// router.get('/', (req, res, next) => {
//   AWS.config.update({
//     region: config.region,
//     endpoint: config.endpoint
//   });

//   const docClient = new AWS.DynamoDB.DocumentClient();

//   var params = {
//     TableName: config.aws_dynamodb_table
//   };

//   docClient.scan(params, (err, data) => {
//     if (err) {
//       console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//       console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//       res.json("data.Items");
//     }
//   });
// });

router.post('/user', (req, res, next) => {
  console.log(req.body);

  AWS.config.update({
    region: config.region,
    endpoint: config.endpoint
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: config.aws_dynamodb_table,
    Item: counter
  };

  docClient.put(params, function (err, data) {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
});

router.delete('/api/counters/:id', function (req, res, next) {
  const id = parseInt(req.params.id);

  AWS.config.update({
    region: config.region,
    endpoint: config.endpoint
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: config.aws_dynamodb_table,
    Key: {
      'id': id
    }
  };

  docClient.delete(params, function (err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("delete succeeded:", JSON.stringify(data, null, 2));
    }
  });
});

router.put('/api/counters/:id/increment', (req, res, next) => {
  const id = parseInt(req.params.id);

  AWS.config.update({
    region: config.region,
    endpoint: config.endpoint
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: config.aws_dynamodb_table,
    Key: {
      'id': id
    },
    UpdateExpression: "set countVal = :c + countVal",
    ExpressionAttributeValues: {
      ':c': 1
    },
    ReturnValues: "UPDATED_NEW"
  };

  docClient.update(params, function (err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("update succeeded:", JSON.stringify(data, null, 2));
    }
  });

  // More info: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html
});
//   };

module.exports = router;