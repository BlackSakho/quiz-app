import React, { useState, useEffect } from "react";


const Home = ({ startQuiz }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    // Animation pulsante pour le bouton
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        /* backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%), url(${backgroundImage})`, */
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Effet de particules subtiles */}
      <div style={styles.particles}>
        {[...Array(15)].map((_, i) => (
          <div key={i} style={styles.particle(i)}></div>
        ))}
      </div>

      <div
        style={{
          ...styles.contentBox,
          transform: isAnimating ? "translateY(0)" : "translateY(20px)",
          opacity: isAnimating ? 1 : 0,
          transition: "all 0.8s ease-out",
        }}
      >
        <h1 style={styles.title}>
          Bienvenue au Quiz de Culture Générale
          <span style={styles.titleUnderline}></span>
        </h1>

        <p style={styles.subtitle}>
          Testez vos connaissances avec notre sélection de questions variées !
        </p>

        <div style={styles.features}>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>📚</span>
            <span>Questions variées</span>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>⏱️</span>
            <span>Timer challengeant</span>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>🏆</span>
            <span>Classement par niveau</span>
          </div>
        </div>

        <button
          onClick={startQuiz}
          style={{
            ...styles.startButton,
            transform: pulse ? "scale(1.03)" : "scale(1)",
            boxShadow: pulse
              ? "0 0 20px rgba(76, 175, 80, 0.6)"
              : "0 4px 15px rgba(0,0,0,0.2)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#45a049";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#4CAF50";
            e.currentTarget.style.transform = pulse
              ? "scale(1.03)"
              : "scale(1)";
          }}
        >
          Commencer le Quiz
          <span style={styles.buttonArrow}>→</span>
        </button>
      </div>
    </div>
  );
};

const styles = {
  particles: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    overflow: "hidden",
  },
  particle: (i) => ({
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "50%",
    width: `${Math.random() * 5 + 1}px`,
    height: `${Math.random() * 5 + 1}px`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animation: `float ${Math.random() * 20 + 10}s linear infinite`,
    animationDelay: `${Math.random() * 5}s`,
  }),
  contentBox: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "3rem",
    borderRadius: "20px",
    maxWidth: "700px",
    margin: "0 1rem",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    zIndex: 1,
  },
  title: {
    fontSize: "2.8rem",
    marginBottom: "1.5rem",
    fontWeight: "700",
    lineHeight: "1.2",
    position: "relative",
    display: "inline-block",
  },
  titleUnderline: {
    position: "absolute",
    bottom: "-10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100px",
    height: "4px",
    backgroundColor: "#4CAF50",
    borderRadius: "2px",
  },
  subtitle: {
    fontSize: "1.3rem",
    marginBottom: "2.5rem",
    opacity: "0.9",
    lineHeight: "1.6",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    marginBottom: "2.5rem",
    flexWrap: "wrap",
  },
  featureItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "1rem",
    opacity: "0.9",
  },
  featureIcon: {
    fontSize: "1.8rem",
  },
  startButton: {
    padding: "16px 40px",
    fontSize: "1.3rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    fontWeight: "600",
    letterSpacing: "1px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
  },
  buttonArrow: {
    transition: "all 0.3s ease",
    fontSize: "1.5rem",
  },
  "@keyframes float": {
    "0%": {
      transform: "translateY(0) translateX(0)",
    },
    "50%": {
      transform: "translateY(-100px) translateX(20px)",
    },
    "100%": {
      transform: "translateY(-200px) translateX(0)",
    },
  },
};

export default Home;
