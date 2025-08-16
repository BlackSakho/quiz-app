import React, { useState, useEffect } from 'react';

// Fonction pour mélanger un tableau (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Quiz = ({ questions, onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const shuffled = shuffleArray(questions).map(question => ({
      ...question,
      answers: shuffleArray(question.answers)
    }));
    setShuffledQuestions(shuffled);
  }, [questions]);

  useEffect(() => {
    if (timeLeft > 0 && !answered) {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
        // Pulse animation when time is running out
        if (timeLeft <= 5) setPulse(prev => !prev);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !answered) {
      handleTimeOut();
    }
  }, [timeLeft, answered]);

  const handleTimeOut = () => {
    setAnswered(true);
    setShowCorrectAnswer(true);
    setMistakes(prev => prev + 1);
  };

  const handleAnswer = (isCorrect, answerIndex) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setMistakes(mistakes + 1);
      setShowCorrectAnswer(true);
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);

    if (mistakes + 1 >= 3 && !isCorrect) {
      setTimeout(() => onFinish(score), 1000);
    }
  };

  const nextQuestion = () => {
    setShowCorrectAnswer(false);
    setAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(30);
    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setTimeout(() => onFinish(score), 500);
    }
  };

  const calculateProgress = () => {
    return ((currentQuestion + 1) / shuffledQuestions.length) * 100;
  };

  const getAnswerStyle = (answer, index) => {
    const baseStyle = {
      padding: '16px 20px',
      margin: '8px 0',
      borderRadius: '12px',
      border: 'none',
      cursor: answered ? 'default' : 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontSize: '16px',
      fontWeight: '500',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transform: 'translateY(0)',
      width: '100%'
    };

    if (!answered) {
      return {
        ...baseStyle,
        backgroundColor: '#ffffff',
        color: '#333',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
        }
      };
    }

    if (answer.isCorrect) {
      return {
        ...baseStyle,
        backgroundColor: '#4CAF50',
        color: 'white',
        transform: selectedAnswer === index ? 'scale(1.02)' : 'scale(1)',
        boxShadow: '0 4px 16px rgba(76, 175, 80, 0.3)'
      };
    } else if (selectedAnswer === index) {
      return {
        ...baseStyle,
        backgroundColor: '#f44336',
        color: 'white',
        opacity: '0.8'
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: '#f5f5f5',
        color: '#666',
        opacity: '0.7'
      };
    }
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Chargement du quiz...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${calculateProgress()}%`,
                transition: 'width 0.6s ease'
              }}
            ></div>
          </div>
          <span style={styles.progressText}>
            Question {currentQuestion + 1} sur {shuffledQuestions.length}
          </span>
        </div>

        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <span style={styles.statIcon}>🏆</span>
            <span style={styles.statValue}>{score}</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statIcon}>💔</span>
            <span style={styles.statValue}>{mistakes}/3</span>
          </div>
          <div style={{
            ...styles.statItem,
            backgroundColor: timeLeft < 10 ? '#ff5252' : '#2196F3',
            animation: pulse ? 'pulse 0.5s infinite alternate' : 'none'
          }}>
            <span style={styles.statIcon}>⏱️</span>
            <span style={styles.statValue}>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div style={{
        ...styles.questionCard,
        transform: isAnimating ? 'scale(1.02)' : 'scale(1)'
      }}>
        <h2 style={styles.questionText}>
          {shuffledQuestions[currentQuestion]?.question}
        </h2>
      </div>

      {/* Answers Grid */}
      <div style={styles.answersGrid}>
        {shuffledQuestions[currentQuestion]?.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer.isCorrect, index)}
            disabled={answered}
            style={getAnswerStyle(answer, index)}
            onMouseEnter={e => !answered && (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => !answered && (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span style={styles.answerPrefix}>
              {String.fromCharCode(65 + index)}.
            </span>
            {answer.text}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showCorrectAnswer && (
        <div style={styles.feedbackBox}>
          <p style={styles.feedbackText}>
            {answered 
              ? 'Bonne réponse ! 🎉' 
              : `Réponse correcte: ${shuffledQuestions[currentQuestion].answers.find(a => a.isCorrect).text}`}
          </p>
        </div>
      )}

      {/* Next Button */}
      {answered && (
        <button 
          onClick={nextQuestion}
          style={styles.nextButton}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
        >
          {currentQuestion + 1 < shuffledQuestions.length ? (
            <>
              Question suivante
              <span style={styles.buttonIcon}>→</span>
            </>
          ) : (
            <>
              Voir mon score
              <span style={styles.buttonIcon}>🏆</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  progressContainer: {
    width: '100%'
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '8px'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: '10px'
  },
  progressText: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500'
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem'
  },
  statItem: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    borderRadius: '12px',
    backgroundColor: '#f5f5f5',
    fontWeight: '600',
    color: '#333'
  },
  statIcon: {
    fontSize: '18px'
  },
  statValue: {
    fontSize: '16px'
  },
  questionCard: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '16px',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f0f0f0',
    transition: 'transform 0.3s ease'
  },
  questionText: {
    fontSize: '1.4rem',
    margin: 0,
    color: '#333',
    fontWeight: '600',
    lineHeight: '1.4'
  },
  answersGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
    marginBottom: '1.5rem'
  },
  answerPrefix: {
    fontWeight: 'bold',
    marginRight: '10px',
    color: 'inherit'
  },
  feedbackBox: {
    backgroundColor: '#e8f5e9',
    padding: '1rem',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    textAlign: 'center',
    animation: 'fadeIn 0.5s ease'
  },
  feedbackText: {
    color: '#2e7d32',
    fontWeight: '600',
    margin: 0,
    fontSize: '16px'
  },
  nextButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)',
    transform: 'translateY(0) scale(1)',
    ':hover': {
      backgroundColor: '#1976D2',
      transform: 'translateY(-2px) scale(1.02)'
    }
  },
  buttonIcon: {
    fontSize: '18px',
    transition: 'transform 0.3s ease'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    gap: '20px'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #4CAF50',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    color: '#666',
    fontSize: '18px',
    fontWeight: '500'
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(1.05)' }
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' }
  }
};

export default Quiz;