const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Workout = require('../models/Workout');

router.post('/', auth, async (req, res) => {
    try {
        const { title, exercises } = req.body;

        const newWorkout = new Workout({
            title,
            exercises,
            user: req.user.id
        });

        const workout = await newWorkout.save();
        res.json(workout);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Szerver hiba');
    }
});


router.get('/', auth, async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
        res.json(workouts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Szerver hiba');
    }
});

module.exports = router;