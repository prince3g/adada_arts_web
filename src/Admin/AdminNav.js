import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminIcon from './Img/admin-icon.svg';
import AllIcon from './Img/all-arrow.svg';
import HomeIcon from './Img/home-icon.svg';
import NoticeIcon from './Img/nofi-icon.svg';
import Logo from '../assets/Img/site-logo.png';
import SearchIcon from '../assets/Img/search-icon.svg';
import AdminUu from './Img/admin_uu.jpg';

function AdminNav() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/login');
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    alert('For security reasons, you need to logout of this environment before navigating to the home page, please logout');
  };

  return (
    <div className='AdminNav'>
      <div className='site-container'>
        <div className='AA_Nav_Content'>
          <a href='#' className='Amin_Logo'>
            <img src={Logo} alt="Site Logo" />
          </a>
          <div className='AA_Nav_Icons'>
            <div className='Aa_L_Dd'>
              <ul>
                <li>
                  <a href='#' className='mM_Home_aa' onClick={handleHomeClick}>
                    <img src={HomeIcon} alt="Home Icon" />Home
                  </a>
                </li>
                <li><img src={AllIcon} alt="All Icon" /></li>
                <li>
                  <NavLink to="/admin/" className='AdM_Dash'>
                    Dashboard
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className='Aa_R_Dd'>
              <div className='Admin_Search_Sec'>
                <button><img src={SearchIcon} alt="Search Icon" /></button>
                <input type='text' placeholder='Search' />
              </div>
              <ul>
                <li>
                  <NavLink to="/admin/notification" >
                    <img src={NoticeIcon} alt="Notice Icon" />
                  </NavLink>
                </li>
                <li>
                  <button className='logoOut_Aa' onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>

              <div className='Admin_Prol'>
                <div className='Aa_pp_1'>
                  <img src={AdminUu} alt="Admin Profile" />
                </div>
                <div className='Aa_pp_2'>
                  <div>
                    <p>A.R.T.S Admin</p>
                    <span>admin@artstraining.co.uk</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
