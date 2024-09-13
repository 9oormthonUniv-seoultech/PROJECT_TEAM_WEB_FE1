import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logo from './components/js/Logo'; 
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Logo />} /> 
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Album" element={<AlbumPage />} />
          <Route path="/My" element={<MyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
