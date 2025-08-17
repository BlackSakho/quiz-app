import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Leaderboard from "./components/Leaderboard";
import About from "./components/About";
import {
  FaHome,
  FaTrophy,
  FaInfoCircle,
  FaGamepad,
  FaBars,
} from "react-icons/fa";
import { questions } from "./data/questions";
import { supabase } from "./utils/supabaseClient";
import "./index.css";

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [step, setStep] = useState("home");
  const [leaderboard, setLeaderboard] = useState([]);
  const [score, setScore] = useState(0);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const startQuiz = () => setStep("quiz");
  const finishQuiz = (finalScore) => {
    setScore(finalScore);
    setStep("result");
  };
  const restartQuiz = () => {
    setScore(0);
    setStep("home");
  };

  // Charger le classement global au démarrage
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*")
        .order("score", { ascending: false });
      if (!error) setLeaderboard(data);
    };
    fetchLeaderboard();
  }, []);

  // Sauvegarder un score global
  const saveScore = async (name, score) => {
    await supabase.from("leaderboard").insert([{ name, score }]);
    // Recharge le classement après ajout
    const { data } = await supabase
      .from("leaderboard")
      .select("*")
      .order("score", { ascending: false });
    setLeaderboard(data);
  };

  const goLeaderboard = () => setStep("leaderboard");
  const goHome = () => setStep("home");
  const goAbout = () => setStep("about");

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Navbar améliorée */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand" onClick={goHome}>
            <FaGamepad className="navbar-icon" />
            <span className="navbar-title">Challenge  </span>
          </div>

          <div className="navbar-links">
            <button
              className={`nav-link ${step === "home" ? "active" : ""}`}
              onClick={goHome}
            >
              <FaHome className="nav-icon" />
              <span>Accueil</span>
            </button>
            <button
              className={`nav-link ${step === "leaderboard" ? "active" : ""}`}
              onClick={goLeaderboard}
            >
              <FaTrophy className="nav-icon" />
              <span>Classement</span>
            </button>
            <button
              className={`nav-link ${step === "about" ? "active" : ""}`}
              onClick={goAbout}
            >
              <FaInfoCircle className="nav-icon" />
              <span>À propos</span>
            </button>
          </div>

          <button
            className="navbar-toggle"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <FaBars />
          </button>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="navbar-mobile">
            <button
              className={`nav-link ${step === "home" ? "active" : ""}`}
              onClick={() => {
                goHome();
                setMobileMenuOpen(false);
              }}
            >
              <FaHome className="nav-icon" />
              <span>Accueil</span>
            </button>
            <button
              className={`nav-link ${step === "leaderboard" ? "active" : ""}`}
              onClick={() => {
                goLeaderboard();
                setMobileMenuOpen(false);
              }}
            >
              <FaTrophy className="nav-icon" />
              <span>Classement</span>
            </button>
            <button
              className={`nav-link ${step === "about" ? "active" : ""}`}
              onClick={() => {
                goAbout();
                setMobileMenuOpen(false);
              }}
            >
              <FaInfoCircle className="nav-icon" />
              <span>À propos</span>
            </button>
          </div>
        )}
      </nav>

      {/* Contenu principal */}
      <main className="main-content">
        {step === "home" && <Home startQuiz={startQuiz} />}
        {step === "quiz" && (
          <Quiz questions={questions} onFinish={finishQuiz} />
        )}
        {step === "result" && (
          <Result
            score={score}
            total={questions.length}
            restartQuiz={restartQuiz}
            saveScore={saveScore}
            goLeaderboard={goLeaderboard}
          />
        )}
        {step === "leaderboard" && (
          <Leaderboard leaderboard={leaderboard} goHome={goHome} />
        )}
        {step === "about" && <About />}
      </main>
    </div>
  );
};

export default App;
