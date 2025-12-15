/**
 * Tournament Engine for managing 32-team single-elimination bracket
 * Handles bracket generation, match simulation, and player progression
 */
export class TournamentEngine {
    /**
     * Creates a new Tournament
     * @param {Array<Object>} countries32 - Array of 32 country objects
     */
    constructor(countries32) {
        this.countries = countries32;
        this.bracket = this.generateBracket(countries32);
        this.currentRound = 0;
        this.currentMatch = 0;
        this.playerCountry = null;
    }

    /**
     * Generates tournament bracket structure with 5 rounds
     * @param {Array<Object>} countries - Array of country objects
     * @returns {Object} Bracket object with rounds array
     */
    generateBracket(countries) {
        // Use countries in the order provided (from draw ceremony)
        // Do NOT shuffle - maintain the drawn order
        const orderedCountries = [...countries];

        // If player country is set, ensure it's in the first match (position 0 or 1)
        if (this.playerCountry) {
            const playerIndex = orderedCountries.findIndex(c => c.id === this.playerCountry.id);
            if (playerIndex > 1) {
                // Swap player to first position
                const temp = orderedCountries[0];
                orderedCountries[0] = this.playerCountry;
                orderedCountries[playerIndex] = temp;
            }
        }

        const rounds = [];

        // Round 1: Round of 32 (16 matches)
        const round1Matches = [];
        for (let i = 0; i < 32; i += 2) {
            round1Matches.push({
                team1: orderedCountries[i],
                team2: orderedCountries[i + 1],
                winner: null
            });
        }
        rounds.push({ name: 'Son 32', matches: round1Matches });

        // Round 2: Round of 16 (8 matches)
        const round2Matches = [];
        for (let i = 0; i < 8; i++) {
            round2Matches.push({ team1: null, team2: null, winner: null });
        }
        rounds.push({ name: 'Son 16', matches: round2Matches });

        // Round 3: Quarter Finals (4 matches)
        const round3Matches = [];
        for (let i = 0; i < 4; i++) {
            round3Matches.push({ team1: null, team2: null, winner: null });
        }
        rounds.push({ name: 'Çeyrek Final', matches: round3Matches });

        // Round 4: Semi Finals (2 matches)
        const round4Matches = [];
        for (let i = 0; i < 2; i++) {
            round4Matches.push({ team1: null, team2: null, winner: null });
        }
        rounds.push({ name: 'Yarı Final', matches: round4Matches });

        // Round 5: Final (1 match)
        rounds.push({
            name: 'Final',
            matches: [{ team1: null, team2: null, winner: null }]
        });

        return {
            rounds,
            currentRound: 0,
            currentMatch: 0
        };
    }

    /**
     * Creates matches for a round by pairing teams
     * @param {Array<Object>} countries - Countries to pair
     * @param {number} matchCount - Number of matches to create
     * @returns {Array<Object>} Array of match objects
     */
    createMatchesForRound(countries, matchCount) {
        const matches = [];
        for (let i = 0; i < matchCount; i++) {
            matches.push({
                team1: countries[i * 2],
                team2: countries[i * 2 + 1],
                winner: null
            });
        }
        return matches;
    }

    /**
     * Gets information about the current match
     * @returns {Object} Match info with teams, round, and player status
     */
    getCurrentMatch() {
        const round = this.bracket.rounds[this.currentRound];
        const match = round.matches[this.currentMatch];

        return {
            round: round.name,
            roundIndex: this.currentRound,
            matchIndex: this.currentMatch,
            totalMatches: round.matches.length,
            team1: match.team1,
            team2: match.team2,
            isPlayerMatch: this.isPlayerInMatch(match)
        };
    }

    /**
     * Checks if player's country is in the given match
     * @param {Object} match - Match object with team1 and team2
     * @returns {boolean} True if player is in this match
     */
    isPlayerInMatch(match) {
        if (!this.playerCountry) return false;
        return match.team1?.id === this.playerCountry.id ||
            match.team2?.id === this.playerCountry.id;
    }

    /**
     * Records match result and advances winner to next round
     * @param {Object} winnerCountry - The country that won the match
     */
    recordMatchResult(winnerCountry) {
        const currentRound = this.bracket.rounds[this.currentRound];
        const match = currentRound.matches[this.currentMatch];

        // Set winner
        match.winner = winnerCountry;

        // Advance winner to next round if not finals
        if (this.currentRound < this.bracket.rounds.length - 1) {
            const nextRound = this.bracket.rounds[this.currentRound + 1];
            const nextMatchIndex = Math.floor(this.currentMatch / 2);
            const nextMatch = nextRound.matches[nextMatchIndex];

            // Determine if winner goes to team1 or team2 slot
            if (this.currentMatch % 2 === 0) {
                nextMatch.team1 = winnerCountry;
            } else {
                nextMatch.team2 = winnerCountry;
            }
        }

        // Move to next match
        this.currentMatch++;

        // Check if round is complete
        if (this.currentMatch >= currentRound.matches.length) {
            this.currentRound++;
            this.currentMatch = 0;
        }
    }

    // Get next match to play
    getNextMatch() {
        // If tournament is over
        if (this.isTournamentComplete()) {
            return null;
        }

        // If we're in a round that needs auto-simulation
        const currentRound = this.bracket.rounds[this.currentRound];
        const match = currentRound.matches[this.currentMatch];

        // If player is not in this match, auto-simulate
        if (!this.isPlayerInMatch(match)) {
            return {
                ...this.getCurrentMatch(),
                needsAutoSimulation: true
            };
        }

        return this.getCurrentMatch();
    }

    /**
     * Auto-simulates a match with random winner
     * @returns {Object|null} Winner country or null if match invalid
     */
    autoSimulateMatch() {
        const match = this.bracket.rounds[this.currentRound].matches[this.currentMatch];

        // Validate both teams exist
        if (!match.team1 || !match.team2) {
            console.error('autoSimulateMatch: Invalid match - missing teams', match);
            // Skip this match and advance
            this.currentMatch++;
            if (this.currentMatch >= this.bracket.rounds[this.currentRound].matches.length) {
                this.currentRound++;
                this.currentMatch = 0;
            }
            return null;
        }

        const winner = Math.random() < 0.5 ? match.team1 : match.team2;
        this.recordMatchResult(winner);
        return winner;
    }

    /**
     * Checks if tournament has completed all rounds
     * @returns {boolean} True if tournament is over
     */
    isTournamentComplete() {
        return this.currentRound >= this.bracket.rounds.length;
    }

    /**
     * Gets the tournament champion
     * @returns {Object|null} Champion country object or null
     */
    getChampion() {
        if (!this.isTournamentComplete()) return null;
        const finalsMatch = this.bracket.rounds[4].matches[0];
        return finalsMatch.winner;
    }

    /**
     * Gets the medal winners (1st, 2nd, 3rd place)
     * @returns {Object} Object with gold, silver, bronze countries
     */
    getMedalists() {
        if (!this.isTournamentComplete()) return null;

        const finalsMatch = this.bracket.rounds[4].matches[0]; // Final
        const semiFinalsRound = this.bracket.rounds[3]; // Yarı Final

        // 1st place: Final winner
        const gold = finalsMatch.winner;

        // 2nd place: Final loser
        const silver = finalsMatch.team1?.id === gold?.id ? finalsMatch.team2 : finalsMatch.team1;

        // 3rd place: Semi-final losers (both get bronze in this system)
        const bronzeWinners = [];
        semiFinalsRound.matches.forEach(match => {
            if (match.winner) {
                const loser = match.team1?.id === match.winner.id ? match.team2 : match.team1;
                if (loser) bronzeWinners.push(loser);
            }
        });

        return {
            gold,
            silver,
            bronze: bronzeWinners
        };
    }

    /**
     * Sets the player's country
     * @param {Object} country - Player's country object
     */
    setPlayerCountry(country) {
        this.playerCountry = country;
    }

    // Check if player is still in tournament
    isPlayerEliminated() {
        if (!this.playerCountry) return true;

        // Check if player won their last match
        for (let r = this.currentRound - 1; r >= 0; r--) {
            const round = this.bracket.rounds[r];
            for (let match of round.matches) {
                if (match.team1?.id === this.playerCountry.id ||
                    match.team2?.id === this.playerCountry.id) {
                    return match.winner?.id !== this.playerCountry.id;
                }
            }
        }

        return false;
    }

    // Get full bracket for visualization
    getBracket() {
        return this.bracket;
    }

    // Get player's upcoming match (if they're still in)
    getPlayerNextMatch() {
        if (this.isPlayerEliminated() || !this.playerCountry) return null;

        // Search forward for player's next match
        for (let r = this.currentRound; r < this.bracket.rounds.length; r++) {
            const round = this.bracket.rounds[r];
            const startMatch = r === this.currentRound ? this.currentMatch : 0;

            for (let m = startMatch; m < round.matches.length; m++) {
                const match = round.matches[m];
                if (match.team1?.id === this.playerCountry.id ||
                    match.team2?.id === this.playerCountry.id) {
                    return {
                        round: round.name,
                        roundIndex: r,
                        matchIndex: m,
                        opponent: match.team1?.id === this.playerCountry.id ? match.team2 : match.team1
                    };
                }
            }
        }

        return null;
    }
}
