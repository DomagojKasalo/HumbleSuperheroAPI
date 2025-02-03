const Superhero = require('../models/Superhero');
const superheroes = require('../data/superheroes');

// Get all superheroes sorted by humility score
const getAllSuperheroes = (req, res) => {
    const sortedHeroes = superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
    res.json(sortedHeroes);
};

// Create a new superhero
const createSuperhero = (req, res) => {
    const { name, superpower, humilityScore } = req.body;

    if (!name || !superpower || humilityScore === undefined) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    if (typeof humilityScore !== 'number' || humilityScore < 1 || humilityScore > 10) {
        return res.status(400).json({ error: 'Humility score must be a number between 1 and 10.' });
    }

    const newHero = new Superhero(name, superpower, humilityScore);
    superheroes.push(newHero);
    res.status(201).json(newHero);
};

module.exports = { getAllSuperheroes, createSuperhero };
