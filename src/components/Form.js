import React from 'react';

function Form({ entry, handleChange, handleSubmit }) {
  return (
    
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <p>{entry.date}</p>
      {/* want to be able to have default to today's date */}
      <input type="date"  onChange={handleChange} name="date" value={entry.date}/>
      <textarea cols="50" rows="20" onChange={handleChange} name="entry" value={entry.entry}/>
      <label htmlFor="image">Choose file to upload</label>
      <input type="file" id="image" name="image" />
      <button type='submit'>Save</button>
       
    </form>
  );
}

export default Form;
