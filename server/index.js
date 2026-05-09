const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
const authRoute = require('./routes/auth'); // Beolvassa az új fájlt
app.use('/api/auth', authRoute); // Beköti az /api/auth útvonalra

//Csatlakozás a MongoDB-hez
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB sikeresen csatlakoztatva!"))
    .catch((err) => console.log("Hiba az adatbázis csatlakozáskor:", err));

//Alap API végpont
app.get('/api/teszt', (req, res) => {
    res.json({ uzenet: "A szerver és az adatbázis is tökéletesen fut!" });
});

//Szerver indítása
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`A szerver fut a ${PORT}-es porton!`);
});