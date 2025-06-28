import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">About CampusVote</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          CampusVote aims to revolutionize student elections by providing a secure, transparent, and accessible online voting platform.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Secure</h3>
          <p className="text-gray-700">
            Advanced encryption protects the integrity of every vote.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Transparent</h3>
          <p className="text-gray-700">
            Real-time results ensure complete transparency.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Accessible</h3>
          <p className="text-gray-700">
            Accessible from any device for all students.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;