import ComputerItem from "./ComputerItem";
import "../css/ComputerList.css";

const ComputerList = ({ computers, onDelete }) => {
  return (
    <div className="table-container">
      <h3>Liste des ordinateurs</h3>
      <table>
        <thead>
          <tr>
            <th>Numéro de série</th>
            <th>Type</th>
            <th>OS</th>
            <th>Propriétaire</th>
            <th>État</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {computers.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: "center" }}>Aucun ordinateur ajouté.</td></tr>
          ) : (
            computers.map((computer) => (
              <ComputerItem key={computer.id} computer={computer} onDelete={onDelete} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ComputerList;