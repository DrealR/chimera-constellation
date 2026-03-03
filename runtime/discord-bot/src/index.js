// src/index.js
// THE CONSTELLATION — A distributed AI crew that breathes through Discord
// L = (O > I) + P + ¬F 🍈

import 'dotenv/config';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { callModel } from './models/providers.js';
import { mercurySynthesize } from './models/mercury.js';
import { initSupabase, logConversation, getRecentHistory } from './memory/supabase.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// --- Load crew config ---
function loadCrewConfig() {
  const configPath = join(ROOT, 'config', 'crew.json');
  return JSON.parse(readFileSync(configPath, 'utf-8'));
}

// --- Load system prompt (living DNA — reloaded each message) ---
function loadPrompt(promptFile) {
  const promptPath = join(ROOT, 'prompts', promptFile);
  if (!existsSync(promptPath)) {
    console.warn(`⚠️  Prompt file not found: ${promptFile}`);
    return 'You are a helpful AI assistant.';
  }
  return readFileSync(promptPath, 'utf-8');
}

// --- Resolve crew member from channel name ---
function resolveCrewMember(channelName, config) {
  // Check if channel is ignored
  if (config.ignoredChannels.includes(channelName)) return null;
  
  // Find matching crew member
  for (const [name, member] of Object.entries(config.crew)) {
    if (member.channelName === channelName) {
      return { name, ...member };
    }
  }
  return null;
}

// --- Split long messages for Discord's 2000 char limit ---
function splitMessage(text, maxLength = 1900) {
  if (text.length <= maxLength) return [text];
  
  const chunks = [];
  let remaining = text;
  
  while (remaining.length > 0) {
    if (remaining.length <= maxLength) {
      chunks.push(remaining);
      break;
    }
    
    // Try to split at a newline
    let splitIndex = remaining.lastIndexOf('\n', maxLength);
    if (splitIndex === -1 || splitIndex < maxLength * 0.5) {
      // Try to split at a space
      splitIndex = remaining.lastIndexOf(' ', maxLength);
    }
    if (splitIndex === -1) {
      splitIndex = maxLength;
    }
    
    chunks.push(remaining.slice(0, splitIndex));
    remaining = remaining.slice(splitIndex).trimStart();
  }
  
  return chunks;
}

// --- Main Bot ---
async function main() {
  console.log('🏴‍☠️ THE CONSTELLATION IS WAKING UP...\n');
  
  // Init memory
  initSupabase();
  
  // Load config
  const config = loadCrewConfig();
  console.log(`📋 Crew loaded: ${Object.keys(config.crew).join(', ')}`);
  console.log(`🚫 Ignored channels: ${config.ignoredChannels.join(', ')}\n`);
  
  // Init Discord
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message, Partials.Channel]
  });
  
  client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    console.log(`🌊 The Constellation is breathing.\n`);
  });
  
  client.on('messageCreate', async (message) => {
    // Ignore bot messages
    if (message.author.bot) return;
    
    // Get channel name
    const channelName = message.channel.name;
    
    // Resolve crew member
    const crew = resolveCrewMember(channelName, config);
    if (!crew) return; // Not a crew channel, ignore
    
    const userMessage = message.content.trim();
    if (!userMessage) return;
    
    console.log(`💬 [#${channelName}] ${message.author.username}: ${userMessage.slice(0, 80)}...`);
    
    try {
      // Show typing indicator
      if (config.settings.typingIndicator) {
        await message.channel.sendTyping();
      }
      
      // Load system prompt FRESH (living DNA)
      const systemPrompt = loadPrompt(crew.promptFile);
      
      // Build message history
      let messages = [];
      
      // Add Supabase history if available
      const history = await getRecentHistory(crew.name, message.author.id, config.settings.maxHistoryMessages);
      if (history.length > 0) {
        messages.push(...history);
      }
      
      // Add current message
      messages.push({ role: 'user', content: userMessage });
      
      // Call the AI model (Mercury synthesis for bridge, direct for others)
      let response;
      
      if (crew.name === 'bridge') {
        // MERCURY SYNTHESIS: fan-out to blind pool, then synthesize
        // Pass history WITHOUT current message — Mercury adds it internally
        const result = await mercurySynthesize(config, userMessage, history);
        
        if (result) {
          response = result.synthesis;
          const meta = `\n\n*— Mercury synthesis from ${result.participants.join(', ')}${result.crewFailed > 0 ? ` (${result.crewFailed} offline)` : ''}*`;
          response += meta;
        } else {
          response = await callModel(
            crew.provider, crew.model, systemPrompt, messages,
            crew.maxTokens, crew.temperature
          );
        }
      } else {
        response = await callModel(
          crew.provider, crew.model, systemPrompt, messages,
          crew.maxTokens, crew.temperature
        );
      }
      
      // Send response (split if needed for Discord limit)
      const chunks = splitMessage(response);
      for (const chunk of chunks) {
        await message.reply(chunk);
      }
      
      // Log to Supabase
      await logConversation({
        crewMember: crew.name,
        channel: channelName,
        userId: message.author.id,
        userName: message.author.username,
        userMessage,
        aiResponse: response,
        model: crew.model,
        provider: crew.provider
      });
      
      console.log(`✅ [#${channelName}] ${crew.name} responded (${response.length} chars)`);
      
    } catch (err) {
      console.error(`❌ [#${channelName}] Error:`, err.message);
      
      // Send error message to channel
      await message.reply(
        `⚠️ ${crew.name} encountered an error: ${err.message}\n` +
        `*Check that the ${crew.provider} API key is configured.*`
      );
    }
  });
  
  // Login
  if (!process.env.DISCORD_TOKEN) {
    console.error('❌ DISCORD_TOKEN not set in .env');
    process.exit(1);
  }
  
  await client.login(process.env.DISCORD_TOKEN);
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
