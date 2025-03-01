// routes/reservationRoutes.js
const express = require('express');
const { addComputer, getComputer, deleteComputer,  updateComputer, } = require('../controllers/computerController');
const router = express.Router();

// Ajouter un ordinateur
router.post('/', addComputer) 

// Récupérer tous les ordinateurs
router.get('/', getComputer) 

// Supprimer un ordinateur
router.delete('/:id',deleteComputer) 

// Mettre à jour un ordinateur
router.put('/:id', updateComputer);

module.exports = router;
