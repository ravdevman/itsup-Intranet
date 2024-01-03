import { createSlice } from "@reduxjs/toolkit";

export const messageBoxSlice = createSlice({
	name: 'messageBox',
	initialState: {
		message : '',
		type: '',
		displayed: false,
	},
	reducers: {
		displayMessage: (state, action) => {
			state.message = action.payload.message
			state.type = action.payload.type
			state.displayed = true
		},
		removeMessage: (state) => {
			state.message = ''
			state.type = ''
			state.displayed = false
		}
	}
})

export const { displayMessage , removeMessage } = messageBoxSlice.actions

export default messageBoxSlice.reducer