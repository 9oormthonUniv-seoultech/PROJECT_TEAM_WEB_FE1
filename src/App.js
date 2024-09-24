import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logo from './components/js/Logo';
import LoginPage from  './pages/LoginPage'; 
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import MyPage from './pages/MyPage';
import AddPhoto from './pages/AddPhotoPage';
import NotePhoto from './pages/NotePhotoPage';
import ShareSuccess from  './pages/ShareSuccessPage';
import Review from './pages/ReviewPage';
import ReviewSuccess from  './pages/ReviewSuccessPage';


function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Logo />} /> 
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Album" element={<AlbumPage />} />
          <Route path="/My" element={<MyPage />} />
          <Route path="/AddPhoto" element={<AddPhoto />} />
          <Route path="/NotePhoto" element={<NotePhoto />} />
          <Route path="/ShareSuccess" element={<ShareSuccess />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/ReviewSuccess" element={<ReviewSuccess />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
