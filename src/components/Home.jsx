import React, { useMemo } from "react";

const Home = ({ startQuiz, goBattle }) => {
  const particles = useMemo(() =>
    [...Array(30)].map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    })),
  []
  );

  return (
    <div className="home-wrapper">
      {particles.map((p) => (
        <div
          key={p.id}
          className="home-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      <div className="home-content">
        <div className="home-badge" style={{ animationDelay: "0s" }}>
          <span>✨</span>
          Quiz Challenge
        </div>

        <h1 className="home-title">
          Testez vos<br />
          <span className="home-title-gradient">connaissances</span>
        </h1>

        <p className="home-subtitle">
          Défiez-vous avec notre sélection de questions variées, chronométrées
          et classées par niveau. Prêt à devenir le meilleur ?
        </p>

        <div className="home-features">
          <div className="home-feature">
            <span className="home-feature-icon">📚</span>
            Questions variées
          </div>
          <div className="home-feature">
            <span className="home-feature-icon">⏱️</span>
            Timer challengeant
          </div>
          <div className="home-feature">
            <span className="home-feature-icon">🏆</span>
            Classement global
          </div>
        </div>

        <div className="home-buttons">
          <button onClick={startQuiz} className="btn-primary">
            Commencer le Quiz
            <span className="btn-arrow">→</span>
          </button>
          <button onClick={goBattle} className="btn-secondary">
            Battle Quiz
            <span className="btn-arrow">⚔️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
