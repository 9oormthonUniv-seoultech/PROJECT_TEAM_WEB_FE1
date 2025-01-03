// Navbar.js
import React, { useState } from 'react';
import '../css/Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/navbar/home-icon.svg';
import { ReactComponent as AlbumIcon } from '../../assets/navbar/album-icon.svg'; 
import { ReactComponent as MyIcon } from '../../assets/navbar/my-icon.svg';
import HeartIcon from '../../assets/navbar/heart-icon.svg';
import HeartIconClicked from '../../assets/navbar/heart-icon-clicked.svg';
import TrashIcon from '../../assets/navbar/trash-icon.svg';
import TrashIconClicked from '../../assets/navbar/trash-icon-clicked.svg';

function Navbar({ isSelectMode, onLike, onDelete, isLoggedIn, onNavItemClick }) {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (button) => {
    setActiveButton((prevButton) => (prevButton === button ? null : button));
    if (button === 'like') onLike();
    else if (button === 'delete') onDelete();
  };

  return (
    <nav className="navbar">
      <ul className={`navbar-list ${isSelectMode ? 'select-mode' : ''}`}>
        {isSelectMode ? (
          <>
            <li className="navbar-item" onClick={() => handleButtonClick('like')} style={{ color: activeButton === 'like' ? '#5453EE' : '#4B515A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <img src={activeButton === 'like' ? HeartIconClicked : HeartIcon} alt="Heart Icon" style={{ width: '20px', height: '25px' }} />
              좋아요
            </li>
            <li className="navbar-item" onClick={() => handleButtonClick('delete')} style={{ color: activeButton === 'delete' ? '#5453EE' : '#4B515A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <img src={activeButton === 'delete' ? TrashIconClicked : TrashIcon} alt="Trash Icon" style={{ width: '20px', height: '25px' }} />
              삭제
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <NavLink to="/Home" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
                <HomeIcon className="navbar-icon" />
                홈
              </NavLink>
            </li>
            <li className="navbar-item">
              <div onClick={() => onNavItemClick('/Album')} className="navbar-link">
                <AlbumIcon className="navbar-icon" />
                앨범
              </div>
            </li>
            <li className="navbar-item">
              <div onClick={() => onNavItemClick('/My')} className="navbar-link">
                <MyIcon className="navbar-icon" />
                MY
              </div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
