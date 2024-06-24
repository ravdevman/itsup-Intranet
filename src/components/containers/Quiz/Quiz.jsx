import React, { useEffect, useState } from 'react'
import './quiz.css'
import TitleDecorator from '../../global/TitleDecorator/TitleDecorator'
import QuizChip from './QuizChip/QuizChip'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { USER_TYPE } from '../../../utils/constants';

function Quiz() {
	const user = JSON.parse(window.localStorage.getItem("user"));
	const [quizzes, setQuizzes] = useState()
	const navigate = useNavigate()
	useEffect(() => {
		if (user.role == USER_TYPE.TEACHER){
			axios
			  .get(`http://localhost:3000/api/teacherQuizzes?userId=${user.userID}`)
			  .then((response) => {
				setQuizzes(response.data.quizzes);
			  })
			  .catch((error) => {
				console.error("API request error: ", error);
			  });
		} 

		if (user.role == USER_TYPE.STUDENT){
			axios
			  .get(`http://localhost:3000/api/studentQuizzes?userId=${user.userID}`)
			  .then((response) => {
				setQuizzes(response.data.quizzes);
			  })
			  .catch((error) => {
				console.error("API request error: ", error);
			  });
		} 
	}, [])


	const renderContent = () => {
		if (user.role == USER_TYPE.TEACHER) {
			return (
				<div className='quiz-main-teacher-container'>
							<div className='quiz-main-teacher-title'>
									<TitleDecorator>
										<h2>Liste de vos QCM :</h2>
									</TitleDecorator>
							</div>
							<div className='quiz-main-teacher-filter-container'>
								<form>
									<div className='quiz-main-teacher-filter-input'>
										<label>Choisissez une matière</label>
										<select>
											<option >Choisissez une matière</option>
										</select>
									</div>
									<div className='quiz-main-teacher-filter-input'>
										<label>Choisissez une classe</label>
										<select>
											<option >Choisissez une classe</option>
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
								{quizzes && quizzes.map((quiz) => <QuizChip key={quiz.quizID} quiz={quiz} type={USER_TYPE.TEACHER} />)}
								<button onClick={() => navigate("/quiz/new")}>
									+
								</button>
							</div>
						</div>
			)
		}
		if (user.role == USER_TYPE.STUDENT) {
			return (
				<div className='quiz-main-teacher-container'>
					<div className='quiz-main-teacher-title'>
							<TitleDecorator>
								<h2>Liste des QCM en cours :</h2>
							</TitleDecorator>
					</div>
					<div className='quiz-main-teacher-filter-container'>
								<form>
									<div className='quiz-main-teacher-filter-input'>
										<label>Choisissez une matière</label>
										<select>
											<option >Choisissez une matière</option>
										</select>
									</div>
									<div className='quiz-main-teacher-filter-input validate'>
										<button>Valider</button>
									</div>
								</form>
					</div>
					<div className='quiz-main-teacher-quiz-chip-container'>
						{quizzes && quizzes.length > 0 ? quizzes.map((quiz) => <QuizChip key={quiz.quizID} quiz={quiz} type={USER_TYPE.STUDENT} />) : <p>Aucun QCM n'est disponible.</p>}
					</div>
				</div>
			)
		}
	}

	
  return (
	<div className='quiz-main'>
		<div className='quiz-main-header'>
			<h2>Question à choix multiple</h2>
		</div>
		{renderContent()}
	</div>
  )
}

export default Quiz