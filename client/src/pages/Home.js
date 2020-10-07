import React, { useState, useEffect } from 'react';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';
// import Auth from '../utils/auth';

const AWS = require("aws-sdk");
const awsConfig = {
  region: "us-east-2",
  endpoint: "http://localhost:8000",

};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB.DocumentClient();

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts, setThoughts] = useState([]);

  // const loggedIn = Auth.loggedIn();

  useEffect(() => {
    const fetchData = () => {
      const params = {
        TableName: "Thoughts"
      };
      dynamodb.scan(params, (err, data) => {
        if (err) console.log(err, err.stack);  // an error occurred
        else {
          // sort the array of object by createdAt property
          const orderData = data.Items.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
          setThoughts(orderData);
          setIsLoaded(true);
        }               // successful response
      })
    }
    fetchData();
  }, [thoughts])

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          <ThoughtForm />
        </div>
        <div className={`col-12 mb-3 `}>
          {!isLoaded ? (
            <div>Loading...</div>
          ) : (
              <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
            )}
        </div>
      </div>
    </main>
  );
};

export default Home;
