import { createSlice } from "@reduxjs/toolkit";

export const currentTabSlice = createSlice({
	name: 'currentTab',
	initialState: {
		currentTab: '',
	},
	reducers: {
		setCurrentTab: (state, action) => {
			state.currentTab = action.payload
		}
	}
})

export const { setCurrentTab } = currentTabSlice.actions

export default currentTabSlice.reducer