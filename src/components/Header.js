import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="header">
      <div className="logo">
        <img
          src={process.env.PUBLIC_URL + '/logo.svg'}
          alt="bookbear logo"
          className="logo"
        />
        <Link to="/">
          <h1>What Cheer!</h1>
        </Link>
      </div>
      {user && (
        <nav>
          <span>{`hello, ${user.user.username}!`}</span>
          <button onClick={() => setUser(null)}>Sign Out</button>
        </nav>
      )}
      {!user && (
        <nav>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      )}
    </div>
  );
}

export default Header;
