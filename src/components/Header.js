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
          alt="what cheer logo"
          className="logoImg"
        />
        <Link to="/">
          <h1>What Cheer!</h1>
        </Link>
      </div>
      {/* show different buttons based on whether or not we have a user logged in */}
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
