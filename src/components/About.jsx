import React from "react";
import { FaGamepad, FaUser, FaUsers, FaStar, FaQuestionCircle } from "react-icons/fa";

const About = () => (
  <div className="about-container">
    <div className="about-card">
      <div className="about-icon">
        <FaGamepad />
      </div>
      <h1>À propos</h1>
      <p>
        <strong>QuizMaster</strong> — une application de quiz moderne pour
        tester vos connaissances en culture générale. Développé par{" "}
        <strong>Blacksakho</strong>.
      </p>

      <div className="about-section">
        <h2>Mode Solo</h2>
        <div className="about-steps">
          <div className="about-step">
            <span className="about-step-number">
              <FaUser />
            </span>
            <span className="about-step-text">
              Lancez une partie depuis l'accueil. 30 questions aléatoires vous
            sont posées avec un <strong>timer de 30s</strong> par question.
            </span>
          </div>
          <div className="about-step">
            <span className="about-step-number">
              <FaStar />
            </span>
            <span className="about-step-text">
              Gagnez des points à chaque bonne réponse. Attention :{" "}
              <strong>3 mauvaises réponses</strong> et la partie s'arrête.
            </span>
          </div>
          <div className="about-step">
            <span className="about-step-number">
              <FaQuestionCircle />
            </span>
            <span className="about-step-text">
              À la fin, découvrez votre <strong>niveau</strong> (Débutant →
              Maître) avec un badge (Bronze → Diamant) et un score sur 5
              étoiles.
            </span>
          </div>
          <div className="about-step">
            <span className="about-step-number">
              <FaUser />
            </span>
            <span className="about-step-text">
              Enregistrez votre score dans le <strong>classement global</strong>{" "}
              pour comparer vos performances.
            </span>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>Mode Battle</h2>
        <div className="about-steps">
          <div className="about-step">
            <span className="about-step-number">
              <FaUsers />
            </span>
            <span className="about-step-text">
              Affrontez un adversaire en <strong>temps réel</strong> : créez ou
              rejoignez une partie avec un code.
            </span>
          </div>
          <div className="about-step">
            <span className="about-step-number">
              <FaQuestionCircle />
            </span>
            <span className="about-step-text">
              Choisissez le <strong>nombre de questions</strong> (5 à 100). Les
              deux joueurs voient les mêmes questions en simultané.
            </span>
          </div>
          <div className="about-step">
            <span className="about-step-number">
              <FaStar />
            </span>
            <span className="about-step-text">
              <strong>Bonne réponse</strong> → la question suivante arrive
              immédiatement. <strong>Mauvaise réponse</strong> → on attend la
              réponse de l'adversaire.
            </span>
          </div>
          <div className="about-step">
            <span className="about-step-number">
              <FaGamepad />
            </span>
            <span className="about-step-text">
              Le <strong>timer de 30s</strong> est synchronisé entre les deux
              joueurs. En cas de timeout, la question est automatiquement
              passée.
            </span>
          </div>
        </div>
      </div>

      <div className="about-section" style={{ marginTop: 0 }}>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.85rem",
            marginTop: "16px",
          }}
        >
          QuizMaster v1.0 &mdash; React 19 + Supabase
        </p>
      </div>
    </div>
  </div>
);

export default About;
