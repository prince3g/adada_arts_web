import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageLoader from './assets/Img/page-loader.gif';
import './App.css';
import './Admin/main.css'; // Ensure this CSS is applied globally or in a specific context
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import ProtectedRoute from './pages/ProtectedRoute'; // Import the ProtectedRoute component

// Lazy-loaded components
const NavbarWrapper = lazy(() => import('./pages/NavbarWrapper'));
const Footer = lazy(() => import('./pages/Footer'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const IndusatryCategoryPage = lazy(() => import('./pages/IndusatryCategoryPage'));
const CareeCategoryPage = lazy(() => import('./pages/CareeCategoryPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const TrainingPage = lazy(() => import('./pages/Training'));
const Contact = lazy(() => import('./pages/Contact'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const SetPassword = lazy(() => import('./pages/SetPassword'));
const ForgotPass = lazy(() => import('./pages/ForgotPass'));
const SearchResult = lazy(() => import('./pages/SearchResult')); // Import the SearchResult component
const AdminHome = lazy(() => import('./Admin/AdminHome'));
const CourseCategoryPage = lazy(() => import('./Admin/CourseCategoryPage'));
const InstructorPage = lazy(() => import('./Admin/InstructorPage'));
const UsersPage = lazy(() => import('./Admin/UsersPage'));
const Notification = lazy(() => import('./Admin/Notification'));
const ProfileSettings = lazy(() => import('./Admin/ProfileSettings'));
const AdminNav = lazy(() => import('./Admin/AdminNav'));
const AdminFooter = lazy(() => import('./Admin/AdminFooter'));
const AdminCoursesPage = lazy(() => import('./Admin/CoursesPage'));

// MainContent component
const MainContent = () => {
  const location = useLocation();
  const hideNavFooterRoutes = ['/login', '/signup', '/set-password', '/forgot-password'];
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && !hideNavFooterRoutes.includes(location.pathname) && <NavbarWrapper />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
        <Route path="/industry-sector" element={<ProtectedRoute><IndusatryCategoryPage /></ProtectedRoute>} />
        <Route path="/career-related" element={<ProtectedRoute><CareeCategoryPage /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/arts-training" element={<ProtectedRoute><TrainingPage /></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/terms" element={<ProtectedRoute><TermsPage /></ProtectedRoute>} />
        <Route path="/privacy" element={<ProtectedRoute><PrivacyPage /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchResult /></ProtectedRoute>} /> {/* Add SearchResult route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/forgot-password" element={<ForgotPass />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute isAdmin={true}>
            <div className='AdminPage'>
              <AdminNav />
              <Routes>
                <Route path="/" element={<AdminHome />} />
                <Route path="a-courses" element={<AdminCoursesPage />} />
                <Route path="a-categories" element={<CourseCategoryPage />} />
                <Route path="a-instructors" element={<InstructorPage />} />
                <Route path="a-users" element={<UsersPage />} />
                <Route path="a-notification" element={<Notification />} />
                <Route path="a-settings" element={<ProfileSettings />} />
              </Routes>
              <AdminFooter />
            </div>
          </ProtectedRoute>
        } />
      </Routes>
      {!isAdminRoute && !hideNavFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap your application with AuthProvider */}
        <Suspense fallback={<div className='Page_Loader'><span><img src={PageLoader} alt="Loading..." /></span></div>}>
          <MainContent />
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
