const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk");
const awsConfig = {
  region: "us-east-2",
  endpoint: "http://localhost:8000",
  accessKeyId: "xxxxx",
  accessSecretKey: "xxxxxx"
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = "Thoughts";

// get all users' thoughts
router.get('/users', (req, res) => {
  const params = {
    TableName: table
  };
  dynamodb.scan(params, (err, data) => {
    if (err) console.log(err, err.stack);  // an error occurred
    else {
      console.log(data.Items)
      res.json(data.Items)
    }
  });
})

// get thoughts from a user
router.get('/users/:username', (req, res) => {
  console.log(`Querying for thought(s) from ${req.params.username}.`);
  const params = {
    TableName: table,
    ProjectionExpression: "#th, #ca",
    KeyConditionExpression: "#un = :user",
    ExpressionAttributeNames: {
      "#un": "username",
      "#ca": "createdAt",
      "#th": "thought"
    },
    ExpressionAttributeValues: {
      ":user": req.params.username
    }
  };

  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log("Query succeeded.");
      res.json(data.Items)
    }
  });
});

// Create new user
router.post('/users', (req, res) => {
  const params = {
    TableName: table,
    Item: {
      "username": req.body.username,
      "createdAt": Date.now(),
      "thought": req.body.thought
    }
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      res.json({"made": JSON.stringify(data, null, 2)});
    }
  });
});
// // Create new user
// router.get('/create', (req, res) => {
//   const params = {
//     TableName: table,
//     Item: {
//       "username": "Carol Dweck",
//       "createdAt": 1602018401105,
//       "thought": "You can suffer the pain of change or suffer remaining the way you are."
//     }
//   };
//   // const params = {
//   //   TableName: table,
//   //   Item: {
//   //     "username": req.body.username,
//   //     "createdAt": Date.now(),
//   //     "thought": req.body.text
//   //   }
//   // };
//   dynamodb.put(params, (err, data) => {
//     if (err) {
//       console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//       console.log("Added item:", JSON.stringify(data, null, 2));
//     }
//   });
// });

// // Destroy
// router.delete('/users/:time', (req, res) => {
//   const {time} = req.params;
//   res.json({ "time": time  })
// });

// // update
// router.put('/users/:username', (req, res) => {
//   res.json({ "which": "which" })
// });

module.exports = router;
