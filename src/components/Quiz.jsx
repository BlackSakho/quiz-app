import React, { useState, useEffect } from "react";

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
  const [animClass, setAnimClass] = useState("");

  useEffect(() => {
    const shuffled = shuffleArray(questions).map((q) => ({
      ...q,
      answers: shuffleArray(q.answers),
    }));
    setShuffledQuestions(shuffled);
  }, [questions]);

  useEffect(() => {
    if (timeLeft > 0 && !answered) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
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
    setMistakes((prev) => prev + 1);
  };

  const handleAnswer = (isCorrect, answerIndex) => {
    if (answered) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setAnimClass("correct");
    } else {
      setMistakes((prev) => prev + 1);
      setShowCorrectAnswer(true);
      setAnimClass("incorrect");
    }

    if (mistakes + 1 >= 3 && !isCorrect) {
      setTimeout(() => onFinish(score), 1000);
    }
  };

  const nextQuestion = () => {
    setShowCorrectAnswer(false);
    setAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(30);
    setAnimClass("");
    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setTimeout(() => onFinish(score), 500);
    }
  };

  const getAnswerClass = (answer, index) => {
    if (!answered) return "quiz-answer-btn";
    if (answer.isCorrect) return "quiz-answer-btn correct";
    if (selectedAnswer === index) return "quiz-answer-btn incorrect";
    return "quiz-answer-btn disabled";
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="quiz-loading">
        <div className="quiz-spinner"></div>
        <p className="quiz-loading-text">Chargement du quiz...</p>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-progress-section">
          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{
                width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%`,
              }}
            ></div>
          </div>
          <span className="quiz-progress-text">
            {currentQuestion + 1}/{shuffledQuestions.length}
          </span>
        </div>

        <div className="quiz-stats">
          <div className="quiz-stat">
            <span className="quiz-stat-icon">🏆</span>
            {score}
          </div>
          <div className="quiz-stat">
            <span className="quiz-stat-icon">💔</span>
            {mistakes}/3
          </div>
          <div
            className={`quiz-stat ${timeLeft < 10 ? "timer-warning" : "timer-normal"}`}
          >
            <span className="quiz-stat-icon">⏱️</span>
            {timeLeft}s
          </div>
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-question-number">
          Question {currentQuestion + 1}
        </div>
        <h2 className="quiz-question-text">{currentQ?.question}</h2>
      </div>

      <div className="quiz-answers">
        {currentQ?.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer.isCorrect, index)}
            disabled={answered}
            className={getAnswerClass(answer, index)}
          >
            <span className="quiz-answer-prefix">
              {String.fromCharCode(65 + index)}
            </span>
            {answer.text}
          </button>
        ))}
      </div>

      {showCorrectAnswer && answered && (
        <div className={`quiz-feedback ${animClass === "incorrect" ? "incorrect" : "show-answer"}`}>
          {currentQ?.answers.find((a) => a.isCorrect)?.text}
        </div>
      )}

      {answered && (
        <button onClick={nextQuestion} className="quiz-next-btn">
          {currentQuestion + 1 < shuffledQuestions.length ? (
            <>
              Question suivante
              <span className="btn-arrow">→</span>
            </>
          ) : (
            <>
              Voir mon score
              <span className="btn-arrow">🏆</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default Quiz;
