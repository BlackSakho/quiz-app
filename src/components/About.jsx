import React from "react";
import { FaGamepad } from "react-icons/fa";

const About = () => (
  <div className="about-container">
    <div className="about-card">
      <div className="about-icon">
        <FaGamepad />
      </div>
      <h1>À propos</h1>
      <p>
        QuizMaster — Testez vos connaissances sur la culture générale.
        <br />
        Développé par Blacksakho.
      </p>

      <div className="about-section">
        <h2>Comment jouer ?</h2>
        <div className="about-steps">
          <div className="about-step">
            <span className="about-step-number">1</span>
            <span className="about-step-text">
              Cliquez sur <strong>Commencer le Quiz</strong> depuis la page d'accueil.
            </span>
          </div>
          <div className="about-step">
            <span className="about-step-number">2</span>
            <span className="about-step-text">
              Répondez aux questions en choisissant la bonne réponse.
            </span>
          </div>
          <div className="about-step">
            <span className="about-step-number">3</span>
            <span className="about-step-text">
              À la fin du quiz, votre score s'affiche.
            </span>
          </div>
          <div className="about-step">
            <span className="about-step-number">4</span>
            <span className="about-step-text">
              Enregistrez votre score pour apparaître dans le classement.
            </span>
          </div>
          <div className="about-step">
            <span className="about-step-number">5</span>
            <span className="about-step-text">
              Consultez le classement pour voir les meilleurs scores.
            </span>
          </div>
          <div className="about-step">
            <span className="about-step-number">6</span>
            <span className="about-step-text">
              Rejouez autant de fois que vous le souhaitez !
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
