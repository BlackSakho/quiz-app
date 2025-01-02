import React, { useState, useEffect } from 'react';

// Fonction pour mélanger un tableau (Fisher-Yates shuffle)
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Échanger les éléments
    }
    return array;
};

const Quiz = ({ questions, onFinish }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0); // Suivi de la question actuelle
    const [score, setScore] = useState(0); // Score de l'utilisateur
    const [mistakes, setMistakes] = useState(0); // Nombre d'erreurs
    const [timeLeft, setTimeLeft] = useState(30); // Compte à rebours
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // Afficher la bonne réponse si l'utilisateur se trompe
    const [answered, setAnswered] = useState(false); // Si une réponse a été donnée
    const [shuffledQuestions, setShuffledQuestions] = useState([]); // Questions mélangées

    useEffect(() => {
        // Mélanger les questions et les réponses au début
        const shuffled = shuffleArray(questions).map(question => ({
            ...question,
            answers: shuffleArray(question.answers)
        }));
        setShuffledQuestions(shuffled);
    }, [questions]);

    useEffect(() => {
        if (timeLeft > 0 && !answered) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer); // Nettoyer le timer à chaque changement
        }
        if (timeLeft === 0 && !answered) {
            // Si le temps est écoulé sans réponse, on passe à la question suivante et on montre la bonne réponse
            setAnswered(true);
            setShowCorrectAnswer(true);
        }
    }, [timeLeft, answered]);

    const handleAnswer = (isCorrect) => {
        if (answered) return; // Si la question a déjà été répondue, on ne fait rien

        setAnswered(true);
        if (isCorrect) {
            setScore(score + 1); // Augmenter le score si la réponse est correcte
        } else {
            setMistakes(mistakes + 1); // Augmenter le nombre d'erreurs
            setShowCorrectAnswer(true); // Afficher la bonne réponse en cas d'erreur
        }

        // Si l'utilisateur a 3 erreurs, le jeu se termine
        if (mistakes + 1 >= 3 && !isCorrect) {
            onFinish(score); // Appeler la fonction de fin avec le score final
            return;
        }
    };

    const nextQuestion = () => {
        setShowCorrectAnswer(false);
        setAnswered(false);
        setTimeLeft(30); // Réinitialiser le timer
        if (currentQuestion + 1 < shuffledQuestions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            onFinish(score); // Fin du quiz si toutes les questions sont terminées
        }
    };

    return (
        <div className="App">
            <div>
                <h2 style={{ textAlign: 'center', fontSize: '24px', marginTop: '20px', marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>
                    Question {currentQuestion + 1} / {shuffledQuestions.length}
                </h2>
                <p>{shuffledQuestions[currentQuestion]?.question}</p>
                {shuffledQuestions[currentQuestion]?.answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(answer.isCorrect)}
                        style={{
                            margin: '5px',
                            padding: '10px',
                            fontSize: '16px',
                            backgroundColor: answered
                                ? answer.isCorrect
                                    ? '#4CAF50' // Correct answer
                                    : '#f44336' // Incorrect answer
                                : '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                        disabled={answered} // Désactive les boutons après la réponse
                    >
                        {answer.text}
                    </button>
                ))}
                {showCorrectAnswer && !answered && (
                    <div>
                        <p>La bonne réponse est : {shuffledQuestions[currentQuestion].answers.find(a => a.isCorrect).text}</p>
                    </div>
                )}
                <p>Erreurs : {mistakes} / 3</p>
                <p>Temps restant : {timeLeft}s</p>
                {answered && (
                    <button onClick={nextQuestion} style={{ padding: '10px', fontSize: '16px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px' }}>
                        Question suivante
                    </button>
                )}
            </div>
        </div>
    );
};

export default Quiz;
