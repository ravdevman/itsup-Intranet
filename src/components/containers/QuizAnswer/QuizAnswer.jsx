import React, { useEffect, useState } from 'react'
import './quizAnswer.css'
import { useLoaderData, useNavigate } from 'react-router-dom'
import MotionBackground from '../../global/MotionBackground/MotionBackground';
import axios from 'axios';
import { STEP_BLOCK_STATE } from '../../../utils/constants';
import StepBlock from '../../global/StepBlock/StepBlock';
import { useDispatch } from 'react-redux';
import { displayMessage } from '../../../redux/messageBoxSlice';

function QuizAnswer() {
	const quizID = useLoaderData();
	const [quiz, setQuiz] = useState()
	const [currentQuestion, setCurrentQuestion] = useState(1)
	const [selectedResponces, setSelectedResponces] = useState([])
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = JSON.parse(window.localStorage.getItem("user"));
	const [progressbarTime, setProgressbarTime] = useState(1)
	
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


	useEffect(() => {
		setProgressbarTime(quiz?.quizDuration * 60)
	}, [quiz])

	useEffect(() => {
        const interval = setInterval(() => {
            setProgressbarTime(prevTime => prevTime > 0 ? prevTime - 1 : 0);
			
        }, 1000);
        return () => clearInterval(interval);
    }, []);

	useEffect(() => {
		if(progressbarTime == 0) {
			navigate("/quiz")
			dispatch(displayMessage({message: "Temp ecouler...", type: "error"}))
		}
    }, [progressbarTime])
	console.log('progressbarTime ', (progressbarTime / (quiz?.quizDuration * 60)) * 100)

	console.log("selected reponse ", selectedResponces)
	const handleChoiceSelected = (question, choice) => {
		const currentQuestionID = quiz?.questions.find(question => question.questionOrder === currentQuestion)?.questionID;
	
		if (question.questionID == currentQuestionID) {
			setSelectedResponces(prevData => {
				const existingResponse = prevData.find(question => question.questionID === currentQuestionID);
	
				if (existingResponse) {
					return prevData.map(question => {
						if (question.questionID === currentQuestionID) {
							return {
								...question,
								choiceID: choice.choiceID,
								isCorrect: choice.isCorrect
							};
						} else {
							return question;
						}
					});
				} else {
					return [
						...prevData,
						{
							questionID: question.questionID,
							choiceID: choice.choiceID,
							isCorrect: choice.isCorrect
						}
					];
				}
			});
		} else {
			setSelectedResponces(prevData => [
				...prevData,
				{
					questionID: question.questionID,
					choiceID: choice.choiceID,
					isCorrect: choice.isCorrect
				}
			]);
		}
	};
	const nextQuestion = () => {
		if (currentQuestion < quiz.questions.length) {
			setCurrentQuestion(currentQuestion + 1)
		}

		if (currentQuestion == quiz.questions.length) {
			axios.post(`http://localhost:3000/api/quizRespond?userId=${user.userID}`, {quizID: quiz.quizID, quizResponse: selectedResponces})
			.then(function (response) {
				dispatch(displayMessage({message: "Felicitation."}))
				navigate("/quiz")
			  }).catch(function (error) {
				dispatch(displayMessage({message: "pas pu repondre au QCM", type: "error"}))
			  });
		}
	}

  return (
	<div className="quiz-answer-container">
		<div className='quiz-answer-header'>
			<div style={{width: `${ (progressbarTime / (quiz?.quizDuration * 60)) * 100 }%`}} className='quiz-answer-progressbar'></div>
			<h2>{quiz?.quizTitle}</h2>
		</div>
		<div className='quiz-answer-container-questions'>
			<div className='quiz-answer-counter'>
				{quiz?.questions.map((question, index) => (
					<StepBlock title={""} number={index + 1} blockState={index + 1 == currentQuestion ? STEP_BLOCK_STATE.SELECTED : currentQuestion > 1 ? '' : STEP_BLOCK_STATE.NOT_SELECTED} />
				))}
			</div>
			<div className='quiz-question-container'>
				<div className='quiz-question-title'>{quiz?.questions.filter(question => question.questionOrder == currentQuestion)[0].questionTitle}</div>
				{quiz?.questions.filter(question => question.questionOrder == currentQuestion).map(question =>
					question.choices.map((choice, index) => (
						<div className='quiz-choice-container'>
							<input type='radio' id={choice.choiceID} name="questions" onChange={(e) => handleChoiceSelected(question, choice)}/>
							<label for={choice.choiceID}>{choice.choiceValue}</label>
						</div>				
					)) 
				)}
				<button onClick={nextQuestion}>{currentQuestion == quiz?.questions.length - 1 ? "Suivant" : "Terminer"}</button>
			</div>
		</div>
		<MotionBackground/>
	</div>
  )
}

export default QuizAnswer