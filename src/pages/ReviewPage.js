import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderBar from '../components/js/HeaderBar'; 
import Text from '../components/js/Text'; 
import Button from '../components/js/Button'; 
import InputValue from '../components/js/InputValue'; 
import StarIcon from '../components/js/StarIcon'; // StarIcon 컴포넌트 import
import photoIcon from '../assets/photo-icon.svg';
import nonPhotoIcon from '../assets/non-photo.svg';

const ReviewPage = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const newPhotoId = location.state?.newPhotoId;
  const photoboothName = location.state?.photoboothName;
  const formattedDate = location.state?.formattedDate;

  const [rating, setRating] = useState(0);
  const [selectedBoothKeywords, setSelectedBoothKeywords] = useState([]);
  const [selectedPhotoKeywords, setSelectedPhotoKeywords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [descriptionText, setDescriptionText] = useState("");

 
  const boothScrollRef = useRef(null); 
  const photoScrollRef = useRef(null); 
  const pageEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const boothKeywords = ["깔끔한 소품", "예쁜 셀카존", "넓은 부스 공간", "넓은 대기 공간", "홀수 출력 가능", "좋은 파우더룸", "청결한 부스", "다양한 배경색", "다양한 프레임"];
  const photoKeywords = ["빛번짐 없음", "선명한 화질", "자연스러운 보정", "쿨톤 필터 기능", "생각보다 밝음", "생각보다 어두움"];

  const handleStarClick = (index) => {
    setRating(index);
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
    setCurrentPage(2);
  };

  const handlePhotoUploadClick = () => {
    fileInputRef.current.click(); // Button 클릭 시 input을 클릭하여 파일 선택 창을 열기
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newPhotos = files.slice(0, 5 - selectedPhotos.length); // 5개 제한 적용
      const newPhotosURLs = newPhotos.map((file) => URL.createObjectURL(file));
      setSelectedPhotos((prevPhotos) => [...prevPhotos, ...newPhotosURLs]); // 선택한 파일들을 추가
    }
  };


  const handleDescriptionChange = (event) => {
    const text = event.target.value;
    if (text.length <= 300) {
      setDescriptionText(text);
    }
  };

  const handleCompleteClick = async () => {
    const formData = new FormData();
  
    formData.append("photobooth_name", photoboothName);
    formData.append("rating", rating);
    formData.append("booth_keyword", selectedBoothKeywords.join(","));
    formData.append("photo_keyword", selectedPhotoKeywords.join(","));
    formData.append("content", descriptionText);
  
    const todayDate = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\./g, '-').replace(/ /g, '');
    formData.append("date", todayDate);
  
    // `for...of` 루프 사용
    for (let [index, photoURL] of selectedPhotos.entries()) {
      const file = await fetch(photoURL)
        .then(res => res.blob())
        .then(blob => new File([blob], `photo-${index + 1}.jpg`, { type: 'image/jpeg' }));
      formData.append("files", file);
    }
  
    console.log("Sending Review Data:", Object.fromEntries(formData.entries())); // 확인용 콘솔 출력
  
    try {
      const response = await fetch(`/api/review/user/${userId}`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log("Response from server:", result);
  
      if (response.ok) {
        navigate('/ReviewSuccess');
      } else {
        console.error("Failed to submit review:", result);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  
  

  return (
    <div className="app-container" style={{ width: '100%', height: '100vh', overflowY: 'auto' }}>
      <HeaderBar title="리뷰 작성" subtitle={formattedDate} showBackButton={true} showCloseButton={false} backgroundColor="#FFFFFF" buttonColor="#171D24" titleColor="#171D24"/>
      <div className="scrollable-content">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
          multiple // 여러 개 파일 선택 가능
        />
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
              {photoboothName}
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
                {rating > 0 ? (
                  rating === 1 ? '아쉬워요' :
                  rating === 2 ? '조금 아쉬워요' :
                  rating === 3 ? '무난해요' :
                  rating === 4 ? '만족해요' :
                  '완전 만족해요'
                ) : '별점을 선택해주세요'}
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
                }}
                ref={boothScrollRef}
              >
                <Text fontSize="18px" color="#000000" fontWeight="600" marginBottom="12px"> 부스 </Text>
                {boothKeywords.map((text, index) => (
                  <Button 
                    key={index}
                    text={text} 
                    borderRadius="24px"
                    padding="8px 20px"
                    color={selectedBoothKeywords.includes(text) ? "#5453EE" : "#676F7B"} 
                    backgroundColor={selectedBoothKeywords.includes(text) ? "#E1E0FF" : "#FFFFFF"} 
                    border={selectedBoothKeywords.includes(text) ? "1px solid #5453EE" : "1px solid #676F7B"} 
                    borderBottom={selectedBoothKeywords.includes(text) ? "1px solid #5453EE" : "1px solid #676F7B"} 
                    fontSize="16px"
                    fontWeight="400"
                    boxShadow="none"
                    marginTop="12px"
                    onClick={() => handleBoothButtonClick(text)}
                  />
                ))}
              </div>
              <div 
                style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    flex: 1, 
                }}
                ref={photoScrollRef}
              >
                <Text fontSize="18px" color="#171D24" fontWeight="600" marginBottom="12px">
                  사진
                </Text>
                {photoKeywords.map((text, index) => (
                  <Button 
                    key={index}
                    text={text} 
                    borderRadius="24px"
                    padding="8px 20px"
                    color={selectedPhotoKeywords.includes(text) ? "#5453EE" : "#676F7B"}
                    backgroundColor={selectedPhotoKeywords.includes(text) ? "#E1E0FF" : "#FFFFFF"}
                    border={selectedPhotoKeywords.includes(text) ? "1px solid #5453EE" : "1px solid #676F7B"}
                    borderBottom={selectedPhotoKeywords.includes(text) ? "1px solid #5453EE" : "1px solid #676F7B"}
                    fontSize="16px"
                    fontWeight="400"
                    boxShadow="none"
                    marginTop="12px"
                    onClick={() => handlePhotoButtonClick(text)}
                  />
                ))}
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
              onClick={handleNextClick}
            />
          </div>
        ) : (
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start', 
              width: '100%', 
              marginTop: '22px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '26px', marginLeft : '16px' }}>
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '12.43px', marginLeft : '16px' }}>
              <Button 
                text="5/5" 
                icon={photoIcon}
                iconPosition="top" 
                backgroundColor="#E9EAEE"
                borderRadius="8px"
                width="92px"
                height="92px"
                color="#676F7B"
                fontSize="12px"
                fontWeight="500"
                boxShadow="none"
                onClick={handlePhotoUploadClick}
              />
              <div className="scrollable-content-x" style={{ display: 'flex', overflowX: 'auto', gap: '10px' }}>
                {selectedPhotos.map((photoURL, index) => (
                  <img
                    key={index}
                    src={photoURL}
                    alt={`Uploaded preview ${index + 1}`}
                    style={{ width: '92px', height: '92px', borderRadius: '8px' }}
                  />
                ))}
            </div>
           
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '56px', marginLeft : '16px' }}>
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

            <InputValue
              type="text"
              width="358px"
              height="235px"
              placeholder="포토부스에 대한 설명을 적어주세요"
              placeholderColor="#A1A6B5"
              backgroundColor="#E9EAEE"
              color="#2A303A"
              marginTop="22px"
              marginLeft="16px"
              placeholderPosition="top-left" 
              value={descriptionText}
              onChange={handleDescriptionChange} // 글자 수 업데이트 핸들러
            />

            <Text 
              fontSize="12px" 
              color="#676F7B"
              fontWeight="500"
              marginTop="8px"
              marginLeft="337px"
            >
              {descriptionText.length}/300
            </Text>

            <div 
              style={{
                display: 'flex',
                justifyContent: 'center', 
                width: '100%', 
              }}
            >
              <Button 
                text="완료하기" 
                backgroundColor="#5453EE"
                borderRadius="8px"
                width="280px"
                height="62px"
                color="#FFFFFF"
                fontSize="22px"
                fontWeight="500"
                marginTop="32px"
                boxShadow="none"
                onClick={handleCompleteClick}
              />
            </div>

          </div>
        )}
        <div ref={pageEndRef} />
      </div>
    </div>
  );
};

export default ReviewPage;
