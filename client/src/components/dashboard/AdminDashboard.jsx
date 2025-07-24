import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getCandidates, getResults, addCandidate, removeCandidate } from '../../api/api';
import AddCandidateForm from '../candidate/AddCandidateForm';
import CandidateList from '../candidate/CandidateList';
import ResultsChart from '../common/ResultsChart';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { admin } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [results, setResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('candidates');

  useEffect(() => {
    if (!admin) return;
    
    const fetchData = async () => {
      try {
        if (activeTab === 'candidates') {
          const { data } = await getCandidates();
          setCandidates(data);
        } else {
          const { data } = await getResults();
          setResults(data);
        }
      } catch (error) {
console.error('Login error:', error);
  toast.error('Faild to fetch data');    
  }
    };
    
    fetchData();
  }, [admin, activeTab]);

  const handleAddCandidate = async (candidateData) => {
    try {
      const { data } = await addCandidate(candidateData);
      setCandidates([...candidates, data]);
      setShowForm(false);
      toast.success('Candidate added successfully');
    } catch (error) {
console.error('Login error:', error);
  toast.error('Failed to add candidate');    }
  };

  const handleRemoveCandidate = async (id) => {
    try {
      await removeCandidate(id);
      setCandidates(candidates.filter(c => c._id !== id));
      toast.success('Candidate removed successfully');
    } catch (error) {
      console.error('Login error:', error);
    toast.error('Failed to remove candidate');
        }
    };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'candidates' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('candidates')}
        >
          Manage Candidates
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'results' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('results')}
        >
          View Results
        </button>
      </div>
      
      {activeTab === 'candidates' ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Candidates Management</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {showForm ? 'Cancel' : 'Add New Candidate'}
            </button>
          </div>
          
          {showForm && (
            <AddCandidateForm 
              onSubmit={handleAddCandidate} 
              onCancel={() => setShowForm(false)}
            />
          )}
          
          <CandidateList 
            candidates={candidates} 
            onRemove={handleRemoveCandidate} 
          />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Election Results</h2>
          <ResultsChart data={results} />
          
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left">Candidate</th>
                  <th className="py-3 px-4 text-left">Party</th>
                  <th className="py-3 px-4 text-center">Votes</th>
                  <th className="py-3 px-4 text-center">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {results.map((candidate, index) => {
                  const totalVotes = results.reduce((sum, c) => sum + c.votes, 0);
                  const percentage = totalVotes > 0 
                    ? ((candidate.votes / totalVotes) * 100).toFixed(1) 
                    : '0.0';
                    
                  return (
                    <tr key={candidate._id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="py-3 px-4 border-b">{candidate.name}</td>
                      <td className="py-3 px-4 border-b">{candidate.party}</td>
                      <td className="py-3 px-4 border-b text-center">{candidate.votes}</td>
                      <td className="py-3 px-4 border-b text-center">{percentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;