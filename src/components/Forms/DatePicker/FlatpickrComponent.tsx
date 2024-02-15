"use client";
import React, { useEffect, useRef, useState } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Spanish } from 'flatpickr/dist/l10n/es'; // Importa el idioma español de Flatpickr
import moment from 'moment';
import Flatpickr from 'react-flatpickr';


interface FlatpickrProps {
  maxDate: string;
  minDate: string;
  defaultDate: string;
  modePick: string;
  handleChange: any;
}

const FlatpickrComponent = ({ maxDate, minDate, defaultDate, modePick, handleChange}: FlatpickrProps) => {
  const defaultDateParse = moment(defaultDate).toDate();
  const maxDateParse = moment(maxDate).subtract(1, 'days').format('YYYY-MM-DD');
  const minDateParse = moment(minDate).format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(defaultDateParse);

  const handleDateChange = (selectedDates) => {
      const selectedDateString = moment(selectedDates[0]).format("YYYY-MM-DD");
      const toSelectedDate = moment(selectedDates[0]).toDate();
      setSelectedDate(toSelectedDate);
      handleChange(selectedDateString);
  };

  return (
    <div>
      <Flatpickr
        className="bg-gray-100 border border-gray-300 p-2 rounded-md"
        placeholder="Selecciona una fecha"
        onChange={handleDateChange}
        value={selectedDate}
        options={{
            mode: modePick,
            maxDate: maxDateParse, 
            minDate: minDateParse,
            locale: Spanish,
            monthSelectorType: "static",
            dateFormat: "M j, Y",
            prevArrow:
              '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
            nextArrow:
              '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        }}
      />
    </div>
  );
};

export default FlatpickrComponent;
