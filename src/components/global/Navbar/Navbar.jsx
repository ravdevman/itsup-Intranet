import React from 'react'
import './navbar.css'
import NavbarButton from '../NavbarButton/NavbarButton'
import Logo from '../../../assets/logo.png'
import Logout from '../../../assets/icons/logout.png'
import Calendar from '../../../assets/icons/calendar.png'
import StudentCenter from '../../../assets/icons/student-center.png'
import TeacherEdit from '../../../assets/icons/exercice.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/currentUserSlice'
import { displayMessage } from '../../../redux/messageBoxSlice'
import ButtonInfo from '../NavbarButton/ButtonInfo/ButtonInfo'

function Navbar() {
	const dispatch = useDispatch();
	const {role , profile} = useSelector(state => state.currentUser);
	const navigate = useNavigate();

	function displayButtons(role) {
		if (role == 'Student'){
			return (
				<ul className='navbar-container-buttons'>
					<li><NavbarButton image={Calendar} onClick={() => navigate("/calendar")} label="Calendrier"/></li>
					<li><NavbarButton image={StudentCenter} onClick={() => navigate("/courses")} label="Cours"/></li>
				</ul>
			)
		}
		if (role == 'Teacher') {
			return (
				<ul className='navbar-container-buttons'>
					<li><NavbarButton image={Calendar} onClick={() => navigate("/calendar")} label="Calendrier"/></li>
					<li><NavbarButton image={TeacherEdit} onClick={() => navigate("/courses")} label="Cours"/></li>
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
			<img className='navbar-profil btn' src={profile} onClick={() => navigate("/profile")}/>
			<img className='navbar-logout btn' src={Logout} onClick={() =>{  dispatch(logout()); dispatch(displayMessage({message: 'Déconnexion réussie.'})); window.location.reload(false);} } />
		</div>
	</nav>
  )
}

export default Navbar