import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';
import { UserContext } from '../UserContext';
import { APIURL } from '../config';

function SignIn(props) {
  const { user, setUser } = useContext(UserContext || null);
  const { state: historyState } = props.history.location;
  const initialState = {
    name: historyState ? historyState.name : '',
    email: historyState ? historyState.email : '',
    password: historyState ? historyState.password : ''
  };
  const url = `${APIURL}/token-auth/`;
  const [credentials, setCredentials] = useState(initialState);
  const [error, setError] = useState(false);

  //update state based on user input
  const handleChange = event => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  // POST credentials to api to get back a token
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
      .then(setUser)
      .catch(setError);
  };
  // sends user to homepage once logged in
  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h3>Sign In</h3>
      {historyState && (
        <h4>We're grateful that you signed up today! Please sign in.</h4>
      )}
      {error && (
        <h4 onClick={() => setError(false)}>
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
export default SignIn;
