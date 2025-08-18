import { supabase } from "./supabaseClient";
import { questions } from "../data/questions";

// Fonction pour obtenir des questions aléatoires
function getRandomQuestions(questionPool, count) {
  const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(q => ({
    id: Math.random().toString(36).substring(7),
    question: q.question,
    options: q.answers.map(a => a.text),
    correct_answer: q.answers.find(a => a.isCorrect).text
  }));
}

// Créer une battle avec des questions aléatoires
export async function createBattle(playerName) {
  const selectedQuestions = getRandomQuestions(questions, 5);
  
  const { data } = await supabase
    .from("battles")
    .insert([{
      player1: playerName,
      status: "waiting",
      current_question: 0,
      scores: { [playerName]: 0 },
      questions: selectedQuestions
    }])
    .select();
  return data ? data[0] : null;
}

// Rejoindre une battle existante
export async function joinBattle(battleId, playerName) {
  // D'abord récupérer la battle existante pour obtenir les scores actuels
  const { data: existingBattle } = await supabase
    .from("battles")
    .select("scores")
    .eq("id", battleId)
    .single();

  const updatedScores = {
    ...existingBattle.scores,
    [playerName]: 0
  };

  const { data } = await supabase
    .from("battles")
    .update({
      player2: playerName,
      status: "playing",
      scores: updatedScores
    })
    .eq("id", battleId)
    .select();
  return data ? data[0] : null;
}

// Obtenir les informations d'une battle
export async function getBattle(battleId) {
  const { data } = await supabase
    .from("battles")
    .select("*")
    .eq("id", battleId)
    .single();
  return data;
}

// Soumettre une réponse
export async function submitAnswer(battleId, playerName, questionId, answer, isCorrect) {
  // Enregistrer la réponse dans la table battle_answers
  const { error } = await supabase
    .from("battle_answers")
    .insert([{
      battle_id: battleId,
      player: playerName,
      question_id: questionId,
      answer: answer,
      is_correct: isCorrect,
      timestamp: new Date().toISOString()
    }]);

  if (error) {
    console.error("Error saving answer:", error);
    return false;
  }

  // Mettre à jour le score si la réponse est correcte
  if (isCorrect) {
    const { data: battle } = await supabase
      .from("battles")
      .select("scores")
      .eq("id", battleId)
      .single();

    const newScores = {
      ...battle.scores,
      [playerName]: (battle.scores[playerName] || 0) + 1
    };

    await supabase
      .from("battles")
      .update({ scores: newScores })
      .eq("id", battleId);
  }

  return true;
}

// Passer à la question suivante
export async function nextQuestion(battleId) {
  const { data: battle } = await supabase
    .from("battles")
    .select("current_question, questions")
    .eq("id", battleId)
    .single();

  const nextQuestionNum = battle.current_question + 1;
  
  // Vérifier si c'est la dernière question
  const newStatus = nextQuestionNum >= battle.questions.length ? "finished" : "playing";
  
  const { data } = await supabase
    .from("battles")
    .update({ 
      current_question: nextQuestionNum,
      status: newStatus
    })
    .eq("id", battleId)
    .select();
  
  return data ? data[0] : null;
}

// Terminer une battle
export async function endBattle(battleId) {
  const { data } = await supabase
    .from("battles")
    .update({ status: "finished" })
    .eq("id", battleId)
    .select();
  return data ? data[0] : null;
}