import React, { useEffect, useState } from 'react'
import './selector.css'
import Book from '../../../assets/icons/book.png'
import Puzzle from '../../../assets/icons/puzzle.png'
import Locked from '../../../assets/icons/lock.png'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSubject } from '../../../redux/currentSubjectSlice'
import { setCurrentLesson } from '../../../redux/currentLessonSlice'
import axios from 'axios'

function Selector({title, date ,  componentType, onClick}) {

  const dispatch = useDispatch()
  const currentLesson = useSelector(state => state.currentLesson.lessonTitle)
  const currrentSubject = useSelector(state => state.currentSubject.subjectName)
  const role = useSelector(state => state.currentUser.role)
  const [isClicked, setIsClicked] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    displayLocked()
    if (currentLesson == title || currrentSubject == title ) {
      setIsClicked(true)
    } else {
      setIsClicked(false)
    }
  }, [date, currentLesson, currrentSubject])

  function handleClick() {
    if (componentType != 'lesson') {
      //if its a subject
      dispatch(setCurrentSubject(title))
    } else {
      //if its a lesson and its not locked
      if (componentType == 'lesson' && !isLocked) {
        axios.get(`http://localhost:3000/api/getlesson?lessonTitle=${title}`)
        .then((response) => {
          console.log(response.data.lessons[0])
          dispatch(setCurrentLesson(response.data.lessons[0]))
          })
          .catch((error) => {
          console.error("API request error: ", error);
          });
      } 
    }
  }
  function displayLocked() {
    if (componentType === 'lesson' && role == 'Student') {
      const todayDate = new Date()
      const lessonDate = new Date(date)
      if (todayDate > lessonDate) {
        setIsLocked(false)
      } else {
        setIsLocked(true)
      }
    }
  }
  function displayedIcon() {
    if (componentType === 'lesson' && isLocked) {
      return Locked;
    } 
    // If it's not locked and it's not a lesson, default to Book
    if (componentType !== 'lesson') {
      return Book;
    }
    // If it's not locked and it's a lesson, default to Puzzle
    return Puzzle;
  }
  function displayCss() {
    if (isClicked) {
      return 'selector on'
    }
    if (isLocked) {
      return 'selector locked'
    }
    return 'selector'
  }
  return (
	<div className={displayCss()} onClick={handleClick}>
    <img src={displayedIcon()} />
    <div className='selector-title'>
      <p>{title}</p>
    </div>
  </div>
  )
}

export default Selector