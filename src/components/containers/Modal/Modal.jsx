import React from 'react'
import './modal.css'

function Modal({children}) {
  return (
	<div className='modal slideDown'>
		{children}
	</div>
  )
}

export default Modal