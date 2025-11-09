import { supabase } from "./supabaseClient";
import { questions } from "../data/questions";

// Cache pour les battles terminées
const battleCache = new Map();

// Fonction pour obtenir des questions aléatoires avec IDs uniques
function getRandomQuestions(questionPool, count) {
  const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((q, index) => ({
    id: `q_${Date.now()}_${index}_${Math.random()
      .toString(36)
      .substring(2, 9)}`,
    question: q.question,
    options: q.answers.map((a) => a.text),
    correct_answer: q.answers.find((a) => a.isCorrect).text,
  }));
}

// Créer une battle avec des questions aléatoires
export async function createBattle(playerName) {
  try {
    const selectedQuestions = getRandomQuestions(questions, 5);

    const { data, error } = await supabase
      .from("battles")
      .insert([
        {
          player1: playerName,
          status: "waiting",
          current_question: 0,
          scores: { [playerName]: 0 },
          questions: selectedQuestions,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Erreur création battle:", error);
      console.error("Détails de l'erreur:", JSON.stringify(error, null, 2));
      throw new Error("Impossible de créer la partie");
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error("Erreur dans createBattle:", error);
    throw error;
  }
}

// Rejoindre une battle existante
export async function joinBattle(battleId, playerName) {
  try {
    // D'abord récupérer la battle existante pour obtenir les scores actuels
    const { data: existingBattle, error: fetchError } = await supabase
      .from("battles")
      .select("scores, status, player2")
      .eq("id", battleId)
      .single();

    if (fetchError || !existingBattle) {
      throw new Error("Battle introuvable");
    }

    if (existingBattle.status !== "waiting") {
      throw new Error("Cette partie n'est plus disponible");
    }

    if (existingBattle.player2) {
      throw new Error("Cette partie est déjà complète");
    }

    const updatedScores = {
      ...existingBattle.scores,
      [playerName]: 0,
    };

    const { data, error: updateError } = await supabase
      .from("battles")
      .update({
        player2: playerName,
        status: "playing",
        scores: updatedScores,
      })
      .eq("id", battleId)
      .select();

    if (updateError) {
      console.error("Erreur mise à jour battle:", updateError);
      throw new Error("Impossible de rejoindre la partie");
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error("Erreur dans joinBattle:", error);
    throw error;
  }
}

// Obtenir les informations d'une battle avec cache
export async function getBattle(battleId) {
  try {
    // Vérifier le cache pour les battles terminées
    if (battleCache.has(battleId)) {
      return battleCache.get(battleId);
    }

    const { data, error } = await supabase
      .from("battles")
      .select("*")
      .eq("id", battleId)
      .single();

    if (error) {
      console.error("Erreur récupération battle:", error);
      throw new Error("Battle introuvable");
    }

    // Mettre en cache si la battle est terminée
    if (data.status === "finished") {
      battleCache.set(battleId, data);
    }

    return data;
  } catch (error) {
    console.error("Erreur dans getBattle:", error);
    throw error;
  }
}

// Soumettre une réponse avec gestion d'erreurs améliorée
export async function submitAnswer(
  battleId,
  playerName,
  questionId,
  answer,
  isCorrect
) {
  try {
    // Enregistrer la réponse dans la table battle_answers
    const { error: answerError } = await supabase.from("battle_answer").insert([
      {
        battle_id: battleId,
        player: playerName,
        question_id: questionId,
        answer: answer,
        is_correct: isCorrect,
        timestamp: new Date().toISOString(),
      },
    ]);

    if (answerError) {
      console.error("Erreur sauvegarde réponse:", answerError);
      throw new Error("Impossible de sauvegarder la réponse");
    }

    // Mettre à jour le score si la réponse est correcte
    if (isCorrect) {
      const { data: battle, error: battleError } = await supabase
        .from("battles")
        .select("scores")
        .eq("id", battleId)
        .single();

      if (battleError) {
        console.error("Erreur récupération battle pour score:", battleError);
        throw new Error("Impossible de mettre à jour le score");
      }

      const newScores = {
        ...battle.scores,
        [playerName]: (battle.scores[playerName] || 0) + 1,
      };

      const { error: updateError } = await supabase
        .from("battles")
        .update({ scores: newScores })
        .eq("id", battleId);

      if (updateError) {
        console.error("Erreur mise à jour score:", updateError);
        throw new Error("Impossible de mettre à jour le score");
      }
    }

    return true;
  } catch (error) {
    console.error("Erreur dans submitAnswer:", error);
    throw error;
  }
}

// Passer à la question suivante avec logique corrigée
export async function nextQuestion(battleId) {
  try {
    const { data: battle, error } = await supabase
      .from("battles")
      .select("current_question, questions, player1, player2")
      .eq("id", battleId)
      .single();

    if (error) {
      console.error("Erreur récupération battle pour nextQuestion:", error);
      throw new Error("Impossible de passer à la question suivante");
    }

    const nextQuestionNum = battle.current_question + 1;

    // Vérifier si c'est la dernière question
    const newStatus =
      nextQuestionNum >= battle.questions.length ? "finished" : "playing";

    const updateData = {
      current_question: nextQuestionNum,
      status: newStatus,
    };

    // Si on passe à une nouvelle question, reset le timer
    // Note: question_start_time column might not exist in the database
    // if (newStatus === "playing") {
    //   updateData.question_start_time = new Date().toISOString();
    // }

    const { data, error: updateError } = await supabase
      .from("battles")
      .update(updateData)
      .eq("id", battleId)
      .select();

    if (updateError) {
      console.error("Erreur mise à jour nextQuestion:", updateError);
      throw new Error("Impossible de passer à la question suivante");
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error("Erreur dans nextQuestion:", error);
    throw error;
  }
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
