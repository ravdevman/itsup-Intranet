import React from 'react'
import './fullModal.css'
import Modal from '../../containers/Modal/Modal'
import Close from '../../../assets/icons/close.png'
import { useDispatch, useSelector } from 'react-redux'
import { close } from '../../../redux/modalSlice'
import axios from 'axios'
import { displayMessage } from '../../../redux/messageBoxSlice'
function FullModal() {
	const dispatch = useDispatch()
	const {subjectName} = useSelector(state => state.currentSubject)

	function handleSubmit(e) {
		e.preventDefault()
		const lessonTitle = e.target.lessonTitle.value;
		const lessonDate = e.target.lessonDate.value;
		axios.post('http://localhost:3000/api/lesson/add', {
			lessonTitle,
			lessonDate,
			subjectName
		})
		.then(function (response) {
			dispatch(displayMessage({message: "Lesson ajoute avec succes"}))
			dispatch(close())
		  }).catch(function (error) {
			dispatch(displayMessage({message: "pas pu ajouter la lesson", type: "error"}))
		  });
	}
  return (
	<div className='fullModal'>
		<Modal>
			<div className='fullModal-ajouter'>
				<div className='fullModal-ajouter-title'>
					<h2>Ajouter une leçon</h2>
					<img className='fullModal-ajouter-title-close-btn' src={Close} onClick={() => dispatch(close())} />
				</div>
				<form method='POST' onSubmit={handleSubmit}>
					<label>Matière</label>
					<p>{subjectName}</p>
					<label>Titre de la leçon</label>
					<input type='text' name='lessonTitle' />
					<label>Date</label>
					<input type='date' name='lessonDate' />
					<button>Ajouter</button>
				</form>
			</div>
		</Modal>
	</div>
  )
}

export default FullModal