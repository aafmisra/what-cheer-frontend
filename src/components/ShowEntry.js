import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { APIURL } from "../config";
import { Link } from 'react-router-dom';

function ShowEntry({ match }) {
  const { user } = useContext(UserContext);
  const [entry, setEntry] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = `${APIURL}/entries/${match.params.id}/`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `JWT ${user.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setEntry(data);
      })
      .catch(() => {
        setError(true);
      });
  }, [user, match]);
  if (!entry) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {error && <p>Sorry something's gone wrong.</p>}
      {!error && entry && (
        <div className="showJournal">
          <h3>{new Date(new Date(entry.date).setHours(24)).toDateString()}</h3>
          <p>{entry.entry}</p>
          {entry.image && (
            <img src={entry.image} alt={`for entry on ${entry.date}`} />
          )}
          <Link to={`/entries/${match.params.id}/edit/`}>Edit</Link>
        </div>
      )}
    </div>
  );
}

export default ShowEntry;
