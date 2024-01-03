import { createSlice } from "@reduxjs/toolkit";

export const currentLessonSlice = createSlice({
	name: 'currentLesson',
	initialState: {
		lessonTitle: '',
		lessonDate: '',
		content: ''
	},
	reducers: {
		setCurrentLesson: (state, action) => {
			state.lessonTitle = action.payload.lessonTitle
			state.lessonDate = action.payload.lessonDate
			state.content = action.payload.content
		}
	}
})

export const { setCurrentLesson } = currentLessonSlice.actions

export default currentLessonSlice.reducer