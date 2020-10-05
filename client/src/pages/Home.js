import React, { useState, useEffect } from 'react';
import ThoughtList from '../components/ThoughtList';
const AWS = require("aws-sdk");

const awsConfig = {
  region: "us-east-2",
  endpoint: "http://localhost:8000"
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB.DocumentClient();

const Home = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts, setThoughts] = useState([]);

  useEffect( ()=> {
    const fetchData = async () => {
      const params = {
        TableName: "Thoughts"
      };
  
      dynamodb.scan(params, (err, data) => {
        if (err) console.log(err, err.stack);  // an error occurred
        else {
          console.log("data", data.Items);
          // setThoughts(state => ({ ...state, data: data.Items }));
          setThoughts(data.Items);
          // console.log("thoughts", thoughts)
        }               // successful response
      })
    }
    fetchData();
  }, [])

 

  // const thoughts = [
  //   {
  //     _id: 1,
  //     thoughtText: 'deep thoughts',
  //     createdAt: Date.now(),
  //     reactionCount: 4,
  //     username: 'Grep' 
  //   },
  //   {
  //     _id: 2,
  //     thoughtText: 'shallow thoughts',
  //     createdAt: Date.now(),
  //     reactionCount: 2,
  //     username: 'Groot' 
  //   }
  // ];

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {isLoaded ? (
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
