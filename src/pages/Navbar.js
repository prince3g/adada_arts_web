import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Make sure this context is set up correctly
import HelpIcon from '../assets/Img/help-icon.svg';
import ArrowDownIcon from '../assets/Img/arrow-down.svg';
import GlobeIcon from '../assets/Img/globe-icon.svg';
import Logo from '../assets/Img/site-logo.png';

const Navbar = ({ toggleSubNav, isSubNavVisible }) => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();



  const handleNavToggle = () => {
    setIsNavActive(!isNavActive);
  };

  const handleNavClick = () => {
    setIsNavActive(false);
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    toggleSubNav();
    handleNavClick();
  };

  const toggleSectionVisibility = (section) => {
    setVisibleSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page after logout
  };

  const handleDashboardClick = () => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/dashboard'); // Redirect based on role
    }
  };

  return (
    <nav className={`NaVbar ${isNavActive ? 'active-Navbar' : ''}`}>
      <div className='Top_Nav'>
        <div className='site-container'>
          <div className='Nav_Content'>
            <Link to='/' className='site-logo' onClick={handleNavClick}>
              <img src={Logo} alt="Site Logo" />
            </Link>
            <div className='Nav_Icons'>
              <ul>
                <li className={`explore-Cc-Icon ${isSubNavVisible ? 'active-explore-Cc' : ''}`}>
                  <a href='#' onClick={handleExploreClick}>
                    Explore courses <img src={ArrowDownIcon} alt="Arrow-down Icon" />
                  </a>
                </li>

                <li className='Mobile-Nav-Icon'>
                  <Link to='/health-category' onClick={handleNavClick}>Health and Social Care Courses</Link>
                </li>

                <li className='Mobile-Nav-Icon'>
                  <Link to='/leadership-category' onClick={handleNavClick}>Leadership and Management Courses</Link>
                </li>

                <li>
                  <Link to='/arts-training' className='arts_training_Btn' onClick={handleNavClick}>
                    A.R.T.S training
                  </Link>
                </li>
                <li>
                  <Link to='/about' onClick={handleNavClick}>
                    About us
                  </Link>
                </li>
                <li>
                  <Link to='/help' onClick={handleNavClick}>
                    Help <img src={HelpIcon} alt="Help Icon" />
                  </Link>
                </li>
              </ul>
              <ul className='Rr_Nav_Ul'>
                {user ? (
                  <>
                    <li><a href="javascript:void(0);" onClick={handleDashboardClick}>Dashboard</a></li>
                    <li><a href="javascript:void(0);" className='signup_btn' onClick={handleLogout}>Logout</a></li>
                  </>
                ) : (
                  <>
                    <li><Link to='/login' onClick={handleNavClick}>Login</Link></li>
                    <li><Link to='/signup' className='signup_btn' onClick={handleNavClick}>Sign Up</Link></li>
                  </>
                )}
              </ul>
            </div>
            <div className='Rr_Sec_D'>
              <div className='lang_Div'>
                <span><img src={GlobeIcon} alt="Globe Icon" /></span>
                <p>EN</p>
                <ul className='lang_DropDown'>
                  <li>EN</li>
                </ul>
              </div>
              <div className='Nav_Toggler' onClick={handleNavToggle}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
