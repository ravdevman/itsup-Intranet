import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState: {
		userID : '',
		name: '',
		lastname: '',
		role: '',
		yearName: '',
		departmentName: '',
		profile: '',
		className: '',
		email: '',
		yearID: '',
		departmentID: '',
		classID: '',
	},
	reducers: {
		setCurrentUser: (state, action) => {
			state.userID = action.payload.userID
			state.name = action.payload.name
			state.lastname = action.payload.lastname
			state.role = action.payload.role
			state.yearName = action.payload.yearName
			state.departmentName = action.payload.departmentName
			state.profile = action.payload.profile
			state.className = action.payload.className
			state.email = action.payload.email
			state.yearID = action.payload.yearID
			state.departmentID = action.payload.departmentID
			state.classID = action.payload.classID
		},
		logout: (state) => {
			state.userID = '';
			state.name = '';
			state.lastname = '';
			state.role = '';
			state.yearName = '';
			state.departmentName = '';
			state.profile = '';
			state.className = '';
			state.email = ''
			state.yearID = ''
			state.departmentID = ''
			state.classID = ''
		}
	}
})

export const { setCurrentUser, logout } = currentUserSlice.actions

export default currentUserSlice.reducer