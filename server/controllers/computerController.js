const Computer = require('../models/computerModel');

// Ajouter un ordinateur
exports.addComputer = async (req, res) => {
    try {
      const newComputer = new Computer(req.body);
      await newComputer.save();
      res.status(201).json(newComputer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Récupérer tous les ordinateurs avec la paginatiuon 
  exports.getComputer = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const totalComputers = await Computer.countDocuments();
        const computers = await Computer.find().skip(skip).limit(limit);

        res.json({
            computers,
            totalPages: Math.ceil(totalComputers / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les ordinateurs avec la paginatiuon 
exports.getAllComputer = async (req, res) => {
  try {
      const computers = await Computer.find();

      res.json({
          computers
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
  
  // Supprimer un ordinateur
  exports.deleteComputer = async (req, res) => {
    try {
      await Computer.findByIdAndDelete(req.params.id);
      res.json({ message: 'Ordinateur supprimé' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Mettre à jour un ordinateur par ID
exports.updateComputer = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedComputer = await Computer.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedComputer) {
            return res.status(404).json({ message: "Ordinateur non trouvé" });
        }

        res.json(updatedComputer);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};
