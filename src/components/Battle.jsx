import React, { useState, useEffect, useCallback } from "react";
import {
  createBattle,
  joinBattle,
  submitAnswer,
  nextQuestion,
  endBattle,
} from "../utils/battle";
import { FaHome, FaUser, FaGamepad, FaCheck, FaSpinner } from "react-icons/fa";
import { supabase } from "../utils/supabaseClient";

const Battle = ({ goHome }) => {
  const [playerName, setPlayerName] = useState("");
  const [battleId, setBattleId] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [battle, setBattle] = useState(null);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval;
    if (battle?.status === "playing" && timer > 0 && !selectedAnswer) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [battle, timer, selectedAnswer]);

  useEffect(() => {
    if (!battle?.id) return;
    const channel = supabase
      .channel(`battle-${battle.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "battles",
          filter: `id=eq.${battle.id}`,
        },
        (payload) => {
          setBattle(payload.new);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [battle?.id]);

  useEffect(() => {
    if (battle?.questions && battle.current_question >= 0) {
      setCurrentQuestion(battle.questions[battle.current_question]);
      setTimer(30);
      setSelectedAnswer(null);
    }
  }, [battle?.current_question, battle?.questions]);

  const handleCreate = async () => {
    if (!playerName) return setError("Entrez votre nom !");
    if (questionCount < 5 || questionCount > 100)
      return setError("Le nombre de questions doit être entre 5 et 100 !");
    setIsLoading(true);
    const newBattle = await createBattle(playerName, questionCount);
    if (newBattle) {
      setBattle(newBattle);
      setBattleId(newBattle.id);
      setError("");
    } else {
      setError("Erreur lors de la création.");
    }
    setIsLoading(false);
  };

  const handleJoin = async () => {
    if (!playerName || !battleId) return setError("Nom et code requis !");
    setIsLoading(true);
    const joinedBattle = await joinBattle(battleId, playerName);
    if (joinedBattle) {
      setBattle(joinedBattle);
      setError("");
    } else {
      setError("Battle introuvable.");
    }
    setIsLoading(false);
  };

  const handleAnswer = useCallback(
    async (answer) => {
      if (selectedAnswer || timer <= 0) return;
      setSelectedAnswer(answer);
      const isCorrect = answer === currentQuestion.correct_answer;
      await submitAnswer(battle.id, playerName, currentQuestion.id, answer, isCorrect);
      setTimeout(async () => {
        if (battle.current_question < battle.questions.length - 1) {
          await nextQuestion(battle.id);
        } else {
          await endBattle(battle.id);
        }
      }, 3000);
    },
    [selectedAnswer, timer, currentQuestion, battle, playerName]
  );

  const renderSetup = () => (
    <div className="battle-card">
      <div className="battle-title">
        <FaGamepad className="battle-title-icon" />
        Battle Quiz
      </div>
      <div className="battle-form">
        <div className="battle-input-group">
          <FaUser className="battle-input-icon" />
          <input
            type="text"
            placeholder="Votre nom"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="battle-input"
          />
        </div>
        <div>
          <label className="battle-input-label">Nombre de questions (5-100)</label>
          <input
            type="number"
            value={questionCount}
            onChange={(e) =>
              setQuestionCount(Math.max(5, Math.min(100, parseInt(e.target.value) || 5)))
            }
            min="5"
            max="100"
            className="battle-input"
          />
        </div>
        <div className="battle-actions">
          <button onClick={handleCreate} disabled={isLoading} className="btn-create">
            {isLoading ? <FaSpinner className="spin-icon" /> : "Créer une partie"}
          </button>
          <div className="battle-separator">OU</div>
          <input
            type="text"
            placeholder="Code de la partie"
            value={battleId}
            onChange={(e) => setBattleId(e.target.value)}
            className="battle-input"
          />
          <button onClick={handleJoin} disabled={isLoading} className="btn-join">
            {isLoading ? <FaSpinner className="spin-icon" /> : "Rejoindre une partie"}
          </button>
        </div>
        {error && <div className="battle-error">{error}</div>}
      </div>
    </div>
  );

  const renderWaiting = () => (
    <div className="battle-card">
      <div className="waiting-room">
        <h3>En attente d'un adversaire...</h3>
        <div className="waiting-code">
          <span>Code :</span>
          <span className="waiting-code-value">{battle.id}</span>
        </div>
        <div className="waiting-players">
          <div className="waiting-player">
            <FaUser /> {battle.player1} (Vous)
          </div>
          {battle.player2 && (
            <div className="waiting-player">
              <FaUser /> {battle.player2}
            </div>
          )}
        </div>
        {!battle.player2 && (
          <div className="waiting-spinner">
            <FaSpinner className="spin-icon" /> En attente...
          </div>
        )}
      </div>
    </div>
  );

  const renderQuestion = () => (
    <div className="battle-card">
      <div className="battle-question-header">
        <span className="battle-question-number">
          Question {battle.current_question + 1}/{battle.questions.length}
        </span>
        <div className={`battle-timer ${timer <= 5 ? "warning" : ""}`}>
          ⏱️ {timer}s
        </div>
      </div>
      <p className="battle-question">{currentQuestion.question}</p>
      <div className="battle-options">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = option === currentQuestion.correct_answer;
          const isSelected = selectedAnswer === option;
          let className = "battle-option";
          if (selectedAnswer) {
            if (isCorrect) className += " correct";
            if (isSelected && !isCorrect) className += " incorrect";
          }
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer || timer <= 0}
              className={className}
            >
              {option}
              {selectedAnswer && isCorrect && (
                <FaCheck style={{ marginLeft: 8 }} />
              )}
            </button>
          );
        })}
      </div>
      {selectedAnswer && (
        <div className={`battle-feedback ${selectedAnswer === currentQuestion.correct_answer ? "correct" : "incorrect"}`}>
          {selectedAnswer === currentQuestion.correct_answer
            ? "Correct ! 🎉"
            : `Incorrect ! La bonne réponse était: ${currentQuestion.correct_answer}`}
        </div>
      )}
    </div>
  );

  const renderResults = () => (
    <div className="battle-card">
      <div className="battle-results">
        <h2>Résultats finaux</h2>
        <div className="battle-players-results">
          <div className="battle-player-result">
            <span><FaUser /> {battle.player1}</span>
            <span>
              {battle.scores[battle.player1] || 0} points
              {battle.scores[battle.player1] > (battle.scores[battle.player2] || 0) && (
                <span className="battle-winner-badge" style={{ marginLeft: 8 }}>Gagnant !</span>
              )}
            </span>
          </div>
          {battle.player2 && (
            <div className="battle-player-result">
              <span><FaUser /> {battle.player2}</span>
              <span>
                {battle.scores[battle.player2] || 0} points
                {battle.scores[battle.player2] > battle.scores[battle.player1] && (
                  <span className="battle-winner-badge" style={{ marginLeft: 8 }}>Gagnant !</span>
                )}
              </span>
            </div>
          )}
        </div>
        <button onClick={goHome} className="btn-battle-home">
          <FaHome /> Retour à l'accueil
        </button>
      </div>
    </div>
  );

  return (
    <div className="battle-container">
      {!battle
        ? renderSetup()
        : battle.status === "waiting"
        ? renderWaiting()
        : battle.status === "playing" && currentQuestion
        ? renderQuestion()
        : battle.status === "finished"
        ? renderResults()
        : null}
    </div>
  );
};

export default Battle;
