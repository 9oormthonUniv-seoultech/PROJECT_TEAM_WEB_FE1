import React from 'react';
import { ReactComponent as SpeechBubbleIcon } from '../../assets/speech-bubble-icon.svg';

const SpeechBubble = ({text, marginTop , marginLeft}) => {
  return (
    <div style={{ position: 'absolute', textAlign: 'center', marginTop : marginTop, marginLeft : marginLeft }}>
      <SpeechBubbleIcon style={{ width: '246px', height: '34px' }} />
      <div 
        style={{
          position: 'absolute',
          top: '4px', // 말풍선의 적절한 위치에 텍스트 배치
          left: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none', // SVG와 텍스트가 겹칠 경우 클릭 방지
          fontSize: '12px', // 텍스트 크기
          color: '#676F7B' // 텍스트 색상
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default SpeechBubble;
