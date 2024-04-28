import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'; // paivays formatting
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    // Haetaan harjoitustiedot
    fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
      .then(response => response.json())
      .then(data => {
        setTrainings(data);
      })
      .catch(error => {
        console.error('Error fetching trainings:', error);
      });
  }, []);

  // Muuntaa harjoitustiedot sopiviksi tapahtumiksi react-big-calendarille
  const convertToEvents = () => {
    return trainings.map(training => ({
      title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
      start: new Date(training.date),
      end: moment(training.date).add(training.duration, 'minutes').toDate(),
    }));
  };

  return (
    <div style={{ height: 800 }}>
      <Calendar
        localizer={localizer}
        events={convertToEvents()}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50px' }}
        views={['month', 'week', 'day']}
        defaultView="week"
      />
    </div>
  );
};

export default MyCalendar;
