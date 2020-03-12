import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

function Entries({ entries }) {
  const { user } = useContext(UserContext);
  const [searchStr, setSearchStr] = useState('');

  let filteredEntries = entries.filter(
    entry => entry.owner === user.user.username
  );

  function handleChange(event) {
    setSearchStr(event.target.value);
  }

  return (
    <>
      <div className="search">
        <img
          src={process.env.PUBLIC_URL + '/searchicon.svg'}
          alt="search icon"
        />
        <input
          type="text"
          name="search"
          value={searchStr}
          onChange={handleChange}
        />
      </div>

     
      <Link to="/new">
        <h3>What are you grateful for today?</h3>
      </Link>
    

      {searchStr &&
        filteredEntries
          .filter(entry => entry.entry.includes(searchStr))
          .map(entry => (
            <div className="journalEntry" key={entry.id}>
              <Link to={`/entries/${entry.id}/`}>
                <h3>
                  {new Date(new Date(entry.date).setHours(24)).toDateString()}
                </h3>
              </Link>
              <p>{entry.entry}</p>
              {entry.image && (
                <img
                  src={process.env.PUBLIC_URL + '/picture.svg'}
                  alt={`for entry on ${entry.date}`}
                />
              )}
            </div>
          ))}

      {!searchStr &&
        filteredEntries.map(entry => (
          <div className="journalEntry" key={entry.id}>
            <Link to={`/entries/${entry.id}/`}>
              <h3>
                {new Date(new Date(entry.date).setHours(24)).toDateString()}
              </h3>
            </Link>
            <p>{entry.entry}</p>
            {entry.image && (
              <img
                src={process.env.PUBLIC_URL + '/picture.svg'}
                alt={`for entry on ${entry.date}`}
              />
            )}
          </div>
        ))}
    </>
  );
}

export default Entries;
