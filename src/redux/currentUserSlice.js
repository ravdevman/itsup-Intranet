import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState: {
		userID : '',
		name: '',
		lastname: '',
		role: '',
		yearID: '',
		departmentID: '',
		profile: '',
		email: ''
	},
	reducers: {
		setCurrentUser: (state, action) => {
			state.userID = action.payload.userID
			state.name = action.payload.name
			state.lastname = action.payload.lastname
			state.role = action.payload.role
			state.yearID = action.payload.yearID
			state.departmentID = action.payload.departmentID
			state.profile = action.payload.profile
			state.email = action.payload.email
		},
		logout: (state) => {
			state.userID = '';
			state.name = '';
			state.lastname = '';
			state.role = '';
			state.yearID = '';
			state.departmentID = '';
			state.profile = '';
			state.email = ''
		}
	}
})

export const { setCurrentUser, logout } = currentUserSlice.actions

export default currentUserSlice.reducer