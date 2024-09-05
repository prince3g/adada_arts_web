
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

import AbtImg3 from '../assets/Img/AbtImg3.png';

const TermsPage = () => {
  return (
    <div>

      <Helmet>
        <title>Terms and Conditions | A.R.T.S Training Services </title>
        <meta name="description" content="Accredited Recognized Training Solutions" />
        <meta name="keywords" content="A.R.T.S, training services, accredited health courses, about A.R.T.S training services" />
      </Helmet>

      <section className='Hha_Secks'>
        <div className='mid-container'>
            <h2 className='Semi-mid-text'>Terms and Conditions</h2>
            <p className='big-p'>Your access to and use of the information, materials, and services provided on the A.R.T.S’s website is conditional upon your acceptance and compliance with the following Terms and Condition</p>

            <ol>
                <li className='p'>Your access and/or use of the A.R.T.S website constitutes acceptance of these Terms and Conditions as at the period (date and time) of your first use of the <a href='#'>www.artstraining.co.uk</a></li>
                <li className='p'>A.R.T.S reserves the rights to amend these Terms and Conditions at any period by publishing the changes on our website</li>
                <li className='p'>You agree to use the www.artstraining.co.uk website only for Lawful Purpose such that the rights of others to utilise the services of the website are not infringed or restricted.</li>
                <li className='p'>Intellectual Property: A.R.T.S retains all intellectual property rights subsisting in any goods or services provided to you by us.</li>
                <li className='p'>To the extent permitted by Law, A.R.T.S excludes all liability for any loss or changes including, without limitation, indirect, special or consequential loss or damages, or any loss or changes whatsoever arising from the use or in connections do not limit or exclude A.R.T.S from liability resulting from negligence, fraud or any liability which cannot be excluded in accordance with applicable law.</li>
                <li className='p'>A.R.T.S takes no responsibility for the content of external internet websites. Links to any other websites or pages you visited shall be at your own risk and A.R.T.S shall not be responsible or liable for any damages resulting from the use of such other websites.</li>
                <li className='p'>Payments: All amounts owing to A.R.T.S must be paid and confirmed before a service is fulfilled. You are obliged to pay for the services that A.R.T.S agrees to provide you with regardless of whether you utilise or fully utilise those services. Payments using any of our approved payment gateway (as maybe displayed and directed) depend on the selected payment method. A.R.T.S may decide not to approve your registrations for a learning services if full payment for the service has not been received and conformed. You agree that A.R.T.S may disclose this information to a credit reporting agency or any other interested person, as maybe applicable.</li>
                <li className='p'>Communication: Any communication or material transmitted to, or post on, any public area of the website including any data, questions, comments, replies, shall be treated as non-confidential and non-proprietary information. A.R.T.S reserves the right to remove any such communication or material from www.artstraining.co.uk website at its own discretion.</li>
                <li className='p'>Limitations of liability and disclaimer: A.R.T.S does not warrant that the functions and materials contained in the website will be error free or uninterrupted; that defects will be corrected; that the websites, or the server that makes it available are free of viruses or bugs; or represent the full functionality, accuracy and reliability of the materials.</li>
                <li className='p'>Vetting of users’ information: A.R.T.S as an online learning service provider, acts as a medium through which individuals seek training services. A.R.T.S does not vet, nor is it responsible for vetting candidates or the representations made by them whether oral or in writing - including those representations appearing in candidates' resumes and profile. Instructors uploaded records as evident of competence may undergo vetting to confirm essential information.</li>
                <li className='p'>Commercial use or publication of all or any material displayed in the website is strictly prohibited without authorization from A.R.T.S.</li>
                <li className='p'>Authorisation: you expressly authorise A.R.T.S to store and retain all registrations submitted in response to any training enrolment or requests for our services</li>


            </ol>
        </div>
      </section>


      <section className='Maihs_sec Glans_Bg'>
        <div className='mid-container'>        
     
        <div className='Abt_Sec'>
            
            <div className='Abt_Dlt'>
              <div>
                <h2 className='Semi-mid-text'>Learn. Innovate. Improve</h2>
               <p className='p'>Virtual, classroom and e-learning skills development courses designed to help your people and businesses achieve.</p>

            <div className='Abt_Btns'>
             <a href='#'>Get started</a>
            </div>
              
              </div>
              
            </div>
            <div className='Abt_Banner'>
              <img src={AbtImg3}></img>
            </div>

            </div>

          </div>
      </section>


     
    </div>
  );
};

export default TermsPage;
