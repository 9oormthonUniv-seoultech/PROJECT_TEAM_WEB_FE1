import React from 'react';

const ReviewList = ({ profileImage, nickname, date, content, hashtags, boothImage, imageCount }) => {
  return (
    <div style={{display : 'flex', marginLeft : '19px', padding: '20px 0', borderBottom: '0.8px solid #E9EAEE' }}>
        <div style={{maxWidth : '253px'}}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img 
                src={profileImage} 
                alt={`${nickname} 프로필 이미지`} 
                style={{ width: '33px', height: '33px', borderRadius: '50%', marginRight: '8px' }}
                />
                <div>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#171D24' }}>@{nickname}</p>
                <p style={{ margin: 0, fontSize: '10px', fontWeight: '400', color: '#676F7B' }}>{date}</p>
                </div>
            </div>

            {/* 리뷰 내용 */}
            <div style={{ marginBottom: '10px' }}>
                <p style={{ fontSize: '14px', fontWeight: '400', color: '#2A303A' }}>{content}</p>
            </div>

            {/* 해시태그 */}
            <div style={{ marginBottom: '10px', display: 'flex', gap: '5px' }}>
                {hashtags.map((tag, index) => (
                <span key={index} style={{ fontSize: '12px', color: '#676F7B', padding: '8px 20px', backgroundColor : '#E9EAEE', borderRadius : '24px' }}>{tag}</span>
                ))}
            </div>
        </div>

        {/* 유저가 등록한 부스 사진 */}
        <div style={{ display: 'flex', position: 'relative' }}>
            {boothImage && (
            <div style={{ position: 'relative', width: '94px', height: '94px' , marginLeft : '11px'}}>
                <img 
                    src={boothImage} 
                    alt="부스 이미지" 
                    style={{ width: '94px', height: '94px', borderRadius: '8px', objectFit: 'cover' }}
                />
                {imageCount > 1 && ( // 이미지 개수가 1개 이상일 때만 표시
                <div style={{
                    position: 'absolute',
                    right: '5px',
                    bottom: '5px',
                    backgroundColor: '#000000',
                    color: '#fff',
                    padding: '5px',
                    borderRadius: '24px',
                    fontSize: '10px',
                }}>
                    +{imageCount - 1}
                </div>
                )}
            </div>
            )}
        </div>
      
    </div>
  );
};

export default ReviewList;
