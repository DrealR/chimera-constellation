// src/memory/supabase.js
// Logs all conversations and provides memory retrieval
// Table: constellation_logs (create this in Supabase)

import { createClient } from '@supabase/supabase-js';

let supabase = null;

export function initSupabase() {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    console.log('✅ Supabase connected (memory layer active)');
    return true;
  }
  console.log('⚠️  Supabase not configured (running without memory)');
  return false;
}

// Log a conversation exchange
export async function logConversation({ 
  crewMember, 
  channel, 
  userId, 
  userName, 
  userMessage, 
  aiResponse, 
  model, 
  provider 
}) {
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from('constellation_logs')
      .insert({
        crew_member: crewMember,
        channel,
        user_id: userId,
        user_name: userName,
        user_message: userMessage,
        ai_response: aiResponse,
        model,
        provider,
        created_at: new Date().toISOString()
      });
    
    if (error) console.error('Log error:', error.message);
    return data;
  } catch (err) {
    console.error('Supabase log failed:', err.message);
    return null;
  }
}

// Get recent conversation history for a crew member (isolated per user)
export async function getRecentHistory(crewMember, userId, limit = 10) {
  if (!supabase) return [];
  
  try {
    const { data, error } = await supabase
      .from('constellation_logs')
      .select('user_message, ai_response, created_at')
      .eq('crew_member', crewMember)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('History fetch error:', error.message);
      return [];
    }
    
    // Return in chronological order
    return (data || []).reverse().flatMap(row => [
      { role: 'user', content: row.user_message },
      { role: 'assistant', content: row.ai_response }
    ]);
  } catch (err) {
    console.error('History fetch failed:', err.message);
    return [];
  }
}

// SQL to create the table (run this in Supabase SQL editor):
/*
CREATE TABLE constellation_logs (
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

CREATE INDEX idx_crew_member ON constellation_logs(crew_member);
CREATE INDEX idx_created_at ON constellation_logs(created_at DESC);
*/
