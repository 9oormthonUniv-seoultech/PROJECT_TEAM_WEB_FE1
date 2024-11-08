// src/pages/LoginPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import loginIcon from '../assets/login-icon.svg';
import kloginIcon from '../assets/kakao-login-icon.svg';
import { BASE_URL } from '../config';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleKakaoLogin = () => {
    console.log("카카오 로그인 요청 중...");
    window.location.href = `${BASE_URL}auth/kakao`; // 카카오 로그인 백엔드 URL로 이동
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');

    if (accessToken) {
      login(accessToken); // 로그인 토큰 저장
      console.log('로그인 성공, 토큰 저장 완료:', accessToken);

      // URL에서 accessToken 제거
      urlParams.delete('accessToken');
      const cleanUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
      window.history.replaceState({}, document.title, cleanUrl);

      navigate('/Home'); // 홈 페이지로 이동
    }
  }, [navigate, login]);

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: 20,
      }}
    >
      <img src={loginIcon} alt="login Icon" style={{ marginBottom: '32.05px'}} />
      <img src={kloginIcon} alt="kakao login Icon" onClick={handleKakaoLogin} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default LoginPage;
