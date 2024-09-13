import React from 'react';
import '../css/Navbar.css';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/home-icon.svg';
import { ReactComponent as AlbumIcon } from '../../assets/album-icon.svg'; 
import { ReactComponent as MyIcon } from '../../assets/my-icon.svg'; 

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/Home" className="navbar-link" activeClassName="active">
            <HomeIcon className="navbar-icon" />
            홈
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/Album" className="navbar-link" activeClassName="active">
            <AlbumIcon className="navbar-icon" />
            앨범
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/My" className="navbar-link" activeClassName="active">
            <MyIcon className="navbar-icon" />
            MY
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
