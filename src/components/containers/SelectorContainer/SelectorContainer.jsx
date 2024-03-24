import React, { useState } from 'react'
import './selectorContainer.css'
import Selector from '../../global/Selector/Selector'
import { useDispatch, useSelector } from 'react-redux';
import { open } from '../../../redux/modalSlice';
import Arrow from '../../../assets/icons/arrow.png'
function SelectorContainer({subjects, componentType}) {

  const {role } = JSON.parse(window.localStorage.getItem("user"));
  const {subjectName} = useSelector(state => state.currentSubject)
  const dispatch = useDispatch();
  const [isMaximized, setIsMaximized] = useState(false);
  // Helper functions
  const getKey = (item) => item.subjectID || item.lessonID;
  const getTitle = (item) => item.subjectName || item.lessonTitle;
  const getDate = (item) => (item.lessonDate ? item.lessonDate : null);
  return (
	<div className={`selectorContainer ${
    componentType === 'subject' ? 'selectorContainer-subject' : 'selectorContainer-lesson'
  } ${isMaximized ? 'maximized' : ''}`}>
    <div className='selectorContainer-maximize' onClick={() => setIsMaximized(!isMaximized)}><img src={Arrow} /></div>
		{subjects.map((subject) => (
        <Selector key={getKey(subject)} 
        componentType={componentType} 
        title={getTitle(subject)} 
        date={getDate(subject)}/>
      ))}
      {role == 'Teacher' && componentType == "lesson" && subjectName != "" ?   <button className='add-btn' onClick={() => dispatch(open({type : ""}))}>Ajouter une leçon</button> : null}
      {componentType == "lesson" && subjectName == "" ? <p className='info'>Aucune matière n'est sélectionner</p> : null}
	</div>
  )
}

export default SelectorContainer