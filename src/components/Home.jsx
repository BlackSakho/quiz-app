import React from 'react';
import backgroundImage from './assets/images/bookpii.webp';


const Home = ({ startQuiz }) => {
    return (
        <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div>
            <h1 className='home'>Bienvenue au Quiz de Culture Générale</h1>
            <button onClick={startQuiz}>Commencer le Quiz</button>
            </div>
        </div>
    );  
};

export default Home;