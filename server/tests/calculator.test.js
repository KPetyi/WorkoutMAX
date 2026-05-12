const { calculateTotalVolume } = require('../utils/calculator');

describe('Edzés volumen kalkulátor tesztek', () => {

    // 1. Eredeti: Normál működés
    test('Helyesen kiszámolja a teljes volument (Súly * Ismétlés * Sorozat)', () => {
        expect(calculateTotalVolume(100, 10, 4)).toBe(4000);
        expect(calculateTotalVolume(50, 8, 3)).toBe(1200);
    });

    // 2. Eredeti: Negatív számok szűrése
    test('Nullát ad vissza, ha bármelyik érték negatív (Hibakezelés)', () => {
        expect(calculateTotalVolume(-10, 10, 4)).toBe(0);
        expect(calculateTotalVolume(100, -5, 4)).toBe(0);
    });

    // 3. ÚJ: Nulla értékek kezelése
    test('Nullát ad vissza, ha valamelyik paraméter 0 (pl. 0 ismétlés)', () => {
        expect(calculateTotalVolume(100, 0, 4)).toBe(0); // 0 ismétlés
        expect(calculateTotalVolume(0, 10, 3)).toBe(0);  // 0 kg súly
    });

    // 4. ÚJ: Törtszámok (tizedesek) kezelése
    test('Helyesen számol törtszámok (pl. 12.5 kg-os súlyzó) esetén is', () => {
        expect(calculateTotalVolume(12.5, 10, 4)).toBe(500);
        expect(calculateTotalVolume(7.5, 12, 3)).toBe(270);
    });
});