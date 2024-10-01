import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // CSS 파일 추가
import Navbar from '../components/js/Navbar';
import SearchBar from '../components/js/SearchBar';
import searchIcon from '../assets/search-icon.svg';
import KakaoMap from '../components/js/KakaoMap';
import Button from '../components/js/Button';
import Text from '../components/js/Text';
import FilteringButton from '../components/js/FilteringButton';
import addIcon from '../assets/add-icon.svg';

function HomePage() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 상태 관리

  const requireLogin = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true); // 모달 창 열기
    }
  };

  const handleAddPhotoClick = () => {
    if (isLoggedIn) {
      navigate('/AddPhoto'); // 로그인이 된 상태라면 'AddPhotoPage'로 이동
    } else {
      requireLogin(); // 로그인이 필요하면 모달 창 띄우기
    }
  };

  const handleLoginClick = () => {
    setIsModalOpen(false); // 모달 창 닫기
    navigate('/Login'); // 로그인 페이지로 이동
  };

  const handleSearch = () => {
    console.log('앨범 페이지에서 검색!');
  };

  const handleClick = (btnName) => {
    console.log(`${btnName} 버튼이 클릭되었습니다!`);
  };

  return (
    <div className="app-container">
      <Navbar onNavItemClick={requireLogin} /> {/* Navbar에서 로그인이 필요한 기능 클릭 시 requireLogin 호출 */}

      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          top: '50px', // Navbar와 KakaoMap 사이의 간격 조절
        }}
      >
        <SearchBar 
          placeholder="구, 역, 건물명 등으로 검색해주세요" 
          icon={searchIcon} 
          onSearch={handleSearch} 
          width="358px"
          height="42px"
          zIndex="10"
          fontSize="14px"
          fontWeight="400"
          backgroundColor="#FFFFFF"
        />

        <div 
          className='scroll-container'
          style={{
            marginTop: '25px', // 검색창과의 간격 설정
          }}
        >
          <FilteringButton 
            text="하루필름" 
            onClick={() => handleClick('하루필름')} 
            zIndex="10"
            marginRight="4px"
          />
          <FilteringButton 
            text="인생네컷" 
            onClick={() => handleClick('인생네컷')}
            zIndex="10"
            marginRight="4px"
          />
          <FilteringButton 
            text="포토이즘" 
            onClick={() => handleClick('포토이즘')} 
            zIndex="10"
            marginRight="4px"
          />
          <FilteringButton 
            text="셀픽스" 
            onClick={() => handleClick('셀픽스')} 
            zIndex="10"
            marginRight="4px"
          />
        </div>

        <Button 
          text="추억 저장하기" 
          onClick={handleAddPhotoClick} // 버튼 클릭 시 로그인 상태 확인
          backgroundColor="#5453EE" 
          borderRadius= "8px"
          width="280px"
          height="57px"
          color="#FFFFFF"
          fontSize="20px"
          zIndex="10"
          position="relative" // position 값을 'absolute'에서 'relative'로 변경
          marginTop="509px" // 이전에 사용한 marginTop 값을 조정
          icon={addIcon} 
          iconMargin="15px" 
          iconPosition="left" 
        />
      </div>

      <KakaoMap />

      {/* 커스텀 모달 창 */}
      {isModalOpen && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 밖 배경 설정
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 25,
          }}
          onClick={() => setIsModalOpen(false)} // 모달 바깥 클릭 시 모달 닫기
        >
          <div 
            style={{
              width: '350px',
              height: '169px',
              backgroundColor: '#E9EAEE',
              borderRadius: '8px',
              textAlign: 'center',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()} // 모달 창 클릭 시 모달 닫기 방지
          >
            <Text fontSize="12px" color="#676F7B" fontWeight="400" marginTop="20px" marginLeft="20px">
              3초 로그인으로 추억을 저장해보세요
            </Text>
            <Text fontSize="18px" color="#171D24" fontWeight="500" marginTop="5px" marginLeft="20px">
              해당 기능은 로그인 후에 이용할 수 있어요
            </Text>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '30px', // 버튼과 텍스트 사이 간격 추가
              }}
            >
              <Button 
                text="로그인하기" 
                onClick={handleLoginClick}
                backgroundColor="#5453EE" 
                borderRadius= "8px"
                width="150px"
                height="50px"
                color="#FFFFFF"
                fontSize="16px"
                zIndex="10"
                position="relative" 
                boxShadow="none"
                marginLeft="20px"
              />
              <Button 
                text="괜찮아요"  
                onClick={() => setIsModalOpen(false)}
                backgroundColor="#FFFFFF" 
                borderRadius= "8px"
                width="150px"
                height="50px"
                color="#676F7B"
                fontSize="16px"
                zIndex="10"
                position="relative" 
                boxShadow="none"
                marginLeft="10px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
