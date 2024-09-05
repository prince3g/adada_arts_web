import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

import TrainingImg1 from '../assets/Img/trainingImg1.png';
import TrainingImg2 from '../assets/Img/trainingImg2.png';



import AbtImg1 from '../assets/Img/AbtImg1.png';

const Training = () => {
  return (
    <div>
         <Helmet>
        <title>A.R.T.S Training | A.R.T.S Training Services </title>
        <meta name="description" content="Accredited Recognized Training Solutions" />
        <meta name="keywords" content="A.R.T.S, training services, accredited health courses, about A.R.T.S training services" />
      </Helmet>

      <section className='Maihs_sec Glans_Bg training_HeroO'>
        <div className='mid-container'>        
     
        <div className='Abt_Sec'>
            
            <div className='Abt_Dlt'>
              <div>
                <h2 className='Semi-mid-text'>Building workforce and talent for today and tomorrow.</h2>
               <p className='p'>Our training programmes are solution driven as they are designed to equip learners with the right skills to make positive and direct impact in their respective fields.</p>

            <div className='Abt_Btns'>
             <a href='#'>Find out more</a>
            </div>
              
              </div>
              
            </div>
            <div className='Abt_Banner'>
              <img src={TrainingImg1}></img>
            </div>

            </div>

          </div>
      </section>

      
      <section className='site-Top-section'>
        <div className='mid-container'>
          


        <div className='Abt_Sec'>
        <div className='Abt_Banner'>
              <img src={TrainingImg2 }></img>
            </div>
            <div className='Abt_Dlt'>
              <div>
                <h2 className='Semi-mid-text'>Equipping leaders with the right skills</h2>
               <p className='p'>Our business, administrative and leadership courses are tailored to help close identified skill gaps among workforce to help build that competency requirements for successful 
                business growth and building of essential corporate governance framework.</p>

                <p className='p'>The courses are designed to directly impact individuals and businesses positively through equipped learning and reshaping of workers approach towards
                   business core values and growth trajectory.</p>

            <div className='Abt_Btns'>
             <a href='#'>Get started</a>
            </div>
              
              </div>
              
            </div>
        

            </div>


        </div>
        
      </section>


      <section className='Maihs_sec Gbagb_Sec'>
        <div className='mid-container'>        
     
        <div className='Abt_Sec'>
  

            <div className='Abt_Dlt'>
              <div>
                <h2 className='Semi-mid-text'>Amazing learning experience with A.R.T.S</h2>
                <ul>
                  <li>
                    <p>Virtual learning</p>
                    <span className='p'>The UK’s most respected and recognised courses delivered in an interactive, live online classroom.</span>
                  </li>
                  <li>
                    <p>Classroom learning</p>
                    <span className='p'>Attend a training course in a specialist, quiet and focused environment.</span>
                  </li>
                  <li>
                    <p>E-Learning</p>
                    <span className='p'>Pre-recorded assets allow you to study for your qualification in your own time, wherever you are.</span>
                  </li>
                </ul>
              </div>
              
            </div>
        
            <div className='Abt_Banner'>
              <img src={AbtImg1}></img>
            </div>

          </div>

          </div>
      </section>



    </div>
  );
};

export default Training;
