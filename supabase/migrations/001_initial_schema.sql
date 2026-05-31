-- Migration initiale : tables du QuizMaster
-- Date: 2026-05-31

-- ============================================================
-- Table: leaderboard
-- Stocke les scores du mode solo
-- ============================================================
CREATE TABLE IF NOT EXISTS leaderboard (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour le classement trié par score
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard (score DESC);

-- ============================================================
-- Table: battles
-- Stocke les parties en mode battle (1v1 en temps réel)
-- ============================================================
CREATE TABLE IF NOT EXISTS battles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player1 TEXT NOT NULL,
  player2 TEXT,
  status TEXT NOT NULL DEFAULT 'waiting'
    CHECK (status IN ('waiting', 'playing', 'finished')),
  current_question INTEGER NOT NULL DEFAULT 0,
  question_started_at TIMESTAMPTZ,  -- utilisée pour synchroniser le timer entre les deux joueurs
  scores JSONB NOT NULL DEFAULT '{}',
  questions JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour retrouver une battle par statut
CREATE INDEX IF NOT EXISTS idx_battles_status ON battles (status);

-- ============================================================
-- Table: battle_answer
-- Stocke les réponses individuelles de chaque joueur dans une battle
-- ============================================================
CREATE TABLE IF NOT EXISTS battle_answer (
  id BIGSERIAL PRIMARY KEY,
  battle_id UUID NOT NULL REFERENCES battles(id) ON DELETE CASCADE,
  player TEXT NOT NULL,
  question_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour récupérer les réponses d'une battle
CREATE INDEX IF NOT EXISTS idx_battle_answer_battle ON battle_answer (battle_id);

-- ============================================================
-- Realtime : active la réplication pour les battles
-- (nécessaire pour le mode multijoueur en temps réel)
-- ============================================================
-- À décommenter si tu utilises l'API Supabase Realtime :
-- ALTER PUBLICATION supabase_realtime ADD TABLE battles;
