import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import CustomMarker from './CustomMarker';
import ReactDOMServer from 'react-dom/server';

const KakaoMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locations, setLocations] = useState([
    {
      lat: 37.632411,
      lng: 127.076413,
      content: '하루 필름',
      imageUrl: 'https://pbs.twimg.com/profile_images/1712345166403809280/lkyzN9yJ_400x400.jpg',
    },
    {
      lat: 37.634939,
      lng: 127.076313,
      content: '포토이즘',
      imageUrl: 'https://cdn.imweb.me/thumbnail/20200629/f08d9f7ab104b.png',
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

  // CustomMarker를 Base64로 변환하여 이미지로 사용
  const getMarkerImage = (imageUrl) => {
    const svgString = ReactDOMServer.renderToStaticMarkup(
      <CustomMarker imageUrl={imageUrl} /> // 전달받은 imageUrl로 CustomMarker 생성
    );
    const encoded = btoa(svgString); // Base64 인코딩
    return `data:image/svg+xml;base64,${encoded}`; // data URL 형태로 반환
  };

  return (
    <Map
      center={userLocation || { lat: 33.450701, lng: 126.570667 }}
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      level={4}
    >
      {userLocation && (
        <MapMarker position={userLocation}>
         
        </MapMarker>
      )}

      {locations.map((location, index) => (
        <MapMarker
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          image={{
            src: getMarkerImage(location.imageUrl), // CustomMarker의 Base64 이미지 사용
            size: {
              width: 64,
              height: 70,
            },
            options: {
              offset: { x: 27, y: 69 },
            },
          }}
        />
      ))}
    </Map>
  );
};

export default KakaoMap;
