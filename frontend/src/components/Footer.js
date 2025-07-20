import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12 py-6 text-center text-gray-500 text-sm">
      <div className="container mx-auto px-4">
        &copy; {new Date().getFullYear()} Free eLearning Platform. All rights reserved.
      </div>
    </footer>
  );
} 