import React from 'react'
import './navbar.css'
import NavbarButton from '../NavbarButton/NavbarButton'
import Logo from '../../../assets/logo.png'
import Logout from '../../../assets/icons/logout.png'
import Calendar from '../../../assets/icons/calendar.png'
import StudentCenter from '../../../assets/icons/student-center.png'
import TeacherEdit from '../../../assets/icons/exercice.png'
import TeacherGrade from '../../../assets/icons/teacher-grade.png'
import StudentGrade from '../../../assets/icons/student-grade.png'
import QuizTeacher from '../../../assets/icons/quiz.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/currentUserSlice'
import { displayMessage } from '../../../redux/messageBoxSlice'
import ButtonInfo from '../NavbarButton/ButtonInfo/ButtonInfo'
import { setCurrentTab } from '../../../redux/currentTabSlice'

function Navbar() {
	const dispatch = useDispatch();
	const {role , profile} = JSON.parse(window.localStorage.getItem("user"));
	const navigate = useNavigate();

	function displayButtons(role) {
		if (role == 'Student'){
			return (
				<ul className='navbar-container-buttons'>
					<li><NavbarButton image={Calendar} onClick={() => navigate("/calendar")} label="Calendrier"/></li>
					<li><NavbarButton image={StudentCenter} onClick={() => navigate("/courses")} label="Cours"/></li>
					<li><NavbarButton image={StudentGrade} onClick={() => navigate("/grades")} label="Notes"/></li>
					<li><NavbarButton image={QuizTeacher} onClick={() => navigate("/quiz")} label="QCM"/></li>
				</ul>
			)
		}
		if (role == 'Teacher') {
			return (
				<ul className='navbar-container-buttons'>
					<li><NavbarButton image={Calendar} onClick={() => navigate("/calendar")} label="Calendrier"/></li>
					<li><NavbarButton image={TeacherEdit} onClick={() => navigate("/courses")} label="Cours"/></li>
					<li><NavbarButton image={TeacherGrade} onClick={() => navigate("/grades")} label="Notation"/></li>
					<li><NavbarButton image={QuizTeacher} onClick={() => navigate("/quiz")} label="QCM"/></li>
				</ul>
			)
		}
	}

  return (
	<nav className='navbar'>
		<div className='navbar-logo'>
			<img src={Logo} />
		</div>
		{displayButtons(role)}
		<div className='navbar-info'>
			<img className='navbar-profil btn' src={profile} onClick={() => {navigate("/profile");  dispatch(setCurrentTab("Profile"))}}/>
			<img className='navbar-logout btn' src={Logout} onClick={() =>{ navigate("/login"); window.localStorage.removeItem("user"); dispatch(displayMessage({message: 'Déconnexion réussie.'})); } } />
		</div>
	</nav>
  )
}

export default Navbar