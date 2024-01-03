import { createSlice } from "@reduxjs/toolkit";

export const currentSubjectSlice = createSlice({
	name: 'currentSubject',
	initialState: {
		subjectName: '',
	},
	reducers: {
		setCurrentSubject: (state, action) => {
			state.subjectName = action.payload
		}
	}
})

export const { setCurrentSubject } = currentSubjectSlice.actions

export default currentSubjectSlice.reducer