import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 추가
import { useAuth } from '../context/AuthContext';
import HeaderBar from '../components/js/HeaderBar'; 
import Button from '../components/js/Button';
import Text from '../components/js/Text' ;
import InputValue from '../components/js/InputValue' ;
import circleIcon from '../assets/circle-icon.svg';
import clickedCircleIcon from '../assets/clicked-circle-icon.svg';
import OverlayQrReader from '../components/js/OverlayQrReader';
import LoadingOverlay from '../components/js/LoadingOverlay';
import SearchBar from '../components/js/SearchBar';
import searchIcon from '../assets/search-icon.svg'; 
import axios from 'axios';
import { BASE_URL } from '../config';

function AddPhotoPage() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [showQrOverlay, setShowQrOverlay] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState('');

  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isConfirmationPage, setIsConfirmationPage] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [photoTempId, setPhotoTempId] = useState(null);
  const [photoTempUrl, setPhotoTempUrl] = useState(null);
  const [photoboothId, setPhotoboothId] = useState(null);
  const [photoboothName, setPhotoboothName] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && userId) {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('file', file);

      setLoading(true);
      setLoadingId('upload');
  
      try {
        console.log('전송할 user_id:', userId);
        console.log('전송할 파일명:', file.name);
        const response = await axios.post(`${BASE_URL}api/photo/temp/upload/img`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        // 서버 응답에서 id를 photoTempId로 설정
        const newPhotoTempId = response.data?.newTemp?.id;
        if (newPhotoTempId) {
          setPhotoTempId(newPhotoTempId);
          console.log('photoTempId 설정 완료:', newPhotoTempId);
        } else {
          console.error('서버 응답에서 photoTempId를 찾을 수 없습니다.');
        }
        const newPhotoTempUrl = response.data?.newTemp?.image_url;
        if (newPhotoTempUrl) {
          setPhotoTempUrl(newPhotoTempUrl);
          console.log('newPhotoTempUrl 설정 완료:', newPhotoTempUrl);
        } else {
          console.error('서버 응답에서 newPhotoTempUrl 찾을 수 없습니다.');
        }
        
        console.log('서버 응답:', response.data);
        setIsPostLoading(true);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      } finally {
        setTimeout(() => {
          setLoading(false); // 로딩 종료
        }, 2000);
      }
    } else {
      console.log('이미지 파일 또는 user_id가 누락되었습니다.');
    }
  };
  


  const handleNextClick = () => {
    if (selectedOption === 'qr') {
      setShowQrOverlay(true);
    } else if (selectedOption === 'album') {
      document.getElementById('fileInput').click();
    }
  };
  
  

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const response = await axios.get(`${BASE_URL}api/photo/temp/update-info`, {
          params: { searchTerm },
        });
        
        // 서버 응답에서 photoboothId와 name 추출
        const result = response.data[0]; // 응답 배열의 첫 번째 요소 사용
        if (result) {
          setPhotoboothId(result.id);
          setPhotoboothName(result.name); 
          console.log('photoboothId 설정 완료:', result.id);
          console.log('검색된 photobooth 이름:', result.name);
        } else {
          console.error('검색 결과가 없습니다.');
        }
        
      } catch (error) {
        console.error('검색 요청 실패:', error);
      }
    } else {
      console.log('검색어를 입력하세요.');
    }
  };
  

  const handleQrClick = () => {
    setSelectedOption('qr');
  };

  const handleAlbumClick = () => {
    setSelectedOption('album');
  };

  const closeOverlay = () => {
    setShowQrOverlay(false);
  };

  const handleConfirm = () => {
    setShowQrOverlay(false);
    setLoadingId('upload');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsPostLoading(true);
    }, 5000);
  };


  const handleConfirmClick = () => {
    console.log("보낸 imageUrl:", photoTempUrl);
    navigate('/NotePhoto', { state: { imageUrl: photoTempUrl } });// '/photo-record' 경로로 이동
  };

  // 저장하기 버튼 클릭 핸들러
  const handleSaveClick = async () => {
    if (!photoTempId) {
      console.log('필수 정보가 누락되었습니다: photoTempId가 없습니다.');
    }
    if (!photoboothId) {
      console.log('필수 정보가 누락되었습니다: photoboothId가 없습니다.');
    }
    if (!year) {
      console.log('필수 정보가 누락되었습니다: 연도가 입력되지 않았습니다.');
    }
    if (!month) {
      console.log('필수 정보가 누락되었습니다: 월이 입력되지 않았습니다.');
    }
    if (!day) {
      console.log('필수 정보가 누락되었습니다: 일이 입력되지 않았습니다.');
    }
  
    if (photoTempId && photoboothId && year && month && day) {
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      try {
        const response = await axios.put(`${BASE_URL}api/photo/temp/${photoTempId}/update-info`, {
          date: formattedDate,
          photobooth_id: photoboothId,
        });
        console.log('저장 요청 데이터:', { date: formattedDate, photobooth_id: photoboothId });
        console.log('저장 응답:', response.data);
        navigate('/NotePhoto', { state: { photoTempUrl: photoTempUrl, photoTempId : photoTempId, photoboothId : photoboothId, photoboothName : photoboothName, formattedDate : formattedDate } });
      } catch (error) {
        console.error('저장 요청 실패:', error);
      }
    } else {
      console.log('필수 정보가 누락되었습니다.');
    }
  };
  

  

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <input 
        type="file" 
        id="fileInput" 
        style={{ display: 'none' }} 
        accept="image/*" 
        onChange={handleFileChange} // 파일 변경 시 처리
      />
      {!isPostLoading ? (
        <>
          <HeaderBar title="사진 등록" showBackButton={false} showCloseButton={true} />
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              top: '203px'
            }}
          >
            <Button 
              text="QR 인식" 
              onClick={handleQrClick}
              borderRadius="8px"
              width="267px"
              height="90px"
              backgroundColor={selectedOption === 'qr' ? "#E1E0FF" : "transparent"}
              color={selectedOption === 'qr' ? "#5453EE" : "#C7C9CE"}
              fontSize="16px"
              position="relative"
              icon={selectedOption === 'qr' ? clickedCircleIcon : circleIcon}
              iconMargin="12px" 
              boxShadow="none"
              border={selectedOption === '' || selectedOption === 'album' ? "1px solid #C7C9CE" : "1px solid #5453EE"} 
              borderBottom={selectedOption === '' || selectedOption === 'album' ? "1px solid #C7C9CE" : "1px solid #5453EE"} 
            />
            <Button 
              text="내 사진첩 불러오기" 
              onClick={handleAlbumClick}
              borderRadius="8px"
              width="267px"
              height="90px"
              backgroundColor={selectedOption === 'album' ? "#E1E0FF" : "transparent"}
              color={selectedOption === 'album' ? "#5453EE" : "#C7C9CE"}
              fontSize="16px"
              position="relative"
              icon={selectedOption === 'album' ? clickedCircleIcon : circleIcon}
              iconMargin="12px" 
              boxShadow="none"
              border={selectedOption === '' || selectedOption === 'qr' ? "1px solid #C7C9CE" : "1px solid #5453EE"}
              borderBottom={selectedOption === '' || selectedOption === 'qr' ? "1px solid #C7C9CE" : "1px solid #5453EE"} 
              marginTop="22px"
            />



            <Button 
              text="다음"
              onClick={handleNextClick}
              backgroundColor="#5453EE"
              borderRadius="8px"
              width="267px"
              height="50px"
              color="#FFFFFF"
              fontSize="22px"
              fontWeight = "500"
              marginTop="126px"
            />
          </div>
        </>
      ) : (
        !isConfirmationPage ? (
          <>
            <HeaderBar title="사진 설명" showBackButton={true} showCloseButton={false} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '16px', position: 'relative', top: '203px' }}>
              <div style={{ marginBottom: '52.93px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Text fontSize="18px" color="#171D24" fontWeight="600">언제 사진을 찍으셨나요?</Text>
                    <Text fontSize="12px" color="#FFFFFF" fontWeight="600" backgroundColor="#A1A6B5" borderRadius="24px" padding="6px 10px">필수</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                    <InputValue type="text" width="96px" placeholder="0000" value={year} onChange={(e) => setYear(e.target.value)} placeholderColor="#C7C9CE" />
                    <Text>년</Text>
                    <InputValue type="text" width="70.93px" placeholder="00" value={month} onChange={(e) => setMonth(e.target.value)} placeholderColor="#C7C9CE" />
                    <Text>월</Text>
                    <InputValue type="text" width="70.93px" placeholder="00" value={day} onChange={(e) => setDay(e.target.value)} placeholderColor="#C7C9CE" />
                    <Text>일</Text>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <Text fontSize="18px" color="#171D24" fontWeight="600">사용하신 부스의 위치는 어딘가요?</Text>
                    <Text fontSize="12px" color="#FFFFFF" fontWeight="600" backgroundColor="#A1A6B5" borderRadius="24px" padding="6px 10px">필수</Text>
                  </div>
                  <SearchBar 
                  placeholder="구, 역, 건물명 등으로 검색해주세요" 
                  icon={searchIcon} 
                  onSearch={handleSearch} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  width="348px"
                  height="42px"
                  fontSize="16px"
                  fontWeight="400"
                  backgroundColor="#E9EAEE"
                  />
                </div>
              
                <Button 
                  text="저장하기"
                  backgroundColor="#5453EE"
                  borderRadius="8px"
                  width="267px"
                  height="50px"
                  color="#FFFFFF"
                  fontSize="22px"
                  fontWeight="500"
                  marginTop="20px"
                  marginLeft="47px"
                  onClick={handleSaveClick}
                />
              </div>
          </>
        ) : (
          <>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <input 
                type="file" 
                id="fileInput" 
                style={{ display: 'none' }} 
                accept="image/*" 
                onChange={handleFileChange} // 파일 변경 시 처리
              />
              <Button 
                text="확인"
                backgroundColor="#5453EE"
                borderRadius="8px"
                width="280px"
                height="62px"
                color="#FFFFFF"
                fontSize="22px"
                fontWeight="500"
                onClick={handleConfirmClick} // 확인 버튼 클릭 시 동작
              />
            </div>
          </>
        )
      )}

      {showQrOverlay && <OverlayQrReader onClose={closeOverlay} onConfirm={handleConfirm} userId={userId}/>}
      {loading && <LoadingOverlay id={loadingId} />}
    </div>
  );
}

export default AddPhotoPage;
