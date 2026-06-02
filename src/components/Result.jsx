import React, { useEffect, useState } from "react";
import { FaRedo, FaTrophy, FaCheck, FaUser, FaWhatsapp, FaTwitter } from "react-icons/fa";

const Result = ({ score, total, restartQuiz, saveScore, goLeaderboard }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getLevel = (score) => {
    const percentage = (score / total) * 100;
    if (percentage <= 20)
      return { level: "Débutant", stars: 1, emoji: "😢", color: "#e17055", comment: "Tout petit effort à faire !", badge: "Bronze" };
    if (percentage <= 40)
      return { level: "Intermédiaire", stars: 2, emoji: "😕", color: "#fdcb6e", comment: "Encore un peu d'effort !", badge: "Argent" };
    if (percentage <= 60)
      return { level: "Avancé", stars: 3, emoji: "😐", color: "#00CEC9", comment: "Pas mal, mais peut mieux faire !", badge: "Or" };
    if (percentage <= 80)
      return { level: "Expert", stars: 4, emoji: "😊", color: "#6C5CE7", comment: "Bon score !", badge: "Platine" };
    return { level: "Maître", stars: 5, emoji: "🤩", color: "#00b894", comment: "Excellent ! T'es un génie !", badge: "Diamant" };
  };

  const { level, stars, emoji, color, comment, badge } = getLevel(score);
  const percentage = Math.round((score / total) * 100);

  const shareText = `🎯 QuizMaster - J'ai obtenu ${score}/${total} (${percentage}%) - Niveau : ${level} ${emoji}\n\nTeste-toi aussi sur QuizMaster !`;

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank", "noopener");
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank", "noopener");
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch { /* ignoré */ }
    }
  };

  const handleSaveScore = () => {
    if (playerName.trim()) {
      saveScore(playerName, score);
      setSaved(true);
    }
  };

  return (
    <div className="result-wrapper">
      <div
        className="result-card"
        style={{ "--level-color": color }}
      >
        <div className="result-header">
          <h1>Résultats</h1>
          <div className="result-score-circle">
            <span className="result-score-percentage">{percentage}%</span>
            <div className="result-badge">{badge}</div>
          </div>
        </div>

        {isVisible && (
          <div className="result-content">
            <p className="result-score-text">
              Vous avez obtenu <strong>{score}</strong> sur <strong>{total}</strong> points
            </p>

            <div className="result-level">
              <span className="result-level-emoji">{emoji}</span>
              <div className="result-level-info">
                <h4>Niveau atteint</h4>
                <p className="result-level-name" style={{ color }}>{level}</p>
                <p className="result-level-comment">{comment}</p>
              </div>
            </div>

            <div className="result-stars">
              <p>Votre évaluation :</p>
              <div className="result-stars-display">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className={`result-star ${s <= stars ? "active" : ""}`}
                    style={{ animationDelay: `${s * 0.15}s` }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {!saved ? (
              <div className="result-form">
                <div className="result-input-group">
                  <FaUser className="result-input-icon" />
                  <input
                    type="text"
                    placeholder="Entrez votre nom"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="result-input"
                  />
                </div>
                <button
                  onClick={handleSaveScore}
                  disabled={!playerName.trim()}
                  className="btn-save"
                >
                  <FaCheck />
                  Enregistrer mon score
                </button>
              </div>
            ) : (
              <button onClick={goLeaderboard} className="btn-leaderboard">
                <FaTrophy />
                Voir le classement
              </button>
            )}

            <div className="share-section">
              <p className="share-label">Partage ton score</p>
              <div className="share-buttons">
                <button onClick={shareWhatsApp} className="btn-share whatsapp" title="Partager sur WhatsApp">
                  <FaWhatsapp /> WhatsApp
                </button>
                <button onClick={shareTwitter} className="btn-share twitter" title="Partager sur X">
                  <FaTwitter /> X
                </button>
                {navigator.share && (
                  <button onClick={shareNative} className="btn-share native" title="Partager">
                    📤
                  </button>
                )}
              </div>
            </div>

            <button onClick={restartQuiz} className="btn-restart">
              <FaRedo />
              Rejouer le Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
