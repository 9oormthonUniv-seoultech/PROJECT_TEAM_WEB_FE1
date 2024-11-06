// src/AppContext.js
import React, { createContext, useState, useEffect } from 'react';

// Context 생성
export const AppContext = createContext();

// Provider 컴포넌트 정의
export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 페이지 로드 시 localStorage에서 토큰을 확인해 로그인 상태 설정
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); // 토큰이 있으면 true로 설정
  }, []);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};
