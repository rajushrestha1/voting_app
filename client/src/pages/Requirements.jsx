import React from 'react';

const Requirements = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Voting Requirements</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Eligibility Criteria</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Must be a currently enrolled student</li>
          <li>Must have a valid student ID number</li>
          <li>Must not have already voted in the current election</li>
        </ul>
      </div>
    </div>
  );
};

export default Requirements;