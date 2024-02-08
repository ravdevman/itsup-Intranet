import React, { useEffect, useState } from 'react'
import './grades.css'
import GradesHeader from './GradesHeader/GradesHeader'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { displayMessage } from '../../../redux/messageBoxSlice';

function Grades() {
	const user = useSelector(state => state.currentUser)
	const dispatch = useDispatch()
	const [options, setOptions] = useState({
		"years": [

		],
		"departments": [
		],
		"subjects": [
		]
	})
	const [classesOption, setClassesOption] = useState({
		"classes": [
		]
	})
	const [selectedClass, setSelectedClass] = useState('')
	const [selectedOptions, setSelectedOptions] = useState({});
	const [studentsList, setStudentsList] = useState([])
	const [grades, setGrades] = useState({})
	const [subjects , setSubjects] = useState([])

	// get the options
	useEffect(() => {

		if (user.role == "Teacher") {
			axios.get('http://localhost:3000/api/grades/options', {
				params: {
					userID: user.userID
				}
			}).then((res) => {
				setOptions(res.data)
						// If departments are available, trigger handleDepartmentChange to get classes dynamicly
						if (res.data.departments.length > 0) {
							handleDepartmentChange({ target: { value: res.data.departments[0] } });
						}
			}).catch((err) => {
				console.error("API request error: ", err);
			})
		}
		if (user.role == "Student") {
			axios.get('http://localhost:3000/api/grades/student/subjects', {
				params: {
					userID: user.userID
				}
			}).then((res) => {
				setSubjects(res.data.student)
			}).catch((err) => {
				console.error("API request error: ", err);
			})
		}
	}, [])


	// get classes 
	function handleDepartmentChange(e) {
		const departmentName = e.target.value;
		axios.get('http://localhost:3000/api/grades/options/classes', {
			params: {
				departmentName
			}
		}).then((res) => {
			setClassesOption(res.data)
		}).catch((err) => {
			console.error("API request error: ", err);
		})
	}
	// when searching students
	function handleSubmitSearch(e) {
		e.preventDefault();
		const { classes, exams, subjects } = e.target

		axios.get('http://localhost:3000/api/grades/options/students', {
			params: {
				className: classes.value
			}
		}).then(res => {
			setStudentsList(res.data.students)
			console.log("the student list is :", res.data.students)
			setGrades({})
			setSelectedOptions({
				examID: exams.value,
				subjectName: subjects.value,
			})
		}).catch(err => {
			console.error("API request error: ", err);
		}) 
	}
	// geting grades from the inputs 
	function handleInputChange(userID , value) {
		setGrades(prevGrade => ({
			...prevGrade,
			[userID]: value
		}))
		console.log(grades)
	}
	// when clicked on the grading button
	function handleGrading() {
		axios.post('http://localhost:3000/api/grades/insert', grades, {
			params: {
				examID: selectedOptions.examID,
				subjectName: selectedOptions.subjectName
			} }).then(res => {
				console.log(res)
				dispatch(displayMessage({message: "Notes ajouter avec succes."}))
			}).catch(err => {
				console.error("API request error: ", err);
			})
	}

const displayGradeSection = () => {
	if (user.role == "Teacher") {
		return (
		<div className='grades-teacher-container'>
			<div className='grades-teacher-container-sort-section'>
				<form onSubmit={handleSubmitSearch}>
					<h2>Trier par :</h2>
					<label>Année *</label>
					<select name="year" required>
						{options.years.map((year ,index ) => <option key={index} value={year}>{year}</option>)}
					</select>

					<label>Departement *</label>
					<select name="departments" required onChange={handleDepartmentChange}>
						{options.departments.map((department ,index ) => <option key={index} value={department}>{department}</option>)}
					</select>
					
					<label>Class *</label>
					<select name="classes" required onChange={e => setSelectedClass(e.target.value)}>
						{classesOption.classes.map((classItem, index) => <option key={index} value={classItem}>{classItem}</option>) }
					</select>

					<label>Evaluation *</label>
					<select name="exams" required>
						<option value="1">Premier</option>
						<option value="2">Deusieme</option>
						<option value="3">Final</option>
					</select>

					<label>Matièr *</label>
					<select name="subjects" required>
						{options.subjects.map((subject,index) => <option key={index} value={subject}>{subject}</option>)}
					</select>

					<button>Rechercher</button>
				</form>

			</div>
			<div className='grades-teacher-container-list-section'>
				<h2>List :</h2>
				<table>
				<tr>
					<th>ID</th>
					<th>Nom et Prenom</th>
					<th>Note</th>
				</tr>
				{studentsList.length > 0 ? studentsList.map(student => 
				<tr>
					<td>{student.userID}</td>
					<td>{student.name + " " + student.lastname}</td>
					<td>{student.grade ? <p>{student.grade}</p> : <input type='text'
					onChange={(e) => handleInputChange(student.userID, e.target.value)}/>}
						</td>
				</tr>
				) :
				<tr>
					<td colSpan="3">aucun etudiant</td>
				</tr>}
				</table>
				{studentsList.length > 0 ? <button onClick={handleGrading} >Noter</button> : null}
				
			</div>
		</div>
		)
	}
	if (user.role == "Student") {
		return (
			<div className='grades-student-container'>
				<div className='grades-student-container-report'>
					<div className='grades-student-container-report-details'>
						<h2>Details :</h2>
						<form>
							<div className='details-info-container'>
								<label>ID</label >
								<input type='text' readOnly value={user.userID} />
							</div>
							<div className='details-info-container'>
								<label>Nom et Prenom</label>
								<input type='text' readOnly value={user.name + " " + user.lastname}/>
							</div>
							<div className='details-info-container'>
								<label>Annee</label>
								<input type='text' readOnly value={user.yearID} />
							</div>
							<div className='details-info-container'>
								<label>Departement</label>
								<input type='text' readOnly value={user.departmentID} />
							</div>
							<div className='details-info-container'>
								<label>la class</label>
								<input type='text' readOnly value={user.classID} />
							</div>
						</form>
					</div>
					<div className='grades-student-container-report-table'>
						<table>
							<tr>
								<th>Matier</th>
								<th>Evaluation N1</th>
								<th>Evaluation N2</th>
								<th>evaluation final</th>
							</tr>
							{subjects.map((subject, index) => (
									<tr key={index}>
										<th>{subject.subjectName}</th>
										<td>{subject.exam1}</td>
										<td>{subject.exam2}</td>
										<td>{subject.exam3}</td>
									</tr>
								))}
						</table>
					</div>
				</div>
			</div>
		)
	}
}
  return (
	<div className='grades-container enter'>
		<GradesHeader />
		{displayGradeSection()}
	</div>
  )
}


export default Grades