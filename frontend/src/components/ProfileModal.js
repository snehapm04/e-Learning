import React from 'react';

export default function ProfileModal({ user, onClose }) {
  if (!user) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
        <div className="flex flex-col items-center">
          <img src={user.profileIcon || require('../assets/profile.png')} alt="Profile" className="w-20 h-20 rounded-full border-2 border-blue-300 mb-4" />
          <h2 className="text-lg font-bold mb-1">{user.name}</h2>
          <div className="text-gray-600 mb-2">{user.email}</div>
        </div>
      </div>
    </div>
  );
} 