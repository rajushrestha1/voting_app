import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Campus Voting System
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          A secure and transparent platform for student elections. Cast your vote anytime, anywhere.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg"
          >
            Student Login
          </Link>
          <Link 
            to="/candidates" 
            className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-6 rounded-lg border border-blue-600 transition duration-300 text-lg"
          >
            View Candidates
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;