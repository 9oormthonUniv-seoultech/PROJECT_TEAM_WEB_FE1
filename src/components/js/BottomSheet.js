import React from 'react';
import Text from './Text';
import { ReactComponent as BarIcon } from '../../assets/bar-icon.svg';
import starIcon from '../../assets/star-icon.svg';

const BottomSheet = ({ isOpen, onClose, locationInfo }) => {
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
        zIndex: '25',
        display: isOpen ? 'block' : 'none'  // isOpen이 false일 때 완전히 숨김
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', margin: '18px 0' }}>
        <BarIcon width="50" height="5" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginLeft :'16px', marginBottom :'30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* 포토부스 이름과 별점 텍스트 */}
          <div style={{ display: 'flex' }}>
            <Text fontSize="18px" color="#171D24" fontWeight="600">
              {locationInfo?.content || '포토 부스 이름'}
            </Text>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft : '11px' }}>
              <Text fontSize="14px" color="#373D49" fontWeight="600" icon={starIcon} iconSize="16px" iconMarginRight="1.5px" iconAlt="Star">
                {locationInfo?.rating || '0.0'}
              </Text>
            </div>
          </div>

          {/* 거리와 리뷰 수 텍스트 */}
          <div style={{ display: 'flex', marginTop: '5px' }}>
            <Text fontSize="14px" color="#676F7B">
              {locationInfo?.distance ? `${locationInfo.distance}m ·` : ''} 리뷰 {locationInfo?.totalImageCount || '0'}장
            </Text>
          </div>

          {/* 키워드 텍스트 */}
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <Text fontSize="12px" color="#676F7B" backgroundColor="#E9EAEE" borderRadius="24px" padding="8px 20px">
              깔끔한 소품
            </Text>
          </div>
        </div>

        {/* 리뷰 이미지가 들어갈 오른쪽 영역 */}
        <div style={{ position: 'relative', width: '82px', height: '82px', borderRadius: '4px', overflow: 'hidden', marginRight: '24px' }}>
          <img 
            src={locationInfo?.reviewPhotos?.[0]?.Image || "https://via.placeholder.com/60"} 
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
            +{locationInfo?.totalImageCount || '0'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;

