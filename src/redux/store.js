import { configureStore } from '@reduxjs/toolkit'
import currentSubjectReducer from './currentSubjectSlice'
import currentLessonReducer from './currentLessonSlice'
import currentUserReducer from './currentUserSlice'
import messageBoxReducer from './messageBoxSlice'
import modalReducer from './modalSlice'
import refreshReducer from './refreshSlice'
import currentTabReducer from './currentTabSlice'

export default configureStore({
  reducer: {
	currentSubject: currentSubjectReducer,
  currentLesson: currentLessonReducer,
  currentUser: currentUserReducer,
  messageBox: messageBoxReducer,
  modal: modalReducer,
  refresh: refreshReducer,
  currentTab: currentTabReducer
  }
})