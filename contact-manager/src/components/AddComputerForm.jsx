import { useState } from "react";
import "../css/AddComputerForm.css";

const AddComputerForm = ({ onAddComputer }) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [type, setType] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [owner, setOwner] = useState("");
  const [state, setState] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const types = ["Serie X", "Serie T", "Mac","Dell"];
  const states = ["Neuf", "Bon état", "Réparé", "Hors service"];
  const operatingSystems = ["Windows 11 Famille", "Windows 11 Pro", "Linux", "macOS"];

  const validateForm = () => {
    const newErrors = {};

    if (!serialNumber.trim()) newErrors.serialNumber = "Le numéro de série est requis.";
    if (!type) newErrors.type = "Veuillez sélectionner un type.";
    if (!operatingSystem) newErrors.operatingSystem = "Veuillez sélectionner un système d'exploitation.";
    if (!owner.trim()) newErrors.owner = "Le propriétaire est requis.";
    if (!state) newErrors.state = "Veuillez sélectionner un état.";
    if (!date) newErrors.date = "Veuillez entrer une date.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onAddComputer({ id: Date.now(), serialNumber, type, operatingSystem, owner, state, date });

    // Réinitialisation des champs après soumission
    setSerialNumber("");
    setType("");
    setOperatingSystem("");
    setOwner("");
    setState("");
    setDate("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        Serial Number:
        <input
          type="text"
          placeholder="Ex: 123ABC"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className={errors.serialNumber ? "error-input" : ""}
        />
        {errors.serialNumber && <span className="error-text">{errors.serialNumber}</span>}
      </label>

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
