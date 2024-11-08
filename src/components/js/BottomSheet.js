import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from './Text';
import { ReactComponent as BarIcon } from '../../assets/bar-icon.svg';
import starIcon from '../../assets/star-icon.svg';
import { BASE_URL } from '../../config';
import { ReactComponent as CloseIcon } from '../../assets/x-icon.svg'; // 닫기 아이콘 추가


const BottomSheet = ({ isOpen, onClose, locationInfo, userLocation }) => {
  const navigate = useNavigate();
  const boothId = locationInfo?.boothId;
  const boothName= locationInfo?.boothName;
  const boothLat = locationInfo?.boothLat;
  const boothLng = locationInfo?.boothLng;
  console.log(boothName);


  const [boothData, setBoothData] = useState({
    rating: 0,
    topHashtag: [],
    imageCount: 0,
    firstImage: '',
    reviewCount: 0,
    distance: null,
  });

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Convert to meters
  };

  useEffect(() => {
    const fetchBoothData = async () => {
      console.log("boothId?",boothId)
      
      if (boothId) {
        try {
          const response = await fetch(`${BASE_URL}api/booth/${boothId}`);
          const data = await response.json();
          console.log("userLocation 정보 ",userLocation);

          const distance = userLocation
            ? calculateDistance(userLocation.lat, userLocation.lng, boothLat, boothLng).toFixed(0)
            : null;

          setBoothData({
            rating: data.rating,
            topHashtag: data.topHashtag,
            imageCount: data.imageCount,
            firstImage: data.firstImage,
            reviewCount: data.reviewCount,
            distance: distance,
          });

          console.log("Updated boothData:", {
            rating: data.rating,
            topHashtag: data.topHashtag,
            imageCount: data.imageCount,
            firstImage: data.firstImage,
            reviewCount: data.reviewCount,
            distance: distance,
          });
        } catch (error) {
          console.error("데이터 요청 오류:", error);
        }
      }
    };

    fetchBoothData();
  }, [boothId, boothLat, boothLng, userLocation]);

  const handleContentClick = () => {
    if (boothId) {
      console.log("go to ",boothId, boothName);
      navigate('/BoothReview', { state: { boothId : boothId, boothName : boothName } });
    }
  };

  return (
    <div 
      style={{
        position: 'absolute',
        bottom: isOpen ? '80px' : '-80px',
        left: '0',
        width: '100%',
        height: '164px',
        backgroundColor: '#fff',
        borderRadius: '26px 26px 0px 0px',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'bottom 0.3s ease-in-out',
        zIndex: 2000,
        display: isOpen ? 'block' : 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '18px 16px' }}>
        {/* BarIcon을 중앙에 두기 위한 컨테이너 */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <BarIcon width="50" height="5" />
        </div>

        {/* 닫기 버튼을 오른쪽 끝에 배치 */}
        <button onClick={onClose} style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}>
          <CloseIcon width="15" height="15" />
        </button>
      </div>


      

      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex' }}>
            <button
              onClick={(e) => { e.stopPropagation(); handleContentClick(); }}
              style={{
                fontSize: '18px',
                color: '#171D24',
                fontWeight: '600',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
                zIndex: 2000,
                textAlign: 'left',
              }}
            >
              {boothName || '포토 부스 이름'}
            </button>
            <Text fontSize="14px" color="#676F7B" icon={starIcon} marginLeft="10px">
              {boothData.rating || '0'}
            </Text>
          </div>

          {/* Distance and review count */}
          <div style={{ display: 'flex', marginTop: '5px' }}>
            <Text fontSize="14px" color="#676F7B">
              {boothData.distance ? `${boothData.distance}m ·` : ''} 리뷰 {boothData.reviewCount || '0'}장
            </Text>
          </div>

          {/* Hashtags */}
          <div style={{ display: 'flex', marginTop: '10px', gap: '5px' }}>
            {boothData.topHashtag.length > 0 
              ? boothData.topHashtag.map((hashtag, index) => (
                  <Text key={index} fontSize="12px" color="#676F7B" backgroundColor="#E9EAEE" borderRadius="24px" padding="8px 20px">
                    # {hashtag}
                  </Text>
                ))
              : <Text fontSize="12px" color="#676F7B" backgroundColor="#E9EAEE" borderRadius="24px" padding="8px 20px">#가 없어요</Text>
            }
          </div>
        </div>

        {/* Image with count overlay */}
        <div style={{ position: 'relative', width: '82px', height: '82px', borderRadius: '4px', overflow: 'hidden', marginRight: '24px' }}>
          <img 
            src={boothData.firstImage || "https://via.placeholder.com/60"} 
            alt="포토부스 리뷰 이미지" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
            backgroundColor: '#000',
            color: '#fff',
            padding: '5px',
            borderRadius: '24px',
            fontSize: '10px',
          }}>
            +{boothData.imageCount || '0'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
