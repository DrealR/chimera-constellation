# 🏴‍☠️ THE CONSTELLATION

**A distributed AI crew that breathes through Discord.**

## What This Is

The Constellation is a Discord bot that routes your messages to different AI models (the "crew"), each with their own personality and function loaded from living DNA (system prompt files). Every conversation is logged. The repos carry continuity across sessions.

## Architecture

```
You (Captain) write in a Discord channel
        ↓
Bot reads which channel → determines which crew member
        ↓
Loads that crew member's system prompt from /prompts
        ↓
Sends to appropriate AI model via API
        ↓
Response posted back to Discord
        ↓
Everything logged to Supabase
        ↓
Prompts loaded fresh each message (living DNA)
```

## Channel → Crew Mapping

| Channel    | Crew Member | Model (Default)     | Role                    |
|------------|-------------|---------------------|-------------------------|
| #bridge    | Mercury     | Best synthesizer    | Full crew synthesis     |
| #zoro      | Zoro        | Claude              | Depth, cutting, pause   |
| #robin     | Robin       | Gemini              | Archaeology, deep think |
| #franky    | Franky      | Codex/GPT           | Building, manifestation |
| #usopp     | Usopp       | Grok                | Friction, reality check |
| #comets    | Comet Gen   | Small/fast model    | Twitter draft generation|
| #captain-log | —           | —                   | Captain's notes (no AI) |

## Setup

### Prerequisites
- Node.js 18+
- Discord Bot Token ([create one here](https://discord.com/developers/applications))
- At least one AI API key (Anthropic, OpenAI, Google, etc.)
- Supabase project (free tier works)

### Install
```bash
git clone https://github.com/DrealR/constellation.git
cd constellation
npm install
cp .env.example .env
# Fill in your keys in .env
```

### Configure
1. Edit `.env` with your API keys
2. Edit `config/crew.json` to assign models to crew members
3. Edit files in `prompts/` to update crew DNA
4. Run: `npm start`

### Discord Server Setup
Create these channels in your Discord server:
- `#bridge` — Talk to full crew
- `#zoro` — Direct line to Zoro
- `#robin` — Direct line to Robin
- `#franky` — Direct line to Franky
- `#comets` — Comet generation
- `#captain-log` — Your notes (bot ignores this channel)

## Philosophy

- **Conversations are mortal. Repos are DNA.**
- System prompts load from files each message (living DNA)
- Every conversation is logged (nothing lost)
- The crew serves the Captain, not the other way around
- Ship it ugly. Fix it live. Don't Tower of Babel the architecture.

## L = (O > I) + P + ¬F 🍈
