import { useState, useEffect  } from "react";
import axios from "axios";
import AddComputerForm from "./components/AddComputerForm";
import ComputerList from "./components/ComputerList";
import "./css/App.css";

const App = () => {
  //initialisation de ma variable computer en Table vide
  // setComputer sert à modifier l'etat de computers add, delete, update 
  const [computers, setComputers] = useState([]);

  // pour rechercher par numero de serie 
  const [searchSerial, setSearchSerial] = useState("");

  //sera exécutée après chaque rendu du composant(premier argument la callback)
  //tableau de dépendances (deuxieme argument). Ce tableau permet de contrôler quand l'effet doit être exécuté.
  // Si le tableau est vide [], l'effet sera exécuté une seule fois après le premier rendu (comme componentDidMount).
  // Si le tableau contient des variables, l'effet sera exécuté chaque fois qu'une de ces variables change.
  useEffect(() => {
    axios.get("http://localhost:5000/computers")
      .then(res => setComputers(res.data))
      .catch(err => console.error(err));
  }, []);

  const onAddComputer = (computer) => {
    axios.post("http://localhost:5000/computers", computer)
      .then(res => setComputers([...computers, res.data]))
      .catch(err => console.error(err));
  };


  const deleteComputer = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet ordinateur ?")) {
      axios.delete(`http://localhost:5000/computers/${id}`)
        .then(() => setComputers(computers.filter(computer => computer._id !== id)))
        .catch(err => console.error(err));
    }
  };

  // Filtrage des ordinateurs en fonction du numéro de série recherché
  const filteredComputers = computers.filter(computer =>
    computer.serialNumber.toLowerCase().includes(searchSerial.toLowerCase())
  );


  return (
    <div className="container">
      {/* Formulaire à gauche */}
      <div className="form-section">
        <h2>Ajouter un ordinateur</h2>
        <AddComputerForm onAddComputer={onAddComputer} />
      </div>

      {/* Liste des ordinateurs à droite */}
      <div className="table-section">
        <h2>Parc informatique</h2>
        
        {/* Barre de recherche au-dessus du tableau */}
        <input
          type="text"
          placeholder="Rechercher par numéro de série..."
          value={searchSerial}
          onChange={(e) => setSearchSerial(e.target.value)}
          className="search-bar"
        />

        {/* Affichage du tableau filtré */}
        <ComputerList computers={filteredComputers} onDelete={deleteComputer} />
      </div>
    </div>
  );
};

export default App;
