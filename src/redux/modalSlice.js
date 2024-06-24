import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		isOpen: false,
		type: "",
		data: {},
	},
	reducers: {
		open: (state, action) => {
			state.isOpen = true
			state.type = action.payload.type
			state.data = action.payload.data ? action.payload.data : null
		},
		close: (state) => {
			state.isOpen = false
			state.type = ""
			state.data = null
		},
	}
})

export const { open, close } = modalSlice.actions

export default modalSlice.reducer