import React from 'react';
import '../css/SearchBar.css';

function SearchBar({ placeholder, icon, onSearch, searchTerm, onChange, width, height, zIndex, position, backgroundColor, fontSize, fontWeight, top, marginLeft }) {
  return (
    <div className="search-bar" style={{ width: width , height : height, zIndex : zIndex, position : position, backgroundColor : backgroundColor, fontSize : fontSize, fontWeight : fontWeight , top :top, marginLeft : marginLeft}}>
      <input 
        type="text" 
        value={searchTerm}
        onChange={onChange}
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
