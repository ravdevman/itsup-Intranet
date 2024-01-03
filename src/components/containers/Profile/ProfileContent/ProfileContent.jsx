import React from 'react'
import './profileContent.css'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useSelector } from 'react-redux'

function ProfileContent() {
	const user = useSelector(state => state.currentUser)
  return (
	<div className='profileContent'>
		<h3 className='profileContent-title'>Votre Profile</h3>
		<div className='profileContent-container'>
		<ProfileModal>
			<div className='profileContent-image'>
				<img src={user.profile}/>
				
			</div>
		</ProfileModal>
		<ProfileModal>
			<div className='profileContent-details'>
				<h3 className='profileContent-title'>Details</h3>
				<form>
					<label>Nom</label >
					<input type='text' readOnly value={user.name} />
					<label>Prenom</label>
					<input type='text' readOnly value={user.lastname}/>
					<label>Email</label>
					<input type='text' readOnly value={user.email} />
				</form>
			</div>
		</ProfileModal>
		</div>
	</div>
  )
}

export default ProfileContent