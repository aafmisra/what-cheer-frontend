import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { APIURL } from '../config';
import { UserContext } from '../UserContext';
import Form from './Form'

function New() {
    const { user } = useContext(UserContext);
    const initialState = {
        owner: '',
        date: '',
        entry: ''
    }
    const [entry, setEntry] = useState(initialState);
    const [createdId, setCreatedId] = useState(null);
    const [error, setError] = useState(false);

    const handleChange = function (event) {
        event.persist();
        const { name, value } = event.target;

        setEntry({ ...entry, [name]: value });
    };

    function handleSubmit(event) {
        event.preventDefault();

        const url = `${APIURL}/entries/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `JWT ${user.token}`
            },
            body: JSON.stringify(entry)
        })
            .then(response => response.json())
            .then(data => {
                setCreatedId(data.id);
            })
            .catch(() => {
                setError(true);
            });
    }

    //if id was created successfully, redirect user back to homepage
    if (createdId) {
        return (
            <Redirect
                to={{
                    pathname: '/',
                    state: {
                        id: createdId
                    }
                }}
            />
        );
    }

    //returns error message if entry wasn't created
    if (error) {
        return <div>Oops, there was a problem adding the journal entry.</div>;
    }

    return (
        <div>
            <Form entry={entry} handleChange={handleChange} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default New
