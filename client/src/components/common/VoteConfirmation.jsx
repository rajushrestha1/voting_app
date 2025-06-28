import React from 'react';

const VoteConfirmation = ({ candidate, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Confirm Your Vote</h3>
        <p className="mb-6">
          You are about to vote for <span className="font-semibold">{candidate.name}</span> from <span className="font-semibold">{candidate.party}</span>. This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirm Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteConfirmation;