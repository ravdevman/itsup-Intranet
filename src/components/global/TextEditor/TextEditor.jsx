import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import './textEditor.css'
import axios from 'axios';
import { displayMessage } from '../../../redux/messageBoxSlice';

function TextEditor() {
	const role = useSelector(state => state.currentUser.role)
	const subjectName = useSelector(state => state.currentSubject.subjectName)
	const {content, lessonTitle, updatedTitle, updatedDate} = useSelector(state => state.currentLesson)
	const [value, setValue] = useState(content);
	const dispatch = useDispatch()


	// You can customize the toolbar options here
	const toolbarOptions = [
		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
		['bold', 'italic', 'underline', 'strike'],        // toggled buttons
		['code-block'],
		['link'],
		[{ 'list': 'ordered'}, { 'list': 'bullet' }],
	
		[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
		[{ 'align': [] }],
	
		['clean'],                                 // remove formatting button
	];
 
	function handleClick() {
		// edit lesson
		axios.put(`http://localhost:3000/api/lesson/update/${lessonTitle}/${subjectName}`, { value, updatedTitle, updatedDate })
		  .then((response) => {
			console.log(response.data);
			dispatch(displayMessage({message: "Modification réussie."}))
		  })
		  .catch((error) => {
			console.error("API request error: ", error);
			dispatch(displayMessage({message: error.message, type: "error"}))
		  });
	  }

	function displayContent(role) {
		if (role == 'Student') {
			return <div className='displayText' dangerouslySetInnerHTML={{ __html: content }} /> 
		}
		if (role == 'Teacher') {
			return (
				<div className='textEditing'>
					<ReactQuill theme="snow" value={value} onChange={setValue} modules={{toolbar: toolbarOptions }} />
					<div className='btnContainer'>
						<button className='updatebtn' onClick={handleClick}>Modfier</button>
					</div>
				</div>	
			)
		}
	}

	useEffect(() => {
		setValue(content)
	}, [content])

  	return 	displayContent(role)

}

export default TextEditor