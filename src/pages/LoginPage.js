import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loginIcon from '../assets/login-icon.svg';
import kloginIcon from '../assets/kakao-login-icon.svg';

const LoginPage = () => {
  const navigate = useNavigate();

  // 카카오 SDK 초기화
  useEffect(() => {
    // 카카오 SDK 초기화 (JavaScript 키를 사용)
    const kakaoKey = 'YOUR_KAKAO_JAVASCRIPT_KEY'; // 여기에 카카오 JavaScript 키를 입력하세요
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    }
  }, []);

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    if (window.Kakao) {
      window.Kakao.Auth.login({
        success: (authObj) => {
          console.log('카카오 로그인 성공:', authObj);
          // 로그인 성공 후 리디렉션 등 추가 작업 수행
          navigate('/dashboard'); // 예시: 로그인 후 대시보드로 이동
        },
        fail: (err) => {
          console.error('카카오 로그인 실패:', err);
        },
      });
    }
  };

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff', // 배경 색상 설정
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column', // 텍스트와 아이콘을 세로로 정렬
        zIndex: 20, // 충분히 높은 값으로 설정하여 다른 요소 위에 표시되도록 함
      }}
    >
      <img 
        src={loginIcon} 
        alt="login Icon" 
        style={{ marginBottom: '32.05px'}} // 아이콘 크기 및 간격 설정
      />

      <img 
        src={kloginIcon} 
        alt="kakao login Icon"
        onClick={handleKakaoLogin} // 클릭 시 카카오 로그인 실행
        style={{ cursor: 'pointer' }} // 커서 스타일을 포인터로 설정
      />

    </div>
  );
};

export default LoginPage;
