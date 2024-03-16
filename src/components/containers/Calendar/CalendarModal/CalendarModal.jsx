import React from 'react';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import './calendarModal.css';
import eventImage from '../../../../assets/event.png';
import dateIcon from '../../../../assets/icons/date.png';

function CalendarModal({ closeModal, currentEvent }) {
  return (
    <div className='calendar-modal-container fade'>
      <div className='calendar-modal-event-container'>
        <img src={eventImage} alt="Event" width={400} height={200} />
        <h3>{currentEvent.eventTitle}</h3>
        <div className='calendar-modal-event-info'>
          <img src={dateIcon} alt="Date" />
          <p>{`du ${format(new Date(currentEvent.eventStartDate), "EEEE d MMMM yyyy", { locale: fr })}`} <br /> {`au ${format(new Date(currentEvent.eventEndDate), "EEEE d MMMM yyyy", { locale: fr })}`}</p>
        </div>
        <button onClick={closeModal}>Fermer</button>
      </div>
    </div>
  );
}

export default CalendarModal;
