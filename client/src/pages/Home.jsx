import React from 'react';
import { Link } from 'react-router-dom';
import About from '../pages/About';

const Home = () => {
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/Images/voting.png')" }} // <-- background image
      >
        <div className="container mx-auto px-4 py-16 text-center  bg-opacity-80 rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Student Voting System
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-12">
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

      <About />
    </>
  );
};

export default Home;
