import { createSlice } from "@reduxjs/toolkit";

export const refreshSlice = createSlice({
	name: 'refresh',
	initialState: {
		isRefresh: false,
	},
	reducers: {
		refresh: (state) => {
			state.isRefresh = true
		},
		stopRefresh: (state) => {
			state.isRefresh = false
		},
	}
})

export const { refresh, stopRefresh } = refreshSlice.actions

export default refreshSlice.reducer
