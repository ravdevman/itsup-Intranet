import React from 'react'
import './progressionMilestone.css'
import Approval from '../../../../../assets/icons/approval.png'

function ProgressionMilestone({icon, title, state, separator = false}) {

	const getState = () => {
		if (state === 'done') {
			return 'progressionMilestone-image milestone-done glow';
		  } else if (state === 'in-progress') {
			return 'progressionMilestone-image milestone-in-progress glow2';
		  } else {
			return 'progressionMilestone-image slow-fade';
		  }
	}
  return (
	<div className='progressionMilestone-container'>
		<div className='progressionMilestone' style={{overflow: 'hidden'}}>
			<div className={getState()}>
				<img src={state === 'done' ? Approval : icon} />
			</div>
			<div className='progressionMilestone-title'>
				<p>{title}</p>
			</div>
		</div>
		{separator == true ?
			<div className={state === 'done' ? 'progressionMilestone-separator separator-done glow1' : 'progressionMilestone-separator slow-fade'}></div> : null
		}
	</div>
  )
}

export default ProgressionMilestone