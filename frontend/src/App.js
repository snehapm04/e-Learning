import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CourseViewer from './pages/CourseViewer';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import ProfileModal from './components/ProfileModal';
import API from './api';

function App() {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details if logged in
    const token = localStorage.getItem('token');
    if (token) {
      API.get('/auth/me').then(res => setUser(res.data)).catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [showProfile]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
        <Header onProfileClick={() => setShowProfile(true)} />
        <main className="flex-1 container mx-auto px-4 py-6 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/course/:id" element={<ProtectedRoute><CourseViewer /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
        {showProfile && <ProfileModal user={user} onClose={() => setShowProfile(false)} />}
      </div>
    </BrowserRouter>
  );
}

export default App; 