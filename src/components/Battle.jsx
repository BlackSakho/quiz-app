import React, { useState } from "react";
import { createBattle, joinBattle } from "../utils/battle";

const Battle = ({ goHome }) => {
  const [playerName, setPlayerName] = useState("");
  const [battleId, setBattleId] = useState("");
  const [createdBattle, setCreatedBattle] = useState(null);
  const [error, setError] = useState("");

  // Créer une battle
  const handleCreate = async () => {
    if (!playerName) return setError("Entrez votre nom !");
    const battle = await createBattle(playerName);
    if (battle) {
      setCreatedBattle(battle);
      setBattleId(battle.id);
      setError("");
    } else {
      setError("Erreur lors de la création.");
    }
  };

  // Rejoindre une battle
  const handleJoin = async () => {
    if (!playerName || !battleId) return setError("Nom et code requis !");
    const battle = await joinBattle(battleId, playerName);
    if (battle) {
      setCreatedBattle(battle);
      setError("");
    } else {
      setError("Battle introuvable.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: 16,
      }}
    >
      <h2>Battle Quiz</h2>
      <input
        type="text"
        placeholder="Votre nom"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem", padding: "8px" }}
      />
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleCreate} style={{ marginRight: "1rem" }}>
          Créer une partie
        </button>
        {createdBattle && (
          <div>
            <p>
              Code de la partie : <b>{createdBattle.id}</b>
            </p>
            <p>Attendez qu'un adversaire rejoigne...</p>
          </div>
        )}
      </div>
      <hr />
      <input
        type="text"
        placeholder="Code de la partie"
        value={battleId}
        onChange={(e) => setBattleId(e.target.value)}
        style={{ width: "100%", margin: "1rem 0", padding: "8px" }}
      />
      <button onClick={handleJoin}>Rejoindre une partie</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={goHome} style={{ marginTop: "2rem" }}>
        Retour à l'accueil
      </button>
    </div>
  );
};

export default Battle;
