import React from 'react';
import Text from './Text'; // Text 컴포넌트 임포트
import { ReactComponent as BarIcon } from '../../assets/bar-icon.svg'; // bar-icon SVG 임포트
import starIcon from '../../assets/star-icon.svg'; 


const BottomSheet = ({ isOpen, onClose, locationInfo }) => {
  return (
    <div 
      style={{
        position: 'absolute',
        bottom: isOpen ? '80px' : '-80px', // 열릴 때는 화면 하단, 닫힐 때는 화면 밖으로
        left: '0',
        width: '100%',
        height: '164px', // 원하는 높이 설정
        backgroundColor: '#fff',
        borderRadius: '26px 26px 0px 0px',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)', // 그림자 효과
        transition: 'bottom 0.3s ease-in-out', // 슬라이드 애니메이션
        zIndex: '25', // 다른 요소보다 앞에 위치
      }}
    >
      {/* bar-icon.svg를 상단에 배치 */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '18px 0' }}>
        <BarIcon width="50" height="5" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginLeft :'16px', marginBottom :'30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* 포토부스 이름과 별점 텍스트 */}
          <div style={{ display: 'flex'}}>
            <Text fontSize="18px" color="#171D24" fontWeight="600" >
              {locationInfo?.content || '하루 필름'}
            </Text>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft : '11px' }}>
                {/* 별점과 텍스트를 나란히 표시 */}
                <Text fontSize="14px" color="#373D49" fontWeight="600" icon={starIcon} iconSize="16px" iconMarginRight="1.5px" iconAlt="Star">
                4.5
                </Text>
            </div>
          </div>

          {/* 거리와 리뷰 수 텍스트 */}
          <div style={{ display: 'flex',  marginTop: '5px' }}>
            <Text fontSize="14px" color="#676F7B">
              345m 
            </Text>
            <Text fontSize="14px" color="#676F7B" padding= "7.5px">
              ·
            </Text>
            <Text fontSize="14px" color="#676F7B">
              리뷰 567
            </Text>
          </div>

          {/* 키워드 텍스트 */}
          <div style={{ display: 'flex', marginTop : '10px'}}>
            <Text fontSize="12px" color="#676F7B" backgroundColor="#E9EAEE" borderRadius="24px" padding = "8px 20px">
              깔끔한 소품
            </Text>
            <Text fontSize="12px" color="#676F7B" backgroundColor="#E9EAEE" borderRadius="24px" padding = "8px 20px" marginLeft = "5px">
              빛번짐 없음
            </Text>
          </div>
        </div>

        {/* 이미지가 들어갈 오른쪽 영역 */}
        <div style={{ position: 'relative', width: '82px', height: '82px', borderRadius: '4px', overflow: 'hidden', marginRight: '24px' }}>
          <img 
            src="https://via.placeholder.com/60" 
            alt="포토부스 이미지" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* 이미지 위에 텍스트 배치 */}
          <div style={{
            position: 'absolute',
            bottom: '5px', // 텍스트를 이미지 하단에 배치
            right :'5px',
            backgroundColor: '#000', // 텍스트 배경을 반투명하게 설정
            color: '#fff', // 텍스트 색상
            padding: '5px', // 텍스트 패딩
            borderRadius: '24px', // 모서리 둥글게
            fontSize: '10px', // 텍스트 크기
          }}>
            +210
          </div>
        </div>
    </div>
    </div>
  );
};

export default BottomSheet;
