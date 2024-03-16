import React, { useEffect, useState } from 'react';
import './calendar.css';
import { isWithinInterval, startOfWeek, endOfWeek, isSameDay, eachDayOfInterval, format, startOfMonth, endOfMonth, addMonths, subMonths, isSameMonth, isToday, isAfter, isBefore } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CalendarModal from './CalendarModal/CalendarModal';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState()
  // get the events 
  useEffect(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;
        axios.get("http://localhost:3000/api/events", 
        {
          params: {month, year} 
        }).then((response) => {
          setEvents(response.data.events);
          })
          .catch((error) => {
          console.error("API request error: ", error);
          });
      }, [currentMonth])

  // Function to get an array of days in the current month
  const getDaysInMonth = () => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  const daysInMonth = getDaysInMonth();

  // Function to handle next and previous month navigation
  const handleMonthChange = (increment) => {
    const nextMonth = increment ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1);

    // Check if the next month is within the allowed range (September 2023 to July 2024)
    if (isAfter(nextMonth, new Date('2023-08-31')) && isBefore(nextMonth, new Date('2024-08-01'))) {
      setCurrentMonth(nextMonth);
    }
  };

  const handleOpenModal = (eventID) => {
    axios.get("http://localhost:3000/api/event", 
    {
      params: {eventID} 
    }).then((response) => {
      setCurrentEvent(response.data.event[0]);
      setIsModalOpen(true)
      })
      .catch((error) => {
      console.error("API request error: ", error);
      });
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  return (
    <div className='calendar enter'>
      {isModalOpen && <CalendarModal closeModal={handleCloseModal} currentEvent={currentEvent} />}
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(false)} disabled={!isAfter(currentMonth, new Date('2023-08-31'))}>Mois précédent</button>
        <h2>{format(currentMonth, 'MMMM yyyy', { locale: frLocale })}</h2>
        <button onClick={() => handleMonthChange(true)} disabled={!isBefore(currentMonth, new Date('2024-08-01'))}>Mois prochain</button>
      </div>
      <table className='calendar-table'>
        <thead>
        <tr>
          <th className="day-header">Lun</th>
          <th className="day-header">Mar</th>
          <th className="day-header">Mer</th>
          <th className="day-header">Jeu</th>
          <th className="day-header">Ven</th>
          <th className="day-header">Sam</th>
          <th className="day-header">Dim</th>
        </tr>
        </thead>
        <tbody>
          {daysInMonth.reduce((rows, day, index) => {
            if (index % 7 === 0) {
              rows.push([]);
            }
            rows[rows.length - 1].push(day);
            return rows;
          }, []).map((row, rowIndex) => (
            <tr key={rowIndex} className={`row-${rowIndex + 1}`}>
              {row.map((day, dayIndex) => (
                <td key={dayIndex} className={`${!isSameMonth(day, currentMonth) ? 'grayed' : ''} ${isToday(day) ? 'current-day' : ''}`}>
                  {<div className='calendar-day-container'>
                    {format(day, 'd')} 
                    {events
                    .filter((event) => isSameDay(new Date(event.eventStartDate), day))
                    .map((event) => (
                      <div key={event.eventID} onClick={() => handleOpenModal(event.eventID)} className='calendar-day-container-event'>
                        <span>{event.eventTitle}</span>
                      </div>
                    ))}
                  </div>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
