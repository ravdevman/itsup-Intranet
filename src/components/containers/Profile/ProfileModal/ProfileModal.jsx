import React from 'react'
import './profileModal.css'

function ProfileModal({children}) {
  return (
	<div className='profileModal'>
		{children}
	</div>
  )
}

export default ProfileModal