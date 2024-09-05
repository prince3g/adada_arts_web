import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import '../App.css';


import PageLoader from '../assets/Img/page-loader.gif';

// Lazy-loaded components
const NavbarWrapper = lazy(() => import('./NavbarWrapper'));
const Footer = lazy(() => import('./Footer'));
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const HealthCategoryPage = lazy(() => import('./HealthCategoryPage'));
const LeadershipCategoryPage = lazy(() => import('./LeadershipCategoryPage'));
const CoursesPage = lazy(() => import('./CoursesPage'));
const TrainingPage = lazy(() => import('./Training'));
const Contact = lazy(() => import('./Contact'));
const TermsPage = lazy(() => import('./TermsPage'));
const PrivacyPage = lazy(() => import('./PrivacyPage'));
const Login = lazy(() => import('./Login'));
const Signup = lazy(() => import('./Signup'));
const SetPassword = lazy(() => import('./SetPassword'));
const ForgotPass = lazy(() => import('./ForgotPass'));

// Component to handle conditional Navbar and Footer rendering
const MainContent = () => {
  const location = useLocation();
  const hideNavFooterRoutes = ['/login', '/signup', '/set-password', '/forgot-password'];
  const shouldHideNavFooter = hideNavFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavFooter && <NavbarWrapper />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/health-category" element={<HealthCategoryPage />} />
        <Route path="/leadership-category" element={<LeadershipCategoryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/arts-training" element={<TrainingPage />} />
        <Route path="/help" element={<Contact />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
      </Routes>
      {!shouldHideNavFooter && <Footer />}
    </>
  );
};

function LandingPage() {
  return (
    <div className='LandingPage'>
      <Router>
        <Suspense fallback={<div className='Page_Loader'><span><img src={PageLoader}></img></span></div>}>
          <MainContent />
        </Suspense>
      </Router>
    </div>
  );
}

export default LandingPage;
