import ComputerItem from "./ComputerItem";

const ComputerList = ({ computers, onDelete }) => {
  return (
    <div style={{ marginTop: "20px", marginLeft: "20px", flex: 1 }}>
      <h3>Liste des ordinateurs</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
