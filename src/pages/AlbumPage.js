import React, { useState } from 'react';
import Navbar from '../components/js/Navbar';
import SearchBar from '../components/js/SearchBar';
import searchIcon from '../assets/search-icon.svg'; 
import Button from '../components/js/Button' ;
import Text from '../components/js/Text' ;
import { ReactComponent as EmptyIcon } from '../assets/empty-icon.svg'; 

function AlbumPage() {
  const [selectedButton, setSelectedButton] = useState(''); // 선택된 버튼 상태 관리

  const handleSearch = () => {
    console.log('앨범 페이지에서 검색!');
  };

  const handleClick = (buttonId) => {
    setSelectedButton(buttonId); // 선택된 버튼 ID로 상태 업데이트
    console.log(`${buttonId} 버튼 클릭!`);
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
        placeholder="#민지를 통해 민지와 함께 찍은 사진 보기" 
        icon={searchIcon} 
        onSearch={handleSearch} 
        width="341px"
        height="44px"
      />

      <div 
        className="buttonGroup" 
        style={{
          display: 'flex',
          width : '100%',
          marginTop : "17px",
          marginLeft : "16px"
        }}
      >
        <div style={{ position: 'relative', marginRight: '8px' }}> 
          {/* 말풍선 텍스트 추가할 버튼 감싸기 */}
          <Button 
            text="2024년 8월" 
            onClick={() => handleClick('august2024')} 
            backgroundColor="#5453EE" 
            borderRadius="30px" 
            width="114px"
            height="33px"
            boxShadow="3px 3px 10px rgba(0, 0, 0, 0.25)"
            color="#ffffff"
            fontSize="16px"
            marginRight="8px"
          />
          {/* 말풍선 텍스트 */}
          {selectedButton === 'august2024' && (
            <div className="tooltip" style={{
              position: 'absolute',
              top: '-35px', // 버튼 위에 위치하도록 설정
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#5453EE',
              color: '#ffffff',
              padding: '5px 10px',
              borderRadius: '8px',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
              fontSize: '12px',
              whiteSpace: 'nowrap',
            }}>
              말풍선 텍스트 예시
            </div>
          )}
        </div>

        <Button 
            text="선택" 
            onClick={handleClick} 
            backgroundColor="#C7C9CE" 
            borderRadius="30px" 
            width = "57px"
            height = "33px"
            boxShadow = "3px 3px 10px rgba(0, 0, 0, 0.25)"
            color = "#4B515A"
            fontSize = "14px"
            marginLeft = "121px"
        />

        <Button 
            text="추가" 
            onClick={handleClick} 
            backgroundColor="#C7C9CE" 
            borderRadius="30px" 
            width = "57px"
            height = "33px"
            boxShadow = "3px 3px 10px rgba(0, 0, 0, 0.25)"
            color = "#4B515A"
            fontSize = "14px"
            marginLeft = "8px"
        />
      </div>



      <EmptyIcon style={{ marginTop: '121px' }} />
      <Text 
        fontSize="18px" 
        color="#676F7B" 
        textAlign="center"
        fontWeight="500"
        marginTop="23px"
      >
        사진을 채워보세요
      </Text>

      {/* Button Group */}
      <div 
        className="buttonGroup" 
        style={{
          display: 'flex',
          marginTop: '124px',
          borderRadius: '30px',
          width : '288px',
          height : '42px',
          backgroundColor : "#C7C9CE",
          opacity : '80%',
          boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.25)', // 전체 그룹에 그림자 적용
        }}
      >
        <Button 
          text="날짜별" 
          onClick={() => handleClick('date')} 
          backgroundColor={selectedButton === 'date' ? "#676F7B" : "#C7C9CE"} 
          borderRadius="30px"
          color={selectedButton === 'date' ? "#ffffff" : "#4B515A"}
          fontSize="16px"
          padding  = "11px 18px"
          boxShadow= "none"
        />

        <Button 
          text="포토부스별" 
          onClick={() => handleClick('photobooth')} 
          backgroundColor={selectedButton === 'photobooth' ? "#676F7B" : "#C7C9CE"} 
          borderRadius="30px"
          color={selectedButton === 'photobooth' ? "#ffffff" : "#4B515A"}
          fontSize="16px"
          padding  = "11px 19px"
          boxShadow= "none"
        />

        <Button 
          text="위치별" 
          onClick={() => handleClick('location')} 
          backgroundColor={selectedButton === 'location' ? "#676F7B" : "#C7C9CE"} 
          borderRadius="30px"
          color={selectedButton === 'location' ? "#ffffff" : "#4B515A"}
          fontSize="16px"
          padding  = "11px 18px"
          boxShadow= "none"
        />
      </div>
    </div>
  </div>
  );
}

export default AlbumPage;
