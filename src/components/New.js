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
    const [prompt, setPrompt] = useState(null);
    const [createdId, setCreatedId] = useState(null);
    const [error, setError] = useState(false);
    const [promptError, setPromptError] = useState(false);

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

    function getPrompt() {
        let id = Math.floor(Math.random() * 11 + 1);
        const url = `${APIURL}/prompts/${id}/`;
        fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `JWT ${user.token}`
          }
        })
          .then(res => res.json())
          .then(data => {
            setPrompt(data.prompt);
          })
          .catch(() => {
            setPromptError(true);
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

    if (promptError) {
        return <div>Oops, we're fresh out of ideas!</div>;
    }

    //returns error message if entry wasn't created
    if (error) {
        return <div>Oops, there was a problem adding the journal entry.</div>;
    }

    if (prompt){
        return (
          <div>
            <Form
              entry={entry}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            <button onClick={getPrompt}>Click For An Idea</button>
            <span>{prompt}</span>
          </div>
        );
        
    }

    return (
        <div>
            <Form entry={entry} handleChange={handleChange} handleSubmit={handleSubmit}/>
            <button onClick={getPrompt}>Click For An Idea</button>
        </div>
    )
}

export default New
