
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

import AbtImg3 from '../assets/Img/AbtImg3.png';

const PrivacyPage = () => {
  return (
    <div>

      <Helmet>
        <title>Privacy Policy | A.R.T.S Training Services </title>
        <meta name="description" content="Accredited Recognized Training Solutions" />
        <meta name="keywords" content="A.R.T.S, training services, accredited health courses, about A.R.T.S training services" />
      </Helmet>

      <section className='Hha_Secks Policy'>
        <div className='mid-container'>
            <h2 className='Semi-mid-text'>Privacy Policy</h2>
            <h3>Introduction</h3>
       <p>A.R.T.S is a registered and accredited training organization and all our services are carried out with the clear understanding that our customer data privacy is important and we are committed to the protection of personal information in accordance with the European General Data Protection Regulation (GDPR) and other relevant global privacy regulations. </p>
       
       <p>This Policy provides relevant details on how we collect and use your information when you use our platforms (<a href="https://artstraining.co.uk">www.artstraining.co.uk</a>) or mobile application, as well as your rights regarding your personal data. The policy is also applicable for all our training and allied services directly managed by us. You maybe directed to the links to partner, third party or relevant websites to enhance your user experience when using this website. You are duly advised to please go through individual websites privacy policies.</p>
       
       <p>By using our services, you agree to the terms of this Privacy Policy which may be updated time to time and communicated through this website. You will be notified of any update we made on this policy at every time.</p>
       
       <h3>Definitions</h3>
       
       <ul>
           <li><b>Data Subject:</b> Any individual, person, who can be identified, directly or, through an identifier (example, an identification number, location data, or through other factors specific to the individual or person’s physical, physiological, genetic, mental, economic, cultural or social identity.</li>
           
           <li><b>Data Processing:</b> any operation or set of operations, which is performed on Personal Data or on sets of Personal Data, whether or not by automated means, such as collection, recording, organization, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction</li>
           
           <li><b>Supervisory Authority:</b> The body having oversight of data protection administration in a country or jurisdiction.</li>
       </ul>
       
       <h3>The Functionality of our Website and Cookies</h3>
       
       <p>A.R.T.S website uses cookies and we collect data on your location and standard internet log-on details. This is to help us in analysing essential information to improve our services and provide tailored content that meets your learning needs. This information is not used to find out the identities of unregistered users or visitors to the site. No third-party cookies on website is also used to find out identities of all users and visitors. You can, at all times, be able to delete or disable some or all cookies in your browser setting.</p>
       
       <h3>Type of data we collect about you</h3>
       
       <p>As part of our operations as an online training provider, we collect and process certain types of information (such as name, telephone number, email and physical addresses, qualifications, country, date of birth, etc.) when you utilise the following sections of our website where it is a requirement that you provide your personal data;</p>
       
       <ul>
          <li>Registration as a learner</li>
            <li>Registration as an Instructor</li>

       </ul>
       
       <h3>Purpose Limitation</h3>
       
       <p>A.R.T.S collects Personal Data provided to us only for the purpose(s) identified accordingly by the Data Subject and for which consent has been obtained. Such Personal Data cannot be reused for another purpose that is incompatible with the original purpose, except if a new Consent is obtained. The purposes for which A.R.T.S will use your personal data include:</p>
       
       <ul>
           <li>For the provision of services to you. For example, when you enroll for a course or apply to become an instructor, we will use your personal data to process your requests.</li>
           <li>To process and issue completion certificates, display customize educational content and facilitate communication with other users, as applicable.</li>
           <li>For customer care and billing. When you use our services, we will use your personal information to bill you and to respond to inquiries and concerns that you may have about our learning and other services.</li>
           
           <li>Customer service messages. We will use your personal data to keep you updated with the latest information or changes about our products and services.</li>
           
           <li>For marketing purposes. To serve you better, we will use your personal data to market our products and services to you.</li>
           <li>Fraud prevention and security. We will process your personal and traffic data to protect you against and detect fraud, to protect and detect misuse or damage to our platform.</li>
       </ul>
       
       <h3>Legal Grounds for Processing of Personal Data</h3>
       
       <p>The personal data we collect from our users and how we collect it depends on the services that our users subscribe to, how they use our services and how they interact or interface with us. This also applies to people who are not users of A.R.T.S but have interacted with A.R.T.S. We may also obtain your personal data from a third party with permission to share it with us.</p>
       
       <p>Please note that we only process your personal data in line with relevant statutory requirements and the processing of Personal Data by A.R.T.S shall be lawful if at least one of the following applies:</p>
       
       <ul>
           <li>where you give us consent to the processing of your Personal Data for one or more specific purposes. You are at liberty to withdraw the consent and A.R.T.S will cease to process your Personal Data where there is no other basis to do so.</li>
           <li>Where the processing is necessary for the performance of a contract to which the Data Subject is party or in order to take steps at the request of the Data Subject prior to entering into a contract;</li>
           <li>processing is necessary for compliance with a legal obligation to which A.R.T.S is subject;</li>
           <li>processing is necessary to protect the vital interests of the Data Subject or of another natural person; and</li>
           <li>processing is necessary for the performance of a task carried out in the public interest or in the exercise of official public mandate vested in A.R.T.S.</li>
       </ul>
       
       <p>We collect your personal data when you do any of the following:</p>
       
       <ul>
           <li>Buy or use any of our products and services;</li>
            <li>Use our network or other A.R.T.S products and services;</li>
            <li>Register for a specific product or service;</li>
            <li>Fill in your information on our learner or instructor registration form, self-service applications, link your social media platforms;</li>

       </ul>
       
       <h3>Data Minimization</h3>
       
       <p>A.R.T.S limits Personal Data collection and usage to data that is relevant, adequate, and necessary for carrying out the purpose for which the data is processed. A.R.T.S will evaluate whether and to what extent the processing of personal data is necessary and where the purpose allows, anonymized data must be used.</p>
       
       <h3>Who we share your data with:</h3>
       
       
<ul>
<li>We share certain data about you with Training Administrators, other users (Instructor or Learner) and our learning partners. We do not share your email address, date of birth and sponsors details with Instructors and other delegates. </li>
<li>We may disclose your data to third parties for security reasons and as may be required by law.</li>
<li>We may also disclose data about you to our auditors and legal advisors to assess our disclosure obligations and rights under our Data and Privacy Policy.</li>
<li>We may receive or match your personal data from your social media accounts; such as Facebook, LinkedIn, Instagram, X, WhatsApp, when you link your accounts to our website for set up purposes. This is dependent on your settings on these sites as well as their respective privacy policies.</li>
</ul>
<p>If you have any questions, concerns, or disputes regarding our use and processing of your personal information, please feel free to contact our privacy team (including our Data Protection Officer) at <a href="mailto:info@artstraining.co.uk">info@artstraining.co.uk</a> </p>
<h3>Protection of your data, Integrity and Confidentiality</h3>
<p>A.R.T.S shall establish adequate controls to protect the integrity and confidentiality of Personal Data, both in digital and physical format, and to prevent personal data from being accidentally or deliberately compromised. Personal information of Data Subjects must be protected from unauthorized viewing or access and from unauthorized changes to ensure that it is reliable and correct. </p>
<p>Our website is secure and duly encrypted to ensure adequacy in protection of your personal data. We shall carry out routine maintenance and reviews to ensure only authorised party have access to your personal information</p>
<h3>Personal Data Retention</h3>
<p>All personal information shall be retained, stored, and destroyed by A.R.T.S in line with legislative and regulatory guidelines. For all Personal Data and records obtained, used, and stored within A.R.T.S, we shall perform periodical reviews of the data retained to confirm the accuracy, purpose, validity, and requirement to retain.</p>
<p>To the extent permitted by applicable laws and without prejudice to A.R.T.S Document Retention Policy, the length of storage of Personal Data shall, amongst other things, be determined by:</p>
<ul>
<li>the contract terms agreed between A.R.T.S and the Data Subject or if it is needed for the purpose for which it was obtained;</li>
<li>whether the transaction or relationship has statutory implication or a required retention period;</li>
<li>whether there is an express request for deletion of Personal Data by the Data Subject, provided that such request will only be treated where the Data Subject is not under any investigation which may require A.R.T.S to retain such Personal Data, or there is no subsisting contractual arrangement with the Data Subject that would require the processing of the Personal Data;</li>
<li>whether A.R.T.S has another lawful basis for retaining that information beyond the period for which it is necessary to serve the original purpose.</li>
</ul>
<p>Notwithstanding the foregoing and pursuant to the GDPR, A.R.T.S shall be entitled to retain and process Personal Data for archiving, scientific research, historical research, or statistical purposes for the public interest.
A.R.T.S would forthwith delete Personal Data in her possession where such Personal Data is no longer required by A.R.T.S or in line with A.R.T.S Retention Policy, provided no law or regulation is in force that requires A.R.T.S to retain such Personal Data.</p>
<h3>Accountability</h3>
<p>A.R.T.S demonstrates accountability in line with the GDPR obligations by monitoring and continuously improving data privacy practices within A.R.T.S.
Any individual or employee who breaches this policy may be subject to internal disciplinary action (up to and including termination of their employment) and may also face civil or criminal liability if their action violates the law.</p>
<h3>Data Privacy Notice</h3>
<p>A.R.T.S considers Personal Data confidential and as such must be adequately protected from unauthorized use and/or disclosure. A.R.T.S will ensure that the Data Subjects are provided with adequate information regarding the use of their Personal Data as well as acquire their respective Consent, where necessary.</p>
<p>A.R.T.S shall display a simple and conspicuous notice (Privacy Notice) on any medium through which Personal Data is being collected or processed. The following information must be considered for inclusion in the Privacy Notice, as appropriate in distinct circumstances to ensure fair and transparent processing:</p>
<ul>
<li>Description of collectible Personal Data;</li>
<li>Purposes for which Personal Data is collected, used, and disclosed;</li>
<li>What constitutes Data Subjects Consent;</li>
<li>Purpose for the collection of Personal Data;</li>
<li>The technical methods used to collect and store the information;</li>
<li>Available remedies in the event of a violation of the Policy and the timeframe for remedy; and</li>
<li>Adequate information to initiate the process of exercising their privacy rights, such as access to, rectification, and deletion of Personal Data.</li>
</ul>
<h3>Consent</h3>
<p>Where the processing of Personal Data is based on consent, we shall obtain the requisite consent at the time of collection of the Personal Data. In this regard, you consent to the processing of your Personal Data when you access our platforms or use our services, content, features, technologies, or functions offered on our website or other digital platforms. You can withdraw your consent at any time, but such withdrawal will not affect the lawfulness of processing based on consent given before its withdrawal.</p>
<h3>Consent of Minors</h3>
<p>In the unlikely event that we deal with minors, the consent of minors will always be protected and obtained from minors’ representatives in accordance with applicable regulatory requirements.</p>
<h3>Data Subject Rights</h3>
<p>All individuals who are the subject of Personal Data held by A.R.T.S are entitled to the following rights:</p>
<p>Right to request for and access their Personal Data collected and stored. Where data is held electronically in a structured form, such as in a database, the Data Subject has a right to receive that data in a common electronic format;</p>
<ul>
<li>Right to information on their personal data collected and stored;</li>
<li>Right to objection or request for restriction;</li>
<li>Right to object to automated decision making;</li>
<li>Right to request rectification and modification of their data which A.R.T.S keeps;</li>
<li>Right to request for deletion of their data, except as restricted by law or A.R.T.S’ s statutory obligations;</li>
<li>Right to request the movement of data from A.R.T.S to a Third Party; this is the right to the portability of data; and</li>
<li>Right to object to, and to request that A.R.T.S restricts the processing of their information except as required by law or A.R.T. S’s statutory obligations.</li>
</ul>
<h3>To opt out of marketing and unsolicited messages:</h3>
<p>If you no longer want to receive marketing messages from A.R.T.S, you can choose to opt out at any time. If you have previously opted in to receive personalized content based on how and where you use our platform, you can also opt out at any time.</p>
<h3>There are various ways to opt out:</h3>
<ul>
<li>Contact our customer services team see the contact us page;</li>
<li>Click the unsubscribe icon or link from our email;</li>
<li>Disable push notification messages, including marketing messages, at any time in our apps/platform by changing the notification/alert settings on your device or by uninstalling the app;</li>
</ul>
<h3>Third-Party Processor</h3>
<p>If A.R.T.S engage the services of third parties to process your Personal Data collected by us. The processing by such third parties shall be governed by a written contract with A.R.T.S to ensure adequate protection and security measures are put in place by the third party for the protection of Personal Data in accordance with the terms of this Policy and relevant regulations. We may also share your personal data with law enforcement agencies where required by law to do so.</p>
<p>Where applicable, A.R.T.S will share your information with:</p>
<ul>
<li>Partners, or agents involved in delivering the products and services you have ordered or used. For example, when you enroll for a course, your request may be handled by our business partner who is bound by contract to protect your personal data.</li>
<li>Law enforcement agencies, government bodies, regulatory organizations, courts, or other public authorities if we must, or are authorized by law. For example, a law enforcement agency may request a service provider to keep or release any traffic data, subscriber information, content, or non-content information. This is however for law enforcement purposes only.</li>
<li>A third party or body where such disclosure is required to satisfy any applicable law or other legal or regulatory requirements e.g. to detect or prevent fraud or the commission of any other crime.</li>
<li>A merging or acquiring entity where we undergo business reorganization e.g merger, acquisition, or takeover.</li>
</ul>
<h3>Your Rights</h3>
<p>A.R.T.S collects Personal Data only for the purposes identified in this Policy and such information cannot be reused for another purpose that is incompatible with the original purpose.</p>
<p>You can exercise the following rights with respect to your Personal Data with A.R.T.S:</p>
<ul>
<li>request for and access your Personal Data collected and stored by A.R.T.S;</li>
<li>withdraw consent at any time. For example, you can withdraw your consent to the receipt of our marketing or promotional materials or unsubscribe to our newsletters;</li>
<li>object to automated decision making;</li>
<li>request rectification and modification of Personal Data kept by A.R.T.S;</li>
<li>request for deletion of your Personal Data;</li>
<li>be informed of and entitled to provide consent prior to the processing of Personal Data for purposes other than that for which the Personal Data was collected;</li>
<li>request that A.R.T.S restricts processing of your Personal Data; and</li>
<li>request for information regarding any specific processing of your personal data.</li>
</ul>
<p>If you wish to exercise any of these rights, you may contact our Data Protection Officer (DPO) using the contact details provided below. 
Our website uses Google Analytics, a web analytics service provided by Google, Inc. (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland). Such use includes the 'Universal Analytics' mode of operation. This makes it possible if a user is logged into a Google service, to assign data, sessions, and interactions across multiple devices to a pseudonymous user ID and thus to analyze the user's activities across such devices.</p>

<h3>WEB ANALYTICS</h3>
<p>A.R.T.S uses Google Analytics to measure behavior of users on the website. Google Analytics cookies records data about a user as well as remember user behavior across websites. A unique ID is assigned to users which does not identify personality and is not used to track personal information. It only enables Google to track individual activity and return visits.</p>
<p>If you wish to prevent the collection of data regarding your activity on our website by Google Analytics, you can use Google Analytics opt-out browser add-on available at https://tools.google.com/dlpage/gaoptout/.  You can also prevent the storage of cookies by adjusting your browser software accordingly.</p>
<h3>Changes to the policy</h3>
<p>A.R.T.S reserves the right to change, amend or alter this Policy at any point in time. If we amend this Policy, we will provide you with the updated version </p>
<h3>Contact & Communication</h3>
<p>If you would like further information on this Noticem, contact us at Unit 2, Church Farm Court, Capenhurst Ln, Capenhurst, Chester CH1 6HE, United Kingdom or <a href="mailto:support@artstraining.co.uk">support@artstraining.co.uk</a> </p>

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

export default PrivacyPage;
