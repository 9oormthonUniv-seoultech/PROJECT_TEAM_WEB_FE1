import React from 'react';
import '../css/SearchBar.css';

function SearchBar({ placeholder, icon, onSearch, width, height, zIndex, position, backgroundColor, fontSize, fontWeight, top }) {
  return (
    <div className="search-bar" style={{ width: width , height : height, zIndex : zIndex, position : position, backgroundColor : backgroundColor, fontSize : fontSize, fontWeight : fontWeight , top :top}}>
      <input 
        type="text" 
        className="search-input" 
        placeholder={placeholder} 
    
      />
      <button className="search-button" onClick={onSearch}>
        <img src={icon} alt="Search" className="search-icon" />
      </button>
    </div>
  );
}

export default SearchBar;
