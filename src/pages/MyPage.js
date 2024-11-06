import React, { useState } from 'react';
import Button from '../components/js/Button';
import Text from '../components/js/Text';
import Navbar from '../components/js/Navbar';
import { ReactComponent as HeartIcon } from '../assets/heart-icon.svg'; // 하트 모양 아이콘 추가
import EditIcon from '../assets/edit-icon.svg';
import NextIcon from '../assets/next-icon.svg';
import MarkerIcon from '../assets/marker-icon.svg';
import StarIcon from '../assets/star-icon.svg';


const MyPage = () => {
  const [selectedTab, setSelectedTab] = useState('booth'); // 탭 상태 관리
  const userName = '홍길동'; // 임시 유저 이름
  const profileImageUrl = ''; // 임시 프로필 이미지 URL (비어있으면 배경색으로 표시)

  // 부스기록 탭 클릭 핸들러
  const handleBoothClick = () => {
    setSelectedTab('booth'); // 부스기록 탭 선택
  };

  // 즐겨찾기 탭 클릭 핸들러
  const handleFavoriteClick = () => {
    setSelectedTab('favorite'); // 즐겨찾기 탭 선택
  };

  return (
    <div className="app-container">
      <Navbar /> 

      <div className="scroll-container-y" style={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
      
      {/* 상단 로그아웃 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '16px'}}>
        <Button 
          text="로그아웃" 
          backgroundColor="#B3B8BF"
          borderRadius="24px"
          padding="6px 12px"
          color="#FFFFFF"
          fontSize="12px"
          fontWeignt="400"
          boxShadow="none"
          marginTop="50px"
          
          onClick={() => alert('로그아웃 클릭!')} 
        />
      </div>

      {/* 프로필 사진과 유저 이름 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* 기본 이미지 배경 설정 */}
        <div 
          style={{ 
            width: '77px', 
            height: '77px', 
            borderRadius: '50%', 
            backgroundColor: profileImageUrl ? 'transparent' : '#B0B0EE', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
          {profileImageUrl && (
            <img 
              src={profileImageUrl} 
              alt="프로필 사진" 
              style={{ width: '77px', height: '77px', borderRadius: '50%' }} 
            />
          )}
        </div>
        <Text fontSize="20px" color="#171D24" fontWeight="600" marginTop="10px">
          {userName}
        </Text>

        {/* 프로필 편집 버튼 */}
        <Button 
          text="프로필 편집" 
          backgroundColor="#B3B8BF"
          borderRadius="24px"
          padding="6px 12px"
          color="#ffffff"
          fontSize="12px"
          marginTop="6px"
          boxShadow="none"
          icon = {EditIcon}
          iconPosition="right"
          onClick={() => alert('프로필 편집 클릭!')}
        />
      </div>

      {/* 탭 버튼: 부스기록 & 즐겨찾기 */}
      <div style={{ display: 'flex', marginTop: '34px' }}>
        <Button 
          text="부스기록" 
          width="105px"
          backgroundColor="#ffffff"
          boxShadow="none"
          color="#171D24"
          fontSize="14px"
          fontWeignt="600"
          padding="0 0 6px 0"
          marginLeft = "45px"
          borderBottom={selectedTab === 'booth' ? '4px solid #5453EE' : 'none'}
          onClick={handleBoothClick}
        />
        <Button 
          text="즐겨찾기" 
          width="105px"
          backgroundColor="#ffffff"
          boxShadow="none"
          color="#171D24"
          fontSize="14px"
          fontWeight="600"
          padding="0 0 6px 0"
          marginLeft= "90px"
          borderBottom={selectedTab === 'favorite' ? '4px solid #5453EE' : 'none'}
          onClick={handleFavoriteClick}
        />
      </div>

      {/* 부스기록 화면 */}
      {selectedTab === 'booth' && (
        <div>
          {/* 리뷰 정보 및 더보기 버튼 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px', marginLeft:'16px' }}>
            <Text fontSize="18px" color="#171D24" fontWeight="600">
              24개의 리뷰
            </Text>
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
              onClick={() => alert('더보기 클릭!')}
            />
          </div>

          {/* 이미지 두 개 나란히 배치 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '13px', marginLeft:'16px', marginRight:'16px' }}>
            {/* 이미지 1 */}
            <div style={{ width: '175px', height: '175px', position: 'relative' }}>
              <img 
                src="https://via.placeholder.com/180" 
                alt="리뷰 이미지 1" 
                style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }}
              />
              {/* 텍스트 오버레이 */}
              <Text 
                fontSize="12px" color="#FFFFFF" fontWeight="400" position="absolute" top="10px" right="10px" zIndex="10">
                8월 1일
              </Text>
              <Text 
                fontSize="12px" color="#FFFFFF" fontWeight="400" position="absolute" bottom="39px" left="10px" zIndex="10" icon={MarkerIcon}>
                하루필름 . 건대입구역점
              </Text>
              <Text 
                fontSize="12px" color="#FFFFFF" fontWeight="400" position="absolute" bottom="17px" left="10px" zIndex="10" >
                ⭐ 4.5
              </Text>
            </div>

            {/* 이미지 2 */}
            <div style={{ width: '175px', height: '175px', position: 'relative' }}>
              <img 
                src="https://via.placeholder.com/180" 
                alt="리뷰 이미지 2" 
                style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }}
              />
              {/* 텍스트 오버레이 */}
              <Text 
                fontSize="12px" color="#FFFFFF" fontWeight="400" position="absolute" top="10px" right="10px" zIndex="10">
                8월 1일
              </Text>
              <Text 
                fontSize="12px" color="#FFFFFF" fontWeight="400" position="absolute" bottom="39px" left="10px" zIndex="10" icon={MarkerIcon}>
                하루필름 . 건대입구역점
              </Text>
              <Text 
                fontSize="12px" color="#FFFFFF" fontWeight="400" position="absolute" bottom="17px" left="10px" zIndex="10">
                ⭐ 4.5
              </Text>
            </div>
          </div>

          {/* 찜해둔 부스 & 더보기 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '22px' , marginLeft:"16px"}}>
            <Text fontSize="18px" color="#171D24" fontWeight="600">
              찜해둔 부스
            </Text>
            <Button 
              text="더보기" 
              backgroundColor="#E9EAEE"
              border="none"
              borderRadius="24px"
              padding="4px 8px"
              color="#676F7B"
              fontSize="12px"
              fontWeight="500"
              boxShadow="none"
              icon={NextIcon}
              iconPosition="right"
              marginRight="16px"
              onClick={() => alert('찜해둔 부스 더보기 클릭!')}
            />
          </div>

          {/* 부스 정보 칸 리스트 (가로 스크롤 가능) */}
          <div 
            style={{
              display: 'flex', 
              overflowX: 'auto', // 가로 스크롤 활성화
              gap: '8px', 
              marginTop: '12px'
            }}
          >
            {/* 부스 정보 칸 1 */}
            <div style={{ display: 'flex', width: '292px', height: '110px', borderRadius: '10px', backgroundColor: '#E9EAEE', marginLeft : "16px", alignItems: 'center', flexShrink: 0 }}>
              <img 
                src="https://via.placeholder.com/80" 
                alt="부스 이미지 1" 
                style={{ width: '80px', height: '80px', borderRadius: '4px', marginLeft:'10px', objectFit: 'cover' }}
              />
              <div style={{ marginLeft: '20px', flex: 1 }}>
                <Text fontSize="14px" color="#171D24" fontWeight="500">
                  하루필름 강남점
                </Text>
                <Text fontSize="14px" color="#373D49" fontWeight="600" marginTop="4.5px" icon={StarIcon}>
                  4.8
                </Text>
                <div style={{ display :'flex', marginTop :"10px"}}>
                  <Text fontSize="12px" color="#676F7B" fontWeight="400" backgroundColor="#FFFFFF" borderRadius="24px" padding="8px 15px" >
                    # 선명한 화질
                  </Text>
                  <Text fontSize="12px" color="#676F7B" fontWeight="400" backgroundColor="#FFFFFF" borderRadius="24px" padding="6px 12px" marginLeft="2px">
                    +3
                  </Text>
                  <HeartIcon style={{ width: '30px', height: '30px', cursor: 'pointer', marginLeft:"6.5px" }} />
                </div>
              </div>
              
            </div>

            {/* 부스 정보 칸 2 */}
            <div style={{ display: 'flex', width: '292px', height: '110px', borderRadius: '10px', backgroundColor: '#E9EAEE', alignItems: 'center', flexShrink: 0 }}>
              <img 
                src="https://via.placeholder.com/80" 
                alt="부스 이미지 1" 
                style={{ width: '80px', height: '80px', borderRadius: '4px', marginLeft:'10px', objectFit: 'cover' }}
              />
              <div style={{ marginLeft: '20px', flex: 1 }}>
                <Text fontSize="14px" color="#171D24" fontWeight="500">
                  하루필름 강남점
                </Text>
                <Text fontSize="14px" color="#373D49" fontWeight="600" marginTop="4.5px" icon={StarIcon}>
                  4.8
                </Text>
                <div style={{ display :'flex', marginTop :"10px"}}>
                  <Text fontSize="12px" color="#676F7B" fontWeight="400" backgroundColor="#FFFFFF" borderRadius="24px" padding="8px 15px" >
                    # 선명한 화질
                  </Text>
                  <Text fontSize="12px" color="#676F7B" fontWeight="400" backgroundColor="#FFFFFF" borderRadius="24px" padding="6px 12px" marginLeft="2px">
                    +3
                  </Text>
                  <HeartIcon style={{ width: '30px', height: '30px', cursor: 'pointer', marginLeft:"6.5px" }} />
                </div>
              </div>
              
            </div>

            {/* 부스 정보 칸 추가 가능 */}
            {/* 더 많은 부스 정보를 추가하고 싶으면 동일한 방식으로 추가 */}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '22px', marginLeft :'16px' }}>
            <Text fontSize="18px" color="#171D24" fontWeight="600">
              방문한 부스
            </Text>
            <Button 
              text="더보기" 
              backgroundColor="#E9EAEE"
              border="none"
              borderRadius="24px"
              padding="4px 8px"
              color="#676F7B"
              fontSize="12px"
              fontWeight="400"
              boxShadow="none"
              marginRight="16px"
              icon={NextIcon}
              iconPosition='right'
              onClick={() => alert('방문한 부스 더보기 클릭!')}
            />
          </div>
          <div 
            style={{
              display: 'flex', 
              overflowX: 'auto', // 가로 스크롤 활성화
              gap: '8px', 
              marginTop: '12px',
              marginBottom: '22px'
            }}
          >
            {/* 부스 정보 칸 1 */}
            <div style={{ display: 'flex', width: '292px', height: '110px', borderRadius: '10px', backgroundColor: '#E9EAEE', alignItems: 'center', marginLeft:"16px",flexShrink: 0 }}>
              <img 
                src="https://via.placeholder.com/80" 
                alt="부스 이미지 1" 
                style={{ width: '80px', height: '80px', borderRadius: '4px', marginLeft:'10px', objectFit: 'cover' }}
              />
              <div style={{ marginLeft: '20px', flex: 1 }}>
                <Text fontSize="14px" color="#171D24" fontWeight="500" icon={NextIcon} iconPosition="right">
                  하루필름 건대입구역점
                </Text>
                <Text fontSize="12px" color="#676F7B" fontWeight="500" marginTop="4px" icon={StarIcon}>
                  8월 2일 이용
                </Text>
                <Button 
                  text="리뷰 쓰러가기" 
                  fontWeight="400"
                  backgroundColor="#5453EE"
                  borderRadius="24px"
                  padding="6px 12px"
                  color="#ffffff"
                  fontSize="12px"
                  marginTop="22.5px"
                  marginLeft="42px"
                  boxShadow="none"
                  icon = {EditIcon}
                  iconPosition="right"
                  onClick={() => alert('프로필 편집 클릭!')}
                />
              </div>
              
            </div>

            {/* 부스 정보 칸 2 */}
            <div style={{ display: 'flex', width: '292px', height: '110px', borderRadius: '10px', backgroundColor: '#E9EAEE', alignItems: 'center', flexShrink: 0 }}>
              <img 
                src="https://via.placeholder.com/80" 
                alt="부스 이미지 1" 
                style={{ width: '80px', height: '80px', borderRadius: '4px', marginLeft:'10px', objectFit: 'cover' }}
              />
              <div style={{ marginLeft: '20px', flex: 1 }}>
                <Text fontSize="14px" color="#171D24" fontWeight="500" icon={NextIcon} iconPosition="right">
                  하루필름 건대입구역점
                </Text>
                <Text fontSize="12px" color="#676F7B" fontWeight="500" marginTop="4px" icon={StarIcon}>
                  8월 2일 이용
                </Text>
                <Button 
                  text="리뷰 쓰러가기" 
                  fontWeight="400"
                  backgroundColor="#5453EE"
                  borderRadius="24px"
                  padding="6px 12px"
                  color="#ffffff"
                  fontSize="12px"
                  marginTop="22.5px"
                  marginLeft="42px"
                  boxShadow="none"
                  icon = {EditIcon}
                  iconPosition="right"
                  onClick={() => alert('프로필 편집 클릭!')}
                />
              </div>
              
            </div>
        
          </div>
        </div>
        
      )}

      {/* 즐겨찾기 화면 */}
      {selectedTab === 'favorite' && (
        <div>
          {/* 아무 내용 없음 */}
        </div>
      )}
    </div>
  </div>
  );
};

export default MyPage;