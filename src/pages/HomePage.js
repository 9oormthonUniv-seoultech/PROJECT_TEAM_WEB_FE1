import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/js/Navbar';
import SearchBar from '../components/js/SearchBar';
import searchIcon from '../assets/search-icon.svg';
import KakaoMap from '../components/js/KakaoMap';
import Button from '../components/js/Button';
import Text from '../components/js/Text';
import FilteringButton from '../components/js/FilteringButton';
import BottomSheet from '../components/js/BottomSheet';
import addIcon from '../assets/add-icon.svg';

function HomePage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [clickedMarkerIndex, setClickedMarkerIndex] = useState(null);

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

   // BottomSheet 관련 상태 추가
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);



    // Haversine formula를 이용한 거리 계산 함수 추가
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // 지구 반경 (km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c * 1000; // 결과를 meter 단위로 반환
  };

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => console.error("사용자 위치를 가져올 수 없습니다:", error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);

  const handleMarkerClick = (location) => {
    if (location) {
      setSelectedLocation(location);
      setIsBottomSheetOpen(true);
    } else {
      setIsBottomSheetOpen(false);
      setSelectedLocation(null);
    }
  };


  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedLocation(null); // 선택된 위치 초기화
    setClickedMarkerIndex(null);
  };

  const brandImages = {
    '포토이즘박스': '/images/photoism.png',
    '하루필름': '/images/harufilm.png',
    '셀픽스': '/images/selfix.png',
    '포토매틱': '/images/photomatic.png',
    '인생네컷': '/images/insaeng.png',
    '포토시그니처': '/images/photosignature.png',
    '포토이즘컬러드': '/images/photoismcolored.png',
    '포토그레이': '/images/photogray.png',
    '비룸': '/images/broom.png',
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const requireLogin = () => {
    if (!isLoggedIn) setIsModalOpen(true);
  };

  const handleAddPhotoClick = () => {
    if (isLoggedIn) {
      navigate('/AddPhoto');
    } else {
      requireLogin();
    }
  };

  const handleLoginClick = () => {
    setIsModalOpen(false);
    navigate('/Login');
  };

  // searchTerm 업데이트 확인
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    console.log("검색어:", e.target.value); // searchTerm 업데이트 확인
  };

  const handleSearchIconClick = async () => {
    if (!searchTerm.trim()) {
      // 검색어가 없을 때 현위치로 지도 이동
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            try {
              const response = await fetch(`/api/map?latitude=${latitude}&longitude=${longitude}`);
              const data = await response.json();
  
              setSearchResults(data.photobooths.map(booth => ({
                id : booth.id,
                name : booth.name,
                lat: booth.latitude,
                lng: booth.longitude,
                content: booth.name,
                brand: booth.brand,
                rating : booth.rating,
                imageUrl: brandImages[booth.brand] || '/images/default.png',
              })));
  
              setMapCenter({ lat: latitude, lng: longitude });
            } catch (error) {
              console.error("현위치 요청 실패:", error);
            }
          },
          (err) => console.error('사용자 위치를 가져올 수 없습니다:', err),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      }
    } else {
      // 검색어가 있을 때 검색 API 호출
      try {
        const response = await fetch(`/api/map/search?searchTerm=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
  
        setSearchResults(data.photobooths.map(booth => ({
          lat: booth.latitude,
          lng: booth.longitude,
          content: booth.name,
          brand: booth.brand,
          imageUrl: brandImages[booth.brand] || '/images/default.png',
        })));
  
        if (data.place_name && data.photobooths.length > 0) {
          setMapCenter({ 
            lat: data.photobooths[0].latitude, 
            lng: data.photobooths[0].longitude 
          });
        }
      } catch (error) {
        console.error("검색 요청 실패:", error);
      }
    }
  };
  
  

  const toggleBrandSelection = (brand) => {
    setSelectedBrands((prevSelected) => 
      prevSelected.includes(brand)
        ? prevSelected.filter((b) => b !== brand)
        : [...prevSelected, brand]
    );
  };

 
  return (
    <div className="app-container" style={{ position: 'relative', width: '390px', height: '844px', overflow: 'hidden', margin: '0 auto', border: '1px solid #ccc' }}>
      
      <div style={{ position: 'absolute', top: '42px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        <SearchBar
          placeholder="구, 역, 건물명 등으로 검색해주세요"
          icon={searchIcon}
          onSearch={handleSearchIconClick}
          width="358px"
          height="42px"
          fontSize="14px"
          fontWeight="400"
          backgroundColor="#FFFFFF"
          searchTerm={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>

      <div
        ref={scrollRef}
        className="scrollable-content-x"
        style={{
          position: 'absolute',
          top: '109px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          display: 'flex',
          gap: '10px',
          padding: '10px 0',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
         {brands.map((brand, index) => (
          <FilteringButton
            key={index}
            text={brand}
            onClick={() => toggleBrandSelection(brand)}
            isSelected={selectedBrands.includes(brand)}
          />
        ))}
      </div>


      <div style={{ position: 'absolute', top: '661px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        <Button 
          text="추억 저장하기"
          onClick={handleAddPhotoClick}
          backgroundColor="#5453EE"
          borderRadius="8px"
          width="280px"
          height="57px"
          color="#FFFFFF"
          fontSize="20px"
          icon={addIcon}
          iconMargin="15px"
          iconPosition="left"
        />
      </div>

      <KakaoMap
        source="home"
        locations={searchResults.length > 0 ? searchResults : []}
        onBrandsUpdate={setBrands}
        selectedBrands={selectedBrands}
        center={mapCenter}
        onMarkerClick={handleMarkerClick}
        userLocation={userLocation}
      />

      <BottomSheet 
        isOpen={isBottomSheetOpen} 
        onClose={() => setIsBottomSheetOpen(false)} 
        locationInfo={selectedLocation} 
      />


      <div className="navbar-fixed" style={{ position: 'absolute', bottom: '0', width: '100%', zIndex: 20 }}>
        <Navbar onNavItemClick={requireLogin} />
      </div>

      {isModalOpen && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 25,
          }}
          onClick={() => setIsModalOpen(false)}
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
            onClick={(e) => e.stopPropagation()}
          >
            <Text fontSize="12px" color="#676F7B" fontWeight="400" marginTop="20px" marginLeft="20px">
              3초 로그인으로 추억을 저장해보세요
            </Text>
            <Text fontSize="18px" color="#171D24" fontWeight="500" marginTop="5px" marginLeft="20px">
              해당 기능은 로그인 후에 이용할 수 있어요
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
              <Button 
                text="로그인하기"
                onClick={handleLoginClick}
                backgroundColor="#5453EE"
                borderRadius="8px"
                width="150px"
                height="50px"
                color="#FFFFFF"
                fontSize="16px"
                boxShadow="none"
                marginLeft="20px"
              />
              <Button 
                text="괜찮아요"
                onClick={() => setIsModalOpen(false)}
                backgroundColor="#FFFFFF"
                borderRadius="8px"
                width="150px"
                height="50px"
                color="#676F7B"
                fontSize="16px"
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
