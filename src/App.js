import React from 'react';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logo from './components/js/Logo';
import LoginPage from  './pages/LoginPage'; 
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import AlbumBoothSelectionPage from './pages/AlbumBoothSelectionPage';
import MyPage from './pages/MyPage';
import DetailMypage from './pages/DetailMyPage'
import AddPhoto from './pages/AddPhotoPage';
import NotePhoto from './pages/NotePhotoPage';
import ShareSuccess from  './pages/ShareSuccessPage';
import Review from './pages/ReviewPage';
import ReviewSuccess from  './pages/ReviewSuccessPage';
import BoothReview from  './pages/BoothReviewPage';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Router>
          <Routes>
            <Route path="/" element={<Logo />} /> 
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/Album" element={<AlbumPage />} />
            <Route path="/Album-BoothSelection" element={<AlbumBoothSelectionPage />} />
            <Route path="/My" element={<MyPage />} />
            <Route path="/DetailMy" element={<DetailMypage />} />
            <Route path="/AddPhoto" element={<AddPhoto />} />
            <Route path="/NotePhoto" element={<NotePhoto />} />
            <Route path="/ShareSuccess" element={<ShareSuccess />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/ReviewSuccess" element={<ReviewSuccess />} />
            <Route path="/BoothReview" element={<BoothReview />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
