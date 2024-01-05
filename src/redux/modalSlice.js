import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		isOpen: false,
		type: ""
	},
	reducers: {
		open: (state, action) => {
			state.isOpen = true
			state.type = action.payload.type
		},
		close: (state) => {
			state.isOpen = false
			state.type = ""
		},
	}
})

export const { open, close } = modalSlice.actions

export default modalSlice.reducer