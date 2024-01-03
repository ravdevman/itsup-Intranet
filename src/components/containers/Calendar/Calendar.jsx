import React, { useState } from 'react';
import './calendar.css';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, startOfMonth, endOfMonth, addMonths, subMonths, isSameMonth, isToday, isAfter, isBefore } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  return (
    <div className='calendar enter'>
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(false)} disabled={!isAfter(currentMonth, new Date('2023-08-31'))}>Previous Month</button>
        <h2>{format(currentMonth, 'MMMM yyyy', { locale: frLocale })}</h2>
        <button onClick={() => handleMonthChange(true)} disabled={!isBefore(currentMonth, new Date('2024-08-01'))}>Next Month</button>
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
                  {format(day, 'd')}
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
