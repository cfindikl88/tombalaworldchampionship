/**
 * Game Engine for Tombala (Turkish Bingo)
 * Handles card generation, number drawing, and game state
 */
import { GAME_CONFIG } from './config.js';

export class GameEngine {
    /**
     * Creates a new GameEngine instance
     */
    constructor() {
        this.numbers = Array.from({ length: GAME_CONFIG.TOTAL_NUMBERS }, (_, i) => i + 1);
        this.drawnNumbers = [];
        this.cards = [];
    }

    /**
     * Shuffles an array using Fisher-Yates algorithm
     * @param {Array} array - Array to shuffle (modified in place)
     * @returns {Array} The shuffled array
     */
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Draws a random number from the remaining pool
     * @returns {number|null} The drawn number, or null if no numbers remain
     */
    drawNumber() {
        if (this.numbers.length === 0) return null;

        // Pick a random index from remaining numbers
        const randomIndex = Math.floor(Math.random() * this.numbers.length);
        const number = this.numbers[randomIndex];

        // Remove from available, add to drawn
        this.numbers.splice(randomIndex, 1);
        this.drawnNumbers.push(number);

        return number;
    }

    /**
     * Creates a valid Tombala card (3 rows x 9 columns, 5 numbers per row)
     * Each column represents a decade (1-9, 10-19, ..., 80-90)
     * Numbers in the same column are sorted vertically
     * @returns {Array<Array<number>>} 3x9 array where 0 represents empty cells
     * @throws {Error} If unable to generate valid card after retries
     */
    createCard() {
        const cardLayout = Array(GAME_CONFIG.ROWS_PER_CARD).fill(null).map(() => Array(GAME_CONFIG.COLS_PER_CARD).fill(0));
        const colRanges = [
            [1, 9], [10, 19], [20, 29], [30, 39], [40, 49],
            [50, 59], [60, 69], [70, 79], [80, 90]
        ];

        // 1. Distribute 15 numbers across 9 columns
        // Rules:
        // - Each row must have exactly 5 numbers.
        // - Each column must have at least 1 number.
        // - Max 3 numbers per column (since 3 rows).

        // Step 1: Assign 1 number to each of the 9 columns (ensures coverage)
        let colCounts = Array(9).fill(1);

        // Step 2: Distribute remaining 6 numbers (15 total - 9 used) randomly
        let remaining = GAME_CONFIG.NUMBERS_PER_CARD - 9;
        while (remaining > 0) {
            const randomCol = Math.floor(Math.random() * 9);
            if (colCounts[randomCol] < 2) { // Allow up to 2 for now to spread evenly, max 3 is hard limit
                colCounts[randomCol]++;
                remaining--;
            }
        }

        // Step 3: Assign actual numbers to columns
        const colNumbers = [];
        for (let c = 0; c < 9; c++) {
            const count = colCounts[c];
            const [min, max] = colRanges[c];
            const available = [];
            for (let n = min; n <= max; n++) available.push(n);

            // Shuffle available numbers
            for (let i = available.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [available[i], available[j]] = [available[j], available[i]];
            }

            // Take the needed amount
            const selected = available.slice(0, count).sort((a, b) => a - b);
            colNumbers.push(selected);
        }

        // Step 4: Place numbers into rows
        // This is a constraint satisfaction problem. 
        // We need 5 items per row. 
        // Simple heuristic: Fill rows one by one with available column numbers.

        const rowCounts = [0, 0, 0];

        // Helper to find valid row for a number in a specific column
        const placeNumber = (colIndex, number) => {
            // Try to place in a row that:
            // 1. Has space (< 5 numbers)
            // 2. Doesn't have a number in this column yet
            // 3. Maintains vertical order (if col has multiple nums, lower num goes to higher row index?? No, usually top to bottom is arbitrary or sorted)
            // Actually standard tombala: columns are sorted top-down if multiple. 
            // So if col 0 has [3, 8], row 0 gets 3, row 1 gets 8 (or row 2).

            // Let's rely on the fact we sorted colNumbers[c]. 
            // We just need to assign each number in colNumbers[c] to a distinct row 
            // such that row counts don't exceed 5.

            // We have to decide which rows these numbers go to.
            // If a column has 3 numbers, they MUST go to rows 0, 1, 2.
            // If 2 numbers, they go to distinct rows.
            // If 1 number, goes to any row.

            // Priority: Columns with 3 numbers fixes rows. Columns with 2 numbers constraints.
            return;
        };

        // Improved placement strategy:
        // Create an array of column indices [0..8]
        // Sort them by how many numbers they have (descending). 
        // Harder constraints first.

        const colIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort((a, b) => colNumbers[b].length - colNumbers[a].length);

        // Track which row has a number at which column
        // We can just set cardLayout directly.

        for (let c of colIndices) {
            const nums = colNumbers[c];
            const count = nums.length;

            // We need 'count' distinct rows.
            // We should pick rows that have the most space left?
            // Or try to balance?

            let possibleRows = [0, 1, 2].filter(r => rowCounts[r] < 5);

            // If we have 3 numbers, we need rows 0,1,2.
            // If valid rows < count, we have a problem (backtracking needed? or just retry entire card).
            // Since we distribution 6 extra numbers, it's unlikely to paint into a corner if we randomize well, 
            // but strict logic is better.

            if (count === 3) {
                // Must take 0, 1, 2
                cardLayout[0][c] = nums[0]; rowCounts[0]++;
                cardLayout[1][c] = nums[1]; rowCounts[1]++;
                cardLayout[2][c] = nums[2]; rowCounts[2]++;
            } else {
                // Randomly select 'count' rows from valid 'possibleRows'
                // Weighted by remaining space?

                // Shuffle possibleRows
                for (let i = possibleRows.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [possibleRows[i], possibleRows[j]] = [possibleRows[j], possibleRows[i]];
                }

                // Take first 'count' rows
                if (possibleRows.length < count) {
                    // Generation failed for this specific layout, extremely rare with this heuristic 
                    // but helps to just recursively retry from scratch which is fast.
                    return this.createCard();
                }

                for (let k = 0; k < count; k++) {
                    const r = possibleRows[k];
                    cardLayout[r][c] = nums[k];
                    rowCounts[r]++;
                }
            }
        }

        // Final verification
        if (rowCounts.some(c => c !== 5)) {
            return this.createCard();
        }

        return cardLayout;
    }

    /**
     * Creates a strategic card based on difficulty
     * @param {string} strategy - 'early-game', 'balanced', or 'late-game'
     * @returns {Array<Array<number>>} Strategic 3x9 card array
     */
    createCardWithStrategy(strategy = 'balanced') {
        if (strategy === 'balanced') {
            return this.createCard(); // Normal random card
        }

        // Try to create an optimized card
        const maxAttempts = 50;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const card = this.createCard();

            if (strategy === 'early-game') {
                if (this.isEarlyGameCard(card)) {
                    return card;
                }
            } else if (strategy === 'late-game') {
                if (this.isLateGameCard(card)) {
                    return card;
                }
            }
        }

        // If couldn't create optimal card, return normal one
        return this.createCard();
    }

    /**
     * Checks if card has more early numbers (1-40)
     * @param {Array<Array<number>>} card - 3x9 card array
     * @returns {boolean} True if card favors early game
     */
    isEarlyGameCard(card) {
        const numbers = card.flat().filter(n => n !== 0);
        const earlyNumbers = numbers.filter(n => n <= 40);
        return earlyNumbers.length >= 9; // At least 60% early numbers
    }

    /**
     * Checks if card has more late numbers (51-90)
     * @param {Array<Array<number>>} card - 3x9 card array
     * @returns {boolean} True if card favors late game
     */
    isLateGameCard(card) {
        const numbers = card.flat().filter(n => n !== 0);
        const lateNumbers = numbers.filter(n => n >= 51);
        return lateNumbers.length >= 9; // At least 60% late numbers
    }

    /**
     * Checks the completion status of a card
     * @param {Array<Array<number>>} card - 3x9 card array
     * @param {Set<number>} drawnNumbersSet - Set of drawn numbers for O(1) lookup
     * @returns {string|null} "TOMBALA" (3 rows), "2. ÇINKO" (2 rows), "1. ÇINKO" (1 row), or null
     */
    checkCardStatus(card, drawnNumbersSet) {
        // card is 3x9 array
        // Check rows
        let rowsCompleted = 0;

        for (let row of card) {
            const numbersInRow = row.filter(n => n !== 0);
            const markedCount = numbersInRow.filter(n => drawnNumbersSet.has(n)).length;
            if (markedCount === 5) {
                rowsCompleted++;
            }
        }

        // Return status string
        if (rowsCompleted === 3) return "TOMBALA";
        if (rowsCompleted === 2) return "2. ÇINKO";
        if (rowsCompleted === 1) return "1. ÇINKO";
        return null;
    }
    /**
     * Randomly assigns mines to existing numbers on the card
     * @param {Array<Array<number>>} card - The 3x9 card array
     * @param {number} count - Number of mines to assign (default 3)
     * @returns {Set<number>} Set of numbers that are mines
     */
    assignMines(card, count = GAME_CONFIG.MINE_COUNT) {
        // Collect all valid numbers from the card
        const validNumbers = [];
        card.flat().forEach(num => {
            if (num !== 0) validNumbers.push(num);
        });

        const mines = new Set();
        const shuffled = this.shuffle([...validNumbers]);

        // Take the first 'count' numbers as mines
        for (let i = 0; i < count && i < shuffled.length; i++) {
            mines.add(shuffled[i]);
        }

        return mines;
    }

    /**
     * Checks the game state for win/loss conditions
     * @param {Array<Array<number>>} card - The 3x9 card array
     * @param {Set<number>} mines - Set of mine numbers
     * @param {Array<number>} drawnNumbers - Array of drawn numbers
     * @returns {string|null} 'KNOCKOUT', 'WIN', or null
     */
    checkGameState(card, mines, drawnNumbers) {
        const drawnSet = new Set(drawnNumbers);
        const allNumbers = card.flat().filter(n => n !== 0);

        let mineHits = 0;
        let safeHits = 0;

        allNumbers.forEach(n => {
            if (drawnSet.has(n)) {
                if (mines.has(n)) {
                    mineHits++;
                } else {
                    safeHits++;
                }
            }
        });

        if (mineHits >= GAME_CONFIG.MAX_MINE_LIVES) return 'KNOCKOUT';
        if (safeHits >= GAME_CONFIG.SAFE_HITS_TO_WIN) return 'WIN';
        return null;
    }
}
