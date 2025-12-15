import { describe, it, expect, beforeEach } from 'vitest';
import { GameEngine } from '../js/GameEngine.js';
import { GAME_CONFIG } from '../js/config.js';

describe('GameEngine', () => {
    let engine;

    beforeEach(() => {
        engine = new GameEngine();
    });

    it('should generate a valid card with correct dimensions', () => {
        const card = engine.createCard();
        expect(card.length).toBe(GAME_CONFIG.ROWS_PER_CARD);
        expect(card[0].length).toBe(GAME_CONFIG.COLS_PER_CARD);
    });

    it('should have exactly 5 numbers per row', () => {
        const card = engine.createCard();
        card.forEach(row => {
            const count = row.filter(n => n !== 0).length;
            expect(count).toBe(5);
        });
    });

    it('should have 15 numbers total', () => {
        const card = engine.createCard();
        const total = card.flat().filter(n => n !== 0).length;
        expect(total).toBe(15);
    });

    it('should not have duplicate numbers', () => {
        const card = engine.createCard();
        const numbers = card.flat().filter(n => n !== 0);
        const unique = new Set(numbers);
        expect(unique.size).toBe(numbers.length);
    });

    it('should respect column ranges', () => {
        const card = engine.createCard();
        const colRanges = [
            [1, 9], [10, 19], [20, 29], [30, 39], [40, 49],
            [50, 59], [60, 69], [70, 79], [80, 90]
        ];

        for (let c = 0; c < 9; c++) {
            for (let r = 0; r < 3; r++) {
                const num = card[r][c];
                if (num !== 0) {
                    const [min, max] = colRanges[c];
                    expect(num).toBeGreaterThanOrEqual(min);
                    expect(num).toBeLessThanOrEqual(max);
                }
            }
        }
    });
});
