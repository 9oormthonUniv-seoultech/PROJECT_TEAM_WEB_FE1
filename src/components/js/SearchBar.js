import React from 'react';
import '../css/SearchBar.css';

function SearchBar({ placeholder, icon, onSearch, width }) {
  return (
    <div className="search-bar" style={{ width: width }}>
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
