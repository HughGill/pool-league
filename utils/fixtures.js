/**
 * Round-robin tournament scheduling algorithm.
 * @param {Array} teams - List of team names or objects.
 * @returns {Array} - List of rounds, where each round is a list of [home, away] matches.
 */
export function roundRobin(teams) {
  let teamsCopy = [...teams];
  if (teamsCopy.length % 2 !== 0) {
    teamsCopy.push("BYE"); // Add dummy if odd number of teams
  }

  const n = teamsCopy.length;
  const rounds = [];
  for (let roundNum = 0; roundNum < n - 1; roundNum++) {
    const roundMatches = [];
    for (let i = 0; i < n / 2; i++) {
      const home = teamsCopy[i];
      const away = teamsCopy[n - 1 - i];
      if (roundNum % 2 === 0) {
        roundMatches.push([home, away]);
      } else {
        roundMatches.push([away, home]);
      }
    }
    rounds.push(roundMatches);
    // Rotate teams (except the first)
    teamsCopy = [teamsCopy[0], teamsCopy[n - 1], ...teamsCopy.slice(1, n - 1)];
  }
  return rounds;
}

/**
 * Generates fixtures for a division.
 * @param {Array} division - List of teams in the division.
 * @returns {Array} - Structured fixture list.
 */
export function generateFixtures(division) {
  const teams = [...division];
  // Shuffle teams
  for (let i = teams.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [teams[i], teams[j]] = [teams[j], teams[i]];
  }

  const firstLeg = roundRobin(teams);
  const secondLeg = firstLeg.map((round) =>
    round.map(([home, away]) => [away, home])
  );

  const structureMatches = (rounds) => {
    return rounds.map((round) =>
      round.map(([home, away]) => ({
        home,
        away,
        date: null,
        venue: null,
        status: "scheduled",
      }))
    );
  };

  return structureMatches([...firstLeg, ...secondLeg]);
}
