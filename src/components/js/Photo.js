import React, { useState } from 'react';
import checkIcon from '../../assets/check-icon.svg'; // Import the check icon

function Photo({ photoUrl, altText, isSelected, isSelectMode, onClick }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevents toggling selection when clicking the heart icon
    setIsLiked(!isLiked);
  };

  return (
    <div
      onClick={onClick} // Handle selection when clicking the photo
      style={{
        width: '175px',
        height: '240px',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        border: isSelectMode && isSelected ? '2px solid #5453EE' : 'none', // Show border only in select mode when selected
        opacity: isSelectMode && isSelected ? 0.7 : 1, // Adjust opacity if selected in select mode
        cursor: 'pointer',
      }}
    >
      <img
        src={photoUrl}
        alt={altText}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Display check icon if in select mode and photo is selected */}
      {isSelectMode && isSelected && (
        <img
          src={checkIcon}
          alt="Selected"
          style={{
            position: 'absolute',
            top: '198.57px',
            right: '10.24px',
            width: '30px',
            height: '30px',
          }}
        />
      )}

      {/* Display heart button if not in select mode */}
      {!isSelectMode && (
        <button
          onClick={handleLikeClick}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            width: '30.71px',
            height: '30.71px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
            cursor: 'pointer',
          }}
        >
          {/* Heart icon with color toggle */}
          <svg
            width="24"
            height="21"
            viewBox="0 0 24 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.8375 2.29583C20.667 1.28935 19.2293 0.79248 17.7979 0.79248C16.3666 0.79248 14.9161 1.30209 13.7647 2.29583C13.3702 2.63982 13.0458 3.04751 12.7595 3.48705L12.4669 3.93296L12.1743 3.48705C11.8944 3.04751 11.5699 2.63345 11.1691 2.29583C10.0177 1.30209 8.58634 0.79248 7.1359 0.79248C5.68546 0.79248 4.26683 1.28935 3.0963 2.29583C0.507131 4.52538 0.214494 8.43664 2.44105 11.0293L10.6093 19.8264C11.1055 20.3552 11.7799 20.61 12.4478 20.61C12.4478 20.61 12.4542 20.61 12.4605 20.61C12.4669 20.61 12.4669 20.61 12.4733 20.61C13.1412 20.61 13.8156 20.3488 14.3118 19.8264L22.48 11.0293C24.7066 8.43664 24.414 4.52538 21.8248 2.29583H21.8375Z"
              fill={isLiked ? '#5453EE' : '#C7C9CE'}
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Photo;
