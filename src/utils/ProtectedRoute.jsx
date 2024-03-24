import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
	const userStorageString = window.localStorage.getItem("user");
	
	const userStorage = userStorageString ? JSON.parse(userStorageString) : null;
	
	// check if there is a userID
	return userStorage && userStorage.userID ? children : <Navigate to="/login" />;
}

export default ProtectedRoute