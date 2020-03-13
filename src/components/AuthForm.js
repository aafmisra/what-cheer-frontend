import React from 'react';
import { useLocation } from 'react-router-dom';

// this form gets rendered in both SignIn and SignUp, which pass down the props

function AuthForm({ credentials, handleChange, handleSubmit }) {
  const location = useLocation();

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        name="username"
        value={credentials.username}
        onChange={handleChange}
        id="username"
        type="text"
        required
      ></input>
      <label htmlFor="email">Email:</label>
      <input
        name="email"
        value={credentials.email}
        onChange={handleChange}
        id="email"
        type="email"
        required
      ></input>
      <label htmlFor="password">Password:</label>
      <input
        name="password"
        value={credentials.password}
        onChange={handleChange}
        id="password"
        type="password"
        required
      ></input>
      <button type="submit">
        {location.pathname === '/signin' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
}

export default AuthForm;
