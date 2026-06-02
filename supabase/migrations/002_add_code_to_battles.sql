-- Ajoute la colonne `code` à la table battles pour les codes courts (6 caractères)

ALTER TABLE battles ADD COLUMN IF NOT EXISTS code TEXT UNIQUE;

-- Pour les parties existantes sans code, génère un code à rebours
UPDATE battles
SET code = upper(substr(md5(random()::text || id::text), 1, 6))
WHERE code IS NULL;

-- Rend la colonne NOT NULL une fois toutes les lignes remplies
ALTER TABLE battles ALTER COLUMN code SET NOT NULL;

-- Index pour la recherche par code
CREATE INDEX IF NOT EXISTS idx_battles_code ON battles (code);
