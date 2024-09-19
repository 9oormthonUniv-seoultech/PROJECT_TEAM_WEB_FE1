import React, { useEffect } from 'react';

const KakaoMap = () => {
  useEffect(() => {
    // 카카오 맵 객체가 존재하는지 확인
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 초기 위치
        level: 3, // 줌 레벨
      };
      
      // 지도 생성
      const map = new window.kakao.maps.Map(container, options);

      // 사용자 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude; // 위도
            const lon = position.coords.longitude; // 경도
            const locPosition = new window.kakao.maps.LatLng(lat, lon); // 위치를 LatLng 객체로 변환

            // 사용자 위치에 마커 추가
            const marker = new window.kakao.maps.Marker({
              position: locPosition,
              map: map,
            });

            marker.setMap(map);

            // 지도 중심을 사용자 위치로 이동
            map.setCenter(locPosition);
          },
          (err) => {
            console.error('사용자 위치를 가져올 수 없습니다:', err);
          },
          {
            enableHighAccuracy: true, // 높은 정확도로 위치 정보 요청
            timeout: 5000, // 5초 내에 응답이 없으면 오류 발생
            maximumAge: 0, // 캐시된 위치 정보 사용 안 함
          }
        );
      } else {
        console.error('Geolocation을 지원하지 않는 브라우저입니다.');
      }
    } else {
      console.error('카카오 맵 객체를 사용할 수 없습니다.');
    }
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}></div>
  );
};

export default KakaoMap;
