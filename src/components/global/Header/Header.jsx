import React, { useEffect, useState } from 'react'
import './header.css'
import { useSelector } from 'react-redux'

function Header() {
	const lessons = useSelector(state => state.currentLesson)
	const [isAnimated, setIsAnimated] = useState(false)
	useEffect(() => {
		setIsAnimated(true)
		const timeoutId = setTimeout(() => {
			setIsAnimated(false)
		  }, 200);
		return () => clearTimeout(timeoutId);
	}, [lessons])

  return (
	<header className='header'>
		<div className='header-left'>
			<h2>Matière</h2>
		</div>
		<div className={isAnimated ? 'header-middle exit' : 'header-middle'}>
			<h3>{lessons.lessonDate != "" ? lessons.lessonDate : "Aucune lesson n'est selectioner"}</h3>
			<h1>{lessons.lessonTitle}</h1>
		</div>
		<div className='header-right'>
			<h2>leçons</h2>
		</div>
	</header>
  )
}

export default Header