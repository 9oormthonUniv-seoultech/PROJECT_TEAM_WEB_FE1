// BoothReviewPage.js
import React, { useState } from 'react';
import HeaderBar from '../components/js/HeaderBar'; // HeaderBar 컴포넌트 가져오기
import { ReactComponent as HeartIcon } from '../assets/heart-icon.svg';
import Button from '../components/js/Button';
import Text from '../components/js/Text';
import ReviewBar from '../components/js/ReviewBar';
import ReviewList from '../components/js/ReviewList';
import variousFrame from '../assets/booth-review/various-frame-icon.svg';
import cleanBooth from '../assets/booth-review/clean-booth-icon.svg';
import wideBooth from '../assets/booth-review/wide-booth-icon.svg';
import variousBack from '../assets/booth-review/various-back-icon.svg';
import coolFilter from '../assets/booth-review/cool-filter-icon.svg';
import natural from '../assets/booth-review/natural-icon.svg';
import lighter from '../assets/booth-review/lighter-icon.svg';
import noShine from '../assets/booth-review/no-shine-icon.svg';



const BoothReviewPage = () => {
  const boothName = '하루필름 강남점';
  const location = '서울특별시 강남구 역삼동 123-45';
  const distance = '345m';
  const totalReview = '567';
  const reviews = [
    {
      profileImage: 'https://via.placeholder.com/40',
      nickname: '홍길동',
      date: '2024-10-14',
      content: '부스가 매우 깔끔하고 다양한 프레임이 있어서 좋았어요!',
      hashtags: ['깔끔한', '다양한프레임'],
      boothImage: 'https://via.placeholder.com/100',
      imageCount : 5

    },
    {
      profileImage: 'https://via.placeholder.com/40',
      nickname: '김철수',
      date: '2024-10-13',
      content: '부스 공간이 넓어서 편안하게 촬영할 수 있었습니다.',
      hashtags: ['넓은공간', '편안한'],
      boothImage:'https://via.placeholder.com/100',
      imageCount : 12
    }
  ];



  const [selectedTab, setSelectedTab] = useState('home'); // 탭 상태 관리

  // 각 탭 클릭 핸들러
  const handleTabClick = (tab) => {
    setSelectedTab(tab); // 선택된 탭 설정
  };

  return (
    <div className="booth-review-page">
      {/* HeaderBar */}
      <HeaderBar 
        title="하루필름 혜화역점"
        showBackButton={true}
        showCloseButton={false}
        backgroundColor="#ffffff"
        buttonColor="#171D24"
      />

      {/* 사진 슬라이드 */}
      <div className="image-slider" style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
        {[1, 2, 3, 4].map((_, index) => (
          <div 
            key={index}
            className="slide"
            style={{ minWidth: '100%', height: '300px', backgroundColor: '#f0f0f0', borderRadius: '10px', scrollSnapAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <img 
              src={`https://via.placeholder.com/300x300?text=Image+${index + 1}`} 
              alt={`슬라이드 이미지 ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
            />
          </div>
        ))}
      </div>

      {/* 슬라이드 인디케이터 */}
      <div className="slider-indicator" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {[1, 2, 3, 4].map((_, index) => (
          <div 
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: index === 0 ? '#5453EE' : '#E9EAEE',
              margin: '0 4px'
            }}
          />
        ))}
      </div>

      {/* 포토부스 정보 및 길찾기 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '0 16px' }}>
        <div>
          <p style={{ fontSize: '16px', fontWeight: '600', margin: '0' }}>{boothName}</p>
          <p style={{ fontSize: '12px', color: '#676F7B', margin: '5px 0' }}>{location}</p>
          <p style={{ fontSize: '12px', color: '#676F7B', margin: '5px 0' }}>현재 위치로부터 {distance}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button 
            text="길안내 시작" 
            backgroundColor="#5453EE"
            color="#ffffff"
            borderRadius="30px"
            padding="10px 27.5px"
            fontSize="16px"
            boxShadow="none"
            onClick={() => alert('길찾기 클릭!')}
          />
          <HeartIcon style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
        </div>
      </div>

      {/* 탭 버튼: 홈, 리뷰, 사진 */}
      <div 
        style={{
          display: 'flex', 
          justifyContent: 'space-between', // 버튼들 사이의 간격을 일정하게 설정
          marginTop: '31.87px', 
          paddingBottom: '10px', // 아래 테두리와 버튼들 사이의 간격 조정
          borderBottom: '1px solid #E9EAEE', // 아래 회색 테두리 추가
          padding: '0 17px', // 버튼 양쪽에 패딩 추가
        }}
      >
        <Button 
          text="홈" 
          width="67px"
          backgroundColor="#ffffff"
          boxShadow="none"
          color= {selectedTab === 'home' ? '#171D24' : '#A1A6B5'}
          fontSize="14px"
          fontWeight="600"
          padding="0 0 10px 0"
          borderBottom={selectedTab === 'home' ? '4px solid #5453EE' : 'none'}
          onClick={() => handleTabClick('home')}
        />
        <Button 
          text="리뷰" 
          width="67px"
          backgroundColor="#ffffff"
          boxShadow="none"
          color={selectedTab === 'review' ? '#171D24' : '#A1A6B5'}
          fontSize="14px"
          fontWeight="600"
          padding="0 0 10px 0"
          borderBottom={selectedTab === 'review' ? '4px solid #5453EE' : 'none'}
          onClick={() => handleTabClick('review')}
        />
        <Button 
          text="사진" 
          width="67px"
          backgroundColor="#ffffff"
          boxShadow="none"
          color={selectedTab === 'photo' ? '#171D24' : '#A1A6B5'}
          fontSize="14px"
          fontWeight="600"
          padding="0 0 10px 0"
          borderBottom={selectedTab === 'photo' ? '4px solid #5453EE' : 'none'}
          onClick={() => handleTabClick('photo')}
        />
      </div>


      {/* 탭에 따른 내용 */}
      <div className='scroll-container-y' style={{  marginTop: '23px', height: 'calc(100vh - 500px)', overflowY: 'auto' }}>
        {selectedTab === 'home' && (
          <div>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>부스 만족도</p>
            <p style={{ fontSize: '14px', color: '#676F7B' }}>별점: ⭐ 4.5</p>
            <div className="review-images" style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginTop: '20px' }}>
              {[1, 2, 3, 4].map((_, index) => (
                <img 
                  key={index}
                  src={`https://via.placeholder.com/150?text=Review+${index + 1}`} 
                  alt={`리뷰 이미지 ${index + 1}`}
                  style={{ width: '150px', height: '150px', borderRadius: '10px', objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>
        )}
        {selectedTab === 'review' && (
          <div>
            <div style={{padding : "0px 17px"}}>
              {/* 상단 텍스트 */}
              <Text fontSize="18px" color="#171D24" fontWeight="600" marginBottom="31px">
                부스는 이런 점이 좋았어요
              </Text>
              <ReviewBar icon={variousFrame} label="다양한 프레임" count={120} percentage={80} />
              <ReviewBar icon={cleanBooth} label="청결한 부스" count={78} percentage={66.67} />
              <ReviewBar icon={wideBooth} label="넓은 부스 공간" count={50} percentage={40} />
              <ReviewBar icon={variousBack} label="다양한 배경색" count={50} percentage={40} />
            </div>
            <div style={{width: '412px', height: '12px', backgroundColor: '#F7F7F7', margin: '20px auto'}} ></div>
            
            <div style={{padding : "0px 17px"}}>
              {/* 상단 텍스트 */}
              <Text fontSize="18px" color="#171D24" fontWeight="600" marginBottom="31px">
                촬영스타일은 이런 느낌이에요
              </Text>
              <ReviewBar icon={coolFilter} label="쿨톤 필터 가능" count={120} percentage={80} />
              <ReviewBar icon={natural} label="자연스러운 보정" count={78} percentage={66.67} />
              <ReviewBar icon={lighter} label="생각보다 밝음" count={50} percentage={40} />
              <ReviewBar icon={noShine} label="빚번짐 없음" count={50} percentage={40} />
            </div>
            <div style={{width: '412px', height: '12px', backgroundColor: '#F7F7F7', margin: '20px auto'}} ></div>
            <div>
              <div style={{display:'flex', marginLeft : '16px' }}>
                <Text fontSize="18px" color="#171C24" fontWeight="600"> 리뷰 </Text>
                <Text fontSize="18px" color="#676F7B" fontWeight="600" > {totalReview} </Text>
              </div>
              {reviews.map((review, index) => (
                <ReviewList
                  key={index}
                  profileImage={review.profileImage}
                  nickname={review.nickname}
                  date={review.date}
                  content={review.content}
                  hashtags={review.hashtags}
                  boothImage={review.boothImage}
                  imageCount={review.imageCount}
                />
              ))}
          </div>
           

          </div>
          

        )}
        {selectedTab === 'photo' && (
          <div>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>사진 갤러리</p>
            {/* 사진 리스트 */}
            <div className="photo-gallery" style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(2, 1fr)', marginTop: '20px' }}>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <img 
                  key={index}
                  src={`https://via.placeholder.com/150?text=Photo+${index + 1}`} 
                  alt={`갤러리 이미지 ${index + 1}`}
                  style={{ width: '100%', height: '150px', borderRadius: '10px', objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoothReviewPage;
