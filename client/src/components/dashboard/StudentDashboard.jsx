import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getPublicCandidates, castVote } from '../../api/api';
import CandidateCard from '../candidate/CandidateCard';
import VoteConfirmation from '../common/VoteConfirmation';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const { student } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!student) {
      navigate('/login');
      return;
    }

    const fetchCandidates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getPublicCandidates();
        console.log("API Response:", response);

        if (response.data && Array.isArray(response.data)) {
          console.log("Received candidates array:", response.data);
          setCandidates(response.data);
        } else {
          throw new Error('Invalid candidates data format');
        }
      } catch (error) {
        console.error('Failed to load candidates:', error);
        setError(error.message || 'Failed to load candidates');
        toast.error('Failed to load candidates. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, [student, navigate]);

  const handleVoteClick = (candidate) => {
    if (!student || student.hasVoted) {
      toast.error('You have already voted or not logged in!');
      return;
    }
    setSelectedCandidate(candidate);
    setShowConfirmation(true);
  };

  const confirmVote = async () => {
    if (!selectedCandidate || !student) return;

    try {
      await castVote(selectedCandidate._id);

      const updatedCandidates = candidates.map(c =>
        c._id === selectedCandidate._id
          ? { ...c, votes: c.votes + 1 }
          : c
      );

      setCandidates(updatedCandidates);
      setShowConfirmation(false);

      const updatedStudent = { ...student, hasVoted: true };
      localStorage.setItem('student', JSON.stringify(updatedStudent));

      toast.success(`Vote cast for ${selectedCandidate.name}!`);
    } catch (error) {
      console.error('Failed to cast vote:', error);
      toast.error(error.message || 'Failed to cast vote');
    }
  };

  if (!student) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Voting Dashboard</h1>

      {student.hasVoted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p className="font-bold">Thank you for voting!</p>
          <p>You have successfully cast your vote in this election.</p>
        </div>
      ) : (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
          <p className="font-bold">Welcome, {student.name}!</p>
          <p>Please select your preferred candidate to cast your vote.</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-4">Loading candidates...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-6">
          <p className="font-bold">Error loading candidates</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      ) : candidates.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No candidates available</p>
          <p className="text-gray-500 mt-2">The election has no candidates yet</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Check Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map(candidate => (
            <CandidateCard
              key={candidate._id || candidate.id}
              candidate={candidate}
              onVoteClick={() => handleVoteClick(candidate)}
              hasVoted={student.hasVoted}
            />
          ))}
        </div>
      )}

      {showConfirmation && (
        <VoteConfirmation
          candidate={selectedCandidate}
          onConfirm={confirmVote}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
