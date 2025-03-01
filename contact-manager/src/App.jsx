import { useState } from "react";
import AddComputerForm from "./components/AddComputerForm";
import ComputerList from "./components/ComputerList";

const App = () => {
  const [computers, setComputers] = useState([]);

  const onAddComputer = (computer) => {
    setComputers([...computers, computer]);
  };

  const deleteComputer = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet ordinateur ?")) {
      setComputers(computers.filter(computer => computer.id !== id));
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "900px", margin: "50px auto" }}>
      <div style={{ flex: 1, marginRight: "20px" }}>
        <h2>Ajouter un ordinateur</h2>
        <AddComputerForm onAddComputer={onAddComputer} />
      </div>
      
      <ComputerList computers={computers} onDelete={deleteComputer} />
    </div>
  );
};

export default App;
