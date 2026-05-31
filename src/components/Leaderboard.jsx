import React from "react";
import { FaTrophy, FaHome, FaCrown, FaTired } from "react-icons/fa";

const Leaderboard = ({ leaderboard, goHome }) => {
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <FaTrophy className="leaderboard-header-icon" />
        <h1>Classement</h1>
      </div>

      <div className="leaderboard-card">
        {sortedLeaderboard.length === 0 ? (
          <div className="leaderboard-empty">
            <div className="leaderboard-empty-icon">
              <FaTired />
            </div>
            <p>Aucun score enregistré pour le moment</p>
          </div>
        ) : (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="leaderboard-th">Position</th>
                <th className="leaderboard-th">Nom</th>
                <th className="leaderboard-th">Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeaderboard.map((entry, idx) => (
                <tr
                  key={idx}
                  className={`leaderboard-tr ${
                    idx === 0 ? "top-1" : idx === 1 ? "top-2" : idx === 2 ? "top-3" : ""
                  }`}
                >
                  <td className="leaderboard-td">
                    <div className="leaderboard-position">
                      {idx + 1}
                      {idx < 3 && (
                        <FaCrown
                          className="leaderboard-crown"
                          style={{
                            color:
                              idx === 0
                                ? "#FFD700"
                                : idx === 1
                                ? "#C0C0C0"
                                : "#CD7F32",
                          }}
                        />
                      )}
                    </div>
                  </td>
                  <td className="leaderboard-td">
                    <span className="leaderboard-name">{entry.name}</span>
                  </td>
                  <td className="leaderboard-td">
                    <span className="leaderboard-score">{entry.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="leaderboard-footer">
        <button onClick={goHome} className="btn-home">
          <FaHome />
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
