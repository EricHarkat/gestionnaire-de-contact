// routes/reservationRoutes.js
const express = require('express');
const { addComputer, getComputer, deleteComputer,  updateComputer, getAllComputer } = require('../controllers/computerController');
const router = express.Router();

// Ajouter un ordinateur
router.post('/', addComputer) 

// Récupérer les ordinateurs avec la pqgination 
router.get('/', getComputer)

// Recuperer tous les ordinateur 
router.get('/allComputer', getAllComputer)

// Supprimer un ordinateur
router.delete('/:id',deleteComputer) 

// Mettre à jour un ordinateur
router.put('/:id', updateComputer);

module.exports = router;
