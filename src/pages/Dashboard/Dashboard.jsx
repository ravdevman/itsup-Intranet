import React from 'react'
import './dashboard.css'
import Navbar from '../../components/global/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import FullModal from '../../components/global/FullModal/FullModal'
import { useSelector } from 'react-redux'

function Dashboard() {
	const {isOpen} = useSelector(state => state.modal)
  return (
	<div className='dashboard'>
		{isOpen ? <FullModal /> : null}
		<Navbar />
		<Outlet />
	</div>
  )
}

export default Dashboard