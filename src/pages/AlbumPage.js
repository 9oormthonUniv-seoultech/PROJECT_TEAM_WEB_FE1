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
import CustomMarkerOverlay from '../components/js/CustomMarkerOverlay';
import axios from 'axios';
import { BASE_URL } from '../config';




function AlbumPage() {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { userId } = useAuth();
  const initialSelectedButton = location.state?.selectedButton || 'date';
  const [selectedButton, setSelectedButton] = useState(initialSelectedButton);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [selectedBooth, setSelectedBooth] = useState(location.state?.selectedBooth || '포토부스');
  const [photos, setPhotos] = useState([]);
  const [locationPhotos, setLocationPhotos] = useState([]);
  const [isYearMonthModalOpen, setIsYearMonthModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [dateFilter, setDateFilter] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [displayPhotos, setDisplayPhotos] = useState([]);
  // 임시 데이터
  const boothPhotos = {
    'booth1': [
      { id: 1, url: 'https://via.placeholder.com/150', photo_like: false },
      { id: 2, url: 'https://via.placeholder.com/150', photo_like: true }
    ],
    'booth2': [
      { id: 3, url: 'https://via.placeholder.com/150', photo_like: false },
      { id: 4, url: 'https://via.placeholder.com/150', photo_like: true }
    ],
    'booth3': [
      { id: 5, url: 'https://via.placeholder.com/150', photo_like: true },
      { id: 6, url: 'https://via.placeholder.com/150', photo_like: false }
    ]
  };

  const handleBoothClick = (boothName) => {
    setSelectedBooth(boothName);
    setPhotos(boothPhotos[boothName] || []); // 해당 부스에 대한 사진 표시
  };

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
      displayText: selectedBooth , // Use the selected booth name if available
      onClick: () => navigate('/Album-BoothSelection', { state: { selectedButton: 'photobooth' } }),
    },
    location: {
      displayText: "위치별 보기",
      onClick: () => setSelectedButton(true),
    },
  };

  useEffect(() => {
    if (selectedButton === 'location' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log("User's current location:", position.coords.latitude, position.coords.longitude);
        },
        (error) => console.error("Failed to get location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, [selectedButton]);
  

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        if (userId) {
          const url = `${BASE_URL}api/album/${userId}`;
          let params = {};

          if (selectedButton === 'date' && dateFilter) {
            params = { date: dateFilter };
          } else if (selectedButton === 'photobooth' && selectedBooth !== '포토부스') {
            params = { brand: selectedBooth };
          }

          const response = await axios.get(url, { params });
          const photoData = response.data.map((item) => ({
            url: item.images,
            photo_like: item.photo_like,
            id: item.photo_id,
          }));
          
          setPhotos(photoData);
          console.log('가져온 사진 데이터:', photoData);
        }
      } catch (error) {
        console.error('사진 데이터 불러오기 실패:', error);
      }
    };

    const fetchLocationPhotos = async (lat, lng) => {
      try {
        const response = await axios.get(`${BASE_URL}api/album/${userId}/location`, {
          params: {
            latitude: lat,
            longitude: lng,
          },
        });
    
        const photoData = response.data.map((item) => ({
          id: item.photo_id,
          imageUrl: item.images, // images를 imageUrl로 매핑
          lat: lat, // 각 사진의 위도
          lng: lng, // 각 사진의 경도
          photo_like: item.photo_like,
        }));

        // 전달될 URL들을 출력
        photoData.forEach(photo => {
          console.log("AlbumPage에서 전달되는 imageUrl:", photo.imageUrl);
        });
        
        setLocationPhotos(photoData);
      } catch (error) {
        console.error("Failed to fetch location-based photos:", error);
      }
    };
    

    if (selectedButton === 'date' || selectedButton === 'photobooth') {
      fetchPhotos();
    } 
    if (latitude && longitude) {
      fetchLocationPhotos();
    }
    

    
  }, [selectedButton, selectedBooth, userId, dateFilter, searchQuery, latitude ,longitude]);


  const handleSearch = async () => {
    if (!searchQuery) return; // 검색어가 없을 때는 요청하지 않음
    try {
      const response = await axios.get(`${BASE_URL}api/album/${userId}`, {
        params: { hashtag: searchQuery }
      });
      
      console.log("요청한 데이터:", { userId, hashtag: searchQuery });
      console.log("응답받은 데이터:", response.data);

      const photoData = response.data.map((item) => ({
        url: item.images,
        photo_like: item.photo_like,
        id: item.photo_id,
      }));
      
      setPhotos(photoData); // 검색 결과를 photos 상태에 업데이트
    } catch (error) {
      console.error('검색 데이터 불러오기 실패:', error);
    }
  };
  

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

  const handleClick = async (buttonId) => {
    if (buttonId === 'date') {
      setDateFilter(null);
      setSelectedBooth('포토부스');
      setSelectedButton('date');
      setSearchQuery(''); // 검색어 초기화
      setDisplayDate(`${currentYear}년 ${currentMonth}월`);
      await fetchPhotos(); // Fetch default photos for the current date
    } else if (buttonId === 'photobooth') {
      setSelectedButton('photobooth');
      setSelectedBooth('포토부스'); // Reset selected booth filter
      await fetchPhotos(); // Fetch photos filtered by photobooth
    } else {
      setSelectedButton(buttonId);
    }
  };
  
  

  const fetchPhotos = async () => {
    try {
      if (userId) {
        const url = `${BASE_URL}api/album/${userId}`;
        const response = await axios.get(url);
  
        console.log('API 응답 데이터:', response.data); // Log the response to inspect the structure
  
        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          const photoData = response.data.map((item) => ({
            url: item.images,
            photo_like: item.photo_like,
            id: item.photo_id,
          }));
          
          setPhotos(photoData);
        } else {
          console.error('API 응답이 배열 형식이 아닙니다:', response.data);
        }
      }
    } catch (error) {
      console.error('사진 데이터 불러오기 실패:', error);
    }
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
      setActionType(action);
      setIsConfirmModalOpen(true); // 모달을 여는 역할만 수행
    }
  };
  
  const handleLikeAction = async () => {
    const updatedPhotos = photos.map(photo => 
      selectedPhotos.includes(photo.id)
        ? { ...photo, photo_like: true } // 좋아요 표시로 업데이트
        : photo
    );
    
    // 상태 업데이트를 통해 즉시 UI에 반영
    setPhotos(updatedPhotos);
  
    // 서버 업데이트
    for (const photoId of selectedPhotos) {
      try {
        await axios.post(`${BASE_URL}api/photo/like/${photoId}`);
        console.log(`Liked photo with ID: ${photoId}`);
      } catch (error) {
        console.error(`Failed to like photo with ID: ${photoId}`, error);
      }
    }
  };
  const handleDeleteAction = async () => {
    const remainingPhotos = photos.filter(photo => !selectedPhotos.includes(photo.id));
    
    // 상태 업데이트를 통해 즉시 UI에 반영
    setPhotos(remainingPhotos);
  
    // 서버 업데이트
    for (const photoId of selectedPhotos) {
      try {
        await axios.delete(`${BASE_URL}api/photo/delete/${photoId}`);
        console.log(`Deleted photo with ID: ${photoId}`);
      } catch (error) {
        console.error(`Failed to delete photo with ID: ${photoId}`, error);
      }
    }
  };

  const handleModalConfirm = (date) => {
    console.log('선택된 날짜:', date);
    setIsYearMonthModalOpen(false);
  };

  const handleConfirmModalClose = async (confirmed) => {
    if (confirmed) {
      if (actionType === 'like') {
        await handleLikeAction(); // '좋아요' 작업 실행
      } else if (actionType === 'delete') {
        await handleDeleteAction(); // '삭제' 작업 실행
      }
    }
    
    // 모달 상태와 선택 모드를 초기화
    setIsConfirmModalOpen(false);
    setIsSelectMode(false);
    setSelectedPhotos([]);
    setActionType(null);
  };
  

 

  return (
    <div className="app-container" style={{ position: 'relative', width: '390px', height: '844px', overflow: 'hidden', margin: '0 auto', border: '1px solid #ccc' }}>

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '20px', zIndex: 2 }}>
    <SearchBar
      placeholder={selectedButton === 'location' ? '현위치' : '#민지를 통해 민지와 함께 찍은 사진 보기'}
      icon={searchIcon}
      onSearch={handleSearch}
      onChange={(e) => setSearchQuery(e.target.value)}
      value={searchQuery} // searchQuery 상태를 바인딩
      width="341px"
      height="44px"
      zIndex={selectedButton === 'location' ? 10 : 1}  
      position= 'relative'
      top={selectedButton === 'location' ? '20px' : 'auto'}
      marginLeft={selectedButton === 'location' ? '16px' : '0px'} 
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
              <Button text="추가" onClick={() => navigate('/AddPhoto')} backgroundColor="#C7C9CE" borderRadius="30px" width="57px" height="33px" boxShadow="3px 3px 10px rgba(0, 0, 0, 0.25)" color="#4B515A" fontSize="14px" marginLeft="8px" />
            </>
          )}
        </div>
      )}
    </div>


      
    {selectedButton === 'location' ? (
         <>
          {latitude && longitude && (
            <KakaoMap
              center={{ lat: latitude, lng: longitude }} // 현위치를 중심으로 설정
              locations={locationPhotos} // locationPhotos에 이미지 URL만 포함
              onMarkerClick={(boothId, boothName, boothLat, boothLng) =>
                console.log("Marker clicked:", boothId, boothName, boothLat, boothLng)
              }
              userLocation={{ lat: latitude, lng: longitude }} // 사용자 현위치 전달
              isAlbumPage={true} // AlbumPage에서 호출했음을 알리기 위함
            />
          )}

         {/* 부스 선택 버튼들 */}
         <div style={{ position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
           <Button text="부스 1" onClick={() => handleBoothClick('booth1')} />
           <Button text="부스 2" onClick={() => handleBoothClick('booth2')} />
         </div>
       </>
      ) : (
        <div className="scrollable-content" style={{ overflowY: 'auto', height: 'calc(100% - 220px)', paddingTop : '121px', paddingBottom: '100px', marginLeft: '16px' }}>
          {photos.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
              <EmptyIcon style={{ marginTop: '121px' }} />
              <Text fontSize="18px" color="#676F7B" textAlign="center" fontWeight="500" marginTop="23px">
                사진을 채워보세요
              </Text>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 174px)', gap: '10px', paddingBottom :'60px' }}>
              {photos.map((photo) => (
                <Photo 
                  key={photo.id} 
                  photoId={photo.id}  // 각 사진의 photoId를 전달
                  photoUrl={photo.url} 
                  isLiked={photo.photo_like}
                  altText={`사진 ${photo.id}`} 
                  isSelectMode={isSelectMode} 
                  isSelected={selectedPhotos.includes(photo.id)} 
                  onClick={() => togglePhotoSelection(photo.id)} 
                />
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
        <ConfirmModal
          message={confirmMessage}
          onConfirm={() => handleConfirmModalClose(true)} // 함수 호출이 아닌 함수 참조 전달
          onCancel={() => handleConfirmModalClose(false)}
          style={{
            zIndex: 1000,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {isYearMonthModalOpen && (
        <YearMonthModal onClose={handleYearMonthModalClose} onConfirm={handleYearMonthConfirm} />
      )}
    </div>
  );
}

export default AlbumPage;
