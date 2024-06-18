import React, { useEffect, useState } from 'react'
import './quizAnswer.css'
import { useLoaderData } from 'react-router-dom'
import MotionBackground from '../../global/MotionBackground/MotionBackground';
import axios from 'axios';
import { STEP_BLOCK_STATE } from '../../../utils/constants';
import StepBlock from '../../global/StepBlock/StepBlock';

function QuizAnswer() {
	const quizID = useLoaderData();
	const [quiz, setQuiz] = useState()
	const [currentQuestion, setCurrentQuestion] = useState(1)

	console.log('im the quiz', quiz)
	useEffect(() => {
			axios
			  .get(`http://localhost:3000/api/quiz?quizId=${quizID}`)
			  .then((response) => {
				setQuiz(response.data);
			  })
			  .catch((error) => {
				console.error("API request error: ", error);
			  });
	}, [])

  return (
	<div className="quiz-answer-container">
		<div className='quiz-answer-header'>
			<h2>{quiz?.quizTitle}</h2>
		</div>
		<div className='quiz-answer-container-questions'>
			<div className='quiz-answer-counter'>
				{quiz?.questions.map((question, index) => (
					<StepBlock title={""} number={index + 1} blockState={index + 1 == currentQuestion ? STEP_BLOCK_STATE.SELECTED : currentQuestion > 1 ? '' : STEP_BLOCK_STATE.NOT_SELECTED} />
				))}
			</div>
			<div className='quiz-question-container'>
				<div className='quiz-question-title'>{quiz?.questions[0].questionTitle}</div>
				{quiz?.questions[0].choices.map((choice, index) => (
					<div className='quiz-choice-container'>
						<input type='radio' id={choice.choiceID} name="questions"/>
						<label for={choice.choiceID}>{choice.choiceValue}</label>
					</div>				
				)) }
				<button>Suivant</button>
			</div>
		</div>
		<MotionBackground/>
	</div>
  )
}

export default QuizAnswer