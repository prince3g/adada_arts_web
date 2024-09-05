import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import GlobeIcon from '../assets/Img/globe-icon.svg';

const ForgotPass = () => {

  return (
    <div className='Reg_SecO'>
      <div className='Reg_banner'></div>
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
              <h3>Forgot Password</h3>
            </div>
            <form className='Reg_Form'>
              <div className='Reg_Input'>
                <input type="text" placeholder='Email Address' />
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

export default ForgotPass;
