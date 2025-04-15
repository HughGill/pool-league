type Game = {
  player_home: string;
  player_away: string;
  home_wins: number; // up to 2
  away_wins: number; // up to 2
};

type Fixture = {
  home: string;
  away: string;
  games: Game[]; // 5 games per match
  date: string;
  venue: string;
  status: "played" | "scheduled" | "postponed";
};

type TableRow = {
  team: string;
  matchesPlayed: number;
  framesWon: number;
  framesLost: number;
  frameDifference: number;
};

function generatePoolLeagueTable(fixtures: Fixture[][]): TableRow[] {
  const table: Record<string, TableRow> = {};

  fixtures.flat().forEach(match => {
    if (match.status !== "played") return;

    const { home, away, games } = match;

    if (!table[home]) {
      table[home] = {
        team: home,
        matchesPlayed: 0,
        framesWon: 0,
        framesLost: 0,
        frameDifference: 0,
      };
    }
    if (!table[away]) {
      table[away] = {
        team: away,
        matchesPlayed: 0,
        framesWon: 0,
        framesLost: 0,
        frameDifference: 0,
      };
    }

    let homeTotal = 0;
    let awayTotal = 0;

    games.forEach(game => {
      homeTotal += game.home_wins;
      awayTotal += game.away_wins;
    });

    table[home].matchesPlayed += 1;
    table[away].matchesPlayed += 1;

    table[home].framesWon += homeTotal;
    table[home].framesLost += awayTotal;

    table[away].framesWon += awayTotal;
    table[away].framesLost += homeTotal;
  });

  // Frame difference
  Object.values(table).forEach(team => {
    team.frameDifference = team.framesWon - team.framesLost;
  });

  return Object.values(table).sort((a, b) =>
    b.framesWon - a.framesWon ||
    b.frameDifference - a.frameDifference
  );
}
