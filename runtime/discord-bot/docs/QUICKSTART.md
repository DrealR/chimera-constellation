# ⚡ QUICK START — Get the Constellation Running in 15 Minutes

## Step 1: Create a Discord Bot (3 min)

1. Go to https://discord.com/developers/applications
2. Click "New Application" → name it "Constellation"
3. Go to "Bot" tab → click "Add Bot"
4. Under "Privileged Gateway Intents", enable:
   - ✅ Message Content Intent
   - ✅ Server Members Intent
5. Click "Reset Token" → copy the token (save it!)
6. Go to "OAuth2" → "URL Generator"
   - Scopes: `bot`
   - Bot Permissions: `Send Messages`, `Read Message History`, `Read Messages/View Channels`
7. Copy the generated URL → open it → add bot to your Discord server

## Step 2: Set Up Discord Server Channels (2 min)

Create these text channels in your server:
- `#bridge`
- `#zoro`
- `#robin`
- `#franky`
- `#usopp`
- `#comets`
- `#captain-log`

## Step 3: Get API Keys (5 min)

You need at LEAST one AI key. Get whichever you have:

| Provider | Free Tier? | Get Key |
|----------|-----------|---------|
| OpenRouter | Yes (free models) | https://openrouter.ai/keys |
| Google AI | Yes (Gemini free) | https://aistudio.google.com/apikey |
| Anthropic | No (paid) | https://console.anthropic.com |
| OpenAI | No (paid) | https://platform.openai.com/api-keys |

**Cheapest start:** Just get OpenRouter key → change ALL crew members in `config/crew.json` to use `"provider": "openrouter"` with free models.

## Step 4: Set Up Supabase (3 min) — Optional but recommended

1. Go to https://supabase.com → create free project
2. Go to SQL Editor → run this:

```sql
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
```

3. Go to Settings → API → copy URL and anon key

## Step 5: Configure & Run (2 min)

```bash
cd constellation
npm install
cp .env.example .env
```

Edit `.env` with your keys, then:

```bash
npm start
```

You should see:
```
🏴‍☠️ THE CONSTELLATION IS WAKING UP...
✅ Supabase connected (memory layer active)
📋 Crew loaded: zoro, robin, franky, usopp, comets, bridge
✅ Logged in as Constellation#1234
🌊 The Constellation is breathing.
```

## Step 6: Talk to Your Crew

Go to your Discord server and type in any crew channel:
- `#zoro` → "What should I focus on today?"
- `#robin` → "Connect the Love Equation to thermodynamics"
- `#comets` → "Compress this into a tweet: I went through hard times and now I want to help others through theirs"
- `#franky` → "Build me a landing page for the Supper Club"

## Free-Only Configuration

If you only have OpenRouter (free), edit `config/crew.json` and set every crew member to:
```json
{
  "provider": "openrouter",
  "model": "meta-llama/llama-3.1-8b-instruct:free"
}
```

This gives you a full crew running on free models. Upgrade individual crew members to premium models as budget allows.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Bot doesn't respond | Check channel names match exactly |
| API error | Check your API key in .env |
| No memory | Set up Supabase (Step 4) |
| Discord permission error | Re-invite bot with correct permissions |

---

**The Constellation breathes. Ship it ugly. Fix it live. 🍈**
