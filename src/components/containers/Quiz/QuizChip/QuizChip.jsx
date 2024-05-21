import React from 'react'
import './quizChip.css'
import Question from '.././../../../assets/icons/questions.png'
import frLocale from 'date-fns/locale/fr';
import { format } from 'date-fns';


function QuizChip({quiz}) {
  return (
	<div className='quiz-chip-container'>
		<div className='quiz-chip-container-details'>
			<img src={Question} />
			<div className='quiz-chip-container-details-desc'>
				<p>QCM : {quiz.quizTitle} </p>
				<h6>{quiz.subjectName}</h6>
			</div>
			<div className='quiz-chip-container-details-edit'>
				<h6>{format(new Date(quiz.quizStartDate), 'MM/dd/yyyy')}</h6>
				<h6 className='quiz-chip-quesiton-number'>{quiz.questionsCount} questions</h6>
			</div>
		</div>
		<div className='quiz-chip-container-info'>
			<div className='quiz-chip-container-info-box'>
					<p>Duree</p>
				<div className='quiz-chip-container-info-box-chip'>
					<h6>{quiz.quizDuration} min</h6>
				</div>
			</div>
			<div className='quiz-chip-container-info-box'>
				<p>Participant</p>
				<div className='quiz-chip-container-info-box-chip'>
					<h6>{quiz.participantCount}</h6>
				</div>
			</div>
			<button>Voir les Résultats</button>
		</div>
	</div>
  )
}

export default QuizChip