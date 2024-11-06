// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) setAccessToken(token);
  }, []);

  const login = (token) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
  };

  const isLoggedIn = !!accessToken;

  return (
    <AuthContext.Provider value={{ accessToken, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Context를 쉽게 사용할 수 있도록 커스텀 훅 생성
export const useAuth = () => useContext(AuthContext);
