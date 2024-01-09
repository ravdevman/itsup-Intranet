import React from 'react'
import './progressionMilestone.css'
import Approval from '../../../../../assets/icons/approval.png'

function ProgressionMilestone({icon, title, state, separator = false}) {

	const getState = () => {
		if (state === 'done') {
			return 'progressionMilestone-image milestone-done';
		  } else if (state === 'in-progress') {
			return 'progressionMilestone-image milestone-in-progress';
		  } else {
			return 'progressionMilestone-image';
		  }
	}
  return (
	<div className='progressionMilestone-container'>
		<div className='progressionMilestone'>
			<div className={getState()}>
				<img src={state === 'done' ? Approval : icon} />
			</div>
			<div className='progressionMilestone-title'>
				<p>{title}</p>
			</div>
		</div>
		{separator == true ?
			<div className={state === 'done' ? 'progressionMilestone-separator separator-done' : 'progressionMilestone-separator'}></div> : null
		}
	</div>
  )
}

export default ProgressionMilestone