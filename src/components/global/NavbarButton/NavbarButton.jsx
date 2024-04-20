import React, { useEffect } from 'react'
import './navbarButton.css'
import ButtonInfo from './ButtonInfo/ButtonInfo'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentTab } from '../../../redux/currentTabSlice'

function NavbarButton({image, label, onClick}) {
  const { currentTab } = useSelector(state => state.currentTab)
	const dispatch = useDispatch()

  return (
	<div className={`navbar-button ${currentTab && currentTab.toString().toLowerCase() == label.toString().toLowerCase() ? 'navbar-button-selected' : ''}`} onClick={() => {dispatch(setCurrentTab(label)) ;onClick()}}>
    <img src={image} />
    <ButtonInfo label={label}/>
  </div>
  )
}

export default NavbarButton