// Egyismétléses Maximum számoló Epley-formula alapján
const calculateOneRepMax = (weight, reps) => {
    // Ha a súly vagy az ismétlés 0 vagy negatív, nincs értelme számolni
    if (weight <= 0 || reps <= 0) return 0;

    // Ha 1 ismétlést csinált, akkor maga a súly a maximuma
    if (reps === 1) return weight;

    // Epley formula: Súly * (1 + Ismétlés / 30)
    return Math.round(weight * (1 + reps / 30));
};

module.exports = { calculateOneRepMax };