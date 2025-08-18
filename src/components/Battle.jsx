import React, { useState, useEffect } from "react";
import { 
  createBattle, 
  joinBattle, 
  getBattle,
  submitAnswer,
  endBattle
} from "../utils/battle";
import { FaHome, FaUser, FaGamepad, FaSpinner, FaCheck } from "react-icons/fa";

const Battle = ({ goHome }) => {
  const [playerName, setPlayerName] = useState("");
  const [battleId, setBattleId] = useState("");
  const [battle, setBattle] = useState(null);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [opponentAnswer, setOpponentAnswer] = useState(null);

  // Gestion du timer
  useEffect(() => {
    let interval;
    if (battle?.status === "playing" && timer > 0 && !selectedAnswer) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [battle, timer, selectedAnswer]);

  // Vérification régulière de l'état de la battle
  useEffect(() => {
    let interval;
    if (battle?.id && battle.status !== "finished") {
      interval = setInterval(async () => {
        const updatedBattle = await getBattle(battle.id);
        setBattle(updatedBattle);
        
        // Vérifier les réponses de l'adversaire
        if (updatedBattle.player2 && updatedBattle.current_question === battle.current_question) {
          checkOpponentAnswer(updatedBattle);
        }
        
        // Si la battle est terminée
        if (updatedBattle.status === "finished") {
          clearInterval(interval);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [battle?.id, battle?.status, battle?.current_question]);

  // Gestion de la question actuelle
  useEffect(() => {
    if (battle?.questions && battle.current_question >= 0) {
      const questionIndex = battle.current_question ;
      setCurrentQuestion(battle.questions[questionIndex]);
      setTimer(30);
      setSelectedAnswer(null);
      setOpponentAnswer(null);
    }
  }, [battle?.current_question, battle?.questions]);

  const checkOpponentAnswer = async (battleData) => {
    // Implémentez cette fonction selon votre structure de données
    // Pour vérifier si l'adversaire a répondu à la question actuelle
  };

  const handleCreate = async () => {
    if (!playerName) return setError("Entrez votre nom !");
    setIsLoading(true);
    const newBattle = await createBattle(playerName);
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

  const handleAnswer = async (answer) => {
    if (selectedAnswer || timer <= 0) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correct_answer;
    await submitAnswer(battle.id, playerName, currentQuestion.id, answer, isCorrect);
    
    // Attendre que l'autre joueur réponde ou que le timer expire
    const checkStatus = async () => {
      const updatedBattle = await getBattle(battle.id);
      
      if (updatedBattle.current_question > battle.current_question || 
          !updatedBattle.player2) {
        // Passer à la question suivante ou terminer
        if (updatedBattle.current_question >= updatedBattle.questions.length) {
          await endBattle(battle.id);
        }
        return;
      }
      
      setTimeout(checkStatus, 1000);
    };
    
    setTimeout(checkStatus, 1000);
  };

  const renderSetupScreen = () => (
    <div className="battle-setup">
      <h2><FaGamepad /> Battle Quiz</h2>
      <div className="input-group">
        <FaUser className="input-icon" />
        <input
          type="text"
          placeholder="Votre nom"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      
      <div className="battle-actions">
        <button 
          onClick={handleCreate} 
          disabled={isLoading}
          className="create-btn"
        >
          {isLoading ? <FaSpinner className="spin" /> : "Créer une partie"}
        </button>
        
        <div className="separator">OU</div>
        
        <input
          type="text"
          placeholder="Code de la partie"
          value={battleId}
          onChange={(e) => setBattleId(e.target.value)}
        />
        <button 
          onClick={handleJoin} 
          disabled={isLoading}
          className="join-btn"
        >
          {isLoading ? <FaSpinner className="spin" /> : "Rejoindre une partie"}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );

  const renderWaitingRoom = () => (
    <div className="waiting-room">
      <h3>En attente d'un adversaire...</h3>
      <p>Code de la partie : <span className="battle-code">{battle.id}</span></p>
      <div className="players-list">
        <div className="player"><FaUser /> {battle.player1} (Vous)</div>
        {battle.player2 && <div className="player"><FaUser /> {battle.player2}</div>}
      </div>
      {!battle.player2 && (
        <div className="waiting-message">
          <FaSpinner className="spin" /> En attente...
        </div>
      )}
    </div>
  );

  const renderQuestion = () => (
    <div className="question-container">
      <div className="question-header">
        <h3>Question {battle.current_question}/{battle.questions.length}</h3>
        <div className={`timer ${timer <= 5 ? 'warning' : ''}`}>
          {timer}s
        </div>
      </div>
      
      <h4>{currentQuestion.question}</h4>
      
      <div className="options-grid">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = option === currentQuestion.correct_answer;
          const isSelected = selectedAnswer === option;
          let className = 'option-btn';
          
          if (selectedAnswer) {
            if (isCorrect) className += ' correct';
            if (isSelected && !isCorrect) className += ' incorrect';
          }
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer || timer <= 0}
              className={className}
            >
              {option}
              {selectedAnswer && isCorrect && (
                <span className="check-mark"><FaCheck /></span>
              )}
            </button>
          );
        })}
      </div>
      
      {selectedAnswer && (
        <div className="feedback">
          {selectedAnswer === currentQuestion.correct_answer
            ? "Correct ! 🎉"
            : `Incorrect ! La bonne réponse était: ${currentQuestion.correct_answer}`}
        </div>
      )}
      
      {opponentAnswer && (
        <div className="opponent-status">
          Votre adversaire a répondu: {opponentAnswer}
        </div>
      )}
    </div>
  );

  const renderResults = () => (
    <div className="results-container">
      <h2>Résultats finaux</h2>
      <div className="players-results">
        <div className="player-result">
          <FaUser /> {battle.player1}: {battle.scores[battle.player1] || 0} points
          {battle.scores[battle.player1] > (battle.scores[battle.player2] || 0) && (
            <span className="winner-badge">Gagnant !</span>
          )}
        </div>
        {battle.player2 && (
          <div className="player-result">
            <FaUser /> {battle.player2}: {battle.scores[battle.player2] || 0} points
            {battle.scores[battle.player2] > battle.scores[battle.player1] && (
              <span className="winner-badge">Gagnant !</span>
            )}
          </div>
        )}
      </div>
      <button onClick={goHome} className="home-btn">
        <FaHome /> Retour à l'accueil
      </button>
    </div>
  );

  return (
    <div className="battle-container">
      {!battle ? (
        renderSetupScreen()
      ) : battle.status === "waiting" ? (
        renderWaitingRoom()
      ) : battle.status === "playing" && currentQuestion ? (
        renderQuestion()
      ) : battle.status === "finished" ? (
        renderResults()
      ) : null}
    </div>
  );
  
};

// Styles CSS
const styles = `
.battle-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.battle-setup {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: all 0.3s;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.battle-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.create-btn {
  background: #4CAF50;
  color: white;
}

.join-btn {
  background: #2196F3;
  color: white;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.separator {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}

.waiting-room {
  text-align: center;
}

.battle-code {
  font-family: monospace;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.players-list {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.player {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 8px;
}

.waiting-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #666;
}

.question-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.timer {
  background: #333;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
}

.timer.warning {
  background: #f44336;
  animation: pulse 0.5s infinite alternate;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
}

.option-btn {
  position: relative;
  padding: 12px;
  background: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.option-btn:hover:not(:disabled) {
  background: #e0e0e0;
}

.option-btn:disabled {
  cursor: not-allowed;
}

.option-btn.correct {
  background: #4CAF50;
  color: white;
}

.option-btn.incorrect {
  background: #f44336;
  color: white;
  opacity: 0.7;
}

.check-mark {
  position: absolute;
  right: 10px;
}

.feedback {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
  background: #f5f5f5;
  text-align: center;
}

.opponent-status {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #e3f2fd;
  border-radius: 8px;
  text-align: center;
  color: #0d47a1;
}

.results-container {
  text-align: center;
}

.players-results {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.player-result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 1.1rem;
}

.winner-badge {
  background: #4CAF50;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.home-btn {
  width: 100%;
  background: #333;
  color: white;
  margin-top: 2rem;
}

.error-message {
  color: #f44336;
  text-align: center;
  margin-top: 1rem;
}

@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin {
  animation: spin 1s linear infinite;
}
`;

// Ajouter les styles au document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);



export default Battle;