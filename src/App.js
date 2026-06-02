import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Leaderboard from "./components/Leaderboard";
import About from "./components/About";
import Battle from "./components/Battle";
import {
  FaHome,
  FaTrophy,
  FaInfoCircle,
  FaGamepad,
  FaBars,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { questions } from "./data/questions";
import { supabase } from "./utils/supabaseClient";
import "./index.css";

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [step, setStep] = useState("home");
  const [leaderboard, setLeaderboard] = useState([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("quiz-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("quiz-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const startQuiz = () => setStep("quiz");
  const finishQuiz = (finalScore, total) => {
    setScore(finalScore);
    setTotalQuestions(total);
    setStep("result");
  };
  const restartQuiz = () => {
    setScore(0);
    setTotalQuestions(0);
    setStep("home");
  };

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

  const saveScore = async (name, score) => {
    const { error: insertError } = await supabase.from("leaderboard").insert([{ name, score }]);
    if (insertError) throw new Error(insertError.message);
    const { data, error: fetchError } = await supabase
      .from("leaderboard")
      .select("*")
      .order("score", { ascending: false });
    if (!fetchError && data) setLeaderboard(data);
  };

  const goLeaderboard = () => setStep("leaderboard");
  const goHome = () => setStep("home");
  const goAbout = () => setStep("about");
  const goBattle = () => setStep("battle");

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand" onClick={goHome}>
            <FaGamepad className="navbar-brand-icon" />
            <span className="navbar-brand-gradient">QuizMaster</span>
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

          <div className="navbar-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Changer le thème">
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
            <button
              className="navbar-toggle"
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="navbar-mobile">
            <button
              className={`nav-link ${step === "home" ? "active" : ""}`}
              onClick={() => { goHome(); setMobileMenuOpen(false); }}
            >
              <FaHome className="nav-icon" />
              <span>Accueil</span>
            </button>
            <button
              className={`nav-link ${step === "leaderboard" ? "active" : ""}`}
              onClick={() => { goLeaderboard(); setMobileMenuOpen(false); }}
            >
              <FaTrophy className="nav-icon" />
              <span>Classement</span>
            </button>
            <button
              className={`nav-link ${step === "about" ? "active" : ""}`}
              onClick={() => { goAbout(); setMobileMenuOpen(false); }}
            >
              <FaInfoCircle className="nav-icon" />
              <span>À propos</span>
            </button>
          </div>
        )}
      </nav>

      <main className="main-content">
        {step === "home" && (
          <Home
            startQuiz={startQuiz}
            goBattle={goBattle}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        {step === "quiz" && (
          <Quiz questions={questions} onFinish={finishQuiz} selectedCategory={selectedCategory} />
        )}
        {step === "result" && (
          <Result
            score={score}
            total={totalQuestions}
            restartQuiz={restartQuiz}
            saveScore={saveScore}
            goLeaderboard={goLeaderboard}
          />
        )}
        {step === "leaderboard" && (
          <Leaderboard leaderboard={leaderboard} goHome={goHome} />
        )}
        {step === "about" && <About />}
        {step === "battle" && <Battle goHome={goHome} selectedCategory={selectedCategory} />}
      </main>
    </div>
  );
};

export default App;
