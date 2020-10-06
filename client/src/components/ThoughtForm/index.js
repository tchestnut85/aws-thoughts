import React, { useState } from 'react';
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000",
  accessKeyId: 'xxxx',
  secretAccessKey: 'xxxx'
});

var docClient = new AWS.DynamoDB.DocumentClient()

const ThoughtForm = () => {
  const [formState, setFormState] = useState({ username: '', text: '' });
  const [characterCount, setCharacterCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');


  // update state based on form input changes
  const handleChange = event => {
    if (!e.target.value.length && event.target.value.length <= 280) {
      setFormState({ ...formState, [e.target.name]: e.target.value });
      setErrorMessage("");
      console.log('Handle Form', formState);
    }
    else setErrorMessage("Please make an entry the correct length to submit")
  }
};

// submit form
const handleFormSubmit = async event => {
  event.preventDefault();
  console.log(formState.text, formState.username);
  // try {


  // clear form value
  setFormState('');
  setCharacterCount(0);
  // } catch (e) {
  console.error(e);
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
        placeholder="username"
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
      <button className="btn col-12 col-md-3" type="submit">
        Submit
        </button>
    </form>
  </div>
);
};

export default ThoughtForm;
