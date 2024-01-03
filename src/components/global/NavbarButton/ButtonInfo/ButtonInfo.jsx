import React from 'react'
import './buttonInfo.css'

function ButtonInfo({label}) {
  return (
	<div className='buttonInfo'>
		<label>{label}</label>
	</div>
  )
}

export default ButtonInfo