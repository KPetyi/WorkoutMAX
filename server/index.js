const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');
const Workout = require('./models/Workout');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Sikeres MongoDB csatlakozás!'))
    .catch(err => console.error('Hiba a csatlakozásnál:', err));

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'Nincs token' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Érvénytelen token' });
    }
};

app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'Email foglalt' });
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.json({ msg: 'Sikeres regisztráció' });
    } catch (err) { res.status(500).send('Szerver hiba'); }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Hibás adatok' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Hibás adatok' });
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) { res.status(500).send('Szerver hiba'); }
});

app.get('/api/auth/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) { res.status(500).send('Szerver hiba'); }
});

app.get('/api/workouts', auth, async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
        res.json(workouts);
    } catch (err) { res.status(500).send('Szerver hiba'); }
});

app.post('/api/workouts', auth, async (req, res) => {
    try {
        const { title, exercises } = req.body;
        const newWorkout = new Workout({ user: req.user.id, title, exercises });
        await newWorkout.save();
        res.json(newWorkout);
    } catch (err) { res.status(500).send('Szerver hiba'); }
});

app.put('/api/workouts/:id', auth, async (req, res) => {
    try {
        const { title, exercises } = req.body;
        const workout = await Workout.findByIdAndUpdate(
            req.params.id,
            { $set: { title, exercises } },
            { new: true }
        );
        res.json(workout);
    } catch (err) { res.status(500).send('Szerver hiba'); }
});

app.delete('/api/workouts/:id', auth, async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Törölve' });
    } catch (err) { res.status(500).send('Szerver hiba'); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`A szerver fut a ${PORT}-es porton`));