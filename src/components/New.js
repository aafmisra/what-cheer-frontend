import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { APIURL } from '../config';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import Form from './Form';
import axios from 'axios';

function New() {
  const { user } = useContext(UserContext);
  const [prompt, setPrompt] = useState(null);
  const initialState = {
    owner: '',
    date: new Date().toISOString().substring(0,10),
    entry: ''
  };
  const [entry, setEntry] = useState(initialState);
  const [createdId, setCreatedId] = useState(null);
  const [error, setError] = useState(false);
  const [promptError, setPromptError] = useState(false);

  const handleChange = function(event) {
    event.persist();
    const { name, value } = event.target;

    setEntry({ ...entry, [name]: value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target)
    const url = `${APIURL}/entries/`;
    axios({
      url,
      method: 'POST',
      contentType: false,
      processData: false,
      headers: {
        'Authorization': `JWT ${user.token}`,
        'Content-Type':'multipart/form-data'
      },
      data: formData
    })
      .then(data => {
        setCreatedId(data.id);
      })
      .catch(() => {
        setError(true);
      });
  }

  function getPrompt() {
    let id = Math.floor(Math.random() * 11 + 1);
    const url = `${APIURL}/prompts/${id}/`;
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${user.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setPrompt(data.prompt);
      })
      .catch(() => {
        setPromptError(true);
      });
  }

  //if id was created successfully, redirect user back to homepage
  if (createdId) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            id: createdId
          }
        }}
      />
    );
  }

  if (promptError) {
    return <div>Oops, we're fresh out of ideas!</div>;
  }

  //returns error message if entry wasn't created
  if (error) {
    return <div>Oops, there was a problem adding the journal entry.</div>;
  }

  if (prompt) {
    return (
      <div>
        <Form
          entry={entry}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <p>{prompt}</p>
        <button onClick={getPrompt}>Click For An Idea</button>
        <Link to="/" className="button">
          Cancel
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Form
        entry={entry}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <button onClick={getPrompt}>Click For An Idea</button>
      <Link to="/" className="button">
        Cancel
      </Link>
    </div>
  );
}

export default New;
