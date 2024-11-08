import React, { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import CustomMarkerOverlay from './CustomMarkerOverlay';
import ClickedCustomMarker from './ClickedCustomMarker';
import currentMarker from '../../assets/current-marker.svg';
import { BASE_URL } from '../../config';


const KakaoMap = ({ source, onBrandsUpdate, selectedBrands = [], locations: propLocations = [], center, onMarkerClick, userLocation, isAlbumPage }) => {
  const [clickedMarkerIndex, setClickedMarkerIndex] = useState(null);
  const [locations, setLocations] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(userLocation); // 초기 위치 설정

  const defaultLocation = { lat: 37.6329741, lng: 127.0798802 }; // 서울 기본 좌표
   // 기존 데이터와의 혼동을 방지하고 AlbumPage 데이터를 우선 처리
  const filteredLocations = isAlbumPage
  ? propLocations // AlbumPage에서 전달된 locationPhotos 데이터를 그대로 사용
  : selectedBrands.length > 0
    ? locations.filter((location) => selectedBrands.includes(location.brand))
    : locations;

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
    if (center) {
      fetchLocations(center.lat, center.lng);
      setMarkerPosition(center); // center가 업데이트될 때마다 marker 위치 업데이트
    }
  }, [center]);

  const fetchLocations = async (latitude, longitude) => {
    try {
      const response = await fetch(`${BASE_URL}api/map?latitude=${latitude}&longitude=${longitude}`);
      const data = await response.json();
      const newLocations = data.photobooths.map((booth) => ({
        id: booth.id,
        name: booth.name,
        lat: booth.latitude,
        lng: booth.longitude,
        brand: booth.brand,
        rating: booth.rating,
        imageUrl: brandImages[booth.brand] || '/images/default.png',
      }));
      setLocations(newLocations);
    } catch (error) {
      console.error("데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  const handleMarkerClick = (boothId, boothName, boothLat, boothLng) => {
    setClickedMarkerIndex(boothId); // 클릭된 마커 상태 업데이트
    onMarkerClick(boothId, boothName, boothLat, boothLng); // HomePage로 전달
  };

  

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Map center={center || defaultLocation} style={{ width: '100%', height: '100%' }} level={4}>
        
        {/* 사용자 위치 또는 center 위치에 따라 마커 표시 */}
        {markerPosition && (
          <MapMarker
            position={markerPosition}
            image={{
              src: currentMarker,
              size: {
                width: 36,
                height: 36,
              },
            }}
          />
        )}
        
        {/* 부스 위치 마커들 */}
        {filteredLocations.map((location) => {
        

          return (
            <CustomOverlayMap key={location.id} position={{ lat: location.lat, lng: location.lng }}>
              <CustomMarkerOverlay
                imageUrl={location.imageUrl} // imageUrl 전달
                boothName={location.name}
                boothId={location.id}
                boothLat={location.lat}
                boothLng={location.lng}
                isClicked={clickedMarkerIndex === location.id}
                onClick={() => handleMarkerClick(location.id, location.name, location.lat, location.lng)}
              />
            </CustomOverlayMap>
          );
        })}

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
