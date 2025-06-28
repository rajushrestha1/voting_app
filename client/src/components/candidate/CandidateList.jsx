import React from 'react';

const CandidateList = ({ candidates, onRemove }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Party</th>
            <th className="py-3 px-4 text-center">Votes</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={candidate._id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="py-3 px-4 border-b">{candidate.name}</td>
              <td className="py-3 px-4 border-b">{candidate.party}</td>
              <td className="py-3 px-4 border-b text-center">{candidate.votes}</td>
              <td className="py-3 px-4 border-b text-center">
                <button
                  onClick={() => onRemove(candidate._id)}
                  className="text-red-600 hover:text-red-900 font-medium"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;