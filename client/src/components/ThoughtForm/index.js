import React, { useState } from 'react';
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000",
  accessKeyId: 'xxxx',
  secretAccessKey: 'xxxx'
});

const docClient = new AWS.DynamoDB.DocumentClient();


const ThoughtForm = () => {
  const [formState, setFormState] = useState({ username: '', text: '' });
  const [characterCount, setCharacterCount] = useState(0);
  const table = "Thoughts";
  // const [errorMessage, setErrorMessage] = useState('');


  // update state based on form input changes
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setFormState({ ...formState, [event.target.name]: event.target.value });
      // setErrorMessage("");
      setCharacterCount(event.target.value.length);
      console.log('Handle Form', formState);
    }
    // else setErrorMessage("Please make an entry the correct length to submit");
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();
    console.log(formState.text, formState.username);
    const params = {
      TableName: table,
      Item: {
        "username": formState.username,
        "createdAt": Date.now(),
        "thought": formState.text
      }
    };
    docClient.put(params, (err, data) => {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    });
    // clear form value
    setFormState({ username: '', text: '' });
    setCharacterCount(0);
    // } catch (e) {
    // console.error(e);
    // }
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
          {/* {error && <span className="ml-2">Something went wrong...</span>} */}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <input
          placeholder="Name"
          name="username"
          value={formState.username}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></input>
        <textarea
          placeholder="Here's a new thought..."
          name="text"
          value={formState.text}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        {/* {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )} */}
        <button className="btn col-12 col-md-3" type="submit">
          Submit
          </button>
      </form>
    </div>
  );
};

export default ThoughtForm;
