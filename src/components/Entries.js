import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

function Entries({ entries }) {
  const { user } = useContext(UserContext);
  const [searchStr, setSearchStr] = useState('');
  const today = new Date();
  const todayFormat =
    today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();
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

      {!filteredEntries[0].date === todayFormat && (
        <>
          <Link to="/new">
            <h3>{todayFormat}</h3>
          </Link>
          <p>What are you grateful for today?</p>
        </>
      )}

      {searchStr &&
        filteredEntries
          .filter(entry => entry.entry.includes(searchStr))
          .map(entry => (
            <div className="journalEntry" key={entry.id}>
              <Link to={`/entries/${entry.id}/`}>
                <h3>{entry.date}</h3>
              </Link>
              <p>{entry.entry}</p>
            </div>
          ))}

      {!searchStr &&
        filteredEntries.map(entry => (
          <div className="journalEntry" key={entry.id}>
            <Link to={`/entries/${entry.id}/`}>
              <h3>{entry.date}</h3>
            </Link>
            <p>{entry.entry}</p>
          </div>
        ))}
    </>
  );
}

export default Entries;
