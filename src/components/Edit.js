import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { APIURL } from '../config';
import { UserContext } from '../UserContext';
import Form from './Form'

function Edit({ match }) {
    const { user } = useContext(UserContext);
    const url = `${APIURL}/entries/${match.params.id}/`;
    const initialState = {
        owner: '',
        date: '',
        entry: ''
    }
    const [entry, setEntry] = useState(initialState);
    const [deleted, setDeleted] = useState(false);
    const [edited, setEdited] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: `JWT ${user.token}`
            }})
            .then(response => response.json())
            .then(setEntry)
            .catch(() => {
                setError(true);
            });
    }, []);

    const handleChange = function (event) {
        event.persist();
        const { name, value } = event.target;

        setEntry({ ...entry, [name]: value });
    };

    function handleSubmit(event) {
        event.preventDefault();

        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: `JWT ${user.token}`
            },
            body: JSON.stringify(entry)
        })
            .then(response => response.json())
            .then(data => {
                setEdited(data.id);
            })
            .catch(() => {
                setError(true);
            });
    }

    // deletes entry
    function deleteEntry() {
        fetch(url, {
            method: 'DELETE',
            headers: { Authorization: `JWT ${user.token}` }
        })
            .then(res => {
                setDeleted(true);
            })
            .catch(console.error);
    }

    // goes to home page if book was deleted
    if (deleted) {
        return <Redirect to="/" />;
    }

    // goes back to ShowBook if book was updated
    if (edited) {
        return <Redirect to={`/entries/${match.params.id}/`} />;
    }

    //returns error message if component doesn't update
    if (error) {
        return <div>Oops, there was a problem updating the journal entry.</div>;
    }


    return (
        <div>
            <Form entry={entry} handleChange={handleChange} handleSubmit={handleSubmit} />
            <button onClick={deleteEntry}>Delete</button>
        </div>
    )
}

export default Edit