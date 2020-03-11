import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import { APIURL } from '../config';
import { Link } from 'react-router-dom';
import Entries from './Entries';

function Home() {
  const { user } = useContext(UserContext);
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user) {
      const url = `${APIURL}/entries/`;
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `JWT ${user.token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setEntries(data.reverse());
        })
        .catch(() => {
          setError(true);
        });
    } else {
      setEntries([]);
    }
  }, [user]);

  if (!user) {
    return (
      <div>
        <h2>Welcome to your digital daily gratitude journal.</h2>
        <p>
          <Link to="/signin">Sign In</Link> or <Link to="/signup">Sign Up</Link>{' '}
          for a free account to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="journal">
      {error && (
        <div>Sorry, there was an error getting the journal entries!</div>
      )}
      {!error && !entries.length ? (
        <>
          <h1>You don't have any journal entries yet</h1>
          <Link to="/new">
            <p>Add one!</p>
          </Link>
        </>
      ) : (
        <Entries entries={entries} />
      )}
    </div>
  );
}

export default Home;
