"use client";

import { useState } from "react";

type ChatEntry = {
  prompt: string;
  response: string;
  model: string;
  timestamp: string;
};

export default function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTimestamp = () =>
    new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/infer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model }),
      });

      const data = await res.json();
      const response = data.result || "No response";

      setChatHistory((prev) => [
        { prompt, response, model, timestamp: getTimestamp() },
        ...prev,
      ]);
      setPrompt("");
    } catch {
      setChatHistory((prev) => [
        {
          prompt,
          response: "Error fetching response",
          model,
          timestamp: getTimestamp(),
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  }

  const visibleChats = showAll ? chatHistory : chatHistory.slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />

        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Choose Model:
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
            <option value="hf-llama2">HF: LLaMA 2</option>
            <option value="hf-mistral">HF: Mistral</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Generating..." : "Submit Prompt"}
          </button>
          {chatHistory.length > 0 && (
            <button
              type="button"
              onClick={() => setChatHistory([])}
              className="text-sm text-gray-500 hover:text-red-600 underline"
            >
              Clear History
            </button>
          )}
        </div>
      </form>

      {chatHistory.length > 0 && (
        <div className="mt-6 space-y-4">
          {visibleChats.map((entry, i) => (
            <div key={i} className="border rounded-lg p-4 bg-gray-50">
              <div className="text-xs text-gray-500 mb-1">
                Model: <span className="font-medium">{entry.model}</span> ·{" "}
                {entry.timestamp}
              </div>
              <div className="mb-2">
                <p className="font-semibold text-gray-800">Prompt:</p>
                <pre className="text-sm bg-white p-2 rounded border whitespace-pre-wrap text-gray-700">
                  {entry.prompt}
                </pre>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Response:</p>
                <pre className="text-sm bg-indigo-50 p-2 rounded border whitespace-pre-wrap text-gray-800">
                  {entry.response}
                </pre>
              </div>
            </div>
          ))}
          {chatHistory.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-indigo-600 text-sm font-semibold hover:underline"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
