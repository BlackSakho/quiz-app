import { supabase } from "./supabaseClient";

export async function createBattle(playerName) {
  const { data } = await supabase
    .from("battles")
    .insert([
      {
        player1: playerName,
        status: "waiting",
        current_question: 1,
        scores: { [playerName]: 0 },
      },
    ])
    .select();
  return data ? data[0] : null;
}

export async function joinBattle(battleId, playerName) {
  const { data } = await supabase
    .from("battles")
    .update({
      player2: playerName,
      status: "playing",
    })
    .eq("id", battleId)
    .select();
  return data ? data[0] : null;
}
