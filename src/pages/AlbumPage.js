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
    <div>
      <Navbar />

      <SearchBar 
        placeholder="#민지를 통해 민지와 함께 찍은 사진 보기" 
        icon={searchIcon} 
        onSearch={handleSearch} 
        width="341px"
      />

<Button 
            text="2024년 8월" 
            onClick={handleClick} 
            backgroundColor="#5453EE" 
            borderRadius="30px" 
            width = "114px"
            height = "33px"
            boxShadow = "3px 3px 10px rgba(0, 0, 0, 0.25)"
            color = "#ffffff"
            fontSize = "16px"
            marginTop= "17px"
            marginLeft = "16px"
        />

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



      <EmptyIcon style={{ marginTop: '121px', marginLeft: '94px' }} />
      <Text 
        fontSize="18px" 
        color="#676F7B" 
        textAlign="center"
        fontWeight="600"
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
          marginLeft: '51px',
          borderRadius: '30px',
          width : '288px',
          height : '42px',
          backgroundColor : "#C7C9CE",
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
        />

        <Button 
          text="포토부스별" 
          onClick={() => handleClick('photobooth')} 
          backgroundColor={selectedButton === 'photobooth' ? "#676F7B" : "#C7C9CE"} 
          borderRadius="30px"
          color={selectedButton === 'photobooth' ? "#ffffff" : "#4B515A"}
          fontSize="16px"
          padding  = "11px 19px"
        />

        <Button 
          text="위치별" 
          onClick={() => handleClick('location')} 
          backgroundColor={selectedButton === 'location' ? "#676F7B" : "#C7C9CE"} 
          borderRadius="30px"
          color={selectedButton === 'location' ? "#ffffff" : "#4B515A"}
          fontSize="16px"
          padding  = "11px 18px"
        />
      </div>
    </div>
  );
}

export default AlbumPage;
