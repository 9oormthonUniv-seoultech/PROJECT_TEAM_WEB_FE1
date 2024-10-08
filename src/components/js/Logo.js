import React, { useEffect } from 'react';
import '../css/Logo.css'; // 스타일링 파일
import LogoText from './LogoText'; 
import { useNavigate } from 'react-router-dom';

function Logo() {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후에 /home으로 리다이렉트
    const timer = setTimeout(() => {
      navigate('/Home');
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머 클리어
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="logo-with-text-container">
        {/* 로고 이미지 */}
        <svg width="130" height="128" viewBox="0 0 130 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="130" height="128" rx="25" fill="#5453EE"/>
        <path d="M29.0977 35.9465V85.0807C29.0977 88.3353 30.7321 91.3318 33.3845 92.9089L60.4392 109.038C62.9052 110.515 65.9017 110.53 68.3821 109.11L96.5981 92.8803C99.3078 91.3318 101 88.2923 101 84.9947V35.9465C101 31.0001 97.2719 27 92.6839 27H37.4133C32.8254 27 29.0977 31.0001 29.0977 35.9465Z" fill="white"/>
        <path d="M55.9631 36.1865H44.5793C41.1031 36.1865 38.2852 39.0045 38.2852 42.4806V53.8645C38.2852 57.3407 41.1031 60.1586 44.5793 60.1586H55.9631C59.4393 60.1586 62.2573 57.3407 62.2573 53.8645V42.4806C62.2573 39.0045 59.4393 36.1865 55.9631 36.1865Z" fill="#B0B0EE"/>
        <path d="M85.7053 36.1865H74.3215C70.8453 36.1865 68.0273 39.0045 68.0273 42.4806V53.8645C68.0273 57.3407 70.8453 60.1586 74.3215 60.1586H85.7053C89.1815 60.1586 91.9995 57.3407 91.9995 53.8645V42.4806C91.9995 39.0045 89.1815 36.1865 85.7053 36.1865Z" fill="#FCEF7B"/>
        <path d="M85.7053 64.6646H74.3215C70.8453 64.6646 68.0273 67.4825 68.0273 70.9587V82.3425C68.0273 85.8187 70.8453 88.6367 74.3215 88.6367H85.7053C89.1815 88.6367 91.9995 85.8187 91.9995 82.3425V70.9587C91.9995 67.4825 89.1815 64.6646 85.7053 64.6646Z" fill="#A1F5B9"/>
        <path d="M55.9631 64.6646H44.5793C41.1031 64.6646 38.2852 67.4825 38.2852 70.9587V82.3425C38.2852 85.8187 41.1031 88.6367 44.5793 88.6367H55.9631C59.4393 88.6367 62.2573 85.8187 62.2573 82.3425V70.9587C62.2573 67.4825 59.4393 64.6646 55.9631 64.6646Z" fill="#7DDFF9"/>
        </svg>

        {/* 로고 텍스트 */}
        <div style={{ marginTop: '18px' }}>
        <LogoText color="#5453EE" /> {/* Example usage with props */}
      </div>
    </div>
  );
}

export default Logo;
