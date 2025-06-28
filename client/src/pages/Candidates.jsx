import React, { useState, useEffect } from 'react';
import { getPublicCandidates } from '../api/api';
import CandidateCard from '../components/candidate/CandidateCard';
import toast from 'react-hot-toast';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data } = await getPublicCandidates();
        setCandidates(data);
      } catch (error) {
        console.error('Candidate fetch error:', error);
        toast.error('Failed to load candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading candidates...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Candidate Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map(candidate => (
          <CandidateCard
            key={candidate._id}
            candidate={candidate}
            onVoteClick={() => {}}
            hasVoted={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Candidates;
