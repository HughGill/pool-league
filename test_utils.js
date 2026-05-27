import { roundRobin, generateFixtures } from './utils/fixtures.js';
import { generateCustomUserId } from './utils/users.js';

// Test roundRobin
const teams = ['Team A', 'Team B', 'Team C', 'Team D'];
const rounds = roundRobin(teams);
console.log('Round Robin Rounds:', rounds.length);
if (rounds.length !== 3) throw new Error('Expected 3 rounds for 4 teams');

// Test generateFixtures
const fixtures = generateFixtures(teams);
console.log('Fixtures generated for 4 teams. Total rounds (Home & Away):', fixtures.length);
if (fixtures.length !== 6) throw new Error('Expected 6 rounds for 4 teams (home and away)');

// Test generateCustomUserId
const users = [{ id: 'NorthInishowenPoolLeague00001' }, { id: 'NorthInishowenPoolLeague00002' }];
const nextId = generateCustomUserId(users);
console.log('Next User ID:', nextId);
if (nextId !== 'NorthInishowenPoolLeague00003') throw new Error('Expected ID 00003');

console.log('Tests passed!');
