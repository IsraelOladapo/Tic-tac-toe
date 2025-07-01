import { useState } from "react";

export default function Player({ playerName, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState(playerName);

  function handleClick() {
    setIsEditing((prevValue) => !prevValue);

    if (isEditing) {
      onChangeName(symbol, newPlayerName);
    }
  }

  function handlePlayerNameChange(event) {
    setNewPlayerName(event.target.value);
  }
  return (
    <li className={isActive ? "active" : null}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            onChange={handlePlayerNameChange}
            value={newPlayerName}
            required
          />
        ) : (
          <span className="player-name">{newPlayerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
