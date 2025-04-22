"use client";
import { useEffect, useState } from "react";

const ListFixtures = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.API_URI}/api/fixtures`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div>Loading fixtures...</div>;

  const renderDivision = (division, name) => (
    <div>
      <h2>{name}</h2>
      {division.map((round, roundIndex) => (
        <div key={roundIndex}>
          <h3>Round {roundIndex + 1}</h3>
          <ul>
            {round.map((match, matchIndex) => (
              <li key={matchIndex}>
                {match.home} vs {match.away} — {match.date ?? "TBD"} @{" "}
                {match.venue ?? "TBD"} [{match.status}]
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <main className="p-4">
      {renderDivision(data.div_one, "Division One")}
      {renderDivision(data.div_two, "Division Two")}
    </main>
  );
};

export default ListFixtures;
