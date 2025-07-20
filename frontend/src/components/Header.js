import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileIcon from '../assets/profile.png';

export default function Header({ onProfileClick }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <Link to="/" className="text-2xl font-bold text-blue-700">Free eLearning</Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          {token && <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>}
          {!token && <Link to="/login" className="hover:text-blue-600">Login</Link>}
          {!token && <Link to="/register" className="hover:text-blue-600">Register</Link>}
          {token && (
            <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
          )}
          {token && (
            <button onClick={onProfileClick} className="ml-2">
              <img src={profileIcon} alt="Profile" className="w-8 h-8 rounded-full border-2 border-blue-300 hover:border-blue-600 transition" />
            </button>
          )}
        </nav>
        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-4 space-y-2">
            <Link to="/" className="hover:text-blue-600" onClick={()=>setMenuOpen(false)}>Home</Link>
            {token && <Link to="/dashboard" className="hover:text-blue-600" onClick={()=>setMenuOpen(false)}>Dashboard</Link>}
            {!token && <Link to="/login" className="hover:text-blue-600" onClick={()=>setMenuOpen(false)}>Login</Link>}
            {!token && <Link to="/register" className="hover:text-blue-600" onClick={()=>setMenuOpen(false)}>Register</Link>}
            {token && (
              <button onClick={()=>{handleLogout();setMenuOpen(false);}} className="text-red-500 hover:underline text-left">Logout</button>
            )}
            {token && (
              <button onClick={()=>{onProfileClick();setMenuOpen(false);}} className="mt-2">
                <img src={profileIcon} alt="Profile" className="w-8 h-8 rounded-full border-2 border-blue-300 hover:border-blue-600 transition" />
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
} 