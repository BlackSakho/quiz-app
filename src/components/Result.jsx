import React from 'react';

const Result = ({ score, total, restartQuiz }) => {
    // Déterminer le niveau en fonction du score
    const getLevel = (score) => {
        if (score <= 20) {
            return { level: "Diangal gua bagn", stars: "★☆☆☆☆" };
        } else if (score <= 40) {
            return { level: "Tu peux faire mieux touti effort rek", stars: "★★☆☆☆" };
        } else if (score <= 60) {
            return { level: "Nandite yi na ame moyenne rek", stars: "★★★☆☆" };
        } else if (score <= 80) {
            return { level: "Niveau AKK", stars: "★★★★☆" };
        } else {
            return { level: "Nit gue ioe?", stars: "★★★★★" };
        }
    };

    // Appeler la fonction pour obtenir le niveau et les étoiles
    const { level, stars } = getLevel(score);

    return (
        <div className='App'>
            <h1>Résultat</h1>
            <p>Vous avez obtenu {score} / {total} points.</p>
            <p>Niveau : <strong>{level}</strong></p>
            <p className='stars'>Étoiles : <strong>{stars}</strong></p>
            <button onClick={restartQuiz}>Rejouer</button>
        </div>
    );
};

export default Result;
