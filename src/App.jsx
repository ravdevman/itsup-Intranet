import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import MessageBox from './components/global/MessageBox/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { removeMessage } from './redux/messageBoxSlice'

function App({router}) {
	const message = useSelector(state => state.messageBox)
	const dispatch = useDispatch()
	useEffect(() =>  {
		const timeoutId = setTimeout(() => {
			dispatch(removeMessage())
		  }, 3000);
		return () => clearTimeout(timeoutId);
	}, [message])
	return (
	<>
		{ message.displayed ? <MessageBox /> : null }
		<RouterProvider router={router} />
 	</>
  )
}

export default App