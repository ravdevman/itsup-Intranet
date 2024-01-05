import React, { useEffect, useRef, useState } from 'react'
import './header.css'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdatedInfo } from '../../../redux/currentLessonSlice'

function Header() {
	const lessons = useSelector(state => state.currentLesson)
	const [isAnimated, setIsAnimated] = useState(false)
	const role = useSelector(state => state.currentUser.role)
	const dispatch = useDispatch()
	const updatedTitleRef = useRef(lessons.lessonTitle)
	const updatedDateRef = useRef(lessons.lessonDate)
	useEffect(() => {
		//set the updatedInfo
		updatedTitleRef.current = lessons.lessonTitle
		updatedDateRef.current = lessons.lessonDate
		dispatch(
			setUpdatedInfo({
			  updatedTitle: lessons.lessonTitle,
			  updatedDate: lessons.lessonDate,
			})
		  );
		//activate the animation 
		setIsAnimated(true)
		const timeoutId = setTimeout(() => {
			setIsAnimated(false)
		  }, 200);
		return () => clearTimeout(timeoutId);
	}, [lessons.lessonTitle])

		function handleTitleChange(e) {
			const newUpdatedTitle = e.target.value;
			updatedTitleRef.current = newUpdatedTitle
			dispatch(setUpdatedInfo({updatedTitle: updatedTitleRef.current , updatedDate: updatedDateRef.current}))
		}
		function handleDateChange(e) {
			const newUpdatedDate = e.target.value;
			updatedDateRef.current = newUpdatedDate
			dispatch(setUpdatedInfo({updatedTitle: updatedTitleRef.current , updatedDate: updatedDateRef.current}))
		}
  return (
	<header className='header'>
		<div className='header-left'>
			<h2>Matière</h2>
		</div>
		<div className={isAnimated ? 'header-middle exit' : 'header-middle'}>
			<h3>{role == 'Teacher' ? <input type='date' onChange={handleDateChange} value={updatedDateRef.current} /> : lessons.lessonDate}</h3>
			{role == 'Teacher' ? <input type='text' onChange={handleTitleChange} className='header-title-input' value={updatedTitleRef.current} /> :<h1> {lessons.lessonTitle}</h1>}
		</div>
		<div className='header-right'>
			<h2>leçons</h2>
		</div>
	</header>
  )
}

export default Header