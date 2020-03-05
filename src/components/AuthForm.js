import React from 'react';
import { useLocation } from 'react-router-dom';

function AuthForm({ credentials, handleChange, handleSubmit }) {
  const location = useLocation();

  return (
    <form onSubmit={handleSubmit}>
      {location.pathname === '/signup' && (
        <>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            value={credentials.name}
            onChange={handleChange}
            id="name"
            type="text"
            required
          ></input>
        </>
      )}
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
