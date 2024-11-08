// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      decodeUserId(token);
    }
  }, []);

  const decodeUserId = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
    }
  };

  const login = (token) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
    decodeUserId(token);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    setUserId(null);
  };

  const isLoggedIn = !!accessToken;

  return (
    <AuthContext.Provider value={{ accessToken, userId, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
