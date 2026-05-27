import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FIXTURE_FILE = path.join(process.cwd(), "data", "fixtures.json");

function roundRobin(teams) {
  let teamsCopy = [...teams];
  if (teamsCopy.length % 2 !== 0) {
    teamsCopy.push("BYE");
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

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateFixtures(division) {
  const teams = shuffle([...division]);
  const firstLeg = roundRobin(teams);
  const secondLeg = firstLeg.map((round) =>
    round.map(([home, away]) => [away, home])
  );

  function structureMatches(rounds) {
    return rounds.map((round) =>
      round.map(([home, away]) => ({
        home,
        away,
        date: null,
        venue: null,
        status: "scheduled",
      }))
    );
  }

  return structureMatches([...firstLeg, ...secondLeg]);
}

export async function GET() {
  try {
    const data = fs.readFileSync(FIXTURE_FILE, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Fixtures not found" }, { status: 404 });
  }
}

export async function POST(request) {
  const { div_one = [], div_two = [] } = await request.json();

  const fixtures = {
    div_one: generateFixtures(div_one),
    div_two: generateFixtures(div_two),
  };

  fs.writeFileSync(FIXTURE_FILE, JSON.stringify(fixtures, null, 4));

  return NextResponse.json({
    status: "success",
    message: "Fixtures generated",
    fixtures,
  });
}

export async function PUT(request) {
  const data = await request.json();
  const { division, round, match, updates } = data;

  try {
    const fixturesData = fs.readFileSync(FIXTURE_FILE, "utf8");
    const fixtures = JSON.parse(fixturesData);

    const fixture = fixtures[division][round][match];
    Object.assign(fixture, updates);

    fs.writeFileSync(FIXTURE_FILE, JSON.stringify(fixtures, null, 4));

    return NextResponse.json({ status: "success", updated: fixture });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update fixture" }, { status: 500 });
  }
}
