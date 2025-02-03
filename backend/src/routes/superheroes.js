const express = require('express');
const { getAllSuperheroes, createSuperhero } = require('../controllers/superheroController');

const router = express.Router();

router.get('/', getAllSuperheroes);
router.post('/', createSuperhero);

module.exports = router;
