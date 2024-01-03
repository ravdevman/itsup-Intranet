import React from 'react'
import './messageBox.css'
import { useSelector } from 'react-redux'

function MessageBox() {
	const message = useSelector(state => state.messageBox)

  return (
	<div className={message.type == 'error' ? 'messageBox errorBox' : 'messageBox successBox'}>
		{message.message}
	</div>
  )
}

export default MessageBox