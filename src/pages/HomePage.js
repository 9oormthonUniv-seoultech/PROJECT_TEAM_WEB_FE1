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
import { BASE_URL } from '../config';



function HomePage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [clickedMarkerIndex, setClickedMarkerIndex] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [distanceToCenter, setDistanceToCenter] = useState(null); // 추가된 상태

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
  useEffect(() => {
    console.log("로그인 상태:", isLoggedIn); // 로그인 상태를 확인하는 콘솔 로그
  }, [isLoggedIn]);

  // 사용자 위치 가져오기
  useEffect(() => {
    setBrands(['포토이즘박스', '하루필름', '셀픽스', '포토매틱', '인생네컷', '포토시그니처', '포토이즘컬러드', '포토그레이', '비룸']);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = { lat: latitude, lng: longitude };
          setUserLocation(currentLocation);
          setMapCenter(currentLocation); // center를 사용자의 위치로 설정
        },
        (error) => console.error("Unable to retrieve location:", error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation && mapCenter) {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        mapCenter.lat,
        mapCenter.lng
      ).toFixed(0);
      setDistanceToCenter(distance);
    }
  }, [userLocation, mapCenter]);

  const fetchLocations = async (latitude, longitude) => {
    try {
      const response = await fetch(`${BASE_URL}api/map?latitude=${latitude}&longitude=${longitude}`);
      const data = await response.json();

      const newLocations = data.photobooths.map(booth => ({
        id: booth.id,
        name: booth.name,
        lat: booth.latitude,
        lng: booth.longitude,
        brand: booth.brand,
        rating: booth.rating,
        imageUrl: `/images/${booth.brand}.png`,
      }));
      
      setSearchResults(newLocations);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  const handleMarkerClick = (boothId, boothName, boothLat, boothLng) => {

    setClickedMarkerIndex(boothId); 
    setIsBottomSheetOpen(true);

  
    // API 조회 없이 데이터를 설정
    setSelectedLocation({
      boothId: boothId,
      boothName: boothName,
     
      boothLat: boothLat,
      boothLng: boothLng
    });
  
    setIsBottomSheetOpen(true); // BottomSheet 열기
  };

  
  


  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedLocation(null); // 선택된 위치 초기화
    setClickedMarkerIndex(null);
  };

  // center가 변경될 때 BottomSheet와 clickedMarkerIndex 해제
  useEffect(() => {
    if (mapCenter) {
      console.log("Map center changed, attempting to close BottomSheet.");
      closeBottomSheet(); // BottomSheet 닫기 및 선택 상태 해제
    }
  }, [mapCenter]);
  

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

  // 부스별 버튼 클릭 시 선택된 브랜드 업데이트
  const toggleBrandSelection = (brand) => {
    setSelectedBrands((prevSelected) => 
      prevSelected.includes(brand)
        ? prevSelected.filter((b) => b !== brand)
        : [...prevSelected, brand]
    );
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

  const requireLogin = (navigateTo) => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate(navigateTo);
    }
  };
  const handleNavItemClick = (navigateTo) => {
    if (!isLoggedIn) {
      setIsModalOpen(true); // 로그인하지 않은 경우 모달 열기
    } else {
      navigate(navigateTo); // 로그인된 경우 페이지 이동
    }
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
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
  
            try {
              const response = await fetch(`${BASE_URL}api/map?latitude=${latitude}&longitude=${longitude}`);
              const data = await response.json();
  
              setSearchResults(data.photobooths.map(booth => ({
              
                id: booth.id,
                name: booth.name,
                lat: booth.latitude,
                lng: booth.longitude,
                content: booth.name,
                brand: booth.brand,
                rating: booth.rating,
                imageUrl: brandImages[booth.brand] || '/images/default.png',
              })));
  
              setMapCenter({ lat: latitude, lng: longitude });  // center 업데이트
            } catch (error) {
              console.error("현위치 요청 실패:", error);
            }
          }
        );
      }
    } else {
      // 검색어가 있을 때
      try {
        const response = await fetch(`${BASE_URL}api/map/search?searchTerm=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
  
        setSearchResults(data.photobooths.map(booth => ({
          id: booth.id,
          lat: booth.latitude,
          lng: booth.longitude,
          brand: booth.brand,
          imageUrl: brandImages[booth.brand] || '/images/default.png',
        })));
  
        if (data.photobooths.length > 0) {
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
        center={mapCenter || userLocation}
        onMarkerClick={handleMarkerClick}
        userLocation={userLocation}
        clickedMarkerIndex={clickedMarkerIndex}
        setClickedMarkerIndex={setClickedMarkerIndex} // clickedMarkerIndex 업데이트 함수 전달
      />

      <BottomSheet 
        isOpen={isBottomSheetOpen} 
        onClose={closeBottomSheet} 
        locationInfo={selectedLocation} 
        userLocation={userLocation} 
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