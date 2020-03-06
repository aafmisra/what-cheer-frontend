import React from 'react';

function Form({ entry, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {/* want to be able to have default to today's date */}
      <input type="date"  onChange={handleChange} name="date"/>
      <textarea cols="5" rows="50" onChange={handleChange} name="entry"/>
      <input type='submit' />
    </form>
  );
}

export default Form;
