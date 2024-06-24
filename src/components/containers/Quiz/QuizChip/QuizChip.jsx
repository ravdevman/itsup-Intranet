import React from 'react'
import './quizChip.css'
import Question from '.././../../../assets/icons/questions.png'
import frLocale from 'date-fns/locale/fr';
import { format } from 'date-fns';
import { MODALS, USER_TYPE } from '../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { open } from '../../../../redux/modalSlice';

function QuizChip({quiz, type}) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	console.log('quiz id', quiz)


	const handleSeeResult = () => {
		dispatch(open({type : MODALS.QUIZ_RESULT, data: {quizID: quiz?.quizID}}))
	}

  return (
	<div className={`quiz-chip-container ${type == USER_TYPE.STUDENT && quiz.participated == 1 ? "quiz-chip-responded" : null}`}>
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
					<p>Durée</p>
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
			{type == USER_TYPE.TEACHER ?
			<button onClick={handleSeeResult}>Voir les Résultats</button> :
			quiz.participated == 0 ?
			<button onClick={() => navigate(`/quiz/${quiz.quizID}`) }>Repondre</button>  : <button style={{cursor: "default"}}>{`${quiz?.quizGradePercentage ? quiz?.quizGradePercentage : 0}%`}</button>
			}
		</div>
	</div>
  )
}

export default QuizChip