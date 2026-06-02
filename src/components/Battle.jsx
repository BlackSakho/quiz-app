import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  createBattle,
  joinBattle,
  submitAnswer,
} from "../utils/battle";
import { FaHome, FaUser, FaGamepad, FaCheck, FaSpinner, FaCopy, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { supabase } from "../utils/supabaseClient";

const TIMER_DURATION = 30;

const Battle = ({ goHome, selectedCategory }) => {
  const [playerName, setPlayerName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [battle, setBattle] = useState(null);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const battleRef = useRef(battle);
  battleRef.current = battle;
  const selectedRef = useRef(selectedAnswer);
  selectedRef.current = selectedAnswer;
  const timeoutSubmitted = useRef(false);

  // Souscription Realtime aux changements de la battle
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
    return () => supabase.removeChannel(channel);
  }, [battle?.id]);

  // Met à jour la question courante quand on change de question
  useEffect(() => {
    if (battle?.questions && battle.current_question >= 0) {
      setCurrentQuestion(battle.questions[battle.current_question]);
      setSelectedAnswer(null);
      setTimer(TIMER_DURATION);
      timeoutSubmitted.current = false;
    }
  }, [battle?.current_question, battle?.questions]);

  // Timer synchronisé : recalcule le temps restant depuis question_started_at
  useEffect(() => {
    if (battle?.status !== "playing" || !battle?.question_started_at) return;

    const startedAt = new Date(battle.question_started_at).getTime();
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);
    const initial = Math.max(0, TIMER_DURATION - elapsed);
    setTimer(initial);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [battle?.status, battle?.question_started_at, battle?.current_question]);

  // Gestion du timeout : soumet une réponse vide quand le timer atteint 0
  useEffect(() => {
    if (
      timer > 0 ||
      selectedRef.current !== null ||
      timeoutSubmitted.current ||
      battleRef.current?.status !== "playing" ||
      !currentQuestion
    )
      return;

    timeoutSubmitted.current = true;
    const b = battleRef.current;

    submitAnswer(
      b.id,
      playerName,
      currentQuestion.id,
      "",
      false,
      b.current_question
    ).catch(console.error);
  }, [timer, playerName, currentQuestion]);

  const handleCreate = async () => {
    if (!playerName) return setError("Entrez votre nom !");
    if (questionCount < 5 || questionCount > 100)
      return setError("Le nombre de questions doit être entre 5 et 100 !");
    setIsLoading(true);
    try {
      const newBattle = await createBattle(playerName, questionCount, selectedCategory);
      if (newBattle) {
        setBattle(newBattle);
        setError("");
      } else {
        setError("Erreur lors de la création.");
      }
    } catch {
      setError("Erreur lors de la création.");
    }
    setIsLoading(false);
  };

  const handleJoin = async () => {
    if (!playerName || !joinCode) return setError("Nom et code requis !");
    setIsLoading(true);
    try {
      const joinedBattle = await joinBattle(joinCode, playerName);
      if (joinedBattle) {
        setBattle(joinedBattle);
        setError("");
      } else {
        setError("Battle introuvable.");
      }
    } catch {
      setError("Battle introuvable.");
    }
    setIsLoading(false);
  };

  const handleAnswer = useCallback(
    async (answer) => {
      if (selectedRef.current !== null) return;
      setSelectedAnswer(answer);

      const b = battleRef.current;
      if (!b || !currentQuestion) return;

      const isCorrect = answer === currentQuestion.correct_answer;
      try {
        await submitAnswer(
          b.id,
          playerName,
          currentQuestion.id,
          answer,
          isCorrect,
          b.current_question
        );
      } catch (err) {
        console.error("Erreur soumission réponse:", err);
      }
    },
    [playerName, currentQuestion]
  );

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(battle.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback si clipboard refusé */ }
  };

  // --- RENDU ---
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
          <label className="battle-input-label">
            Nombre de questions (5-100)
          </label>
          <input
            type="number"
            value={questionCount}
            onChange={(e) =>
              setQuestionCount(
                Math.max(5, Math.min(100, parseInt(e.target.value) || 5))
              )
            }
            min="5"
            max="100"
            className="battle-input"
          />
        </div>
        <div className="battle-actions">
          <button
            onClick={handleCreate}
            disabled={isLoading}
            className="btn-create"
          >
            {isLoading ? (
              <FaSpinner className="spin-icon" />
            ) : (
              "Créer une partie"
            )}
          </button>
          <div className="battle-separator">OU</div>
          <input
            type="text"
            placeholder="Code de la partie"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="battle-input"
          />
          <button
            onClick={handleJoin}
            disabled={isLoading}
            className="btn-join"
          >
            {isLoading ? (
              <FaSpinner className="spin-icon" />
            ) : (
              "Rejoindre une partie"
            )}
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
          <span className="waiting-code-value">{battle.code}</span>
          <button className="btn-copy-code" onClick={copyCode} title="Copier le code">
            {copied ? "✓" : <FaCopy />}
          </button>
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
          <>
            <div className="waiting-spinner">
              <FaSpinner className="spin-icon" /> En attente...
            </div>
            <div className="share-section">
              <p className="share-label">Invite un ami</p>
              <div className="share-buttons">
                <button
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Rejoins ma partie QuizMaster avec le code : ${battle.code}`)}`, "_blank", "noopener")}
                  className="btn-share whatsapp"
                >
                  <FaWhatsapp /> WhatsApp
                </button>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Rejoins ma partie QuizMaster avec le code : ${battle.code}`)}`, "_blank", "noopener")}
                  className="btn-share twitter"
                >
                  <FaTwitter /> X
                </button>
              </div>
            </div>
          </>
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
          if (selectedAnswer !== null) {
            if (isCorrect) className += " correct";
            if (isSelected && !isCorrect) className += " incorrect";
          }
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null || timer <= 0}
              className={className}
            >
              {option}
              {selectedAnswer !== null && isCorrect && (
                <FaCheck style={{ marginLeft: 8 }} />
              )}
            </button>
          );
        })}
      </div>
      {selectedAnswer !== null && (
        <div
          className={`battle-feedback ${
            selectedAnswer === currentQuestion.correct_answer
              ? "correct"
              : "incorrect"
          }`}
        >
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
          {[battle.player1, battle.player2].filter(Boolean).map((p) => {
            const other = battle.player1 === p ? battle.player2 : battle.player1;
            const isWinner = (battle.scores[p] || 0) > (battle.scores[other] || 0);
            const isTie = battle.scores[battle.player1] === battle.scores[battle.player2];
            return (
              <div key={p} className="battle-player-result">
                <span>
                  <FaUser /> {p}
                </span>
                <span>
                  {battle.scores[p] || 0} points
                  {isWinner && !isTie && (
                    <span className="battle-winner-badge" style={{ marginLeft: 8 }}>
                      Gagnant !
                    </span>
                  )}
                </span>
              </div>
            );
          })}
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
