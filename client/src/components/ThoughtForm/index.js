import React, { useState } from 'react';

const ThoughtForm = () => {
  const [formState, setFormState] = useState({ username: '', text: '' });
  const [characterCount, setCharacterCount] = useState(0);

  // update state based on form input changes
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setFormState({ ...formState, [event.target.name]: event.target.value });
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    // clear form value
    setFormState({ username: '', text: '' });
    setCharacterCount(0);
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
        <button className="btn col-12 col-md-3" type="submit">
          Submit
          </button>
      </form>
    </div>
  );
};

export default ThoughtForm;
