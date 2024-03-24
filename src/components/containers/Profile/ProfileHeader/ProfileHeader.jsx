import React from 'react'
import './profileHeader.css'
import { useDispatch, useSelector } from 'react-redux'
import { displayMessage } from '../../../../redux/messageBoxSlice'
import { useNavigate } from 'react-router-dom'

function ProfileHeader() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const dispatch = useDispatch()
  const navigate = useNavigate();
  return (
	<div className='profileHeader'>
    <div className='profileHeader-info'>
      <img src={user.profile} />
      <h3>{user.name + " " +  user.lastname}</h3>
    </div>
    <button onClick={() => { navigate("/login"); window.localStorage.removeItem("user"); dispatch(displayMessage({message: 'Déconnexion réussie.'}))}}>Se Deconnecter</button>
  </div>
  )
}

export default ProfileHeader