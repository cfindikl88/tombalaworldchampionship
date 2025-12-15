import { describe, it, expect, beforeEach } from 'vitest';
import { GameEngine } from '../js/GameEngine.js';

describe('GameEngine', () => {
    let engine;

    beforeEach(() => {
        engine = new GameEngine();
    });

    describe('constructor', () => {
        it('should initialize with 90 numbers', () => {
            expect(engine.numbers).toHaveLength(90);
            expect(engine.drawnNumbers).toHaveLength(0);
        });

        it('should have numbers from 1 to 90', () => {
            expect(engine.numbers).toContain(1);
            expect(engine.numbers).toContain(90);
            expect(Math.min(...engine.numbers)).toBe(1);
            expect(Math.max(...engine.numbers)).toBe(90);
        });
    });

    describe('shuffle', () => {
        it('should maintain array length', () => {
            const arr = [1, 2, 3, 4, 5];
            const shuffled = engine.shuffle([...arr]);
            expect(shuffled).toHaveLength(5);
        });

        it('should contain same elements', () => {
            const arr = [1, 2, 3, 4, 5];
            const shuffled = engine.shuffle([...arr]);
            expect(shuffled.sort()).toEqual(arr);
        });
    });

    describe('drawNumber', () => {
        it('should return a number between 1 and 90', () => {
            const num = engine.drawNumber();
            expect(num).toBeGreaterThanOrEqual(1);
            expect(num).toBeLessThanOrEqual(90);
        });

        it('should remove number from pool', () => {
            const initialLength = engine.numbers.length;
            engine.drawNumber();
            expect(engine.numbers).toHaveLength(initialLength - 1);
        });

        it('should add number to drawnNumbers', () => {
            const num = engine.drawNumber();
            expect(engine.drawnNumbers).toContain(num);
        });

        it('should return null when no numbers remain', () => {
            // Draw all 90 numbers
            for (let i = 0; i < 90; i++) {
                engine.drawNumber();
            }
            expect(engine.numbers).toHaveLength(0);
            expect(engine.drawNumber()).toBeNull();
        });

        it('should not draw same number twice', () => {
            const drawn = new Set();
            for (let i = 0; i < 90; i++) {
                const num = engine.drawNumber();
                expect(drawn.has(num)).toBe(false);
                drawn.add(num);
            }
        });
    });

    describe('createCard', () => {
        it('should return 3x9 array', () => {
            const card = engine.createCard();
            expect(card).toHaveLength(3);
            card.forEach(row => {
                expect(row).toHaveLength(9);
            });
        });

        it('should have exactly 15 numbers total', () => {
            const card = engine.createCard();
            const numbers = card.flat().filter(n => n !== 0);
            expect(numbers).toHaveLength(15);
        });

        it('should have 5 numbers per row', () => {
            const card = engine.createCard();
            card.forEach(row => {
                const numbers = row.filter(n => n !== 0);
                expect(numbers).toHaveLength(5);
            });
        });

        it('should have no duplicate numbers', () => {
            const card = engine.createCard();
            const numbers = card.flat().filter(n => n !== 0);
            const uniqueNumbers = new Set(numbers);
            expect(uniqueNumbers.size).toBe(numbers.length);
        });

        it('should place numbers in correct column ranges', () => {
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

        it('should sort numbers vertically in columns', () => {
            const card = engine.createCard();
            for (let c = 0; c < 9; c++) {
                const colNumbers = [];
                for (let r = 0; r < 3; r++) {
                    if (card[r][c] !== 0) {
                        colNumbers.push(card[r][c]);
                    }
                }
                // Check if sorted
                const sorted = [...colNumbers].sort((a, b) => a - b);
                expect(colNumbers).toEqual(sorted);
            }
        });
    });

    describe('checkCardStatus', () => {
        it('should return null for empty card', () => {
            const card = engine.createCard();
            const drawnSet = new Set();
            expect(engine.checkCardStatus(card, drawnSet)).toBeNull();
        });

        it('should return "1. ÇINKO" for 1 completed row', () => {
            const card = [
                [1, 0, 20, 0, 40, 0, 60, 0, 80],
                [0, 10, 0, 30, 0, 50, 0, 70, 90],
                [2, 0, 21, 0, 41, 0, 61, 0, 81]
            ];
            const drawnSet = new Set([1, 20, 40, 60, 80]);
            expect(engine.checkCardStatus(card, drawnSet)).toBe('1. ÇINKO');
        });

        it('should return "2. ÇINKO" for 2 completed rows', () => {
            const card = [
                [1, 0, 20, 0, 40, 0, 60, 0, 80],
                [0, 10, 0, 30, 0, 50, 0, 70, 90],
                [2, 0, 21, 0, 41, 0, 61, 0, 81]
            ];
            const drawnSet = new Set([1, 20, 40, 60, 80, 10, 30, 50, 70, 90]);
            expect(engine.checkCardStatus(card, drawnSet)).toBe('2. ÇINKO');
        });

        it('should return "TOMBALA" for all 3 completed rows', () => {
            const card = [
                [1, 0, 20, 0, 40, 0, 60, 0, 80],
                [0, 10, 0, 30, 0, 50, 0, 70, 90],
                [2, 0, 21, 0, 41, 0, 61, 0, 81]
            ];
            const drawnSet = new Set([1, 20, 40, 60, 80, 10, 30, 50, 70, 90, 2, 21, 41, 61, 81]);
            expect(engine.checkCardStatus(card, drawnSet)).toBe('TOMBALA');
        });
    });


    describe('checkGameState', () => {
        let card;
        let mines;

        beforeEach(() => {
            // Standard card for testing
            card = [
                [1, 10, 20, 30, 40, 50, 60, 70, 80],
                [2, 11, 21, 31, 41, 51, 61, 71, 81],
                [3, 12, 22, 32, 42, 52, 62, 72, 82]
            ];
            // Mines: 1, 2, 3
            mines = new Set([1, 2, 3]);
        });

        it('should return null if no numbers drawn', () => {
            expect(engine.checkGameState(card, mines, [])).toBeNull();
        });

        it('should return null for less than 3 mine hits', () => {
            // 2 mine hits: 1, 2
            expect(engine.checkGameState(card, mines, [1, 2])).toBeNull();
        });

        it('should return KNOCKOUT for 3 mine hits', () => {
            // 3 mine hits: 1, 2, 3
            expect(engine.checkGameState(card, mines, [1, 2, 3])).toBe('KNOCKOUT');
        });

        it('should return KNOCKOUT for more than 3 mine hits', () => {
            mines.add(10);
            expect(engine.checkGameState(card, mines, [1, 2, 3, 10])).toBe('KNOCKOUT');
        });

        it('should return WIN for 12 safe hits', () => {
            // 12 safe hits (non-mines)
            // Mines are 1, 2, 3.
            const safeHits = [
                10, 20, 30, 40, 50, 60, 70, 80, // 8
                11, 21, 31, 41                 // +4 = 12
            ];
            expect(engine.checkGameState(card, mines, safeHits)).toBe('WIN');
        });
    });
});
