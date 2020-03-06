import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import { APIURL } from '../config';
import { Link } from 'react-router-dom';

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
        <h1>Welcome to What Cheer!</h1>
        <p>
          <Link to="/signin">Login</Link> or <Link to="/signup">Sign Up</Link>{' '}
          for a free account to get started.
        </p>
      </div>
    );
  }
  return (
      <div className="journal">
        <Link to='/new'><h2>What are you grateful for today?</h2></Link>
          {error && <div>Sorry, there was an error getting the journal entries!</div>}
          {!error && !entries.length ? (
              <>
                  <h1>You don't have any journal entries yet</h1>
                  <p>Add some!</p>
              </>
          ) : (
              entries.map(entry => (
                  <div className="journalEntry" key={entry.id}>
                      <Link to={`/entries/${entry.id}/`}>
                      <h3>{entry.date}</h3>
                      </Link>
                      <p>{entry.entry}</p>
                  </div>
              ))
          )}
      </div>
  );
}

export default Home;
