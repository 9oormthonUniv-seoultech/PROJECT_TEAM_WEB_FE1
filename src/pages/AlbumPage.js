import React, { useState } from 'react';
import Navbar from '../components/js/Navbar';
import SearchBar from '../components/js/SearchBar';
import searchIcon from '../assets/search-icon.svg'; 
import Button from '../components/js/Button';
import Text from '../components/js/Text';
import { ReactComponent as SpeechBubbleIcon } from '../assets/speech-bubble-icon2.svg'; 
import { ReactComponent as EmptyIcon } from '../assets/empty-icon.svg';
import Photo from '../components/js/Photo'; // PhotoCard 컴포넌트 가져오기
import YearMonthModal from '../components/js/YearMonthModal';


function AlbumPage() {
  const [selectedButton, setSelectedButton] = useState('');
  const [photos, setPhotos] = useState([
    { url: 'https://via.placeholder.com/200x145' },
    { url: 'https://via.placeholder.com/200x145' },
    { url: 'https://via.placeholder.com/200x145' },
    { url: 'https://via.placeholder.com/200x145' },
    { url: 'https://via.placeholder.com/200x145' },
    { url: 'https://via.placeholder.com/200x145' },
    { url: 'https://via.placeholder.com/200x145' },
    { url: 'https://via.placeholder.com/200x145' },
    // 필요한 만큼 추가
  ]);

  const handleSearch = () => {
    console.log('앨범 페이지에서 검색!');
  };

  const handleClick = (buttonId) => {
    setSelectedButton(buttonId);
    console.log(`${buttonId} 버튼 클릭!`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = (date) => {
    console.log('선택된 날짜:', date);
    setIsModalOpen(false);
  };

  return (
    <div className="app-container" style={{ position: 'relative', width: '390px', height: '844px', overflow: 'hidden', margin: '0 auto', border: '1px solid #ccc' }}>
      
      {/* 검색창과 날짜/선택/추가 버튼 그룹 */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          top: '20px',
          zIndex: 1,
        }}
      >
        <SearchBar 
          placeholder="#민지를 통해 민지와 함께 찍은 사진 보기" 
          icon={searchIcon} 
          onSearch={handleSearch} 
          width="341px"
          height="44px"
        />

        {/* 날짜, 선택, 추가 버튼 */}
        <div 
          className="buttonGroup" 
          style={{
            display: 'flex',
            width: '100%',
            marginLeft :'16px',
            marginTop : '17px',
            zIndex: 20,
          }}
        >
          <div style={{ position: 'relative' }}> 
            <Button 
              text="2024년 8월" 
              onClick={handleButtonClick}
              backgroundColor="#5453EE" 
              borderRadius="30px" 
              width="114px"
              height="33px"
              boxShadow="3px 3px 10px rgba(0, 0, 0, 0.25)"
              color="#ffffff"
              fontSize="16px"
              marginRight="8px"
            />
            <SpeechBubbleIcon style={{
              position: 'absolute',
              marginLeft: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
            }} />
          </div>

          <Button 
            text="선택" 
            onClick={handleClick} 
            backgroundColor="#C7C9CE" 
            borderRadius="30px" 
            width="57px"
            height="33px"
            boxShadow="3px 3px 10px rgba(0, 0, 0, 0.25)"
            color="#4B515A"
            fontSize="14px"
            marginLeft="121px"
          />

          <Button 
            text="추가" 
            onClick={handleClick} 
            backgroundColor="#C7C9CE" 
            borderRadius="30px" 
            width="57px"
            height="33px"
            boxShadow="3px 3px 10px rgba(0, 0, 0, 0.25)"
            color="#4B515A"
            fontSize="14px"
            marginLeft="8px"
          />
        </div>
      </div>

      {/* 스크롤 가능한 사진 영역 */}
      <div className="scrollable-content" style={{ overflowY: 'auto', height: 'calc(100% - 220px)', paddingBottom: '100px', marginLeft :'16px' }}>
        {photos.length === 0 ? (
          <>
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
          </>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 174px)', 
            gap: '10px',
            
          }}>
            {photos.map((photo, index) => (
              <Photo
                key={index} 
                photoUrl={photo.url} 
                altText={`사진 ${index + 1}`} 
              />
            ))}
          </div>
        )}
      </div>

      {/* 날짜별/포토부스별/위치별 버튼 그룹 */}
      <div 
        className="buttonGroup" 
        style={{
          display: 'flex',
          position: 'fixed',
          left: '50%',
          top : '700px',
          transform: 'translateX(-50%)',
          width: '288px',
          height: '42px',
          backgroundColor: "#C7C9CE",
          opacity: '80%',
          borderRadius: '30px',
          boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.25)',
          zIndex: '20',
        }}
      >
        <Button 
          text="날짜별" 
          onClick={() => handleClick('date')} 
          backgroundColor={selectedButton === 'date' ? "#676F7B" : "#C7C9CE"} 
          borderRadius="30px"
          color={selectedButton === 'date' ? "#ffffff" : "#4B515A"}
          fontSize="16px"
          padding="11px 18px"
          boxShadow="none"
        />
        <Button 
          text="포토부스별" 
          onClick={() => handleClick('photobooth')} 
          backgroundColor={selectedButton === 'photobooth' ? "#676F7B" : "#C7C9CE"} 
          borderRadius="30px"
          color={selectedButton === 'photobooth' ? "#ffffff" : "#4B515A"}
          fontSize="16px"
          padding="11px 19px"
          boxShadow="none"
        />
        <Button 
          text="위치별" 
          onClick={() => handleClick('location')} 
          backgroundColor={selectedButton === 'location' ? "#676F7B" : "#C7C9CE"} 
          borderRadius="30px"
          color={selectedButton === 'location' ? "#ffffff" : "#4B515A"}
          fontSize="16px"
          padding="11px 18px"
          boxShadow="none"
        />
      </div>

      {/* 고정된 Navbar */}
      <div className="navbar-fixed" style={{ position: 'absolute', bottom: '0', width: '100%', zIndex: 20 }}>
        <Navbar />
      </div>

      {/* 모달 렌더링 */}
      {isModalOpen && (
        <YearMonthModal onClose={handleModalClose} onConfirm={handleModalConfirm} />
      )}
    </div>
  );
}

export default AlbumPage;
