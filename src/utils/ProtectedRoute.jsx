import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
	const user = useSelector(state => state.currentUser)
 // check if there is a userID
  return user.userID ? children : <Navigate to="/login" />
}

export default ProtectedRoute