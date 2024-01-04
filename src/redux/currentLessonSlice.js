import { createSlice } from "@reduxjs/toolkit";

export const currentLessonSlice = createSlice({
	name: 'currentLesson',
	initialState: {
		lessonTitle: '',
		lessonDate: '',
		content: '',
		updatedTitle: '',
		updatedDate: ''
	},
	reducers: {
		setCurrentLesson: (state, action) => {
			state.lessonTitle = action.payload.lessonTitle
			state.lessonDate = action.payload.lessonDate
			state.content = action.payload.content
		},
		setUpdatedInfo: (state, action) => {
			state.updatedTitle = action.payload.updatedTitle
			state.updatedDate = action.payload.updatedDate
		}
	}
})

export const { setCurrentLesson, setUpdatedInfo } = currentLessonSlice.actions

export default currentLessonSlice.reducer