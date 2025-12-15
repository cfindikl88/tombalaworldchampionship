/**
 * Game Engine for Tombala (Turkish Bingo)
 * Handles card generation, number drawing, and game state
 */
export class GameEngine {
    /**
     * Creates a new GameEngine instance
     */
    constructor() {
        this.numbers = Array.from({ length: 90 }, (_, i) => i + 1);
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
        // Tombala card generation logic
        // 3 rows, 9 columns
        // Each row has 5 numbers
        // Columns have specific ranges

        const cardLayout = Array(3).fill(null).map(() => Array(9).fill(0));
        const colRanges = [
            [1, 9], [10, 19], [20, 29], [30, 39], [40, 49],
            [50, 59], [60, 69], [70, 79], [80, 90]
        ];

        // We need to ensure each row has exactly 5 numbers
        // And we don't pick the same number twice in the card

        // Simplified generation strategy for MVP:
        // 1. For each row, pick 5 distinct column indices
        // 2. For those columns, pick a number from that range
        // 3. Ensure no duplicates across rows in the same column (naturally handled if we track used)

        // Better strategy for validity:
        // 1. Generate a pool of numbers for each column range for this card
        // 2. Distribute them to rows

        // Let's go with a robust method:
        // Create 3 empty rows.
        // We need 15 numbers total.
        // Constraint: max 3 numbers per column (since 3 rows). In Tombala usually 1 or 2 per col.
        // Actually, Tombala cards are tricky.
        // Let's generate 15 valid numbers first, distributed across columns?
        // No, row constraint is strict: 5 per row.

        // Try this:
        // For each row: select 5 unique random columns (0-8).
        // For those cells, assign a random number from that column's range.
        // Ensure that number hasn't been used in previous rows for that column.

        const usedNumbers = new Set();

        for (let r = 0; r < 3; r++) {
            // Pick 5 columns
            const cols = this.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 5);

            // Sort columns to keep things ordered L-R
            cols.sort((a, b) => a - b);

            for (let c of cols) {
                const [min, max] = colRanges[c];
                let num;
                let attempts = 0;

                // Try to find unique random number
                do {
                    num = Math.floor(Math.random() * (max - min + 1)) + min;
                    attempts++;
                } while (usedNumbers.has(num) && attempts < 100);

                // Fallback: if still duplicate after 100 attempts, find next available in range
                if (usedNumbers.has(num)) {
                    let found = false;
                    for (let candidate = min; candidate <= max; candidate++) {
                        if (!usedNumbers.has(candidate)) {
                            num = candidate;
                            found = true;
                            break;
                        }
                    }
                    // If still no number found (shouldn't happen), skip this cell
                    if (!found) {
                        console.warn(`Could not generate unique number for column ${c}, row ${r}`);
                        continue;
                    }
                }

                usedNumbers.add(num);
                cardLayout[r][c] = num;
            }
        }

        // Validate that we have exactly 15 numbers
        const totalNumbers = usedNumbers.size;
        if (totalNumbers !== 15) {
            console.error(`Card generation failed: expected 15 numbers, got ${totalNumbers}`);
            // Retry card generation
            return this.createCard();
        }

        // Sort columns vertically - if a column has multiple numbers, arrange ascending
        for (let c = 0; c < 9; c++) {
            const numsInCol = [];
            for (let r = 0; r < 3; r++) {
                if (cardLayout[r][c] !== 0) {
                    numsInCol.push(cardLayout[r][c]);
                }
            }
            numsInCol.sort((a, b) => a - b);

            // Re-place them in the rows that had numbers
            let idx = 0;
            for (let r = 0; r < 3; r++) {
                if (cardLayout[r][c] !== 0) {
                    cardLayout[r][c] = numsInCol[idx++];
                }
            }
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
    assignMines(card, count = 3) {
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

        if (mineHits >= 3) return 'KNOCKOUT';
        if (safeHits >= 12) return 'WIN';
        return null;
    }
}
