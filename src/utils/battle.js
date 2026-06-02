import { supabase } from "./supabaseClient";
import { questions } from "../data/questions";
import { filterByCategory } from "./categories";

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function getRandomQuestions(questionPool, count) {
  const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((q, index) => {
    const shuffledAnswers = [...q.answers].sort(() => 0.5 - Math.random());
    return {
      id: `q_${Date.now()}_${index}_${Math.random()
        .toString(36)
        .substring(2, 9)}`,
      question: q.question,
      options: shuffledAnswers.map((a) => a.text),
      correct_answer: shuffledAnswers.find((a) => a.isCorrect).text,
    };
  });
}

export async function createBattle(playerName, questionCount = 5, category = null) {
  const pool = category ? filterByCategory(questions, category) : questions;
  if (pool.length < 1) throw new Error("Aucune question disponible pour cette catégorie");
  const selectedQuestions = getRandomQuestions(pool, Math.min(questionCount, pool.length));
  let code = generateCode();
  const { data, error } = await supabase
    .from("battles")
    .insert([{
      code,
      player1: playerName,
      status: "waiting",
      current_question: 0,
      scores: { [playerName]: 0 },
      questions: selectedQuestions,
      question_started_at: null,
      created_at: new Date().toISOString(),
    }])
    .select();

  if (error) {
    console.error("Erreur création battle:", error);
    throw new Error("Impossible de créer la partie");
  }
  return data ? data[0] : null;
}

export async function joinBattle(code, playerName) {
  const { data: existing, error: fetchError } = await supabase
    .from("battles")
    .select("*")
    .eq("code", code.toUpperCase())
    .single();

  if (fetchError || !existing) throw new Error("Battle introuvable");
  if (existing.status !== "waiting") throw new Error("Cette partie n'est plus disponible");
  if (existing.player2) throw new Error("Cette partie est déjà complète");

  const updatedScores = { ...existing.scores, [playerName]: 0 };

  const { data, error: updateError } = await supabase
    .from("battles")
    .update({
      player2: playerName,
      status: "playing",
      scores: updatedScores,
      question_started_at: new Date().toISOString(),
    })
    .eq("id", existing.id)
    .select();

  if (updateError) {
    console.error("Erreur mise à jour battle:", updateError);
    throw new Error("Impossible de rejoindre la partie");
  }
  return data ? data[0] : null;
}

// ===== Nouvelle logique de soumission et d'avancement =====

export async function submitAnswer(
  battleId,
  playerName,
  questionId,
  answer,
  isCorrect,
  questionIndex
) {
  // Vérifier si le joueur a déjà répondu à cette question
  const { data: existing } = await supabase
    .from("battle_answer")
    .select("id")
    .eq("battle_id", battleId)
    .eq("player", playerName)
    .eq("question_id", questionId);

  if (existing && existing.length > 0) {
    return { advanced: false, alreadyAnswered: true };
  }

  // 1. Enregistrer la réponse
  const { error: answerError } = await supabase
    .from("battle_answer")
    .insert([{
      battle_id: battleId,
      player: playerName,
      question_id: questionId,
      answer,
      is_correct: isCorrect,
      timestamp: new Date().toISOString(),
    }]);

  if (answerError) {
    console.error("Erreur sauvegarde réponse:", answerError);
    throw new Error("Impossible de sauvegarder la réponse");
  }

  // 2. Mettre à jour le score si bonne réponse
  if (isCorrect) {
    const { data: battle } = await supabase
      .from("battles")
      .select("scores")
      .eq("id", battleId)
      .single();

    if (battle) {
      const newScores = {
        ...battle.scores,
        [playerName]: (battle.scores[playerName] || 0) + 1,
      };
      await supabase.from("battles").update({ scores: newScores }).eq("id", battleId);
    }
  }

  // 3. Essayer d'avancer (atomique via .eq sur current_question)
  const advanced = await tryAdvance(battleId, questionIndex);
  return { advanced, alreadyAnswered: false };
}

async function tryAdvance(battleId, questionIndex) {
  const { data: battle } = await supabase
    .from("battles")
    .select("*")
    .eq("id", battleId)
    .single();

  if (!battle) return false;
  if (battle.current_question !== questionIndex) return false;
  if (battle.current_question >= battle.questions.length) return false;

  const players = [battle.player1, battle.player2].filter(Boolean);
  const currentQ = battle.questions[questionIndex];

  // Récupérer les réponses des joueurs pour cette question
  const { data: answers } = await supabase
    .from("battle_answer")
    .select("player, is_correct")
    .eq("battle_id", battleId)
    .eq("question_id", currentQ.id);

  const answeredPlayers = new Set(answers.map(a => a.player));
  const anyCorrect = answers.some(a => a.is_correct);
  const bothAnswered = answeredPlayers.size === players.length;

  // Conditions pour avancer :
  // - Quelqu'un a répondu correctement → avance immédiatement
  // - Les deux ont répondu (même faux) → avance
  if (!anyCorrect && !bothAnswered) return false;

  const isLast = questionIndex + 1 >= battle.questions.length;

  const updateData = isLast
    ? { status: "finished" }
    : {
        current_question: questionIndex + 1,
        question_started_at: new Date().toISOString(),
      };

  // Mise à jour atomique : ne réussit que si current_question n'a pas changé
  const { data, error } = await supabase
    .from("battles")
    .update(updateData)
    .eq("id", battleId)
    .eq("current_question", questionIndex)
    .select();

  if (error || !data || data.length === 0) return false;
  return true;
}

// Gardé pour compatibilité avec d'éventuels appels externes
export async function nextQuestion(battleId) {
  const { data: battle } = await supabase
    .from("battles")
    .select("current_question, questions")
    .eq("id", battleId)
    .single();

  if (!battle) return null;

  const nextQ = battle.current_question + 1;
  const isLast = nextQ >= battle.questions.length;

  const { data } = await supabase
    .from("battles")
    .update(isLast
      ? { status: "finished" }
      : { current_question: nextQ, question_started_at: new Date().toISOString() }
    )
    .eq("id", battleId)
    .eq("current_question", battle.current_question)
    .select();

  return data ? data[0] : null;
}

export async function endBattle(battleId) {
  const { data } = await supabase
    .from("battles")
    .update({ status: "finished" })
    .eq("id", battleId)
    .select();
  return data ? data[0] : null;
}
