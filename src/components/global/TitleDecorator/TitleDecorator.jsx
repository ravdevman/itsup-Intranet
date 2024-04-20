import React from 'react'
import './titleDecorator.css'

function TitleDecorator({children}) {
  return (
	<div className='title-decorator-container'>
		<div className='title-decorator'></div>
		{children}
	</div>
  )
}

export default TitleDecorator