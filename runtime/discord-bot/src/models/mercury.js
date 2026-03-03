// src/models/mercury.js
// Mercury Synthesis — fan-out to N blind models, synthesize into one response
// The octopus brain: arms taste independently, brain decides

import { callModel } from './providers.js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

function loadPrompt(promptFile) {
  const promptPath = join(ROOT, 'prompts', promptFile);
  if (!existsSync(promptPath)) return 'You are a helpful AI assistant.';
  return readFileSync(promptPath, 'utf-8');
}

// Fan-out: send same input to multiple models blindly (no cross-visibility)
async function fanOut(blindPool, userMessage, history) {
  const promises = blindPool.map(async (member) => {
    try {
      const prompt = loadPrompt(member.promptFile);
      const messages = [...history, { role: 'user', content: userMessage }];
      const response = await callModel(
        member.provider,
        member.model,
        prompt,
        messages,
        member.maxTokens || 1024,
        member.temperature || 0.7
      );
      return { name: member.name, response, error: null };
    } catch (err) {
      return { name: member.name, response: null, error: err.message };
    }
  });

  return Promise.all(promises);
}

// Synthesize: Mercury sees only the outputs, not the original input
export async function mercurySynthesize(config, userMessage, history) {
  const bridgeConfig = config.crew.bridge;
  
  // Build blind pool from crew members (exclude bridge itself)
  const blindPool = [];
  for (const [name, member] of Object.entries(config.crew)) {
    if (name === 'bridge' || name === 'comets') continue;
    if (member.blindPool === false) continue; // opt-out flag
    blindPool.push({ name, ...member });
  }

  // If no blind pool available, fall back to single model
  if (blindPool.length === 0) {
    return null; // caller should fall back to direct call
  }

  // Fan out to all blind models
  const results = await fanOut(blindPool, userMessage, history);

  // Build synthesis prompt for Mercury
  const successfulResults = results.filter(r => r.response);
  
  if (successfulResults.length === 0) {
    return null; // all failed, caller should fall back
  }

  // Mercury only sees the crew outputs — NOT the original user message
  // This forces Mercury to synthesize patterns rather than answer directly
  const crewOutputs = successfulResults
    .map(r => `### ${r.name.toUpperCase()}:\n${r.response}`)
    .join('\n\n---\n\n');

  const failedModels = results.filter(r => r.error);
  const failureNote = failedModels.length > 0
    ? `\n\n[Note: ${failedModels.map(r => r.name).join(', ')} could not respond]`
    : '';

  const mercuryInput = `The Captain asked the crew a question. Here are their independent responses. Synthesize them according to your protocol.\n\n${crewOutputs}${failureNote}`;

  // Load Mercury's prompt
  const mercuryPrompt = loadPrompt(bridgeConfig.promptFile);

  // Mercury synthesizes
  const synthesis = await callModel(
    bridgeConfig.provider,
    bridgeConfig.model,
    mercuryPrompt,
    [{ role: 'user', content: mercuryInput }],
    bridgeConfig.maxTokens || 2048,
    bridgeConfig.temperature || 0.7
  );

  // Return synthesis plus metadata
  return {
    synthesis,
    crewResponses: successfulResults.length,
    crewFailed: failedModels.length,
    participants: successfulResults.map(r => r.name)
  };
}
