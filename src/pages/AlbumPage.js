import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/js/Navbar';
import SearchBar from '../components/js/SearchBar';
import searchIcon from '../assets/search-icon.svg'; 
import Button from '../components/js/Button';
import Text from '../components/js/Text';
import { ReactComponent as SpeechBubbleIcon } from '../assets/speech-bubble-icon2.svg'; 
import { ReactComponent as EmptyIcon } from '../assets/empty-icon.svg';
import Photo from '../components/js/Photo';
import YearMonthModal from '../components/js/YearMonthModal';
import ConfirmModal from '../components/js/ConfirmModal';
import KakaoMap from '../components/js/KakaoMap';
import axios from 'axios';

function AlbumPage() {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { userId } = useAuth();
  const initialSelectedButton = location.state?.selectedButton || 'date';
  const [selectedButton, setSelectedButton] = useState(initialSelectedButton);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [selectedBooth, setSelectedBooth] = useState(location.state?.selectedBooth || '포토부스');
  const [photos, setPhotos] = useState([]);
  const [isYearMonthModalOpen, setIsYearMonthModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [dateFilter, setDateFilter] = useState(null);


  // 현재 날짜로 기본 연, 월 설정
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  const [displayDate, setDisplayDate] = useState(`${currentYear}년 ${currentMonth}월`);


  const typeConfig = {
    date: {
      displayText: displayDate,
      onClick: () => setIsYearMonthModalOpen(true),
    },
    photobooth: {
      displayText: selectedBooth,
      onClick: () => navigate('/Album-BoothSelection', { state: { selectedButton: 'photobooth' } }),
    },
    location: {
      displayText: "위치별 보기",
      onClick: () => setSelectedButton(true),
    },
  };

  useEffect(() => {
    const fetchPhotosByDate = async () => {
      try {
        if (selectedButton === 'date' && userId) {
          const url = `/api/album/${userId}`;
          const params = dateFilter ? { date: dateFilter } : {};
          const response = await axios.get(url, { params });
          
          // 서버 응답을 확인하기 위한 콘솔 출력
          console.log('서버 응답:', response.data);

          const photoData = response.data.images.map((image) => ({
            url: image.url,
            photo_like: image.photo_like,
          }));
          setPhotos(photoData);
          console.log('사진 데이터:', photoData);
        }
      } catch (error) {
        console.error('사진 데이터 불러오기 실패:', error);
      }
    };

    fetchPhotosByDate();
  }, [selectedButton, userId, dateFilter]);

  const handleSelectButtonClick = () => {
    setIsSelectMode((prev) => !prev);
    setSelectedPhotos([]);
  };

  const togglePhotoSelection = (photoId) => {
    setSelectedPhotos((prevSelected) =>
      prevSelected.includes(photoId)
        ? prevSelected.filter((id) => id !== photoId)
        : [...prevSelected, photoId]
    );
  };

  const handleClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  const handleYearMonthModalClose = () => {
    setIsYearMonthModalOpen(false);
  };

  const handleYearMonthConfirm = (date) => {
    const formattedDate = `${date.year}-${date.month.padStart(2, '0')}`;
    setDateFilter(formattedDate);
    setDisplayDate(`${date.year}년 ${date.month}월`); // displayText 업데이트
    setIsYearMonthModalOpen(false);
  };

  const handleConfirmModal = (action) => {
    if (isSelectMode && selectedPhotos.length > 0) {
      setConfirmMessage(
        action === 'like' 
          ? `${selectedPhotos.length}장의 사진을 즐겨찾기 하시겠어요?` 
          : `${selectedPhotos.length}장의 사진을 삭제하시겠어요?`
      );
      setIsConfirmModalOpen(true);
    }
  };

  const handleModalConfirm = (date) => {
    console.log('선택된 날짜:', date);
    setIsYearMonthModalOpen(false);
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
    setIsSelectMode(false);
  };

  return (
    <div className="app-container" style={{ position: 'relative', width: '390px', height: '844px', overflow: 'hidden', margin: '0 auto', border: '1px solid #ccc' }}>

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '20px', zIndex: 2 }}>
      <SearchBar
          placeholder={selectedButton === 'location' ? '현위치' : '#민지를 통해 민지와 함께 찍은 사진 보기'}
          icon={searchIcon}
          onSearch={() => console.log('앨범 페이지에서 검색!')}
          width="341px"
          height="44px"
          zIndex={selectedButton === 'location' ? 10 : 1}  
          position= 'relative' // 위치별에서 고정
          top={selectedButton === 'location' ? '20px' : 'auto'}
          marginLeft = {selectedButton === 'location' ? '16px' : '0px'} 
          backgroundColor={selectedButton === 'location' ? '#FFFFFF' : '#E9EAEE'}
          color={selectedButton === 'location' ? '#000000' : '#676F7B'}
      />



      {selectedButton !== 'location' && ( // 위치별 선택이 아닌 경우에만 버튼 그룹 표시
        <div className="buttonGroup" style={{ display: 'flex', width: '100%', marginLeft: '16px', marginTop: '17px', zIndex: 20 }}>
          <div style={{ position: 'relative' }}>
            <Button
              text={typeConfig[selectedButton].displayText} 
              onClick={typeConfig[selectedButton].onClick}
              backgroundColor="#5453EE"
              borderRadius="30px"
              width="114px"
              height="33px"
              boxShadow="3px 3px 10px rgba(0, 0, 0, 0.25)"
              color="#ffffff"
              fontSize="16px"
              marginRight="8px"
            />
            {selectedButton === 'date' && (
              <SpeechBubbleIcon
                style={{
                  position: 'absolute',
                  marginLeft: '16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />
            )}
          </div>

          {isSelectMode ? (
            <Button text="취소" onClick={handleSelectButtonClick} backgroundColor="#C7C9CE" borderRadius="30px" width="57px" height="33px" boxShadow="3px 3px 10px rgba(0, 0, 0, 0.25)" color="#4B515A" fontSize="14px" marginLeft="186px" />
          ) : (
            <>
              <Button text="선택" onClick={handleSelectButtonClick} backgroundColor="#C7C9CE" borderRadius="30px" width="57px" height="33px" boxShadow="3px 3px 10px rgba(0, 0, 0, 0.25)" color="#4B515A" fontSize="14px" marginLeft="121px" />
              <Button text="추가" onClick={() => console.log('추가 버튼 클릭')} backgroundColor="#C7C9CE" borderRadius="30px" width="57px" height="33px" boxShadow="3px 3px 10px rgba(0, 0, 0, 0.25)" color="#4B515A" fontSize="14px" marginLeft="8px" />
            </>
          )}
        </div>
      )}
    </div>


      
      {selectedButton === 'location' ? (
        <KakaoMap source="album" />
      ) : (
        <div className="scrollable-content" style={{ overflowY: 'auto', height: 'calc(100% - 220px)', paddingTop : '121px', paddingBottom: '100px', marginLeft: '94px'  }}>
          {photos.length === 0 ? (
            <>
              <EmptyIcon style={{ marginTop: '121px' }} />
              <Text fontSize="18px" color="#676F7B" textAlign="center" fontWeight="500" marginTop="23px" marginLeft="30px">
                사진을 채워보세요
              </Text>
            </>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 174px)', gap: '10px' }}>
              {photos.map((photo) => (
                <Photo key={photo.id} photoUrl={photo.url} altText={`사진 ${photo.id}`} isSelectMode={isSelectMode} isSelected={selectedPhotos.includes(photo.id)} onClick={() => togglePhotoSelection(photo.id)} />
              ))}
            </div>
          )}
        </div>
      )}

      {!isSelectMode && (
        <div className="buttonGroup" style={{ display: 'flex', position: 'fixed', left: '50%', top: '700px', transform: 'translateX(-50%)', width: '288px', height: '42px', backgroundColor: '#C7C9CE', opacity: '80%', borderRadius: '30px', boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.25)', zIndex: 20 }}>
        {Object.keys(typeConfig).map((type) => (
          <Button
            key={type}
            text={type === 'date' ? '날짜별' : type === 'photobooth' ? '포토부스별' : '위치별'}
            onClick={() => handleClick(type)}
            backgroundColor={selectedButton === type ? '#676F7B' : '#C7C9CE'}
            borderRadius="30px"
            color={selectedButton === type ? '#ffffff' : '#4B515A'}
            fontSize="16px"
            padding="11px 18px"
            boxShadow="none"
          />
        ))}
        </div>
      )}

      <div className="navbar-fixed" style={{ position: 'absolute', bottom: '0', width: '100%', zIndex: 20 }}>
        <Navbar isSelectMode={isSelectMode} onLike={() => handleConfirmModal('like')} onDelete={() => handleConfirmModal('delete')} />
      </div>

      {isConfirmModalOpen && (
        <ConfirmModal message={confirmMessage} onConfirm={handleConfirmModalClose} onCancel={() => setIsConfirmModalOpen(false)} style={{ zIndex: 1000, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      )}
      {isYearMonthModalOpen && (
        <YearMonthModal onClose={handleYearMonthModalClose} onConfirm={handleYearMonthConfirm} />
      )}
    </div>
  );
}

export default AlbumPage;
