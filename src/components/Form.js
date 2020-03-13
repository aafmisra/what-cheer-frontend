import React from 'react';

//this form gets rendered in both Edit and New, and they pass the props to it

function Form({ entry, handleChange, handleSubmit }) {
  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <input
        type="date"
        onChange={handleChange}
        name="date"
        value={entry.date}
      />
      <textarea
        cols="50"
        rows="20"
        onChange={handleChange}
        name="entry"
        value={entry.entry}
      />
      <label htmlFor="image">Add an image to your entry</label>
      <input type="file" id="image" name="image" />
      <button type="submit">Save</button>
    </form>
  );
}

export default Form;
