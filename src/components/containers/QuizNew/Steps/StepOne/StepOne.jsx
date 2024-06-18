import React, { useEffect, useState } from 'react'
import './stepOne.css'
import axios from 'axios';

function StepOne({nextStep}) {
	const user = JSON.parse(window.localStorage.getItem("user"));
	const [subjects, setSubjects] = useState()
	useEffect(() => {
		if (user.role == 'Teacher'){
			axios
			  .get(`http://localhost:3000/api/teacher/subjects?TeacherID=${user.userID}`)
			  .then((response) => {
				setSubjects(response.data.subjects);
			  })
			  .catch((error) => {
				console.error("API request error: ", error);
			  });
		} 

	}, [])

	const handleSubmit = (e) => {
		e.preventDefault();
		const { title, subject, classID, startDate, endDate } = e.target
		const details = {
			quizTitle: title.value,
			subjectID: subject.value,
			classID: classID.value,
			quizStartDate: startDate.value,
			quizEndDate: endDate.value
		}
		nextStep(details)
	}
  return (
	<form className='step-one-quiz-container' onSubmit={handleSubmit}>
		<label>Titre du QCM *</label>
		<input name='title' required/>
		<label>Matiere *</label>
		<select name="subject" required>
			<option value="">Choisissez votre matier</option>
			{subjects && subjects.map(subject => (
				<option value={subject.subjectID}>{subject.subjectName}</option>
			))}
		</select>
		<label>Class *</label>
		<select name="classID" required>
			<option value="1">Choisissez une classe</option>
		</select>
		<label>Choisissez Date début - Date fin</label>
		<div className='step-one-quiz-container-date'>
				<input type='date' name='startDate' required></input>
				<input type='date' name='endDate' required></input>
		</div>
		<button >Continuer</button>
	</form>
  )
}

export default StepOne