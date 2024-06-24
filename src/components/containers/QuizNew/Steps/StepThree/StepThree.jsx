import React from 'react'
import './stepThree.css'
import TitleDecorator from '../../../../global/TitleDecorator/TitleDecorator'

function StepThree({handleSubmit}) {

	const handleSubmitData = (e) => {
		e.preventDefault();
		const { time } = e.target
		if (time) {
			handleSubmit({quizDuration: time.value})
		} else {
		  alert("Please fill in all required fields.");
		}
	}


  return (
	<form className='step-three-quiz-container' onSubmit={handleSubmitData}>
		<TitleDecorator>
			<label>Durée *</label>
		</TitleDecorator>
		<input type='text' name='time' required/>
		<button>Finir</button>
	</form>
  )
}

export default StepThree