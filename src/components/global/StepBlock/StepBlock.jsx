import React from 'react'
import './stepBlock.css'
import { STEP_BLOCK_STATE } from '../../../utils/constants'

function StepBlock({title, number, blockState}) {
  return (
	<div className="step-block-container">
		<p className='step-block-title'>
			{title}
		</p>
		<div className={`step-block-number ${blockState == STEP_BLOCK_STATE.SELECTED ? 'step-block-selected' : blockState == STEP_BLOCK_STATE.NOT_SELECTED ? 'step-block-not-selected' : ''}`}>
			{number}
		</div>
	</div>
  )
}

export default StepBlock