const { calculateOneRepMax } = require('../utils/oneRepMax');

describe('Egyismétléses Maximum (1RM) kalkulátor tesztek', () => {

    test('Helyesen számolja ki a maximumot az Epley-formula alapján', () => {
        // 100 kg 10 ismétlésnél kb. 133 kg maximumot jelent
        expect(calculateOneRepMax(100, 10)).toBe(133);
        // 80 kg 5 ismétlésnél kb. 93 kg maximumot jelent
        expect(calculateOneRepMax(80, 5)).toBe(93);
    });

    test('Ugyanazt a súlyt adja vissza, ha az ismétlésszám pontosan 1', () => {
        // Ha 120 kg-ba 1-et nyomott, akkor a maximuma is 120 kg
        expect(calculateOneRepMax(120, 1)).toBe(120);
    });

    test('Nullát ad vissza érvénytelen (0 vagy negatív) értékek esetén', () => {
        expect(calculateOneRepMax(0, 10)).toBe(0);
        expect(calculateOneRepMax(100, 0)).toBe(0);
        expect(calculateOneRepMax(-50, 5)).toBe(0);
    });
});