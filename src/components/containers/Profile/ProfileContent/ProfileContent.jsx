import React, { useState } from 'react'
import './profileContent.css'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import ProgressionContainer from '../ProgressionContainer/ProgressionContainer'
import { storage } from '../../../../utils/firebase'
import {ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { displayMessage } from '../../../../redux/messageBoxSlice'
import axios from 'axios'
import { setCurrentUser } from '../../../../redux/currentUserSlice'
function ProfileContent() {
	const user = useSelector(state => state.currentUser)
	const dispatch = useDispatch();
	const [imageUploaded, setImageUploaded] = useState();
	const [isUploadBtnDisabled, setIsUploadBtnDisabled] = useState(false);
	function isValidImageType(file) {
		const allowedTypes = ['image/png', 'image/jpeg'];
		return allowedTypes.includes(file.type);
	  }
	  function handleUploadImage() {
		if (imageUploaded === null || !isValidImageType(imageUploaded)) {
		  dispatch(displayMessage({message: "on accepte uniquement fichier .png ou .jpeg", type: "error"}))
		  return;
		}
		const imageName = `${Date.now()}_${imageUploaded.name}`;
		const imageRef = ref(storage, `profileImages/${imageName}`);
		setIsUploadBtnDisabled(true)
		uploadBytes(imageRef, imageUploaded).then(() => {
			
		dispatch(displayMessage({message: "photo de profile modifier."}))
		  getDownloadURL(imageRef).then((downloadURL) => {
			axios.put(`http://localhost:3000/api/profile/picture`, { email: user.email , downloadURL })
			.then((response) => {
				console.log(response.data);
				dispatch(setCurrentUser({ ...user, profile: downloadURL }))
				setIsUploadBtnDisabled(false)
			  })
			  .catch((error) => {
				console.error("API request error: ", error);
				dispatch(displayMessage({message: error.message, type: "error"}))
			  });
		  });
		});
	  }
	
  return (
	<div className='profileContent'>
		<h3 className='profileContent-title'>Votre Profile</h3>
		<div className='profileContent-container'>
		<ProfileModal>
			<div className='profileContent-image'>
				<img src={imageUploaded ? URL.createObjectURL(imageUploaded) : user.profile}/>
				<input type='file' onChange={(e) => setImageUploaded(e.target.files[0])}/>
				{imageUploaded ? <button disabled={isUploadBtnDisabled} className={isUploadBtnDisabled ? 'profileContent-image-btn btn-disabled' : 'profileContent-image-btn'} onClick={handleUploadImage}>valider</button> : null}
			</div>
		</ProfileModal>
		<ProfileModal>
			<div className='profileContent-details'>
				<h3 className='profileContent-title'>Details</h3>
				<form>
					<label>Nom</label >
					<input type='text' readOnly value={user.name} />
					<label>Prenom</label>
					<input type='text' readOnly value={user.lastname}/>
					<label>Email</label>
					<input type='text' readOnly value={user.email} />
				</form>
			</div>
		</ProfileModal>
		{user.role == 'Student' ? 
		<ProfileModal>
			<div className='profileContent-progression'>
				<h3 className='profileContent-title'>Progression</h3>
				<ProgressionContainer />
			</div>
		</ProfileModal> : null
		}
		</div>
	</div>
  )
}

export default ProfileContent