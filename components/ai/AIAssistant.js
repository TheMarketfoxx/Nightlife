import React, { useState, useRef } from 'react';

const AIAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const abortControllerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      setError("Please enter a prompt.");
      return;
    }
    if (trimmedPrompt.length > 1000) {
      setError("Your prompt exceeds the maximum allowed length.");
      return;
    }
    setIsLoading(true);
    setError('');
    setResponse('');
    
    // Abort previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ prompt: trimmedPrompt }),
      });

      if (!res.ok) {
        const errMessage = (await res.json()).error || "Failed to fetch AI suggestions.";
        throw new Error(errMessage);
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("AI suggestion error:", err);
        setError(err.message || 'An error occurred while fetching AI suggestions. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full p-2 bg-gray-800 rounded-lg text-white border border-gray-700"
          rows="4"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-600 disabled:opacity-50 rounded-lg p-2 transition-colors duration-300"
        >
          {isLoading ? 'Loading...' : 'Generate'}
        </button>
      </form>
      
      {error && <p className="mt-2 text-red-400">{error}</p>}
      
      {response && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;