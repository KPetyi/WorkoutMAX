// Kiszámolja, hogy egy gyakorlat során összesen hány kilót mozgattál meg
const calculateTotalVolume = (weight, reps, sets) => {
    if (weight < 0 || reps < 0 || sets < 0) return 0; // Nincs negatív súly
    return weight * reps * sets;
};

module.exports = { calculateTotalVolume };