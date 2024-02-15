"use client";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
        console.log('Fecha:'+date);
        
        setSelectedDate(date);
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(event) => {handleDateChange(event.target.value)}}
        dateFormat="dd/MM/yyyy" // Formato de fecha (puedes personalizarlo)
      />
    </div>
  );
};

export default DatePickerComponent;