import React from 'react';

function Form({ entry, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {/* want to be able to have default to today's date */}
      <input type="date"  onChange={handleChange} name="date" value={entry.date}/>
      <textarea cols="50" rows="20" onChange={handleChange} name="entry" value={entry.entry}/>
      <button type='submit'>Save</button>
    </form>
  );
}

export default Form;
