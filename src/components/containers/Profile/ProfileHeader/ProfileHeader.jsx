import React from 'react'
import './profileHeader.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../redux/currentUserSlice'
import { displayMessage } from '../../../../redux/messageBoxSlice'

function ProfileHeader() {
  const user = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  return (
	<div className='profileHeader'>
    <div className='profileHeader-info'>
      <img src={user.profile} />
      <h3>{user.name + " " +  user.lastname}</h3>
    </div>
    <button onClick={() => { dispatch(logout()); dispatch(displayMessage({message: 'Déconnexion réussie.'})); window.location.reload(false)}}>Se Deconnecter</button>
  </div>
  )
}

export default ProfileHeader