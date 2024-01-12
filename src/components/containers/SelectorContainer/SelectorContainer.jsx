import React from 'react'
import './selectorContainer.css'
import Selector from '../../global/Selector/Selector'
import { useDispatch, useSelector } from 'react-redux';
import { open } from '../../../redux/modalSlice';

function SelectorContainer({subjects, componentType}) {
  const {role } = useSelector(state => state.currentUser)
  const {subjectName} = useSelector(state => state.currentSubject)
  const dispatch = useDispatch();
  // Helper functions
  const getKey = (item) => item.subjectID || item.lessonID;
  const getTitle = (item) => item.subjectName || item.lessonTitle;
  const getDate = (item) => (item.lessonDate ? item.lessonDate : null);
  return (
	<div className='selectorContainer'>
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