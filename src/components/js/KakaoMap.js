import React, { useEffect, useState } from 'react';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk'; 
import CustomMarkerOverlay from './CustomMarkerOverlay';
import ClickedCustomMarker from './ClickedCustomMarker';
import BottomSheet from './BottomSheet';


const KakaoMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [clickedMarkerIndex, setClickedMarkerIndex] = useState(null); // 클릭된 마커 상태
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // BottomSheet 열림 여부
  const [selectedLocation, setSelectedLocation] = useState(null); // 선택된 마커의 정보

  const [locations, setLocations] = useState([
    {
      lat: 37.632411,
      lng: 127.076413,
      content: '하루 필름',
      imageUrl: '/images/harufilm.png',
    },
    {
      lat: 37.634939,
      lng: 127.076313,
      content: '포토이즘',
      imageUrl: '/images/photoism.png',
    },
  ]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setUserLocation({ lat, lng: lon });
        },
        (err) => {
          console.error('사용자 위치를 가져올 수 없습니다:', err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error('Geolocation을 지원하지 않는 브라우저입니다.');
    }
  }, []);

  // 마커 클릭 핸들러
  const handleMarkerClick = (index, location) => {
    setClickedMarkerIndex(index); // 클릭된 마커의 인덱스를 상태로 설정
    setSelectedLocation(location); // 선택된 위치 정보 설정
    setIsBottomSheetOpen(true); // BottomSheet 열기
  };

  // 지도 클릭 핸들러 (지도 클릭 시 BottomSheet를 닫음)
  const handleMapClick = () => {
    setIsBottomSheetOpen(false); // BottomSheet 닫기
    setClickedMarkerIndex(null); // 클릭된 마커 초기화
  };

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' , top: 0, left: 0  }}>
      <Map
        center={userLocation || { lat: 33.450701, lng: 126.570667 }}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        level={4}
        onClick={handleMapClick} // 지도를 클릭하면 BottomSheet 닫기
      >
        {locations.map((location, index) => (
          <CustomOverlayMap
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => handleMarkerClick(index, location)} // 마커 클릭 시 해당 위치 정보 전달
          >
            {clickedMarkerIndex === index ? (
              <ClickedCustomMarker 
                imageUrl={location.imageUrl} 
                onClick={() => handleMarkerClick(index, location)}  // 클릭 시 상태 변경
              />
            ) : (
              <CustomMarkerOverlay 
                imageUrl={location.imageUrl}
                onClick={() => handleMarkerClick(index, location)} // 클릭 시 상태 변경
              />
            )}
          </CustomOverlayMap>
        ))}
      </Map>

      {/* BottomSheet 컴포넌트 */}
      {isBottomSheetOpen && (
        <BottomSheet 
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          locationInfo={selectedLocation} // 선택된 위치 정보 전달
        />
      )}
    </div>
  );
};

export default KakaoMap;
