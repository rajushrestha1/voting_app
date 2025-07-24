import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const CandidateList = ({ candidates, onRemove }) => {
  const BASE_URL = 'http://localhost:5000'; // Change to your backend URL in production

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">Image</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Party</th>
            <th className="py-3 px-4 text-left">Position</th>
            <th className="py-3 px-4 text-center">Votes</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={candidate._id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="py-3 px-4 border-b">
                <img
                  src={
                    candidate.image
                      ? `${BASE_URL}${candidate.image}`
                      : '/default-avatar.png' // Optional fallback image
                  }
                  alt={candidate.name}
                  className="w-16 h-16 object-cover rounded-full border"
                />
              </td>
              <td className="py-3 px-4 border-b">{candidate.name}</td>
              <td className="py-3 px-4 border-b">{candidate.party}</td>
              <td className="py-3 px-4 border-b">{candidate.position}</td>
              <td className="py-3 px-4 border-b text-center">{candidate.votes}</td>
              <td className="py-3 px-4 border-b text-center">
                <button
                  onClick={() => onRemove(candidate._id)}
                  className="text-red-600 hover:text-red-900 font-medium"
                >
                  <DeleteIcon className="cursor-pointer" />
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
