import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { APIURL } from '../config';
import { UserContext } from '../UserContext';
import Form from './Form'

function New() {
    const { user } = useContext(UserContext);
    const initialState = {
        owner: '',
        date: 'date default',
        entry: ''
    }
    const [entry, setEntry] = useState(initialState);
    const [createdId, setCreatedId] = useState(null);

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
            // Make sure to handle this case with some user feedback!
            .catch(console.log);
    }

    //if id was created successfully, redirect user back to homepage
    if (createdId) {
        return (
            <Redirect
                to={{
                    pathname: '/entries/',
                    state: {
                        id: createdId
                    }
                }}
            />
        );
    }


    return (
        <div>
            <Form entry={entry} handleChange={handleChange} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default New
