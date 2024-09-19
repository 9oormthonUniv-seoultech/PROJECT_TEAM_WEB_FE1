import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Navbar from '../components/js/Navbar'; 
import SearchBar from '../components/js/SearchBar';
import searchIcon from '../assets/search-icon.svg'; 
import KakaoMap from '../components/js/KakaoMap';
import Button from '../components/js/Button';
import FilteringButton from '../components/js/FilteringButton';
import addIcon from '../assets/add-icon.svg';


function HomePage() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleAddPhotoClick = () => {
    navigate('/AddPhoto'); // 'AddPhotoPage'로 이동
  };

  const handleSearch = () => {
    console.log('앨범 페이지에서 검색!');
  };

  const handleClick = (btnName) => {
    console.log(`${btnName} 버튼이 클릭되었습니다!`);
  };
  
  return (
    <div style={{
      width: '100%',  // App.css에서 설정한 width에 맞추기
      height: '100%', // App.css에서 설정한 height에 맞추기
      position: 'relative',
    }}>
      <Navbar />

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
          {/* 버튼 1 */}
          <FilteringButton 
            text="하루필름" 
            onClick={() => handleClick('하루필름')} 
            zIndex="10"
            marginRight="4px"
          />
          {/* 버튼 2 */}
          <FilteringButton 
            text="인생네컷" 
            onClick={() => handleClick('인생네컷')}
            zIndex="10"
            marginRight="4px"
          />
          {/* 버튼 3 */}
          <FilteringButton 
            text="포토이즘" 
            onClick={() => handleClick('포토이즘')} 
            zIndex="10"
            marginRight="4px"
          />
          {/* 버튼 4 */}
          <FilteringButton 
            text="셀픽스" 
            onClick={() => handleClick('셀픽스')} 
            zIndex="10"
            marginRight="4px"
          />
          {/* 버튼 4 */}
          <FilteringButton 
            text="셀픽스" 
            onClick={() => handleClick('셀픽스')} 
            zIndex="10"
            marginRight="4px"
          />
        </div>  

        <Button 
          text="추억 저장하기" 
          onClick={handleAddPhotoClick} 
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
        />
      </div>

      <KakaoMap />

    </div>
  );
}

export default HomePage;
