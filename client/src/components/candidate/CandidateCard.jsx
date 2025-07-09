
// CandidateCard.jsx
import React from 'react';

const CandidateCard = ({ candidate, onVoteClick, hasVoted }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {candidate.name || "Unknown Candidate"}
            </h3>
            <p className="text-gray-600">{candidate.party || "No party specified"}</p>
            <p className="text-sm text-gray-500 mt-1 capitalize">
              Position: {candidate.position}
            </p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {typeof candidate.votes === 'number' ? candidate.votes : 0} votes
          </span>
        </div>

        <div className="mt-6">
          <button
            onClick={onVoteClick}
            disabled={hasVoted}
            className={`w-full py-2 px-4 rounded font-medium transition ${
              hasVoted
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {hasVoted ? 'Already Voted' : 'Vote Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;