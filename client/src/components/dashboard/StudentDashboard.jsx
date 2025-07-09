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
  const [votes, setVotes] = useState({ President: null, 'Vice President': null, Candidate: [] });
  const [step, setStep] = useState('President');
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
        if (response.data && Array.isArray(response.data)) {
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

  const filteredCandidates = candidates.filter(c => c.position === step);

  const handleVoteClick = (candidate) => {
    if (student?.hasVoted) {
      toast.error('You have already voted!');
      return;
    }

    if (step === 'Candidate') {
      const alreadySelected = votes.Candidate.find(c => c._id === candidate._id);
      if (alreadySelected) {
        setVotes(prev => ({ ...prev, Candidate: prev.Candidate.filter(c => c._id !== candidate._id) }));
      } else if (votes.Candidate.length < 5) {
        setVotes(prev => ({ ...prev, Candidate: [...prev.Candidate, candidate] }));
      } else {
        toast.error('You can vote for up to 5 candidates only.');
      }
    } else {
      setVotes(prev => ({ ...prev, [step]: candidate }));
      setShowConfirmation(true);
    }
  };

  const confirmVote = async () => {
    try {
      if (step === 'President' && votes.President) {
        console.log('Submitting vote for President:', votes.President._id);
        // **Send position with vote**
        await castVote({ candidateId: votes.President._id, position: 'president' });
        setStep('Vice President');
        setShowConfirmation(false);
      } else if (step === 'Vice President' && votes['Vice President']) {
        console.log('Submitting vote for Vice President:', votes['Vice President']._id);
        await castVote({ candidateId: votes['Vice President']._id, position: 'VicePresident' });
        setStep('Candidate');
        setShowConfirmation(false);
      } else if (step === 'Candidate' && votes.Candidate.length > 0) {
        console.log('Submitting final candidate votes:', votes.Candidate.map(c => c._id));
        for (let candidate of votes.Candidate) {
          await castVote({ candidateId: candidate._id, position: 'Candidates' });
        }
        localStorage.setItem('student', JSON.stringify({ ...student, hasVoted: true }));
        toast.success('All votes submitted successfully!');
        navigate(0);
      }
    } catch (error) {
      console.error('Vote submission error:', error);
      toast.error('Failed to submit vote');
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
          <p>Please vote for one {step} {step === 'Candidate' ? '(select up to 5)' : ''}</p>
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map(candidate => (
            <CandidateCard
              key={candidate._id}
              candidate={candidate}
              onVoteClick={() => handleVoteClick(candidate)}
              hasVoted={step !== 'Candidate' && votes[step]?._id === candidate._id}
            />
          ))}
        </div>
      )}

      {/* Pass step (position) prop to VoteConfirmation */}
      {showConfirmation && step !== 'Candidate' && (
        <VoteConfirmation
          candidate={votes[step]}
          position={step}           // <--- Added this line
          onConfirm={confirmVote}
          onCancel={() => setShowConfirmation(false)}
        />
      )}

      {step === 'Candidate' && !student.hasVoted && (
        <div className="mt-6 text-center">
          <p className="text-gray-700 mb-2">Selected {votes.Candidate.length} candidates</p>
          <button
            onClick={confirmVote}
            disabled={votes.Candidate.length === 0}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            Submit Final Votes
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
