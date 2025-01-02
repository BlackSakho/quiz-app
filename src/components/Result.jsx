import React from 'react';
import backgroundImage from './assets/images/banner.jpg';


const Result = ({ score, total, restartQuiz }) => {
    return (
        <div className='App'>
            <h1>Résultat</h1>
            <p>Vous avez obtenu {score} / {total} points.</p>
            <button onClick={restartQuiz}>Rejouer</button>
        </div>
    );
};

export default Result;
