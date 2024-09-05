import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for authentication status from local storage
    const token = localStorage.getItem('token');
    const adminFlag = localStorage.getItem('isAdmin');
    
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(Boolean(adminFlag));
    }
  }, []);

  const login = (token, admin) => {
    localStorage.setItem('token', token);
    if (admin) {
      localStorage.setItem('isAdmin', true);
      setIsAdmin(true);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
