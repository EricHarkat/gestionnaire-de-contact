import { useState, useEffect } from "react";
import axios from "axios";
import "../css/AddComputerForm.css";

const AddComputerForm = ({ onAddComputer }) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [existingSerialNumbers, setExistingSerialNumbers] = useState([]); // Liste des numéros existants
  const [useCustomSerial, setUseCustomSerial] = useState(false);


  const [type, setType] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [owner, setOwner] = useState("");
  const [state, setState] = useState("");
  const [date, setDate] = useState("");
  const [stateDetails, setStateDetails] = useState("")
  const [errors, setErrors] = useState({});

  const types = ["Serie X", "Serie T", "Mac","Dell"];
  const states = ["Neuf", "Bon état", "Hors service"];
  const operatingSystems = ["Windows 11 Famille", "Windows 11 Pro", "Linux", "macOS"];


  useEffect(() => {
    axios.get("http://localhost:5000/computers")
      .then(response => setExistingSerialNumbers(response.data.map(computer => computer.serialNumber)))
      .catch(error => console.error("Erreur de chargement des numéros de série:", error));
  }, []);
  

  const validateForm = () => {
    const newErrors = {};

    if (!serialNumber.trim()) newErrors.serialNumber = "Le numéro de série est requis.";
    if (!type) newErrors.type = "Veuillez sélectionner un type.";
    if (!operatingSystem) newErrors.operatingSystem = "Veuillez sélectionner un OS.";
    if (!owner.trim()) newErrors.owner = "Le propriétaire est requis.";
    if (!state) newErrors.state = "Veuillez sélectionner un état.";
    if (!date) newErrors.date = "Veuillez entrer une date.";

    if (state !== "Neuf" && !stateDetails.trim()) {
      newErrors.stateDetails = "Veuillez fournir des détails sur l'état.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onAddComputer({ 
      id: Date.now(),
      serialNumber,
      type,
      operatingSystem,
      owner,
      state,
      date,
      stateDetails: state !== "Neuf" ? stateDetails : "",
     });

    // Réinitialisation des champs après soumission
    setSerialNumber("");
    setUseCustomSerial(false);
    setType("");
    setOperatingSystem("");
    setOwner("");
    setState("");
    setDate("");
    setStateDetails("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
     <label>
        Numéro de Série:
        <select
          value={useCustomSerial ? "custom" : serialNumber}
          onChange={(e) => {
            if (e.target.value === "custom") {
              setUseCustomSerial(true);
              setSerialNumber("");
            } else {
              setUseCustomSerial(false);
              setSerialNumber(e.target.value);
            }
          }}
        >
          <option value="">-- Sélectionner un numéro --</option>
          {existingSerialNumbers.map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
          <option value="custom">Autre (ajouter un nouveau)</option>
        </select>
        {errors.serialNumber && <span className="error-text">{errors.serialNumber}</span>}
      </label>

      {useCustomSerial && (
        <label>
          Nouveau numéro de série:
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className={errors.serialNumber ? "error-input" : ""}
          />
        </label>
      )}

      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)} className={errors.type ? "error-input" : ""}>
          <option value="">-- Sélectionner un type --</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.type && <span className="error-text">{errors.type}</span>}
      </label>

      <label>
        Operating System:
        <select value={operatingSystem} onChange={(e) => setOperatingSystem(e.target.value)} className={errors.operatingSystem ? "error-input" : ""}>
          <option value="">-- Sélectionner un OS --</option>
          {operatingSystems.map((os) => (
            <option key={os} value={os}>{os}</option>
          ))}
        </select>
        {errors.operatingSystem && <span className="error-text">{errors.operatingSystem}</span>}
      </label>

      <label>
        Owner:
        <input
          type="text"
          placeholder="Nom du propriétaire"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className={errors.owner ? "error-input" : ""}
        />
        {errors.owner && <span className="error-text">{errors.owner}</span>}
      </label>

      <label>
        État:
        <select value={state} onChange={(e) => setState(e.target.value)} className={errors.state ? "error-input" : ""}>
          <option value="">-- Sélectionner un état --</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.state && <span className="error-text">{errors.state}</span>}
      </label>

      {/* Affichage du champ "Détails sur l'état" si l'ordinateur n'est pas neuf */}
      {state !== "Neuf" && state && (
        <label>
          Détails sur l'état:
          <textarea
            value={stateDetails}
            onChange={(e) => setStateDetails(e.target.value)}
            className={errors.stateDetails ? "error-input" : ""}
          />
          {errors.stateDetails && <span className="error-text">{errors.stateDetails}</span>}
        </label>
      )}

      <label>
        Date d'acquisition:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={errors.date ? "error-input" : ""}
        />
        {errors.date && <span className="error-text">{errors.date}</span>}
      </label>

      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddComputerForm;
