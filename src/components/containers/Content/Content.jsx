import React from 'react'
import './content.css'
import Header from '../../global/Header/Header'
import MainContent from '../MainContent/MainContent'

function Content() {
  return (
	<div className='content enter'>
		<Header />
		<MainContent />
	</div>
  )
}

export default Content