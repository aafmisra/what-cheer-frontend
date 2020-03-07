import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Form({ entry, handleChange, handleSubmit }) {
    const [startDate, setStartDate] = useState(new Date());
    // const defaultValue = new Date();


  return (
    <form onSubmit={handleSubmit}>
      {/* want to be able to have default to today's date */}
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        // defaultValue={defaultValue}
      />
      <textarea
        cols="20"
        rows="40"
        onChange={handleChange}
        name="entry"
        value={entry.entry}
      />
      <input type="submit" />
    </form>
  );
}

export default Form;
