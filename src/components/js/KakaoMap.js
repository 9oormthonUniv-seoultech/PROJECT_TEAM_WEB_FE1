import React, { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import CustomMarkerOverlay from './CustomMarkerOverlay';
import ClickedCustomMarker from './ClickedCustomMarker';

const KakaoMap = ({ source, onBrandsUpdate, selectedBrands = [], locations: propLocations = [], center, onMarkerClick, userLocation }) => {
  const [clickedMarkerIndex, setClickedMarkerIndex] = useState(null);
  const [locations, setLocations] = useState([]);

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

  

  useEffect(() => {
    if (!propLocations.length && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          await fetchLocations(lat, lon);
        },
        (err) => console.error('사용자 위치를 가져올 수 없습니다:', err),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else if (propLocations.length) {
      setLocations(propLocations);
    }
  }, [propLocations]);

  const fetchLocations = async (latitude, longitude, brand = '') => {
    try {
      const response = await fetch(`/api/map?latitude=${latitude}&longitude=${longitude}&brand=${brand}`);
      const data = await response.json();
      const newLocations = data.photobooths.map((booth) => ({
        id: booth.id,
        lat: booth.latitude,
        lng: booth.longitude,
        content: booth.name,
        brand: booth.brand,
        imageUrl: brandImages[booth.brand] || '/images/default.png',
        rating: booth.rating,
      }));
      setLocations(newLocations);

      if (onBrandsUpdate) {
        const uniqueBrands = [...new Set(newLocations.map((location) => location.brand))];
        onBrandsUpdate(uniqueBrands);
      }
    } catch (error) {
      console.error("데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  const handleMarkerClick = (location) => {
    if (clickedMarkerIndex === location.id) {
      setClickedMarkerIndex(null); // 마커 클릭 해제
      onMarkerClick(null); // BottomSheet 닫기
    } else {
      setClickedMarkerIndex(location.id); // 새 마커 클릭 설정
      onMarkerClick(location); // BottomSheet 열기
    }
  };

  const filteredLocations = selectedBrands.length > 0
    ? locations.filter((location) => selectedBrands.includes(location.brand))
    : locations;

  return (
    <div style={styles.mapContainer}>
      <Map center={center || userLocation || { lat: 37.6329741, lng: 127.0798802 }} style={styles.map} level={4}>
        
        {/* Center 위치에 기본 마커 표시 */}
        {center && (
          <MapMarker
            position={center}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 카카오 제공 기본 마커 이미지
              size: { width: 24, height: 35 }
            }}
          />
        )}

        {/* 검색 결과 마커 */}
        {filteredLocations.map((location) => (
          <CustomOverlayMap
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
          >
            {clickedMarkerIndex === location.id ? (
              <ClickedCustomMarker 
                imageUrl={location.imageUrl} 
                onClick={() => handleMarkerClick(location)}
              />
            ) : (
              <CustomMarkerOverlay 
                imageUrl={location.imageUrl} 
                onClick={() => handleMarkerClick(location)}
              />
            )}
          </CustomOverlayMap>
        ))}
      </Map>
    </div>
  );
};

export default KakaoMap;

const styles = {
  mapContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
};
