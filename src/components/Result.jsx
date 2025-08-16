import React, { useEffect, useState } from 'react';

const Result = ({ score, total, restartQuiz }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setShowElements(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getLevel = (score) => {
    const percentage = (score / total) * 100;
    
    if (percentage <= 20) {
      return { 
        level: "Diangal gua bagn", 
        stars: "★☆☆☆☆",
        emoji: "😢",
        color: "#FF5252",
        comment: "Tout petit effort à faire !"
      };
    } else if (percentage <= 40) {
      return { 
        level: "Tu peux faire mieux touti effort rek", 
        stars: "★★☆☆☆",
        emoji: "😕",
        color: "#FF9800",
        comment: "Encore un peu d'effort !"
      };
    } else if (percentage <= 60) {
      return { 
        level: "Nandite yi na ame moyenne rek", 
        stars: "★★★☆☆",
        emoji: "😐",
        color: "#FFC107",
        comment: "Pas mal, mais peut mieux faire !"
      };
    } else if (percentage <= 80) {
      return { 
        level: "Niveau AKK", 
        stars: "★★★★☆",
        emoji: "😊",
        color: "#4CAF50",
        comment: "Bon score !"
      };
    } else {
      return { 
        level: "Nit gue ioe?", 
        stars: "★★★★★",
        emoji: "🤩",
        color: "#2196F3",
        comment: "Excellent ! T'es un génie !"
      };
    }
  };

  const { level, stars, emoji, color, comment } = getLevel(score);
  const percentage = Math.round((score / total) * 100);

  return (
    <div style={styles.container}>
      <div 
        style={{
          ...styles.resultCard,
          transform: isAnimating ? 'scale(0.9)' : 'scale(1)',
          opacity: isAnimating ? 0 : 1,
          transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}
      >
        <h1 style={styles.title}>Résultats</h1>
        
        <div style={styles.scoreCircle(color)}>
          <span style={styles.scorePercentage}>{percentage}%</span>
        </div>
        
        {showElements && (
          <>
            <p style={styles.scoreText}>
              Vous avez obtenu <strong>{score}</strong> sur <strong>{total}</strong> points
            </p>
            
            <div style={styles.levelContainer}>
              <span style={styles.emoji}>{emoji}</span>
              <div>
                <p style={styles.levelText}>Niveau : <strong style={{ color }}>{level}</strong></p>
                <p style={styles.commentText}>{comment}</p>
              </div>
            </div>
            
            <div style={styles.starsContainer}>
              <p style={styles.starsText}>Évaluation :</p>
              <div style={{ ...styles.stars, color: '#FFD700' }}>
                {stars.split('').map((star, index) => (
                  <span 
                    key={index} 
                    style={{
                      fontSize: '2rem',
                      opacity: star === '★' ? 1 : 0.3,
                      transition: `opacity 0.3s ${index * 0.1}s`
                    }}
                  >
                    {star}
                  </span>
                ))}
              </div>
            </div>
            
            <button 
              onClick={restartQuiz}
              style={styles.restartButton}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
            >
              Rejouer le Quiz
              <span style={styles.buttonIcon}>🔄</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    padding: '20px'
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '2.5rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%'
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1.5rem',
    fontWeight: '700'
  },
  scoreCircle: (color) => ({
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    backgroundColor: `${color}20`,
    border: `5px solid ${color}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 1.5rem',
    transition: 'all 0.5s ease'
  }),
  scorePercentage: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#333'
  },
  scoreText: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '1.5rem'
  },
  levelContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '1.5rem',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '12px'
  },
  emoji: {
    fontSize: '2.5rem'
  },
  levelText: {
    fontSize: '1.1rem',
    margin: '0',
    textAlign: 'left'
  },
  commentText: {
    fontSize: '0.9rem',
    color: '#666',
    margin: '5px 0 0',
    textAlign: 'left',
    fontStyle: 'italic'
  },
  starsContainer: {
    marginBottom: '2rem'
  },
  starsText: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '0.5rem'
  },
  stars: {
    display: 'flex',
    justifyContent: 'center',
    gap: '5px'
  },
  restartButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    padding: '15px',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)',
    transform: 'translateY(0) scale(1)',
    ':hover': {
      backgroundColor: '#1976D2'
    }
  },
  buttonIcon: {
    fontSize: '1.2rem',
    transition: 'transform 0.3s ease'
  }
};

export default Result;