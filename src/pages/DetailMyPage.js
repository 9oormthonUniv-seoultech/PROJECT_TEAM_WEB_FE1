import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderBar from '../components/js/HeaderBar';
import Text from '../components/js/Text';
import Button from '../components/js/Button';
import NextIcon from '../assets/next-icon.svg';
import StarIcon from '../assets/star-icon.svg';
import MarkerIcon from '../assets/marker-icon.svg';
import EditIcon from '../assets/edit-icon.svg';

const DetailMyPage = () => {
  const location = useLocation();
  const { type, data } = location.state || { type: '', data: [] }; // 전달받은 데이터
  
  // Header text를 type에 따라 설정
  const headerText = 
    type === 'review' ? '나의 리뷰' : 
    type === 'liked' ? '찜해둔 부스' : 
    '최근 방문한 부스';

  return (
    <div className="detail-my-page">
      <HeaderBar title={headerText} showBackButton={true} />
      
      <div className="scrollable-content" style={{ marginTop: '24px', marginLeft: '8px' }}>
        {type === 'review' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '8px',
          }}>
            {data.map((review, index) => (
              <div key={index} style={{ width: '175px', height: '186px', borderRadius: '10px', backgroundColor: '#E9EAEE', position: 'relative' }}>
                <img
                  src={review.image}
                  style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }}
                  alt={`리뷰 이미지 ${index + 1}`}
                />
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: '#FFFFFF' }}>
                  <Text fontSize="12px" fontWeight="400">
                    {new Date(review.date).getMonth() + 1}월 {new Date(review.date).getDate()}일
                  </Text>
                  <Text fontSize="14px" fontWeight="500" icon={MarkerIcon} iconPosition="left">
                    {review.photobooth_name}
                  </Text>
                  <Text fontSize="12px" fontWeight="400">
                    ⭐ {review.rating}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        ) : (
          data.map((booth, index) => (
            <div key={index} style={{ display: 'flex', width: '358px', height: '110px', borderRadius: '10px', backgroundColor: '#E9EAEE', alignItems: 'center', marginBottom: '16px' }}>
              <img
                src={booth.photo_url || "https://via.placeholder.com/80"}
                alt={`부스 이미지 ${index + 1}`}
                style={{ width: '80px', height: '80px', borderRadius: '4px', marginLeft: '10px', objectFit: 'cover' }}
              />
              <div style={{ marginLeft: '20px', flex: 1 }}>
                <Text fontSize="14px" color="#171D24" fontWeight="500" icon={NextIcon} iconPosition="right">
                  {booth.photobooth_name}
                </Text>
                <Text fontSize="12px" color="#676F7B" fontWeight="500" marginTop="4px">
                  {type === 'liked' ? '찜한 부스' : `${new Date(booth.date).getMonth() + 1}월 ${new Date(booth.date).getDate()}일 이용`}
                </Text>
                {type !== 'liked' && (
                  <Button
                    text="리뷰 쓰러가기"
                    fontWeight="400"
                    backgroundColor="#5453EE"
                    borderRadius="24px"
                    padding="6px 12px"
                    color="#ffffff"
                    fontSize="12px"
                    marginTop="22.5px"
                    boxShadow="none"
                    icon={EditIcon}
                    iconPosition="right"
                    onClick={() => alert('리뷰 작성 클릭!')}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DetailMyPage;
