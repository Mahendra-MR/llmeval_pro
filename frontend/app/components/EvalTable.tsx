'use client';

export default function EvalTable() {
  const results = [
    { id: 1, task: "gsm8k", model: "hf", score: 0.0 },
    { id: 2, task: "truthfulqa", model: "openai", score: 1.0 },
  ];

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Task
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Model
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Score
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {results.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-all duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                {row.task}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {row.model}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    row.score === 1
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {row.score}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
