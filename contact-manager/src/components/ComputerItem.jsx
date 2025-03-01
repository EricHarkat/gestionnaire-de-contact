const ComputerItem = ({ computer, onDelete }) => {
  return (
    <tr>
      <td>{computer.serialNumber}</td>
      <td>{computer.type}</td>
      <td>{computer.operatingSystem}</td>
      <td>{computer.owner}</td>
      <td>{computer.state}</td>
      <td>
        <button 
          style={{
            background: "red", 
            color: "white", 
            border: "none", 
            padding: "5px 10px", 
            cursor: "pointer"
          }} 
          onClick={() => onDelete(computer._id)}
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
};
  
export default ComputerItem;
