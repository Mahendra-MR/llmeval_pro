'use client';

import { useState } from "react";
import ModelScoreChart from "./ModelScoreChart";

type EvalResult = {
  id: number;
  task: string;
  model: string;
  prompt: string;
  prediction: string;
  reference: string;
  score: number;
};

export default function UploadClient() {
  const [data, setData] = useState<EvalResult[]>([]);
  const [selected, setSelected] = useState<EvalResult | null>(null);

  function processFile(file: File) {
    if (!file.name.endsWith(".jsonl")) {
      alert("Please upload a valid .jsonl file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = (e.target?.result as string).split("\n").filter(Boolean);
      const parsed = lines.map((line) => JSON.parse(line));
      setData(parsed);
    };
    reader.readAsText(file);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  function handleBrowse(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  }

  return (
    <>
      {/* Upload box */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-indigo-400 rounded-xl p-8 text-center mb-6 cursor-pointer bg-gradient-to-br from-white to-indigo-50 hover:bg-indigo-100 transition"
      >
        <p className="text-indigo-700 text-sm mb-4 font-medium">
          <strong>Drag & drop</strong> a <code>.jsonl</code> file here
        </p>
        <label className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-full font-semibold cursor-pointer hover:bg-indigo-700 transition">
          Or browse file
          <input type="file" accept=".jsonl" onChange={handleBrowse} className="hidden" />
        </label>
      </div>

      {/* Table view */}
      {data.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left font-semibold tracking-wider">Model</th>
                  <th className="px-6 py-3 text-left font-semibold tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-indigo-50 transition cursor-pointer"
                    onClick={() => setSelected(row)}
                  >
                    <td className="px-6 py-3 font-medium text-gray-800">{row.task}</td>
                    <td className="px-6 py-3 text-gray-700">{row.model}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
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

          <ModelScoreChart data={data} />
        </>
      )}

      {/* Modal view */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-3xl shadow-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-indigo-700">Prompt Preview</h3>

            <div className="mb-3 text-sm text-gray-700">
              <strong>Task:</strong> {selected.task}
            </div>
            <div className="mb-3 text-sm text-gray-700">
              <strong>Model:</strong> {selected.model}
            </div>

            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-800">Prompt:</p>
              <pre className="text-xs bg-gray-100 p-3 rounded-lg whitespace-pre-wrap text-gray-700">
                {selected.prompt}
              </pre>
            </div>

            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-800">Prediction:</p>
              <pre className="text-xs bg-blue-50 p-3 rounded-lg whitespace-pre-wrap text-blue-800">
                {selected.prediction}
              </pre>
            </div>

            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-800">Reference:</p>
              <pre className="text-xs bg-green-50 p-3 rounded-lg whitespace-pre-wrap text-green-800">
                {selected.reference}
              </pre>
            </div>

            <button
              className="mt-4 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
