import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-medium text-gray-800 mb-4">Page Not Found</h2>
      <Link 
        to="/" 
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;