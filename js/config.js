/**
 * Global Game Configuration
 */
export const GAME_CONFIG = {
    // Game Rules
    TOTAL_NUMBERS: 90,
    NUMBERS_PER_CARD: 15,
    ROWS_PER_CARD: 3,
    COLS_PER_CARD: 9,
    NUMBERS_PER_ROW: 5,
    MINE_COUNT: 3,
    MAX_MINE_LIVES: 3,
    SAFE_HITS_TO_WIN: 12,

    // Timings (ms)
    AUTO_DRAW_INTERVAL: 4000, // 4 seconds
    COUNTDOWN_DURATION: 3, // 3 seconds

    // UI Constants
    DIFFICULTY: {
        EASY: 'easy',
        MEDIUM: 'medium',
        HARD: 'hard'
    }
};
