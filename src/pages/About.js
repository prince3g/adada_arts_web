import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

import CllaImg1 from '../assets/Img/CllaImg/1.png';
import CllaImg2 from '../assets/Img/CllaImg/2.png';
import CllaImg3 from '../assets/Img/CllaImg/3.png';

import PartImg1 from '../assets/Img/part-cards/1.png';
import PartImg2 from '../assets/Img/part-cards/2.png';
import PartImg3 from '../assets/Img/part-cards/3.png';
import PartImg5 from '../assets/Img/part-cards/5.png';



import AbtMainImg1 from '../assets/Img/AbtImgMain1.png';

import Vist1 from '../assets/Img/vist1.png';
import Vist2 from '../assets/Img/vist2.png';
import Vist3 from '../assets/Img/vist3.png';

const About = () => {
  return (
    <div>
         <Helmet>
        <title>About us | A.R.T.S Training Services</title>
        <meta name="description" content="Accredited Recognized Training Solutions" />
        <meta name="keywords" content="A.R.T.S, training services, accredited health courses, about A.R.T.S training services" />
      </Helmet>

      <header className='header-sec About_Sec_Hh'>
        <div className='mid-container'>
          <div className='main-header'>
            <div className='header-hero'>
              <div className='hero_Txt'>
                <div>
                  
                  <h1 className='big-text'>We bridge knowledge gaps and support people development</h1>
                  <p className='big-p'>
                      We are people oriented online training development platform. It is our desire to contribute towards people 
                      and business growth through effective learning.
                  </p>
                  
                  <div className='Main_Course_Search'>
                    <input type='text' placeholder='What do you want to learn today?' />
                    <button>Search courses</button>
                  </div>


                </div>
              </div>
        
            </div>

          </div>
        </div>
      </header>

      <section className='Cllao_Sec'>
        <div className='site-container'>
          <ul>
            <li>
              <div><img src={CllaImg1}></img></div>
              <div>
                <p>Accredited courses for you</p>
                <span>All our courses are accreted and have interesting topics </span>
              </div>
            </li>

            <li>
            <div><img src={CllaImg2}></img></div>
              <div>
                <p>24/7 support</p>
                <span>Our support system is dedicated to providing continuous, and efficient assistance to you </span>
              </div>
            </li>

            <li>
            <div><img src={CllaImg3}></img></div>
              <div>
                <p>Amazing learning experience</p>
                <span>Engage your workforce with our mandatory and induction courses.  </span>
              </div>
            </li>
          </ul>
        </div>
      </section>


      
      <section className='site-Top-section'>
        <div className='mid-container'>
          
        <div className='Part_Sec'>
            <h3 className='mid-text'>A.R.T.S trusted partners</h3>
            <ul>
              <li><img src={PartImg1}></img> <p>Adada</p></li>
              <li><img src={PartImg2}></img><p>XCTP</p></li>
              <li><img src={PartImg3}></img><p>Proliance LTD</p></li>
              {/* <li><img src={PartImg4}></img><p></p></li> */}
              <li><img src={PartImg5}></img><p>Lacklearn</p></li>
            </ul>
          </div>

        <div className='Abt_Sec'>
        <div className='Abt_Banner'>
              <img src={AbtMainImg1}></img>
            </div>
            <div className='Abt_Dlt'>
              <div>
                <h2 className='Semi-mid-text'>Upskilling talent for the careers of the future</h2>
                <p className='p'>A.R.T.S is an ACCREDITED, RECOGNISED TRAINING SOLUTION for the Care industry and allied services. A.R.T.S is headquartered in Chester, United Kingdom and originally commenced training for 
                    healthcare workers as part of inhouse programme for our Service Partner.</p>
               <p className='p'>We have continually advanced our training services to help close identified skill gaps in care industry as well as other business sectors to bring learning
                 and development services close to people around the world.</p>

                <p className='p'>The mission to support people development around the world, through training, is what gave birth to our Online Training services (artstraining.co.uk) and improved training programmes 
                    covering different sectors and skill needs.</p>
              
              </div>
              
            </div>
        

            </div>


        </div>
        
      </section>


      <section className='Maihs_sec Gbagb_Sec'>
        <div className='mid-container'>        
     
      <div className='Missi_Viss_Sec'>
        <h2 className='Semi-mid-text'>Our mission, vission and value</h2>
        <div className='Mmai_grid'>
          <div className='Mmai_card'>
            <img src={Vist1}></img>
            <h3>Mission</h3>
            <p className='p'>To bridge knowledge gaps and support 
              people development through effective online training solutions</p>
          </div>

          <div className='Mmai_card'>
          <img src={Vist2}></img>
            <h3>Vision</h3>
            <p className='p'>To be a leading and recognized people oriented and development
               online training provider around the world.</p>
          </div>

          <div className='Mmai_card'>
          <img src={Vist3}></img>
            <h3>Value</h3>
            <p className='p'>We believe that both our people and customers shall experience personal and professional <b>GROWTH</b> through our learning solutions</p>
          </div>
        </div>
      </div>
          </div>
      </section>



    </div>
  );
};

export default About;
