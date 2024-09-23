import React, { useState, useRef } from 'react';
import HeaderBar from '../components/js/HeaderBar'; 
import Text from '../components/js/Text'; 
import Button from '../components/js/Button'; 
import StarIcon from '../components/js/StarIcon'; // StarIcon 컴포넌트 import

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [boothVisibleCount, setBoothVisibleCount] = useState(5); 
  const [photoVisibleCount, setPhotoVisibleCount] = useState(5);
  const [selectedBoothKeywords, setSelectedBoothKeywords] = useState([]);
  const [selectedPhotoKeywords, setSelectedPhotoKeywords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 페이지 상태 추가

  const boothScrollRef = useRef(null); 
  const photoScrollRef = useRef(null); 
  const pageEndRef = useRef(null); 
  const lastBoothButtonRef = useRef(null); // 마지막 부스 버튼 참조
  const lastPhotoButtonRef = useRef(null); // 마지막 사진 버튼 참조

  const handleStarClick = (index) => {
    setRating(index);
  };

  const boothKeywords = ["깔끔한 소품", "예쁜 셀카존", "넓은 부스 공간", "넓은 대기 공간", "홀수 출력 가능", "좋은 파우더룸", "청결한 부스", "다양한 배경색", "다양한 프레임"];
  const photoKeywords = ["빛번짐 없음", "선명한 화질", "자연스러운 보정", "쿨톤 필터 기능", "생각보다 밝음", "생각보다 어두움"];

  const showAllBoothKeywords = () => {
    setBoothVisibleCount(boothKeywords.length);
  };

  const showAllPhotoKeywords = () => {
    setPhotoVisibleCount(photoKeywords.length);
  };

  const scrollToBottom = () => {
    if (pageEndRef.current) {
      pageEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const handleBoothMoreClick = () => {
    showAllBoothKeywords();
    scrollToBottom();
  };

  const handlePhotoMoreClick = () => {
    showAllPhotoKeywords();
    scrollToBottom();
  };

  const handleBoothButtonClick = (text) => {
    setSelectedBoothKeywords((prevSelected) =>
      prevSelected.includes(text)
        ? prevSelected.filter((keyword) => keyword !== text)
        : [...prevSelected, text]
    );
  };

  const handlePhotoButtonClick = (text) => {
    setSelectedPhotoKeywords((prevSelected) =>
      prevSelected.includes(text)
        ? prevSelected.filter((keyword) => keyword !== text)
        : [...prevSelected, text]
    );
  };

  const handleNextClick = () => {
    setCurrentPage(2); // 다음 페이지로 변경
  };

  return (
    <div style={{ width: '100%', height: '100vh', overflowY: 'auto' }}>
      <HeaderBar title="리뷰 작성" subtitle="2024년 8월 3일" showBackButton={true} showCloseButton={false} backgroundColor="#FFFFFF" buttonColor="#171D24" titleColor="#171D24"/>
      
      {currentPage === 1 ? (
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '28px'
          }}
        >
          <Text 
            fontSize="14px" 
            color="#676F7B" 
            fontWeight="500"
            backgroundColor="#E9EAEE"
            borderRadius="8px"
            padding="6.5px 20px"
          >
            하루필름·건대입구역점
          </Text>
          <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start', 
              width: '100%', 
              maxWidth: '800px',
              paddingLeft: '20px', 
              marginTop: '27px' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Text 
                fontSize="18px" 
                color="#171D24"
                fontWeight="600" 
              >
                매장은 어떠셨나요?
              </Text>
              <Text 
                fontSize="12px" 
                color="#FFFFFF"
                fontWeight="600" 
                backgroundColor="#A1A6B5"
                borderRadius="24px"
                padding="6px 10px"
              >
                필수
              </Text>
            </div>
          </div>
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              backgroundColor: '#5453EE', 
              width : '300px',
              height :'100px',
              borderRadius: '8px', 
              marginTop: '19px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginTop : '16.58px' }}>
              {[1, 2, 3, 4, 5].map((index) => (
                <StarIcon 
                  key={index}
                  isSelected={index <= rating} 
                  onClick={() => handleStarClick(index)} 
                />
              ))}
            </div>
            <Text fontSize="16px" color="#FFFFFF" fontWeight="400" marginTop="12px">
              {rating > 0 ? `별 ${rating}개 선택됨` : '별점을 선택해주세요'}
            </Text>
          </div>
          <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start',
              width: '100%', 
              maxWidth: '800px',
              paddingLeft: '20px', 
              marginTop: '38px' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Text fontSize="18px" color="#171D24" fontWeight="600">
                어떤 점이 좋았나요?
              </Text>
              <Text 
                fontSize="12px" 
                color="#FFFFFF"
                fontWeight="600" 
                backgroundColor="#A1A6B5"
                borderRadius="24px"
                padding="6px 10px"
              >
                필수
              </Text>
            </div>
            <Text 
              fontSize="12px" 
              color="#676F7B"
              fontWeight="500"
              marginTop= "8.5px" 
            >
              부스에 어울리는 키워드를 골라주세요 (최대 5개)
            </Text>
          </div>
          <div 
            style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              width: '100%',
              maxWidth: '800px', 
              marginLeft : '36px',
              marginTop : '42px'
            }}
          >
            <div 
              style={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                flex: 1, 
                maxHeight: '300px',
                overflowY: 'hidden',
                position: 'relative' 
              }}
              ref={boothScrollRef}
            >
              <Text fontSize="18px" color="#000000" fontWeight="600" marginBottom="12px"> 부스 </Text>
              {boothKeywords.slice(0, boothVisibleCount).map((text, index) => (
                <Button 
                  key={index}
                  text={text} 
                  borderRadius="24px"
                  padding="8px 20px"
                  color={selectedBoothKeywords.includes(text) ? "#5453EE" : "#676F7B"} 
                  backgroundColor={selectedBoothKeywords.includes(text) ? "#E1E0FF" : "#FFFFFF"} 
                  border={selectedBoothKeywords.includes(text) ? "1px solid #5453EE" : "1px solid #676F7B"} 
                  fontSize="16px"
                  fontWeight="400"
                  boxShadow="none"
                  marginTop="12px"
                  onClick={() => handleBoothButtonClick(text)}
                  ref={index === boothVisibleCount - 1 ? lastBoothButtonRef : null}
                />
              ))}
              {boothVisibleCount < boothKeywords.length && (
                <button 
                  style={{ 
                    position: 'absolute', 
                    bottom: '8px', 
                    backgroundColor: 'transparent', 
                    border: 'none', 
                    cursor: 'pointer', 
                    color: '#5453EE' 
                  }}
                  onClick={handleBoothMoreClick}
                >
                  ▼ 더보기
                </button>
              )}
            </div>
            <div 
              style={{
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-start', 
                  flex: 1, 
                  maxHeight: '300px', 
                  overflowY: 'hidden', 
                  position: 'relative'
              }}
              ref={photoScrollRef}
            >
              <Text fontSize="18px" color="#171D24" fontWeight="600" marginBottom="12px">
                사진
              </Text>
              {photoKeywords.slice(0, photoVisibleCount).map((text, index) => (
                <Button 
                  key={index}
                  text={text} 
                  borderRadius="24px"
                  padding="8px 20px"
                  color={selectedPhotoKeywords.includes(text) ? "#5453EE" : "#676F7B"}
                  backgroundColor={selectedPhotoKeywords.includes(text) ? "#E1E0FF" : "#FFFFFF"}
                  border={selectedPhotoKeywords.includes(text) ? "1px solid #5453EE" : "1px solid #676F7B"}
                  fontSize="16px"
                  fontWeight="400"
                  boxShadow="none"
                  marginTop="12px"
                  onClick={() => handlePhotoButtonClick(text)}
                  ref={index === photoVisibleCount - 1 ? lastPhotoButtonRef : null}
                />
              ))}
              {photoVisibleCount < photoKeywords.length && (
                <button 
                  style={{ 
                    position: 'absolute', 
                    bottom: '8px', 
                    backgroundColor: 'transparent', 
                    border: 'none', 
                    cursor: 'pointer', 
                    color: '#5453EE' 
                  }}
                  onClick={handlePhotoMoreClick} 
                >
                  ▼ 더보기
                </button>
              )}
            </div>
          </div>
          <Button 
            text="다음"
            backgroundColor="#5453EE"
            borderRadius="8px"
            width="280px"
            height="62px"
            color="#FFFFFF"
            fontSize="22px"
            fontWeight="500"
            marginTop="32px" 
            onClick={handleNextClick} // 클릭 시 다음 페이지로 이동
          />
        </div>
      ) : (
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '28px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Text 
                fontSize="18px" 
                color="#171D24"
                fontWeight="600" 
              >
                사진을 등록해주세요
              </Text>
              <Text 
                fontSize="12px" 
                color="#FFFFFF"
                fontWeight="600" 
                backgroundColor="#A1A6B5"
                borderRadius="24px"
                padding="6px 10px"
              >
                선택
              </Text>
            </div>
          <Button 
            text="사진 추가하기" 
            backgroundColor="#F1F3F5"
            borderRadius="8px"
            width="280px"
            height="50px"
            color="#5453EE"
            fontSize="16px"
            fontWeight="500"
            marginBottom="24px"
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Text 
                fontSize="18px" 
                color="#171D24"
                fontWeight="600" 
              >
                부스에 대한 설명을 작성해주세요
              </Text>
              <Text 
                fontSize="12px" 
                color="#FFFFFF"
                fontWeight="600" 
                backgroundColor="#A1A6B5"
                borderRadius="24px"
                padding="6px 10px"
              >
                선택
              </Text>
            </div>
          <textarea 
            placeholder="부스에 대한 설명을 작성해주세요..." 
            style={{
              width: '280px',
              height: '120px',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #5453EE',
              resize: 'none'
            }}
          />
          <Button 
            text="완료" 
            backgroundColor="#5453EE"
            borderRadius="8px"
            width="280px"
            height="62px"
            color="#FFFFFF"
            fontSize="22px"
            fontWeight="500"
            marginTop="32px"
          />
        </div>
      )}
      <div ref={pageEndRef} /> {/* 페이지 하단 참조 */}
    </div>
  );
};

export default ReviewPage;
