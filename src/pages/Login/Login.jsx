import React, { useState } from 'react'
import Modal from '../../components/containers/Modal/Modal'
import './login.css'
import axios from 'axios';
import Logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../redux/currentUserSlice';
import { displayMessage } from '../../redux/messageBoxSlice';
import Blind from '../../assets/icons/blind.png'
import Eye from '../../assets/icons/eye.png'

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState(false)
  return (
	<div className='login'>
		<Modal>
			<div className='login_layout'>
				<img src={Logo} className='logo-modal' />
				<form onSubmit={handleSubmit} method='POST'>
					<label>Email</label>
					<input type='text' name='email' />
					<label>password</label>
					<div className='login_input-password'>
						<input type={isVisible ? 'text' : 'password'} name='password' />
						<span className='login_input-password-eye' onClick={() => setIsVisible(!isVisible)}>
							<img src={isVisible ? Blind : Eye} />
						</span>
					</div>
					<button>Se connecter</button>
				</form>
				<a href='' className='error'>Vous n'arrivez pas à accéder ?</a>
			</div>
		</Modal>
	</div>
  )


  function handleSubmit(e){
	e.preventDefault();
	const email = e.target.email.value;
	const password = e.target.password.value;
	axios.post('http://localhost:3000/api/auth', {
		email,
		password
	  })
	  .then(function (response) {
		const data = response.data.user;
		console.log(data);
		dispatch(setCurrentUser(data))
		dispatch(displayMessage({message: "Connexion réussie."}))
		navigate('/courses');
	  })
	  .catch(function (error) {
		console.log(error);
		dispatch(displayMessage({message: "L'authentification est invalide.", type: "error"}))
	  });
}
}


export default Login