import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultsChart = ({ data }) => {
  //  Sort candidates by votes descending
  const sortedData = [...data].sort((a, b) => b.votes - a.votes);

  const chartData = {
    labels: sortedData.map((candidate, index) => `${index + 1}. ${candidate.name}`),
    datasets: [
      {
        data: sortedData.map(candidate => candidate.votes),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#8B5CF6',
          '#F59E0B',
          '#EF4444',
          '#EC4899',
        ],
        borderColor: [
          '#2563EB',
          '#059669',
          '#7C3AED',
          '#D97706',
          '#DC2626',
          '#DB2777',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Voting Results</h2>

      <Pie data={chartData} options={options} />

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Candidate Ranking</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Rank</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Party</th>
              <th className="py-3 px-4 text-center">Votes</th>
              <th className="py-3 px-4 text-center">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((candidate, index) => {
              const totalVotes = sortedData.reduce((sum, c) => sum + c.votes, 0);
              const percentage = totalVotes > 0
                ? ((candidate.votes / totalVotes) * 100).toFixed(1)
                : '0.0';

              return (
                <tr key={candidate._id || candidate.name} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-3 px-4 border-b">{index + 1}</td>
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
  );
};

export default ResultsChart;
