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
      decodeUserId(token); // 토큰이 있을 때 userId 디코딩
    }
  }, []);

  const decodeUserId = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id); // 디코딩한 id 값 설정
    } catch (error) {
      console.error("Invalid token:", error);
      logout(); // 토큰이 유효하지 않을 때 로그아웃 처리
    }
  };

  const login = (token) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
    decodeUserId(token); // 로그인 시 userId 디코딩
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
