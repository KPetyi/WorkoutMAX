const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        //Kiszedjük az adatokat, amiket a React küldeni fog
        const { username, email, password } = req.body;

        //Ellenőrizzük, hogy van-e már ilyen felhasználó
        const existingUser = await User.findOne({ $or: [{ email: email }, { username: username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Ez az email vagy felhasználónév már foglalt!" });
        }

        //Jelszó titkosítása
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Új felhasználó létrehozása az adatbázisban
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        //Mentés
        await newUser.save();
        res.status(201).json({ message: "Sikeres regisztráció!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Szerverhiba történt a regisztráció során." });
    }
});

module.exports = router;