import React, { useEffect, useRef, useState } from 'react'
import './mainContent.css'
import SelectorContainer from '../SelectorContainer/SelectorContainer'
import TextEditor from '../../global/TextEditor/TextEditor'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { stopRefresh } from '../../../redux/refreshSlice';

function MainContent() {
	const currentSubject = useSelector(state => state.currentSubject.subjectName)
	const user = JSON.parse(window.localStorage.getItem("user"));
	const departmentID = user.departmentID;
	const [subjects, setSubjects] = useState([]);
	const [lessons, setLessons] = useState([]);
	const refresh = useSelector(state => state.refresh)
	const dispatch = useDispatch()
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
			const sortedLessons = response.data.lessons.sort((a, b) => {
				return a.lessonDate.localeCompare(b.lessonDate);
			});
			setLessons(sortedLessons);
			console.log(sortedLessons)
			dispatch(stopRefresh())
		  })
		  .catch((error) => {
			console.error("API request error: ", error);
		  });
	}, [currentSubject, refresh])

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