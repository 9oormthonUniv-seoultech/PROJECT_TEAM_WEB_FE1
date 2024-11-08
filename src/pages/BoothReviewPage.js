// BoothReviewPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import HeaderBar from '../components/js/HeaderBar';
import Navbar from '../components/js/Navbar'; // HeaderBar 컴포넌트 가져오기
import { ReactComponent as HeartIcon } from '../assets/heart-icon.svg';
import Button from '../components/js/Button';
import Text from '../components/js/Text';
import ReviewBar from '../components/js/ReviewBar';
import ReviewList from '../components/js/ReviewList';
import NextIcon from '../assets/next-icon.svg';
import OneStarFaceIcon from '../assets/star-face-icon/one-star-face-icon.svg';
import TwoStarFaceIcon from '../assets/star-face-icon/two-star-face-icon.svg';
import ThreeStarFaceIcon from '../assets/star-face-icon/three-star-face-icon.svg';
import FourStarFaceIcon from '../assets/star-face-icon/four-star-face-icon.svg';
import FiveStarFaceIcon from '../assets/star-face-icon/five-star-face-icon.svg';
import variousFrame from '../assets/booth-review/various-frame-icon.svg';
import cleanBooth from '../assets/booth-review/clean-booth-icon.svg';
import wideBooth from '../assets/booth-review/wide-booth-icon.svg';
import variousBack from '../assets/booth-review/various-back-icon.svg';
import coolFilter from '../assets/booth-review/cool-filter-icon.svg';
import natural from '../assets/booth-review/natural-icon.svg';
import lighter from '../assets/booth-review/lighter-icon.svg';
import noShine from '../assets/booth-review/no-shine-icon.svg';
import { BASE_URL } from '../config';


const BoothReviewPage = () => {
  const { userId } = useAuth(); 
  const location = useLocation();
  const distance = '345m';
  const boothId = location.state?.boothId;
  const boothName = location.state?.boothName;
  const [reviews, setReviews] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  console.log("boothId ?", boothId);
  console.log("boothName ?", boothName);
  const location2 = '서울특별시 강남구 역삼동 123-45';
  const [reviewPhotos, setReviewPhotos] = useState([]); // reviewPhotos 배열을 저장할 상태

  // Log boothId to verify it's being received
  console.log("Received boothId:", boothId);

  const [currentSlide, setCurrentSlide] = useState(0);
  const imageGridSize = { width: 112, height: 119 }; 
  const imageSliderRef = useRef(null);
  const [totalImageCount, setTotalImageCount] = useState(0);


  const totalSlides = 4; 
  const getStarFaceIcon = (rating) => {
    if (rating < 1.5) return <img src={OneStarFaceIcon} alt="1 star face" />;
    if (rating < 2.5) return <img src={TwoStarFaceIcon} alt="2 star face" />;
    if (rating < 3.5) return <img src={ThreeStarFaceIcon} alt="3 star face" />;
    if (rating < 4.5) return <img src={FourStarFaceIcon} alt="4 star face" />;
    return <img src={FiveStarFaceIcon} alt="5 star face" />;
  };

  const handleScroll = () => {
    const scrollPosition = imageSliderRef.current.scrollLeft;
    const slideWidth = imageSliderRef.current.offsetWidth;
    const newSlideIndex = Math.round(scrollPosition / slideWidth);
    setCurrentSlide(newSlideIndex);
  };

  const handleIndicatorClick = (index) => {
    const slideWidth = imageSliderRef.current.offsetWidth;
    imageSliderRef.current.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth',
    });
    setCurrentSlide(index);
  };
  const handleHeartClick = async () => {
    setIsLiked(!isLiked); // 하트 상태 변경

    try {
      await axios.post('${BASE_URL}api/booth', {
        user_id: userId,        // 현재 사용자 ID
        photobooth_id: boothId, // 부스 ID
        isLiked: !isLiked       // 현재 하트 상태
      });
      console.log(`Heart icon clicked. New liked status: ${!isLiked}`);
    } catch (error) {
      console.error("Failed to send like status:", error);
      // 요청 실패 시 상태를 원래대로 되돌림
      setIsLiked(isLiked);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (boothId) {
          const response = await axios.get(`${BASE_URL}api/review/boothphoto/${boothId}`);
          setRating(response.data.rating); // rating 값을 상태에 저장
          setReviewPhotos(response.data.reviewPhotos); // reviewPhotos 배열을 상태에 저장
          setTotalImageCount(response.data.totalImageCount);
          console.log("Fetched reviews:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    const fetchBoothData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/review/booth/${boothId}`);
        setReviews(response.data.reviews);
        
        const photos = response.data.reviews.map((review) => review.image);
        setReviewPhotos(photos);
      } catch (error) {
        console.error("Failed to fetch booth data:", error);
      }
    };
    if (boothId) {
      fetchBoothData();
    }

    fetchReviews();
  }, [boothId]);

  
  const totalReview = '567';
  


  const [rating, setRating] = useState(0);
  const [selectedTab, setSelectedTab] = useState('home'); // 탭 상태 관리

  // 각 탭 클릭 핸들러
  const handleTabClick = (tab) => {
    setSelectedTab(tab); // 선택된 탭 설정
  };
  const handleStarClick = (index) => {
    setRating(index);
  };

  const handleMorePhotosClick = () => {
    alert('더보기 클릭!'); // '더보기' 버튼 클릭 시 동작 추가
  };

  return (
    <div className="app-container" >
      {/* HeaderBar */}
      <HeaderBar 
        title={boothName}
        showBackButton={true}
        showCloseButton={false}
        backgroundColor="#ffffff"
        buttonColor="#171D24"
      />
      <div className="navbar-fixed" style={{ position: 'absolute', bottom: '0', width: '100%', zIndex: 20 }}>
        <Navbar />
      </div>
      <div className='scrollable-content'>

      {/* 사진 슬라이드 */}
      <div 
          className="scrollable-content-x" 
          ref={imageSliderRef} 
          style={{ position: 'relative', display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory' }} 
          onScroll={handleScroll}
        >
          {reviewPhotos.map((photoUrl, index) => (
            <div
              key={index}
              className="slide"
              style={{ 
                minWidth: '100%', 
                height: '300px', 
                backgroundColor: '#f0f0f0', 
                scrollSnapAlign: 'center', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                position: 'relative' 
              }}
            >
              <img
                src={photoUrl}
                alt={`슬라이드 이미지 ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              
              {/* 슬라이드 인디케이터 */}
              <div 
                className="slider-indicator" 
                style={{ 
                  position: 'absolute', 
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex', 
                  zIndex: 1 
                }}
              >
                {reviewPhotos.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleIndicatorClick(idx)}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: currentSlide === idx ? '#5453EE' : '#ffffff',
                      boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.25)',
                      margin: '0 9px',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>


      

      {/* 포토부스 정보 및 길찾기 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '19px', padding: '0 16px' }}>
        <div>
          <p style={{ fontSize: '16px', fontWeight: '600', margin: '0' }}>{boothName}</p>
          <p style={{ fontSize: '12px', color: '#676F7B', margin: '8px 0' }}>{location2}</p>
          <p style={{ fontSize: '12px', color: '#676F7B', margin: '5px 0' }}>현재 위치로부터 {distance}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Button 
            text="길안내 시작" 
            backgroundColor="#5453EE"
            color="#ffffff"
            borderRadius="30px"
            padding="10px 27px"
            fontSize="16px"
            boxShadow="none"
            onClick={() => alert('길찾기 클릭!')}
          />
            
             <button
              onClick={handleHeartClick}
              style={{
                position: 'relative',
                
                width: '30.71px',
                height: '30.71px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer',
              }}
            >
              <svg
                width="24"
                height="21"
                viewBox="0 0 24 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.8375 2.29583C20.667 1.28935 19.2293 0.79248 17.7979 0.79248C16.3666 0.79248 14.9161 1.30209 13.7647 2.29583C13.3702 2.63982 13.0458 3.04751 12.7595 3.48705L12.4669 3.93296L12.1743 3.48705C11.8944 3.04751 11.5699 2.63345 11.1691 2.29583C10.0177 1.30209 8.58634 0.79248 7.1359 0.79248C5.68546 0.79248 4.26683 1.28935 3.0963 2.29583C0.507131 4.52538 0.214494 8.43664 2.44105 11.0293L10.6093 19.8264C11.1055 20.3552 11.7799 20.61 12.4478 20.61C12.4478 20.61 12.4542 20.61 12.4605 20.61C12.4669 20.61 12.4669 20.61 12.4733 20.61C13.1412 20.61 13.8156 20.3488 14.3118 19.8264L22.48 11.0293C24.7066 8.43664 24.414 4.52538 21.8248 2.29583H21.8375Z"
                  fill={isLiked ? '#5453EE' : '#C7C9CE'}
                />
              </svg>
          </button>
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
      <div  style={{  marginTop: '23px', height: 'calc(100vh - 500px)'  }}>
   
         {selectedTab === 'home' && (
          <div   style={{paddingLeft: '17px'}}>
            <p style={{ fontSize: '18px', fontWeight: '600' }}>부스 만족도</p>
            
      
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '19px' }}>
              {/* 선택된 별에 따른 아이콘 */}
              <div>{getStarFaceIcon(rating)}</div>
            </div>
            {/* 구분선 */ }
            <div style={{ width: '120%', height: '10px', backgroundColor: '#f7f7f7', margin: '20px -16px', }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Text fontSize="18px" fontWeight="600">사진 </Text>
                <Text fontSize="18px" fontWeight="600" color="#676F7B" marginLeft="5px">{totalImageCount}</Text>
              </div>
             
              <Button 
                text="더보기" 
                backgroundColor="#E9EAEE"
                border="none"
                borderRadius="24px"
                padding="4px 8px"
                marginRight="16px"
                color="#676F7B"
                fontSize="12px"
                fontWeight="400"
                boxShadow="none"
                icon={NextIcon}
                iconPosition="right"
                onClick={handleMorePhotosClick}
              />
            </div>


            {/* 사진 3x2 그리드 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {reviewPhotos.slice(0, 5).map((photoUrl, index) => (
                <img
                  key={index}
                  src={photoUrl}
                  alt={`사진 ${index + 1}`}
                  style={{ width: `${imageGridSize.width}px`, height: `${imageGridSize.height}px`, objectFit: 'cover', borderRadius: '8px' }}
                />
              ))}

              {/* 이미지가 6개 미만일 때 빈 칸 추가 */}
              {Array.from({ length: 6 - Math.min(6, reviewPhotos.length) }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  style={{
                    width: `${imageGridSize.width}px`,
                    height: `${imageGridSize.height}px`,
                    backgroundColor: '#E9EAEE',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  {/* 마지막 빈 칸에 추가 이미지 수 표시 */}
                  {index === 5 - reviewPhotos.slice(0, 5).length && totalImageCount > 6 && (
                    <Text fontSize="18px" color="#5453EE" fontWeight="600" style={{ position: 'absolute' }}>
                      +{totalImageCount - 5}
                    </Text>
                  )}
                </div>
              ))}
            </div>
             {/* 구분선 */ }
             <div style={{ width: '120%', height: '10px', backgroundColor: '#f7f7f7', margin: '20px -16px', }}></div>

            <div>
              {/* 상단 텍스트 */}
              <Text fontSize="18px" color="#171D24" fontWeight="600" marginBottom="31px">
                부스는 이런 점이 좋았어요
              </Text>
              <ReviewBar icon={variousFrame} label="다양한 프레임" count={120} percentage={80} />
              <ReviewBar icon={cleanBooth} label="청결한 부스" count={78} percentage={66.67} />
              <ReviewBar icon={wideBooth} label="넓은 부스 공간" count={50} percentage={40} />
              <ReviewBar icon={variousBack} label="다양한 배경색" count={50} percentage={40} />
            </div>

             {/* 구분선 */ }
             <div style={{ width: '120%', height: '10px', backgroundColor: '#f7f7f7', margin: '20px -16px', }}></div>

             <div>
              {/* 상단 텍스트 */}
              <Text fontSize="18px" color="#171D24" fontWeight="600" marginBottom="31px">
                촬영스타일은 이런 느낌이에요
              </Text>
              <ReviewBar icon={coolFilter} label="쿨톤 필터 가능" count={120} percentage={80} />
              <ReviewBar icon={natural} label="자연스러운 보정" count={78} percentage={66.67} />
              <ReviewBar icon={lighter} label="생각보다 밝음" count={50} percentage={40} />
              <ReviewBar icon={noShine} label="빚번짐 없음" count={50} percentage={40} />
              </div>
              {/* 구분선 */ }
              <div style={{ width: '120%', height: '10px', backgroundColor: '#f7f7f7', margin: '20px -16px', }}></div>
              {/* 구분선 */ }
             <div style={{ width: '120%', height: '100px', backgroundColor: '#ffffff', margin: '20px -16px', }}></div>
          </div>
        
        )}
        {selectedTab === 'review' && (
      
            <div>
            <div  style={{padding : "0px 17px"}}>
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
                <Text fontSize="18px" color="#676F7B" fontWeight="600" marginLeft="5px" > {totalReview} </Text>
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
            {/* 사진 리스트 */}
            <div className="photo-gallery" style={{ display: 'grid', gap: '8px', padding: '16px', gridTemplateColumns: 'repeat(2, 1fr)'}}>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <img 
                  key={index}
                  src={`https://via.placeholder.com/150?text=Photo+${index + 1}`} 
                  alt={`갤러리 이미지 ${index + 1}`}
                  style={{ width: '100%', maxheight : '186px', borderRadius: '8px', objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default BoothReviewPage;
