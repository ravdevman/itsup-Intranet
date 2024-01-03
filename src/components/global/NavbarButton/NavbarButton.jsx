import React from 'react'
import './navbarButton.css'
import ButtonInfo from './ButtonInfo/ButtonInfo'
function NavbarButton({image, label, onClick}) {
  return (
	<div className='navbar-button' onClick={onClick}>
    <img src={image} />
    <ButtonInfo label={label}/>
  </div>
  )
}

export default NavbarButton