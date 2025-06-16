'use client';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';

// Register ChartJS modules
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Props type
type EvalResult = {
  model: string;
  score: number;
};

export default function ModelScoreChart({ data }: { data: EvalResult[] }) {
  // Compute average scores per model
  const chartData = useMemo(() => {
    const grouped: { [model: string]: number[] } = {};

    data.forEach(({ model, score }) => {
      if (!grouped[model]) grouped[model] = [];
      grouped[model].push(score);
    });

    const labels = Object.keys(grouped);
    const avgScores = labels.map(
      (model) =>
        grouped[model].reduce((a, b) => a + b, 0) / grouped[model].length
    );

    return {
      labels,
      datasets: [
        {
          label: 'Average Score',
          data: avgScores,
          backgroundColor: 'rgba(99, 102, 241, 0.6)', // indigo-500 with opacity
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    };
  }, [data]);

  // Chart styling and scale options
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#4B5563', // gray-700
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: '#1f2937', // gray-800
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#374151', // gray-700
          font: { size: 12 },
        },
        grid: { color: '#E5E7EB' }, // gray-200
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#374151',
          font: { size: 12 },
        },
        grid: { color: '#E5E7EB' },
      },
    },
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-indigo-600 mb-4 text-center">📊 Model Average Score</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
