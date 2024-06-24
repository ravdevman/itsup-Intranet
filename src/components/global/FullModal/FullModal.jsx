import React, { useEffect, useState } from 'react'
import './fullModal.css'
import Modal from '../../containers/Modal/Modal'
import Close from '../../../assets/icons/close.png'
import { useDispatch, useSelector } from 'react-redux'
import { close } from '../../../redux/modalSlice'
import axios from 'axios'
import { displayMessage } from '../../../redux/messageBoxSlice'
import { refresh } from '../../../redux/refreshSlice'
import { setCurrentLesson } from '../../../redux/currentLessonSlice'
import { MODALS } from '../../../utils/constants'
function FullModal() {
	const dispatch = useDispatch()
	const {subjectName} = useSelector(state => state.currentSubject)
	const currentLesson = useSelector(state => state.currentLesson)
	const type = useSelector(state => state.modal.type)
	const data = useSelector(state => state.modal.data)
	const [resultQuizRanking, setResultQuizRanking] = useState()
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

	useEffect(() => {
		if (type == MODALS.QUIZ_RESULT) {
			axios.get(`http://localhost:3000/api/quizResult?quizId=${data.quizID}`)
			.then((response) => {
				setResultQuizRanking(response.data.result)
			  })
			  .catch((error) => {
			  console.error("API request error: ", error);
			  });
		}
	}, [])
  return (
	<div className='fullModal'>
		<Modal>
			{type == MODALS.DELETE_LESSON ?
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
			: null}
			{type == MODALS.ADD_LESSON ? <div className='fullModal-ajouter'>
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
		  : null}
		  {type == MODALS.QUIZ_RESULT ? <div className='fullModal-ajouter'>
				<div className='fullModal-ajouter-title'>
					<h2>Résultat</h2>
					<img className='fullModal-ajouter-title-close-btn' src={Close} onClick={() => dispatch(close())} />
				</div>
				<div>
					{resultQuizRanking?.map(student => (
						<div key={student.studentID} className='fullModal-quiz-student-container'>
							<img height={64} width={64} src={student.profile} />
							<div className='fullModal-quiz-student-info-container'>
								<h5>{student.name + " " + student.lastname}</h5>
								<h6>{student.className}</h6>
							</div>
							<div className='fullModal-quiz-student-grade' style={{
								color: `${student.quizGradePercentage <= 50 ? "var(--red)" : "var(--green)" }`
							}}>{student.quizGradePercentage}%</div>
						</div>
					))}
				</div>
			</div>
		  : null}
		</Modal>
	</div>
  )
}

export default FullModal