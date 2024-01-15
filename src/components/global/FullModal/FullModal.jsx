import React, { useState } from 'react'
import './fullModal.css'
import Modal from '../../containers/Modal/Modal'
import Close from '../../../assets/icons/close.png'
import { useDispatch, useSelector } from 'react-redux'
import { close } from '../../../redux/modalSlice'
import axios from 'axios'
import { displayMessage } from '../../../redux/messageBoxSlice'
import { refresh } from '../../../redux/refreshSlice'
import { setCurrentLesson } from '../../../redux/currentLessonSlice'
function FullModal() {
	const dispatch = useDispatch()
	const {subjectName} = useSelector(state => state.currentSubject)
	const currentLesson = useSelector(state => state.currentLesson)
	const type = useSelector(state => state.modal.type)
	//const [type, setType] = useState("delete")
	// on adding
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
			dispatch(refresh())
		  }).catch(function (error) {
			dispatch(displayMessage({message: "pas pu ajouter la lesson", type: "error"}))
		  });
	}
	//validate delete lesson 
	function handleDeleteValidated() {
		axios.delete(`http://localhost:3000/api/lesson/delete/${currentLesson.lessonTitle}/${subjectName}`)
		.then((response) => {
			console.log(response.data);
			dispatch(displayMessage({message: "Supression réussie."}))
			dispatch(close())
			dispatch(refresh())
			dispatch(setCurrentLesson({lessonTitle: ""}))
		  })
		  .catch((error) => {
			console.error("API request error: ", error);
			dispatch(displayMessage({message: error.message, type: "error"}))
			dispatch(close())
		  });
	}
  return (
	<div className='fullModal'>
		<Modal>
			{type == 'delete' ?
			<div className='fullModal-ajouter'>
				<div className='fullModal-ajouter-title'>
					<h2>Suprimer une leçon</h2>
					<img className='fullModal-ajouter-title-close-btn' src={Close} onClick={() => dispatch(close())} />
				</div>
				<div className='fullModal-delete-form'>
					<p>Voulez-vous vraiment supprimer la leçon :</p>
					<p><strong>{currentLesson.lessonTitle}</strong> ?</p>
					<div className='fullModal-delete-form-btn-group'>
						<button onClick={handleDeleteValidated}>Suprimer</button>
						<button className='ghost-btn' onClick={() => dispatch(close())} >Annuler</button>
					</div>
				</div>
			</div>
			:
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
		}
		</Modal>
	</div>
  )
}

export default FullModal