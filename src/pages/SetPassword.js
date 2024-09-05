import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import GlobeIcon from '../assets/Img/globe-icon.svg';
import GoogleIcon from '../assets/Img/google-icon.png';
import OpenEyeIcon from '../assets/Img/open-eye-icon.svg';
import CloseEyeIcon from '../assets/Img/close-eye-icon.svg';

const SetPassword = () => {
  // State to manage the visibility of the password
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to toggle the visibility of the password
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className='Reg_SecO Simp_Oosi'>
      <div className='Reg_Env'>
        <div className='Top_Nav_l'>
          <div className='Top_Nav_l_main'>
            <ul className='Rr_Nav_Ul'>
              <li>
                <Link to='/login' className='signup_btn'>Login</Link>
              </li>
            </ul>
            <div className='Rr_Sec_D'>
              <div className='lang_Div'>
                <span><img src={GlobeIcon} alt="Globe Icon" /></span>
                <p>EN</p>
                <ul className='lang_DropDown'>
                  <li>EN</li>
                  {/* <li>FN</li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='Reg_Form_Sec'>
          <div className='Reg_Form_Box'>
            <div className='Reg_Header'>
              <h3>Set New Password</h3>
            </div>
            <form className='Reg_Form'>
          
              <div className='Reg_Input'>
                <div className='Reg_Pass'>
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder='Password'
                  />
                  <span className='ShowHidePass' onClick={togglePasswordVisibility}>
                    <img
                      src={isPasswordVisible ? CloseEyeIcon : OpenEyeIcon}
                      alt={isPasswordVisible ? 'Hide Password' : 'Show Password'}
                    />
                  </span>
                </div>
              </div>
              <div className='Reg_Input'>
                <input type="password" placeholder='Confirm password' />
              </div>
              <div className='Reg_Input'>
                <input type="submit" value='Submit' />
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
