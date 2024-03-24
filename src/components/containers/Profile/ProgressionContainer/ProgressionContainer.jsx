import React from 'react'
import './progressionContainer.css'
import ProgressionMilestone from './ProgressionMilestone/ProgressionMilestone'
import NumberOne from '../../../../assets/icons/number-one.png'
import Graduation from '../../../../assets/icons/graduation.png'
import Diploma from '../../../../assets/icons/diploma.png'
import Graduate from '../../../../assets/icons/graduate.png'
import { useSelector } from 'react-redux'

const milestones = [
	{
		icon: NumberOne,
		title: "Premier année",
	},
	{
		icon: Graduation,
		title: "Technitien spécialiser",
	},
	{
		icon: Diploma,
		title: "Licence",
	},
	{
		icon: Graduate,
		title: "Master",
	}
]

function ProgressionContainer() {
	const { yearID } = JSON.parse(window.localStorage.getItem("user"));

	const setState = (index) => {
		if (index + 1 ==  yearID) {
			return 'in-progress'
		} else if (index + 1 < yearID) {
			return 'done'
		}
	}
  return (
	<div className='progressionContainer'>
		{
			milestones.map((milestone, index) => (
				<ProgressionMilestone key={index} icon={milestone.icon} title={milestone.title} state={setState(index)} separator={index + 1 == 4 ? false : true}/>
			))
		}
	</div>
  )
}

export default ProgressionContainer