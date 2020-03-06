import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { APIURL } from "../config";
import Header from './Header'
function ShowEntry({ match }) {
  const { user } = useContext(UserContext);
  const [entry, setEntry] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const url = `${APIURL}/entries/${match.params.id}/`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`
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
        <>
          <Header />
          <div>
              <h3>Hello, "name"! What are you grateful for today?</h3>
              <h5>Today's date: "date"</h5>
          </div>
        </>
      )}
    </div>
  );
}

export default ShowEntry;
