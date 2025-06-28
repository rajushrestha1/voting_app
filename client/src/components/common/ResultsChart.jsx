import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultsChart = ({ data }) => {
  const chartData = {
    labels: data.map(candidate => candidate.name),
    datasets: [
      {
        data: data.map(candidate => candidate.votes),
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
    <div className="max-w-2xl mx-auto">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default ResultsChart;