import React, { useEffect, useState } from 'react'
import './quiz.css'
import TitleDecorator from '../../global/TitleDecorator/TitleDecorator'
import QuizChip from './QuizChip/QuizChip'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Quiz() {
	const user = JSON.parse(window.localStorage.getItem("user"));
	const [quizzes, setQuizzes] = useState()
	const navigate = useNavigate()
	useEffect(() => {
		if (user.role == 'Teacher'){
			axios
			  .get(`http://localhost:3000/api/teacherQuizzes?userId=${user.userID}`)
			  .then((response) => {
				setQuizzes(response.data.quizzes);
			  })
			  .catch((error) => {
				console.error("API request error: ", error);
			  });
		} 
	}, [])

	
  return (
	<div className='quiz-main'>
		<div className='quiz-main-header'>
			<h2>Question Choix multiple</h2>
		</div>
		<div className='quiz-main-teacher-container'>
			<div className='quiz-main-teacher-title'>
					<TitleDecorator>
						<h2>List de vos QCM :</h2>
					</TitleDecorator>
			</div>
			<div className='quiz-main-teacher-filter-container'>
				<form>
					<div className='quiz-main-teacher-filter-input'>
						<label>Choisissez La Matiere</label>
						<select>
							<option >Choisissez la matiere</option>
						</select>
					</div>
					<div className='quiz-main-teacher-filter-input'>
						<label>Choisissez La Matiere</label>
						<select>
							<option >Choisissez la matiere</option>
						</select>
					</div>
					<div className='quiz-main-teacher-filter-input'>
						<label>Choisissez Date début - Date fin</label>
						<div className='quiz-main-teacher-filter-input-date-container'>
								<input type='date' ></input>
								<input type='date' ></input>
						</div>
					</div>
					<div className='quiz-main-teacher-filter-input validate'>
						<button>Valider</button>
					</div>
				</form>

			</div>
			<div className='quiz-main-teacher-quiz-chip-container'>
				{quizzes && quizzes.map((quiz) => <QuizChip key={quiz.quizID} quiz={quiz} />)}
				<button onClick={() => navigate("/quiz/new")}>
					+
				</button>
			</div>
		</div>
	</div>
  )
}

export default Quiz