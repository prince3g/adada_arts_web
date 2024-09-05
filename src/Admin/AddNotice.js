import React, { useState, useEffect } from 'react';
import AllIcon from './Img/all-arrow.svg';
import MessageEditor from './MessageEditor';

const AddNotice = ({ onClose }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [courseDescription, setCourseDescription] = useState(''); // Initialize state for course description

  useEffect(() => {
    // Get current date
    const today = new Date();
    const date = today.toISOString().substr(0, 10); // Format: YYYY-MM-DD
    setCurrentDate(date);
  }, []);

  const handleClose = () => {
    // Trigger the onClose prop function
    if (onClose) {
      onClose();
    }
  };

  const handleProceed = () => {
    // Implement your proceed functionality here
    console.log('Proceed button clicked');
  };

  return (
    <div className='POpUp_Sec'>
      <div className='PopUp_Box'>
        <div className='top_Cc_upoload'>
          <div className='Cc_Kl'>
            <div className='Cc_title'>
              <h3>Add Notice</h3>
            </div>
            <span className='gap_img'><img src={AllIcon} alt="All" /></span>
          </div>
          <div className='Cc_Btns_2'>
            <button className='proceed_Main_btn' onClick={handleProceed}>Proceed</button>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>

        <div className='main_PopUP'>
          <div className='Box_ClasiK'>
            <div className='Upload_Input'>
              <p>Notice type</p>
              <div className='Upload_Input_main'>
                <select>
                  <option>Select notice type</option>
                  <option>New course notice</option>
                  <option>System maintenance notice</option>
                  <option>New upgrade notice</option>
                  <option>New season notice</option>
                </select>
              </div>
            </div>

            <div className='Upload_Input'>
              <p>Title</p>
              <div className='Upload_Input_main'>
                <input type='text' placeholder='Enter notice title' />
              </div>
            </div>

            <div className='Upload_Input'>
              <p>Date</p>
              <div className='Upload_Input_main'>
                <input type="date" id="date" value={currentDate} readOnly />
              </div>
            </div>
          </div>

          <div className='Box_ClasiK'>
            <div className='Upload_Input'>
              <p>Type Notice Here</p>
              <MessageEditor
                value={courseDescription}
                onChange={setCourseDescription}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddNotice;
