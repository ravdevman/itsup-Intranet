import React, { useEffect, useRef, useState } from 'react'
import './mainContent.css'
import SelectorContainer from '../SelectorContainer/SelectorContainer'
import TextEditor from '../../global/TextEditor/TextEditor'
import axios from 'axios';
import { useSelector } from 'react-redux';

function MainContent() {
	const currentSubject = useSelector(state => state.currentSubject.subjectName)
	const user = useSelector(state => state.currentUser)
	const departmentID = user.departmentID;
	const [subjects, setSubjects] = useState([]);
	const [lessons, setLessons] = useState([]);
	
	//fetch subject depend of its a student or teacher
	useEffect(() => {
		if (user.role == 'Student'){
			axios
			  .get(`http://localhost:3000/api/subjects?departmentID=${departmentID}`)
			  .then((response) => {
				setSubjects(response.data.subjects);
			  })
			  .catch((error) => {
				console.error("API request error: ", error);
			  });
		} 
		if (user.role == 'Teacher'){
			axios
			  .get(`http://localhost:3000/api/teacher/subjects?TeacherID=${user.userID}`)
			  .then((response) => {
				setSubjects(response.data.subjects);
				console.log(response.data.subjects)
			  })
			  .catch((error) => {
				console.error("API request error: ", error);
			  });
		} 

	}, [user])
	// fetch lesson from subject selected
	useEffect(() => {
		axios.get(`http://localhost:3000/api/lessons?subjectName=${currentSubject}`)
		.then((response) => {
			setLessons(response.data.lessons);
			console.log(response.data.lessons)
		  })
		  .catch((error) => {
			console.error("API request error: ", error);
		  });
	}, [currentSubject])

  return (
	<div className='mainContent'>
		<SelectorContainer subjects={subjects} componentType="subject" />
		<div className='mainContent-middle'>
			<TextEditor />
		</div>
		<SelectorContainer subjects={lessons} componentType="lesson" />
	</div>
  )
}

export default MainContent