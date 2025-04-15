'use client';
import { useEffect, useState } from 'react';

type Fixture = {
  home: string;
  away: string;
  date: string | null;
  venue: string | null;
  status: string;
};

type FixtureData = {
  div_one: Fixture[][];
  div_two: Fixture[][];
};

const ListFixtures() {
  const [data, setData] = useState<FixtureData | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/fixtures')  // Update for your server location
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div>Loading fixtures...</div>;

  const renderDivision = (division: Fixture[][], name: string) => (
    <div>
      <h2>{name}</h2>
      {division.map((round, roundIndex) => (
        <div key={roundIndex}>
          <h3>Round {roundIndex + 1}</h3>
          <ul>
            {round.map((match, matchIndex) => (
              <li key={matchIndex}>
                {match.home} vs {match.away} — {match.date ?? 'TBD'} @ {match.venue ?? 'TBD'} [{match.status}]
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
}


export default ListFixtures
