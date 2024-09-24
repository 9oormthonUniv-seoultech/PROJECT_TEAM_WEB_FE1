import React, { useEffect, useState } from 'react';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk'; // CustomOverlayMap 사용
import CustomMarkerOverlay from './CustomMarkerOverlay'; // CustomMarkerOverlay 컴포넌트 이름 변경 확인

const KakaoMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locations] = useState([ // setLocations는 사용되지 않으므로 제거
    {
      lat: 37.632411,
      lng: 127.076413,
      content: '하루 필름',
      imageUrl: process.env.PUBLIC_URL + '/images/harufilm.png',
    },
    {
      lat: 37.634939,
      lng: 127.076313,
      content: '포토이즘',
      imageUrl: process.env.PUBLIC_URL + '/images/photoism.png',
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

  return (
    <Map
      center={userLocation || { lat: 33.450701, lng: 126.570667 }}
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      level={4}
    >
      {locations.map((location, index) => (
        <CustomOverlayMap
          key={index}
          position={{ lat: location.lat, lng: location.lng }} // 오버레이의 위치 설정
          yAnchor={1} // 오버레이가 위치할 수직 기준점
          content={(
            <CustomMarkerOverlay 
              imageUrl={location.imageUrl} 
              text={location.content} 
            />
          )} // CustomMarkerOverlay 컴포넌트를 content로 전달
        />
      ))}
    </Map>
  );
};

export default KakaoMap;
