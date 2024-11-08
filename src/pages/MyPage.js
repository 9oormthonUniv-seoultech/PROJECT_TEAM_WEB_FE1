import React, {useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../components/js/Button';
import Text from '../components/js/Text';
import Navbar from '../components/js/Navbar';
import Photo from '../components/js/Photo';
import { ReactComponent as HeartIcon } from '../assets/heart-icon.svg'; // 하트 모양 아이콘 추가
import EditIcon from '../assets/edit-icon.svg';
import NextIcon from '../assets/next-icon.svg';
import MarkerIcon from '../assets/marker-icon.svg';
import StarIcon from '../assets/star-icon.svg';
import { BASE_URL } from '../config';


const MyPage = () => {
  const { userId, accessToken, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    name: '홍길동',
    profileImage: 'https://pocket-bucket.s3.ap-northeast-2.amazonaws.com/defaultProfileImage.jpg',
  });
  const [reviewNum, setReviewNum] = useState(0);
  const [recentReviews, setRecentReviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef(null);
  const [favoritePhotos, setFavoritePhotos] = useState([]);
  const [selectedTab, setSelectedTab] = useState('booth'); 
  const [boothVisits, setBoothVisits] = useState([]);
  const [likedBooths, setLikedBooths] = useState([]);

  
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    console.log("Access Token:", accessToken);
    console.log("User ID:", userId);
  }, [accessToken, userId]);


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (userId) {
          const response = await axios.get(`${BASE_URL}api/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserProfile({
            name: response.data.name,
            profileImage: response.data.profileImage,
          });
          console.log("사용자 프로필 데이터:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }

      
    };


    const fetchReviews = async () => {
      try {
        if (userId) {
          const response = await axios.get(`${BASE_URL}api/review/mypage/${userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setReviewNum(response.data.reviewNum);
          setRecentReviews(response.data.recent_reviews);
          console.log("리뷰 데이터:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    const fetchBoothVisits = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${BASE_URL}api/user/${userId}/booth-visit`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          
          setBoothVisits(response.data); // 방문한 부스 정보 상태 업데이트
          console.log("방문한 부스 데이터:", response.data);
        } catch (error) {
          console.error("방문한 부스 데이터 불러오기 실패:", error);
        }
      }
    };
    const fetchBoothLikes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/user/${userId}/booth-like`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setLikedBooths(response.data);
      } catch (error) {
        console.error("찜해둔 부스 데이터를 가져오는 데 실패했습니다:", error);
      }
    };
    fetchBoothLikes();

    fetchUserProfile();
    fetchReviews();
    fetchBoothVisits();
  }, [userId, accessToken]);

  useEffect(() => {
    const fetchFavoritePhotos = async () => {
      if (selectedTab === 'favorite' && userId) {
        try {
          const response = await axios.get(`${BASE_URL}api/album/${userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
          // 모든 사진 데이터 중 photo_like가 true인 사진만 필터링
          const photoData = response.data
            .map((item) => ({
              url: item.images,
              photo_like: item.photo_like,
              id: item.photo_id,
            }))
            .filter((item) => item.photo_like); // photo_like가 true인 사진만 남김
            
          setFavoritePhotos(photoData);
          console.log("가져온 좋아하는 사진 데이터:", photoData);
        } catch (error) {
          console.error("사진 데이터 불러오기 실패:", error);
        }
      }
    };
    fetchFavoritePhotos();
  }, [selectedTab, userId, accessToken]);
  
  

  const handleBoothClick = () => {
    setSelectedTab('booth'); // 부스기록 탭 선택
  };

  const handleFavoriteClick = () => {
    setSelectedTab('favorite'); // 즐겨찾기 탭 선택
  };

  const handleReviewClick = (boothId, boothName) => {
    navigate('/Review', { state: { boothId, boothName } });
  };






  return (
    <div className="app-container">
      

      <div className="scrollable-content" style={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
      
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
            backgroundColor: userProfile.profileImage ? 'transparent' : '#B0B0EE',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
          {userProfile.profileImage ? (
              <img
                src={userProfile.profileImage}
                alt="프로필 사진"
                style={{ width: '77px', height: '77px', borderRadius: '50%' }}
              />
            ) : (
              <Text color="#FFFFFF" fontSize="20px" fontWeight="600">사진 없음</Text>
            )}
          </div>
          <Text fontSize="20px" color="#171D24" fontWeight="600" marginTop="10px">
            {isLoggedIn ? userProfile.name : '로그인이 필요합니다'}
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
              {reviewNum}개의 리뷰
            </Text>
            {reviewNum > 0 && (
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
                onClick={() => navigate('/DetailMy', { state: { type: 'review', data: recentReviews } })}
              />
            )}
          </div>

          {/* 최근 2개의 리뷰 표시 */}
            {/* 최근 2개의 리뷰 표시 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '13px', marginLeft: '16px', marginRight: '16px' }}>
              {recentReviews.length > 0 ? (
                recentReviews.slice(-2).map((review) => (
                  <div key={review.review_id} style={{ width: '175px', height: '175px', position: 'relative' }}>
                    <img
                      src={review.image}
                      
                      style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    
                      <Text fontSize="12px" color="#FFFFFF" fontWeight="400" position="absolute" top="10px" right="10px" zIndex="10">
                        {new Date(review.date).toLocaleDateString()}
                      </Text>
                      <Text fontSize="12px" color="#FFFFFF" fontWeight="400" position="absolute" bottom="39px" left="10px" zIndex="10" icon={MarkerIcon}>
                        {review.photobooth_name}
                      </Text>
                      <Text fontSize="12px" color="#FFFFFF" fontWeight="400" position="absolute" bottom="17px" left="10px" zIndex="10">
                        ⭐ {review.rating}
                      </Text>

                
                  </div>
                ))
            ) : (
              // 기본 이미지 두 개 렌더링
              <>
                <div style={{ width: '175px', height: '175px', position: 'relative' }}>
                 
                  <Text 
                    fontSize="12px" color="#000000" fontWeight="400" position="absolute" bottom="17px" left="10px" zIndex="10">
                    리뷰가 존재하지 않습니다
                  </Text>
              
                </div>
              </>
            )}
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
              onClick={() => navigate('/DetailMy', { state: { type: 'booth', data: likedBooths } })}
            />
          </div>

          {/* 부스 정보 칸 리스트 (가로 스크롤 가능) */}
          <div
              className="scrollable-content-x"
              ref={scrollRef}
              style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '8px',
                marginTop: '12px',
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseUp}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
        {likedBooths.length > 0 ? (
          likedBooths.map((booth) => (
            <div key={booth.photobooth_id} style={{ display: 'flex', width: '292px', height: '110px', borderRadius: '10px', backgroundColor: '#E9EAEE', alignItems: 'center', marginLeft: "16px", flexShrink: 0 }}>
              <img 
                src={booth.photobooth_image?.image_url || "https://via.placeholder.com/80"} 
                alt={`${booth.photobooth_name} 이미지`}
                style={{ width: '80px', height: '80px', borderRadius: '4px', marginLeft:'10px', objectFit: 'cover' }}
              />
              <div style={{ marginLeft: '20px', flex: 1 }}>
                <Text fontSize="14px" color="#171D24" fontWeight="500">
                  {booth.photobooth_name}
                </Text>
                <Text fontSize="14px" color="#373D49" fontWeight="600" marginTop="4.5px" icon={StarIcon}>
                  {booth.rating}
                </Text>
                <div style={{ display: 'flex', marginTop: "10px" }}>
                  <Text fontSize="12px" color="#676F7B" fontWeight="400" backgroundColor="#FFFFFF" borderRadius="24px" padding="8px 15px">
                    #{booth.top_keyword}
                  </Text>
                  <Text fontSize="12px" color="#676F7B" fontWeight="400" backgroundColor="#FFFFFF" borderRadius="24px" padding="6px 12px" marginLeft="2px">
                    +{booth.keyword_count}
                  </Text>
                  <HeartIcon style={{ width: '30px', height: '30px', cursor: 'pointer', marginLeft: "6.5px" }} />
                </div>
              </div>
            </div>
          ))
        ) : (
          // 찜해둔 부스가 없을 경우 빈 네모칸 표시
          <div style={{ display: 'flex', width: '290px', height: '110px', borderRadius: '10px', backgroundColor: '#E9EAEE', alignItems: 'center', justifyContent: 'center', marginLeft: '16px', flexShrink: 0 }}>
            <Text fontSize="14px" color="#676F7B" fontWeight="500">
              찜해둔 부스가 없습니다.
            </Text>
          </div>
        )}
      </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '22px', marginLeft :'16px'}}>
            <Text fontSize="18px" color="#171D24" fontWeight="600">
              최근 방문한 부스
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
              onClick={() => navigate('/DetailMy', { state: { type: 'booth', data: boothVisits } })}
            />
          </div>
          <div className='scrollable-content-x'
            ref={scrollRef}
            style={{
              display: 'flex', 
              overflowX: 'auto', // 가로 스크롤 활성화
              gap: '8px', 
              marginTop: '12px',
              marginBottom: '42px',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            {boothVisits.map((visit, index) => (
          <div key={index} style={{ display: 'flex', width: '292px', height: '110px', borderRadius: '10px', backgroundColor: '#E9EAEE', alignItems: 'center', marginLeft:"16px", flexShrink: 0 }}>
            <img 
              src={visit.photo_url || "https://via.placeholder.com/80"} 
              alt={`부스 이미지 ${index + 1}`} 
              style={{ width: '80px', height: '80px', borderRadius: '4px', marginLeft:'10px', objectFit: 'cover' }}
            />
            <div style={{ marginLeft: '20px', flex: 1 }}>
              <Text fontSize="14px" color="#171D24" fontWeight="500" icon={NextIcon} iconPosition="right">
                {visit.photobooth_name}   
              </Text>
              <Text fontSize="12px" color="#676F7B" fontWeight="500" marginTop="4px" >
                {`${new Date(visit.date).getMonth() + 1}월 ${new Date(visit.date).getDate()}일 이용`}
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
                icon={EditIcon}
                iconPosition="right"
                onClick={() => handleReviewClick(visit.photobooth_id, visit.photobooth_name)}
              />
            </div>
          </div>
        ))}
        </div>
      </div>
        
      )}

      {/* 즐겨찾기 화면 */}
      {selectedTab === 'favorite' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 174px)', gap: '10px', paddingBottom: '60px', marginLeft : '16px', marginTop:'23px' }}>
          {favoritePhotos.length > 0 ? (
            favoritePhotos.map((photo) => (
              <Photo
                key={photo.id}
                photoId={photo.id}
                photoUrl={photo.url}
                isLiked={photo.photo_like}
                altText={`사진 ${photo.id}`}
              />
            ))
          ) : (
            <Text fontSize="14px" color="#676F7B" fontWeight="500">
              즐겨찾기한 사진이 없습니다.
            </Text>
          )}
        </div>
      )}
    </div>
    <div className="navbar-fixed" style={{ position: 'absolute', bottom: '0', width: '100%', zIndex: 20 }}>
        <Navbar />
    </div>
  </div>
  );
};

export default MyPage;