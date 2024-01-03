import React from 'react'
import './profile.css'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import ProfileContent from './ProfileContent/ProfileContent'

function Profile() {
  return (
	<div className='profile enter'>
    <ProfileHeader />
    <ProfileContent />
  </div>
  )
}

export default Profile