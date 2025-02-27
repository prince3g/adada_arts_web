import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import UserProfile from './Img/userprofile.png';
import AllIcon from './Img/all-arrow.svg';
import Loader from './Img/loader.gif';
import Alert from './Alert';

const AddInstructor = ({ instructor, onClose, onUpdate }) => {

  const API_HOST = process.env.REACT_APP_API_HOST;
  const [profileImage, setProfileImage] = useState(UserProfile);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageFile, setImageFile] = useState(null); // Store the actual image file
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  
  const navigate = useNavigate(); // Initialize useNavigate
  const token = localStorage.getItem("authToken");



  useEffect(() => {
    if (instructor) {
      setEmail(instructor.instructor.email);
      setFirstName(instructor.instructor.firstName);
      setLastName(instructor.instructor.lastName);
      setProfileImage(instructor.instructor.image || UserProfile);
    }
  }, [instructor]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result); // For preview
      };
      reader.readAsDataURL(file);
      setImageFile(file); // Store the image file
    }
  };

  const triggerFileInput = () => {
    document.getElementById('file-upload-input').click();
  };

  const handleProceed = () => {
    if (!email.trim() || !firstName.trim() || !lastName.trim()) {
      setAlert({
        type: 'error',
        message: 'Please fill in all required fields.',
      });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    if (imageFile) {
      formData.append('image', imageFile); // Use the actual image file
    }
    
    const url = instructor
      ? `${API_HOST}api/courses/instructors/${instructor.sn}/`
      : `${API_HOST}api/courses/instructors/`;
      
    const method = instructor ? 'PATCH' : 'POST';

    fetch(url, {
      method: method,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(async response => {
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData); // Log error details
        if (errorData.message === 'Email already exists') {
          setAlert({
            type: 'error',
            message: 'Email already exists. Please use a different email.',
          });
          return;
        }
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setAlert({
        type: 'success',
        message: `Instructor ${instructor ? 'updated' : 'added'} successfully!`,
      });
      setTimeout(() => {
        if (instructor) {
          window.location.reload(); // Refresh the page for editing
        } else {
          navigate('a-instructors'); // Redirect to the instructor page after adding
        }
        onClose();
      }, 2000);
    })
    .catch(error => {
      setAlert({
        type: 'error',
        message: `Submission failed: ${error.message}`,
      });
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className='POpUp_Sec'>
      <div className='PopUp_Box'>
        <div className='top_Cc_upoload'>
          <div className='Cc_Kl'>
            <div className='Cc_title'>
              <h3>{instructor ? 'Edit Instructor' : 'Add Instructor'}</h3>
            </div>
            <span className='gap_img'>
              <img src={AllIcon} alt="All" />
            </span>
          </div>
          <div className='Cc_Btns_2'>
            <button className='proceed_Main_btn' onClick={handleProceed} disabled={loading}>
              {loading ? (
                <>
                  <span>Submitting...</span>
                  <img src={Loader} alt="Loading..." className='loader' />
                </>
              ) : (
                'Proceed'
              )}
            </button>
            <button className='close-btn' onClick={onClose}>Close</button>
          </div>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className='main_PopUP'>
          <div className='Box_ClasiK'>
            <div className='Upload_Input'>
              <p>Email Address</p>
              <div className='Upload_Input_main'>
                <input 
                  type='text' 
                  placeholder='Enter instructor email address' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className='Upload_Input'>
              <p>First Name</p>
              <div className='Upload_Input_main'>
                <input 
                  type='text' 
                  placeholder='Enter first name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div className='Upload_Input'>
              <p>Last Name</p>
              <div className='Upload_Input_main'>
                <input 
                  type='text' 
                  placeholder='Enter last name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='Box_ClasiK'>
            <div className='Upload_Input profile_input_Box'>
              <p>
                Upload profile photo
                <img
                  src={profileImage}
                  className='Profile_Upload'
                  alt="Profile"
                  onClick={triggerFileInput}
                  style={{ cursor: 'pointer' }}
                />
              </p>
              <div className='Upload_Input_main'>
                <input
                  type='file'
                  id='file-upload-input'
                  className='file-upload-input'
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInstructor;
