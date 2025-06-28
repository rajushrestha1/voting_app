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
  const navigate = useNavigate();

  useEffect(() => {
    if (!student) {
      navigate('/login');
      return;
    }
    
    const fetchCandidates = async () => {
      try {
        const { data } = await getPublicCandidates();
        setCandidates(data);
      } catch (error) {
console.error('Login error:', error);
  toast.error('Failed to load candidates');      }
    };
    
    fetchCandidates();
  }, [student, navigate]);

  const handleVoteClick = (candidate) => {
    if (student.hasVoted) {
      toast.error('You have already voted!');
      return;
    }
    setSelectedCandidate(candidate);
    setShowConfirmation(true);
  };

  const confirmVote = async () => {
    try {
      await castVote(selectedCandidate._id);
      toast.success(`Vote cast for ${selectedCandidate.name}!`);
      setShowConfirmation(false);
      student.hasVoted = true;
      const { data } = await getPublicCandidates();
      setCandidates(data);
    } catch (error) {
console.error('Login error:', error);
  toast.error('Failed to cast vote');    }
  };

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map(candidate => (
          <CandidateCard 
            key={candidate._id}
            candidate={candidate}
            onVoteClick={handleVoteClick}
            hasVoted={student.hasVoted}
          />
        ))}
      </div>
      
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