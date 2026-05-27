"use client";
import { useEffect, useState } from "react";

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("/api/results")
      .then((res) => res.json())
      .then(setResults)
      .catch(console.error);
  }, []);

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Match Results</h1>
      {results.length === 0 ? (
        <p>No results recorded yet.</p>
      ) : (
        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{result.date || "Date unknown"}</span>
                <span className="text-sm font-semibold text-blue-600">{result.division}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <div className="flex-1 text-right pr-4">{result.homeTeam}</div>
                <div className="bg-gray-800 text-white px-3 py-1 rounded">
                  {result.homeScore} - {result.awayScore}
                </div>
                <div className="flex-1 text-left pl-4">{result.awayTeam}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Results;
