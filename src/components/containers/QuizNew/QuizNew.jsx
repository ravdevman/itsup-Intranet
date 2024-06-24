import React, { useState } from 'react'
import './quizNew.css'
import MotionBackground from '../../global/MotionBackground/MotionBackground'
import StepBlock from '../../global/StepBlock/StepBlock'
import { useNavigate } from 'react-router-dom';
import StepOne from './Steps/StepOne/StepOne';
import StepTwo from './Steps/StepTwo/StepTwo';
import { STEP_BLOCK_STATE } from '../../../utils/constants';
import StepThree from './Steps/StepThree/StepThree';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { displayMessage } from '../../../redux/messageBoxSlice'

const STEPS = {
	ONE: 1,
	TWO: 2,
	THREE: 3
} 

function QuizNew() {
	const user = JSON.parse(window.localStorage.getItem("user"));
	const [currentStep, setCurrentStep] = useState(STEPS.ONE)
	const [currentData, setCurrentData] = useState({teacherID: user.userID});
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleNextStep = (data) => {
		setCurrentData((prevData) => ({
			...prevData,
			...data
		}));
		if (currentStep == STEPS.ONE) {
			setCurrentStep(STEPS.TWO)
		}
		if (currentStep == STEPS.TWO) {
			setCurrentStep(STEPS.THREE)
		}
	}

	const handleSubmit = (data) => {
		console.log('IM THE DATA', data)
		setCurrentData((prevData) => ({
			...prevData,
			...data
		}));
		const newData = {
			...currentData,
			...data
		}  
		axios.post('http://localhost:3000/api/createQuiz', currentData)
		.then(function (response) {
			dispatch(displayMessage({message: "QCM ajouter avec succes"}))
			navigate("/quiz")
		  }).catch(function (error) {
			dispatch(displayMessage({message: "pas pu ajouter le QCM", type: "error"}))
		  });
	}


  return (
	<div className='quiz-new-main-container'>
		<div className='quiz-new-main-header'>
			<div className='quiz-new-main-header-back'  onClick={() => navigate("/quiz")}>
				<p>{'< retour'}</p>
			</div>
			<h2>Creation</h2>
			<div className='quiz-new-main-header-balance'></div>
		</div>


		<div className='quiz-new-main-container-form'>
			<div className='quiz-new-main-steps'>
				<StepBlock title={'Détails'} number={1} blockState={currentStep == STEPS.ONE ? STEP_BLOCK_STATE.SELECTED : currentStep > STEPS.ONE ? '' : STEP_BLOCK_STATE.NOT_SELECTED} />
				<StepBlock title={'Questions'} number={2} blockState={currentStep == STEPS.TWO ? STEP_BLOCK_STATE.SELECTED : currentStep > STEPS.TWO ? '' : STEP_BLOCK_STATE.NOT_SELECTED}/>
				<StepBlock title={'Temps'} number={3} blockState={currentStep == STEPS.THREE ? STEP_BLOCK_STATE.SELECTED : currentStep > STEPS.THREE ? '' : STEP_BLOCK_STATE.NOT_SELECTED}/>
			</div>

			<div className='quiz-new-main-steps-content'>
				{currentStep == STEPS.ONE && <StepOne nextStep={handleNextStep} />}
				{currentStep == STEPS.TWO && <StepTwo nextStep={handleNextStep} />}
				{currentStep == STEPS.THREE && <StepThree handleSubmit={handleSubmit} />}
			</div>
		</div>

		
		<MotionBackground />
	</div>
  )
}

export default QuizNew