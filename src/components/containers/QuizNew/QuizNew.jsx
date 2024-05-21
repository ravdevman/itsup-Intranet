import React from 'react'
import './quizNew.css'


function QuizNew() {
  return (
	<div className='quiz-new-main-container'>
		QuizNew
		{/*right */}
		<div className='red-square-background' style={{
			width: '100px',
			height: '100px',
			top: '30%',
			right: '20%',
			animationDuration: '6s',
			'--rotate-start': '45deg',
    		'--rotate-mid': '70deg',
		}}></div>
		<div className='red-square-background' style={{
			width: '70px',
			height: '70px',
			top: '50%',
			right: '15%',
			animationDuration: '5s',
			'--rotate-start': '70deg',
    		'--rotate-mid': '45deg',
		}}></div>
		<div className='red-square-background' style={{
			width: '50px',
			height: '50px',
			top: '60%',
			right: '25%',
			animationDuration: '4s',
			'--rotate-start': '45deg',
    		'--rotate-mid': '70deg',
		}}></div>
		{/*circle */}
		<div className='black-circle-background' style={{
			width: '50px',
			height: '50px',
			top: '15%',
			right: '20%',
			animationDuration: '5s',
			'--rotate-start': '70deg',
    		'--rotate-mid': '45deg',
		}}></div>
		<div className='black-circle-background' style={{
			width: '30px',
			height: '30px',
			top: '30%',
			right: '15%',
			animationDuration: '6s',
			'--rotate-start': '70deg',
    		'--rotate-mid': '45deg',
		}}></div>
		<div className='black-circle-background' style={{
			width: '20px',
			height: '20px',
			top: '69%',
			right: '20%',
			animationDuration: '4s',
			'--rotate-start': '70deg',
    		'--rotate-mid': '45deg',
		}}></div>
		{/*left */}
		<div className='red-square-background' style={{
			width: '100px',
			height: '100px',
			top: '30%',
			left: '20%',
			animationDuration: '6s',
			'--rotate-start': '45deg',
    		'--rotate-mid': '70deg',
		}}></div>
		<div className='red-square-background' style={{
			width: '70px',
			height: '70px',
			top: '50%',
			left: '15%',
			animationDuration: '5s',
			'--rotate-start': '70deg',
    		'--rotate-mid': '45deg',
		}}></div>
		<div className='red-square-background' style={{
			width: '50px',
			height: '50px',
			top: '60%',
			left: '25%',
			animationDuration: '4s',
			'--rotate-start': '45deg',
    		'--rotate-mid': '70deg',
		}}></div>
		{/*circle */}
		<div className='black-circle-background' style={{
			width: '50px',
			height: '50px',
			top: '15%',
			left: '20%',
			animationDuration: '5s',
			'--rotate-start': '70deg',
    		'--rotate-mid': '45deg',
		}}></div>
		<div className='black-circle-background' style={{
			width: '30px',
			height: '30px',
			top: '30%',
			left: '15%',
			animationDuration: '6s',
			'--rotate-start': '70deg',
    		'--rotate-mid': '45deg',
		}}></div>
		<div className='black-circle-background' style={{
			width: '20px',
			height: '20px',
			top: '69%',
			left: '20%',
			animationDuration: '4s',
			'--rotate-start': '70deg',
    		'--rotate-mid': '45deg',
		}}></div>
	</div>
  )
}

export default QuizNew