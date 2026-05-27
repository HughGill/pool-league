"use client";
import { useEffect, useState } from "react";

const Fixtures = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/fixtures`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div>Loading fixtures...</div>;

  const renderDivision = (division, name) => (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{name}</h2>
      {division.map((round, roundIndex) => (
        <div key={roundIndex} className="mb-6">
          <h3 className="text-xl font-medium mb-2 border-b pb-1">Round {roundIndex + 1}</h3>
          <ul className="space-y-2">
            {round.map((match, matchIndex) => (
              <li key={matchIndex} className="bg-white p-3 rounded shadow-sm border border-gray-100">
                <div className="flex justify-between items-center">
                   <span className="font-bold">{match.home} <span className="font-normal mx-2">vs</span> {match.away}</span>
                   <span className="text-sm text-gray-500 uppercase">{match.status}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {match.date ?? "Date TBD"} @ {match.venue ?? "Venue TBD"}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">League Fixtures</h1>
      {data.div_one && renderDivision(data.div_one, "Division One")}
      {data.div_two && renderDivision(data.div_two, "Division Two")}
    </main>
  );
};

export default Fixtures;
