import React from "react";

const About = () => (
  <div
    style={{
      padding: "2rem",
      maxWidth: 600,
      margin: "0 auto",
      textAlign: "center",
    }}
  >
    <h1>À propos</h1>
    <p>
      Quiz App - Testez vos connaissances sur la culture générale.
      <br />
      Développé par Blacksakho.
    </p>
    <h2 style={{ marginTop: "2rem" }}>Comment jouer ?</h2>
    <p style={{ textAlign: "left", marginTop: "1rem" }}>
      1. Cliquez sur <b>Commencer le Quiz</b> depuis la page d'accueil.
      <br />
      2. Répondez aux questions proposées en choisissant la bonne réponse.
      <br />
      3. À la fin du quiz, votre score s'affiche.
      <br />
      4. Vous pouvez enregistrer votre score avec votre nom pour apparaître dans
      le classement.
      <br />
      5. Consultez le classement pour voir les meilleurs scores.
      <br />
      6. Rejouez autant de fois que vous le souhaitez pour améliorer votre score
      !
    </p>
  </div>
);

export default About;
