import { describe, it, expect, beforeEach } from 'vitest';
import { TournamentEngine } from '../js/TournamentEngine.js';

// Sample countries for testing
const createTestCountries = (count = 32) => {
    const countries = [];
    for (let i = 0; i < count; i++) {
        countries.push({
            id: `C${i}`,
            name: `Country ${i}`,
            flag: '🏳️',
            continent: 'Test',
            colors: { primary: '#000', secondary: '#fff', accent: '#ccc' }
        });
    }
    return countries;
};

describe('TournamentEngine', () => {
    let tournament;
    let countries;

    beforeEach(() => {
        countries = createTestCountries(32);
        tournament = new TournamentEngine(countries);
    });

    describe('constructor', () => {
        it('should initialize with 32 countries', () => {
            expect(tournament.countries).toHaveLength(32);
        });

        it('should create bracket with 5 rounds', () => {
            expect(tournament.bracket.rounds).toHaveLength(5);
        });

        it('should start at round 0, match 0', () => {
            expect(tournament.currentRound).toBe(0);
            expect(tournament.currentMatch).toBe(0);
        });
    });

    describe('generateBracket', () => {
        it('should create correct number of matches per round', () => {
            const rounds = tournament.bracket.rounds;
            expect(rounds[0].matches).toHaveLength(16); // Round of 32
            expect(rounds[1].matches).toHaveLength(8);  // Round of 16
            expect(rounds[2].matches).toHaveLength(4);  // Quarter-finals
            expect(rounds[3].matches).toHaveLength(2);  // Semi-finals
            expect(rounds[4].matches).toHaveLength(1);  // Finals
        });

        it('should populate first round with all countries', () => {
            const firstRound = tournament.bracket.rounds[0];
            const teams = [];
            firstRound.matches.forEach(match => {
                if (match.team1) teams.push(match.team1);
                if (match.team2) teams.push(match.team2);
            });
            expect(teams).toHaveLength(32);
        });

        it('should place player country in first match when set', () => {
            const playerCountry = countries[10];
            tournament.setPlayerCountry(playerCountry);
            tournament.bracket = tournament.generateBracket(countries);

            const firstMatch = tournament.bracket.rounds[0].matches[0];
            const inFirstMatch =
                firstMatch.team1?.id === playerCountry.id ||
                firstMatch.team2?.id === playerCountry.id;
            expect(inFirstMatch).toBe(true);
        });
    });

    describe('getCurrentMatch', () => {
        it('should return current match info', () => {
            const matchInfo = tournament.getCurrentMatch();
            expect(matchInfo).toHaveProperty('round');
            expect(matchInfo).toHaveProperty('team1');
            expect(matchInfo).toHaveProperty('team2');
            expect(matchInfo).toHaveProperty('isPlayerMatch');
        });

        it('should correctly identify player matches', () => {
            const playerCountry = tournament.bracket.rounds[0].matches[0].team1;
            tournament.setPlayerCountry(playerCountry);

            const matchInfo = tournament.getCurrentMatch();
            expect(matchInfo.isPlayerMatch).toBe(true);
        });
    });

    describe('recordMatchResult', () => {
        it('should set match winner', () => {
            const match = tournament.bracket.rounds[0].matches[0];
            const winner = match.team1;

            tournament.recordMatchResult(winner);

            expect(match.winner).toBe(winner);
        });

        it('should advance winner to next round', () => {
            const match = tournament.bracket.rounds[0].matches[0];
            const winner = match.team1;

            tournament.recordMatchResult(winner);

            const nextMatch = tournament.bracket.rounds[1].matches[0];
            expect(nextMatch.team1).toBe(winner);
        });

        it('should advance match index', () => {
            const initialMatch = tournament.currentMatch;
            const winner = tournament.bracket.rounds[0].matches[0].team1;

            tournament.recordMatchResult(winner);

            expect(tournament.currentMatch).toBe(initialMatch + 1);
        });

        it('should advance to next round when round complete', () => {
            const firstRound = tournament.bracket.rounds[0];

            // Complete all matches of first round
            for (let i = 0; i < firstRound.matches.length; i++) {
                const winner = firstRound.matches[i].team1;
                tournament.recordMatchResult(winner);
            }

            expect(tournament.currentRound).toBe(1);
            expect(tournament.currentMatch).toBe(0);
        });
    });

    describe('autoSimulateMatch', () => {
        it('should return a winner', () => {
            const winner = tournament.autoSimulateMatch();
            expect(winner).toBeTruthy();
            expect(winner).toHaveProperty('id');
        });

        it('should return null for invalid match', () => {
            // Create a match with null teams
            tournament.bracket.rounds[0].matches[0] = {
                team1: null,
                team2: null,
                winner: null
            };

            const winner = tournament.autoSimulateMatch();
            expect(winner).toBeNull();
        });

        it('should select one of the two teams', () => {
            const match = tournament.bracket.rounds[0].matches[0];
            const winner = tournament.autoSimulateMatch();

            const isValidWinner =
                winner.id === match.team1.id ||
                winner.id === match.team2.id;
            expect(isValidWinner).toBe(true);
        });
    });

    describe('isTournamentComplete', () => {
        it('should return false at start', () => {
            expect(tournament.isTournamentComplete()).toBe(false);
        });

        it('should return true after all rounds', () => {
            tournament.currentRound = 5;
            expect(tournament.isTournamentComplete()).toBe(true);
        });
    });

    describe('getChampion', () => {
        it('should return null if tournament not complete', () => {
            expect(tournament.getChampion()).toBeNull();
        });

        it('should return finals winner when complete', () => {
            // Simulate entire tournament
            while (!tournament.isTournamentComplete()) {
                tournament.autoSimulateMatch();
            }

            const champion = tournament.getChampion();
            expect(champion).toBeTruthy();
            expect(champion).toHaveProperty('id');
        });
    });

    describe('setPlayerCountry', () => {
        it('should set player country', () => {
            const playerCountry = countries[0];
            tournament.setPlayerCountry(playerCountry);
            expect(tournament.playerCountry).toBe(playerCountry);
        });
    });
});
