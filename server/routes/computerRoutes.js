// routes/reservationRoutes.js
const express = require('express');
const Computer = require('../models/computerModel');
const router = express.Router();

// Ajouter un ordinateur
router.post('/', async (req, res) => {
  try {
    const newComputer = new Computer(req.body);
    await newComputer.save();
    res.status(201).json(newComputer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer tous les ordinateurs
router.get('/', async (req, res) => {
  try {
    const computers = await Computer.find();
    res.json(computers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un ordinateur
router.delete('/:id', async (req, res) => {
  try {
    await Computer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ordinateur supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
