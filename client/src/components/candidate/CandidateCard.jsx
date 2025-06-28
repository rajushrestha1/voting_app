import React from 'react';

const CandidateCard = ({ candidate, onVoteClick, hasVoted }) => {
  return (
    <div className="card">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{candidate.name}</h3>
            <p className="text-gray-600">{candidate.party}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {candidate.votes} votes
          </span>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => onVoteClick(candidate)}
            disabled={hasVoted}
            className={`w-full py-2 px-4 rounded font-medium ${
              hasVoted 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {hasVoted ? 'Voted' : 'Vote Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;