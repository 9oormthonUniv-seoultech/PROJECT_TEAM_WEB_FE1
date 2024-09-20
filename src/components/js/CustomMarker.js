import React from 'react';

const CustomMarker = ({ width = 64, height = 70, imageUrl }) => {
  console.log('Received imageUrl:', imageUrl); // 확인용 로그
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <image
            href={imageUrl} // 전달받은 이미지 URL 사용
            width="1"
            height="1"
            preserveAspectRatio="xMidYMid slice" // 비율 유지
            onError={(e) => console.error('Image load error:', e)} // 이미지 로딩 에러 확인
          />
        </pattern>
      </defs>
      <g filter="url(#filter0_d)">
        <path
          d="M7 12.3596V41.7945C7 43.7442 7.97916 45.5393 9.56814 46.4841L25.7758 56.1468C27.2531 57.0315 29.0482 57.0401 30.5341 56.1898L47.4375 46.4669C49.0608 45.5393 50.0744 43.7184 50.0744 41.7429V12.3596C50.0744 9.39636 47.8412 7 45.0927 7H11.9817C9.23317 7 7 9.39636 7 12.3596Z"
          fill="#2A303A"
        />
        <circle
          cx="28.5655"
          cy="28.5665"
          r="16.1749"
          fill="url(#pattern0)" // pattern을 사용하여 이미지로 채움
        />
      </g>
    </svg>
  );
};

export default CustomMarker;
