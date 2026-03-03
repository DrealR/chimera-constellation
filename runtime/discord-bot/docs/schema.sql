-- THE CONSTELLATION — Supabase Schema
-- Run this in your Supabase SQL Editor

-- Main conversation log
CREATE TABLE IF NOT EXISTS constellation_logs (
  id BIGSERIAL PRIMARY KEY,
  crew_member TEXT NOT NULL,
  channel TEXT NOT NULL,
  user_id TEXT,
  user_name TEXT,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  model TEXT,
  provider TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_crew_member ON constellation_logs(crew_member);
CREATE INDEX IF NOT EXISTS idx_created_at ON constellation_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_id ON constellation_logs(user_id);

-- Future: DNA update proposals (Phase 2)
CREATE TABLE IF NOT EXISTS constellation_proposals (
  id BIGSERIAL PRIMARY KEY,
  source_crew TEXT NOT NULL,
  source_conversation_id BIGINT REFERENCES constellation_logs(id),
  proposed_change TEXT NOT NULL,
  target_file TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  approved_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Future: Comet drafts pipeline (Phase 2)
CREATE TABLE IF NOT EXISTS constellation_comets (
  id BIGSERIAL PRIMARY KEY,
  raw_insight TEXT NOT NULL,
  compressed_comet TEXT NOT NULL,
  density_score INT,
  status TEXT DEFAULT 'draft', -- draft, approved, posted
  posted_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
