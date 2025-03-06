import { useState, useEffect } from "react";
import axios from "axios";
import AddComputerForm from "./components/AddComputerForm";
import ComputerList from "./components/ComputerList";
import "./css/App.css";

const App = () => {
  //initialisation de la variable computer en Table vide
  // setComputer sert à modifier l'etat de computers add, delete, update 
  const [computers, setComputers] = useState([]);

  // pour rechercher par numero de serie 
  const [searchSerial, setSearchSerial] = useState("");


  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Nombre d'éléments par page

  //sera exécutée après chaque rendu du composant(premier argument la callback)
  //tableau de dépendances (deuxieme argument). Ce tableau permet de contrôler quand l'effet doit être exécuté.
  // Si le tableau est vide [], l'effet sera exécuté une seule fois après le premier rendu (comme componentDidMount).
  // Si le tableau contient des variables, l'effet sera exécuté chaque fois qu'une de ces variables change.
  useEffect(() => {
    axios.get(`http://localhost:5000/computers?page=${page}&limit=${limit}&serialNumber=${searchSerial}`)
      .then(res => {
        setComputers(res.data.computers);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error(err));
  }, [page, searchSerial]);

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

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="container">
      <div className="form-section">
        <h2>Ajouter un ordinateur</h2>
        <AddComputerForm onAddComputer={onAddComputer} />
      </div>

      <div className="table-section">
        <h2>Parc informatique</h2>
        <input
          type="text"
          placeholder="Rechercher par numéro de série..."
          value={searchSerial}
          onChange={(e) => setSearchSerial(e.target.value)}
          className="search-bar"
        />

        <ComputerList computers={computers} onDelete={deleteComputer} />

        <div className="pagination">
          <button onClick={handlePrevious} disabled={page === 1}>Précédent</button>
          <span>Page {page} sur {totalPages}</span>
          <button onClick={handleNext} disabled={page === totalPages}>Suivant</button>
        </div>
      </div>
    </div>
  );
};

export default App;
