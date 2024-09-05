import React from 'react';
import { Link } from 'react-router-dom';

import RecImg from '../assets/Img/rec-img.png';
import GlobeIcon from '../assets/Img/globe-icon.svg';
import Logo from '../assets/Img/site-logo.png';
import FacebookIcon from '../assets/Img/facebook-icon.svg';
import LinkedinIcon from '../assets/Img/linkedin-icon.svg';
import TwitterIcon from '../assets/Img/twitter-icon.svg';

const Footer = () => {
  return (
    <div>
      <footer className='site-footer'>
        <div className='mid-container'>
            <div className='footer-content'>
                <div className='foot-Card'>
                    <div>
                    <img src={Logo} className='foot-logo' alt="Site Logo" />
                    <p className='p'>We have designed our training programmes and platforms to help meet 
                        both individuals and corporate organizational training needs.</p>

                        <h4>We are recognized by:</h4>

                        <img src={RecImg} alt="Recognized By" />

                        </div>
                </div>
                <div className='foot-Card'>
                    <div>
                    <h4>Company</h4>
                    <ul>
                        <li><Link to='/health-category'>Healthcare courses</Link></li>
                        <li><Link to='/leadership-category'>Leadership courses</Link></li>
                        {/* <li><Link to='/others'>Other courses</Link></li> */}
                        <li><Link to='/arts-training'>A.R.T.S Training</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/help'>Help and support</Link></li>
                        <li><Link to='/terms'>Terms and conditions</Link></li>
                        <li><Link to='/privacy'>Privacy Policy</Link></li>

                    </ul>
                    </div>
                </div>
                <div className='foot-Card'>
                    <div className='SsLla-Div'>
                    <button><img src={GlobeIcon} alt="Globe Icon" /> English</button>
                    <div className="foot-Card-foot">
                        <div className='social-icon'>
                            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
                                <img src={FacebookIcon} alt="Facebook Icon" />
                            </a>
                            <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
                                <img src={LinkedinIcon} alt="LinkedIn Icon" />
                            </a>
                            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
                                <img src={TwitterIcon} alt="Twitter Icon" />
                            </a>
                        </div>
                        <h6>© {new Date().getFullYear()} A.R.T.S</h6>
                    </div>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
