import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const API_HOST = process.env.REACT_APP_API_HOST;
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const email = localStorage.getItem('authEmail');
      const role = localStorage.getItem('authRole') || 'user';
      setUser({ email, token, role });
    }
  }, []);

  const login = async (email, password) => {
    const apiUrl =`${API_HOST}api/register/login/`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const isAdmin = email === 'allSuperAdmin@app.com' && password === '1234567890Qwerty1234567890';
      const userData = { email, token: data.token, role: isAdmin ? 'admin' : 'user' };
      setUser(userData);
      localStorage.setItem('authToken', data.access);
      localStorage.setItem('authEmail', email);
      localStorage.setItem('authRole', isAdmin ? 'admin' : 'user');
    } else {
      throw new Error('Failed to login');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authEmail');
    localStorage.removeItem('authRole');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
