const mongoose = require('mongoose');

// Itt határozzuk meg, milyen adatai lesznek egy felhasználónak
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Nem lehet két azonos nevű felhasználó
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true // A jelszó kötelező
    }
}, { timestamps: true }); // Ez automatikusan elmenti

module.exports = mongoose.model('User', userSchema);