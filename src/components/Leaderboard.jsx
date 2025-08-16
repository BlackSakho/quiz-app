import React from "react";

const Leaderboard = ({ leaderboard, goHome }) => (
  <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
    <h1>Classement</h1>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ borderBottom: "1px solid #ccc" }}>Nom</th>
          <th style={{ borderBottom: "1px solid #ccc" }}>Score</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.length === 0 ? (
          <tr>
            <td colSpan={2} style={{ textAlign: "center" }}>
              Aucun score enregistré
            </td>
          </tr>
        ) : (
          leaderboard
            .sort((a, b) => b.score - a.score)
            .map((entry, idx) => (
              <tr key={idx}>
                <td style={{ padding: "8px" }}>{entry.name}</td>
                <td style={{ padding: "8px" }}>{entry.score}</td>
              </tr>
            ))
        )}
      </tbody>
    </table>
    <button onClick={goHome} style={{ marginTop: "2rem" }}>
      Retour à l'accueil
    </button>
  </div>
);

export default Leaderboard;
