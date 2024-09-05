import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Make sure this context is set up correctly
import Loader from '../assets/Img/loader.gif'; // Loader image
import Alert from './Alert'; // Custom alert component
import { auth, provider, signInWithPopup } from './firebase'; // Firebase imports

import GlobeIcon from '../assets/Img/globe-icon.svg';
import OpenEyeIcon from '../assets/Img/open-eye-icon.svg';
import CloseEyeIcon from '../assets/Img/close-eye-icon.svg';
import GoogleIcon from '../assets/Img/google-icon.png';

import Logo from '../assets/Img/site-logo.png';

const Login = () => {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      setAlert({ type: 'success', message: 'Login successful' });
    } catch (error) {
      setAlert({ type: 'error', message: 'An error occurred while logging in' });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      await login(result.user);
      setAlert({ type: 'success', message: 'Login successful' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Google login failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='Reg_SecO'>
      <div className='Reg_banner'></div>

      <div className='Reg_Env'>
        <div className='Top_Nav_l Reg_Tt_NAva'>
          <Link to='/' className='site-logo'>
            <img src={Logo} alt="Site Logo" />
          </Link>
          <div className='Top_Nav_l_main'>
            <ul className='Rr_Nav_Ul'>
              <li>
                <Link to='/signup' className='signup_btn'>Sign Up</Link>
              </li>
            </ul>
            <div className='Rr_Sec_D'>
              <div className='lang_Div'>
                <span><img src={GlobeIcon} alt="Globe Icon" /></span>
                <p>EN</p>
                <ul className='lang_DropDown'>
                  <li>EN</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='Reg_Form_Sec'>
          <div className='login-container Reg_Form_Box'>
            <div className='Reg_Header'>
              <h3>Login to continue</h3>
              <button onClick={handleGoogleLogin} className='google-login-btn'>
                <img src={GoogleIcon} alt='Google icon' />
                Continue with Google
              </button>
              <p><span>Or</span></p>
            </div>
            <form className='Reg_Form login-form' onSubmit={handleSubmit}>
              <div className='Reg_Input'>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder='Email Address'
                  required
                />
              </div>
              <div className='Reg_Input'>
                <div className='Reg_Pass'>
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder='Password'
                    required
                  />
                  <span className='ShowHidePass' onClick={togglePasswordVisibility}>
                    <img
                      src={isPasswordVisible ? CloseEyeIcon : OpenEyeIcon}
                      alt={isPasswordVisible ? 'Hide Password' : 'Show Password'}
                    />
                  </span>
                </div>
                <Link to='/forgot-password'>Forgot Password?</Link>
              </div>
              <div className='Reg_Input'>
                <button type="submit" disabled={loading} className='submit-button'>
                  {loading ? (
                    <>
                      <span>Logging in</span>
                      <img src={Loader} alt="Loading..." className='loader' />
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
              <div className='Reg_Input'>
                <p>Don’t have an account? <Link to='/signup'>Create account</Link></p>
              </div>
            </form>
        
            {alert.message && (
              <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
