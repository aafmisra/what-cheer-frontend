import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';
import { APIURL } from '../config';

function Signup() {
  const initialState = {
    username: '',
    email: '',
    password: ''
  };
  const url = `${APIURL}/users/`;
  const [credentials, setCredentials] = useState(initialState);
  const [redirect, setRedirect] = useState(null);
  const [error, setError] = useState(false);
  const handleChange = event => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then(setRedirect)
      .catch(setError);
  };
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: '/signin',
          state: credentials
        }}
      />
    );
  }
  return (
    <div>
      <h3>Sign Up for What Cheer</h3>
      {error && (
        <h4 onClick={setError(false)}>
          Oops, something went wrong. Please try again!
        </h4>
      )}
      <AuthForm
        credentials={credentials}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Signup;
