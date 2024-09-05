import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

import ContactImg from '../assets/Img/contact-Img.png';

import LocationIcon from '../assets/Img/location-icon.svg';
import CallIcon from '../assets/Img/call-icon.svg';
import EmailIcon from '../assets/Img/email-icon.svg';

const Contact = () => {
  return (
    <div>
         <Helmet>
        <title>Contact us | A.R.T.S Training Services </title>
        <meta name="description" content="Accredited Recognized Training Solutions" />
        <meta name="keywords" content="A.R.T.S, training services, accredited health courses, about A.R.T.S training services" />
      </Helmet>

      <section className='Lla_Contact_sec'>
        <div className='site-container'>
            <div className='Lla_Contact_Main'>
                <div className='Lla_Contact_L'>
                    <img src={ContactImg}></img>
                </div>
                <div className='Lla_Contact_R'>
                    <div>
                        <h3>Drop a message</h3>
                        <form className='Cont_Form'>
                            <div className='Dd_Flex'>
                            <div className='Cont_Form_Inpt'>
                                <input type='text' name='' placeholder='Full Name'></input>
                            </div>
                            <div className='Cont_Form_Inpt'>
                                <input type='text' name='' placeholder='Email Address'></input>
                            </div>
                            </div>
                            <div className='Cont_Form_Inpt'>
                                <input type='text' name='' placeholder='Phone Number'></input>
                            </div>
                            <div className='Cont_Form_Inpt'>
                                <input type='text' name='' placeholder='Interest Service'></input>
                            </div>
                            <div className='Cont_Form_Inpt'>
                                <textarea type='text' name='' placeholder='Type message here'></textarea>
                            </div>
                            <div className='Cont_Form_Inpt'>
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </section>


      <section className='Cont_DLts'>
        <div className='site-container'>
            <ul>
                <li>
                    <img src={LocationIcon}></img>
                    <p>Address</p>
                    <span className='p'>Unit 2, Church Farm Court, Capenhurst Ln, Capenhurst, Chester CH1 6HE, United Kingdom</span>
                </li>
                <li>
                   <img src={CallIcon}></img>
                    <p>Phone number</p>
                    <span className='p'>03300582045</span>
                </li>
                <li>
                <img src={EmailIcon}></img>
                    <p>Emaill Address</p>
                    <span className='p'>info@artstraining.co.uk ,</span><br></br> 
                    <span className='p'>support@artstraining.co.uk</span>
                </li>
            </ul>
        </div>
      </section>


    



    </div>
  );
};

export default Contact;
