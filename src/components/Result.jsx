import React, { useEffect, useState } from "react";
import { FaRedo, FaTrophy, FaCheck, FaUser } from "react-icons/fa";

const Result = ({ score, total, restartQuiz, saveScore, goLeaderboard }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showElements, setShowElements] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [saved, setSaved] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setShowElements(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showElements) {
      const pulseTimer = setInterval(() => {
        setIsPulsing(prev => !prev);
      }, 1500);
      return () => clearInterval(pulseTimer);
    }
  }, [showElements]);

  const getLevel = (score) => {
    const percentage = (score / total) * 100;

    if (percentage <= 20) {
      return {
        level: "Débutant",
        stars: "★☆☆☆☆",
        emoji: "😢",
        color: "#FF5252",
        comment: "Tout petit effort à faire !",
        badge: "Bronze"
      };
    } else if (percentage <= 40) {
      return {
        level: "Intermédiaire",
        stars: "★★☆☆☆",
        emoji: "😕",
        color: "#FF9800",
        comment: "Encore un peu d'effort !",
        badge: "Argent"
      };
    } else if (percentage <= 60) {
      return {
        level: "Avancé",
        stars: "★★★☆☆",
        emoji: "😐",
        color: "#FFC107",
        comment: "Pas mal, mais peut mieux faire !",
        badge: "Or"
      };
    } else if (percentage <= 80) {
      return {
        level: "Expert",
        stars: "★★★★☆",
        emoji: "😊",
        color: "#4CAF50",
        comment: "Bon score !",
        badge: "Platine"
      };
    } else {
      return {
        level: "Maître",
        stars: "★★★★★",
        emoji: "🤩",
        color: "#2196F3",
        comment: "Excellent ! T'es un génie !",
        badge: "Diamant"
      };
    }
  };

  const { level, stars, emoji, color, comment, badge } = getLevel(score);
  const percentage = Math.round((score / total) * 100);

  const handleSaveScore = () => {
    if (playerName.trim()) {
      saveScore(playerName, score);
      setSaved(true);
    }
  };

  return (
    <div className="result-container">
      <div 
        className={`result-card ${isAnimating ? 'result-card-entering' : ''}`}
        style={{ '--level-color': color }}
      >
        <div className="result-header">
          <h1>Résultats du Quiz</h1>
          <div className="score-circle">
            <span className="score-percentage">{percentage}%</span>
            <div className="score-badge">{badge}</div>
          </div>
        </div>

        {showElements && (
          <div className="result-content">
            <div className="score-summary">
              <p>Vous avez obtenu <strong>{score}</strong> sur <strong>{total}</strong> points</p>
            </div>

            <div className="level-container">
              <span className="level-emoji" role="img" aria-label="Niveau">{emoji}</span>
              <div className="level-info">
                <h3>Niveau atteint</h3>
                <p className="level-title" style={{ color }}>{level}</p>
                <p className="level-comment">{comment}</p>
              </div>
            </div>

            <div className="stars-rating">
              <p>Votre évaluation :</p>
              <div className="stars">
                {stars.split("").map((star, index) => (
                  <span 
                    key={index} 
                    className={`star ${star === "★" ? 'active' : ''}`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    {star}
                  </span>
                ))}
              </div>
            </div>

            {!saved ? (
              <div className="save-score-form">
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    placeholder="Entrez votre nom"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="name-input"
                  />
                </div>
                <button 
                  onClick={handleSaveScore}
                  disabled={!playerName.trim()}
                  className={`save-button ${isPulsing ? 'pulse' : ''}`}
                >
                  <FaCheck className="button-icon" />
                  Enregistrer mon score
                </button>
              </div>
            ) : (
              <button 
                onClick={goLeaderboard} 
                className="leaderboard-button"
              >
                <FaTrophy className="button-icon" />
                Voir le classement
              </button>
            )}

            <button 
              onClick={restartQuiz} 
              className="restart-button"
            >
              <FaRedo className="button-icon" />
              Rejouer le Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// CSS (à mettre dans un fichier séparé ou dans styled-components)
const styles = `
.result-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  padding: 20px;
}

.result-card {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
  transform: scale(1);
  opacity: 1;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
  overflow: hidden;
}

.result-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: var(--level-color);
}

.result-card-entering {
  transform: scale(0.9);
  opacity: 0;
}

.result-header {
  margin-bottom: 2rem;
}

.result-header h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.score-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(var(--level-color), 0.1);
  border: 5px solid var(--level-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  position: relative;
}

.score-percentage {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
}

.score-badge {
  position: absolute;
  bottom: -10px;
  background-color: var(--level-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.result-content {
  animation: fadeIn 0.8s ease-out;
}

.score-summary {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.score-summary strong {
  color: var(--level-color);
  font-weight: 700;
}

.level-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 2rem;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 12px;
  text-align: left;
}

.level-emoji {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.level-info {
  flex-grow: 1;
}

.level-info h3 {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 4px 0;
  font-weight: 500;
}

.level-title {
  font-size: 1.2rem;
  margin: 0;
  font-weight: 700;
}

.level-comment {
  font-size: 0.9rem;
  color: #666;
  margin: 5px 0 0;
  font-style: italic;
}

.stars-rating {
  margin-bottom: 2rem;
}

.stars-rating p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.star {
  font-size: 2rem;
  color: #FFD700;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.star.active {
  opacity: 1;
}

.save-score-form {
  margin: 2rem 0;
}

.input-group {
  position: relative;
  margin-bottom: 1rem;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.name-input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: all 0.3s;
}

.name-input:focus {
  outline: none;
  border-color: var(--level-color);
  box-shadow: 0 0 0 2px rgba(var(--level-color), 0.2);
}

.save-button, .leaderboard-button, .restart-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.save-button {
  background-color: var(--level-color);
  color: white;
}

.save-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.save-button.pulse {
  animation: pulse 1.5s infinite;
}

.leaderboard-button {
  background-color: #FFD700;
  color: #333;
}

.restart-button {
  background-color: #2196F3;
  color: white;
}

.save-button:hover:not(:disabled), 
.leaderboard-button:hover, 
.restart-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.button-icon {
  font-size: 1rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--level-color), 0.4); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(var(--level-color), 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--level-color), 0); }
}
`;

// Ajouter les styles au document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Result;