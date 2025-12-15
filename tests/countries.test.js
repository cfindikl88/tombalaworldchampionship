import { describe, it, expect } from 'vitest';
import { COUNTRIES, CONTINENT_QUOTAS, getRandomCountries, getCountryById } from '../js/countries.js';

describe('countries.js', () => {
    describe('COUNTRIES', () => {
        it('should have 128 countries', () => {
            expect(COUNTRIES).toHaveLength(128);
        });

        it('should have all required fields', () => {
            COUNTRIES.forEach(country => {
                expect(country).toHaveProperty('id');
                expect(country).toHaveProperty('name');
                expect(country).toHaveProperty('flag');
                expect(country).toHaveProperty('continent');
                expect(country).toHaveProperty('colors');
                expect(country.colors).toHaveProperty('primary');
                expect(country.colors).toHaveProperty('secondary');
                expect(country.colors).toHaveProperty('accent');
            });
        });

        it('should have unique IDs', () => {
            const ids = COUNTRIES.map(c => c.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(COUNTRIES.length);
        });

        it('should have valid continent values', () => {
            const validContinents = ['Europe', 'Asia', 'Africa', 'Americas', 'Oceania'];
            COUNTRIES.forEach(country => {
                expect(validContinents).toContain(country.continent);
            });
        });
    });

    describe('CONTINENT_QUOTAS', () => {
        it('should sum to 32', () => {
            const total = Object.values(CONTINENT_QUOTAS).reduce((a, b) => a + b, 0);
            expect(total).toBe(32);
        });

        it('should have all continent entries', () => {
            expect(CONTINENT_QUOTAS).toHaveProperty('Europe');
            expect(CONTINENT_QUOTAS).toHaveProperty('Asia');
            expect(CONTINENT_QUOTAS).toHaveProperty('Africa');
            expect(CONTINENT_QUOTAS).toHaveProperty('Americas');
            expect(CONTINENT_QUOTAS).toHaveProperty('Oceania');
        });
    });

    describe('getRandomCountries', () => {
        it('should return requested number of countries', () => {
            const countries = getRandomCountries(10);
            expect(countries).toHaveLength(10);
        });

        it('should return 32 countries by default', () => {
            const countries = getRandomCountries();
            expect(countries).toHaveLength(32);
        });

        it('should respect continent quotas for 32 countries', () => {
            const countries = getRandomCountries(32);

            const counts = {
                Europe: 0,
                Asia: 0,
                Africa: 0,
                Americas: 0,
                Oceania: 0
            };

            countries.forEach(country => {
                counts[country.continent]++;
            });

            expect(counts.Europe).toBe(CONTINENT_QUOTAS.Europe);
            expect(counts.Asia).toBe(CONTINENT_QUOTAS.Asia);
            expect(counts.Africa).toBe(CONTINENT_QUOTAS.Africa);
            expect(counts.Americas).toBe(CONTINENT_QUOTAS.Americas);
            expect(counts.Oceania).toBe(CONTINENT_QUOTAS.Oceania);
        });

        it('should include first selected country', () => {
            const turkey = COUNTRIES.find(c => c.id === 'TUR');
            const countries = getRandomCountries(32, turkey);

            expect(countries).toContain(turkey);
            expect(countries).toHaveLength(32);
        });

        it('should adjust quota for first selected country continent', () => {
            const turkey = COUNTRIES.find(c => c.id === 'TUR'); // Europe
            const countries = getRandomCountries(32, turkey);

            const europeCounts = countries.filter(c => c.continent === 'Europe').length;
            expect(europeCounts).toBe(CONTINENT_QUOTAS.Europe);
        });

        it('should not include duplicates', () => {
            const countries = getRandomCountries(32);
            const ids = countries.map(c => c.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(countries.length);
        });

        it('should randomize order', () => {
            const selection1 = getRandomCountries(32);
            const selection2 = getRandomCountries(32);

            const ids1 = selection1.map(c => c.id).join(',');
            const ids2 = selection2.map(c => c.id).join(',');

            // Extremely unlikely to be same order if truly random
            expect(ids1).not.toBe(ids2);
        });
    });

    describe('getCountryById', () => {
        it('should find country by ID', () => {
            const turkey = getCountryById('TUR');
            expect(turkey).toBeTruthy();
            expect(turkey.id).toBe('TUR');
            expect(turkey.name).toBe('Türkiye');
        });

        it('should return undefined for invalid ID', () => {
            const country = getCountryById('INVALID');
            expect(country).toBeUndefined();
        });

        it('should find all test countries', () => {
            const testIds = ['USA', 'CHN', 'BRA', 'GER', 'AUS'];
            testIds.forEach(id => {
                const country = getCountryById(id);
                expect(country).toBeTruthy();
                expect(country.id).toBe(id);
            });
        });
    });
});
