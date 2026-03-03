// src/models/providers.js
// Unified interface for multiple AI model providers
// Each provider takes (model, systemPrompt, messages) and returns a string

import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- ANTHROPIC (Claude) ---
let anthropicClient = null;
function getAnthropic() {
  if (!anthropicClient && process.env.ANTHROPIC_API_KEY) {
    anthropicClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return anthropicClient;
}

export async function callAnthropic(model, systemPrompt, messages, maxTokens = 2048, temperature = 0.7) {
  const client = getAnthropic();
  if (!client) throw new Error('Anthropic API key not configured');
  
  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    temperature,
    system: systemPrompt,
    messages: messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    }))
  });
  
  return response.content[0].text;
}

// --- OPENAI (GPT) ---
let openaiClient = null;
function getOpenAI() {
  if (!openaiClient && process.env.OPENAI_API_KEY) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

export async function callOpenAI(model, systemPrompt, messages, maxTokens = 2048, temperature = 0.7) {
  const client = getOpenAI();
  if (!client) throw new Error('OpenAI API key not configured');
  
  const response = await client.chat.completions.create({
    model,
    max_tokens: maxTokens,
    temperature,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }))
    ]
  });
  
  return response.choices[0].message.content;
}

// --- GOOGLE (Gemini) ---
let googleClient = null;
function getGoogle() {
  if (!googleClient && process.env.GOOGLE_AI_API_KEY) {
    googleClient = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
  }
  return googleClient;
}

export async function callGoogle(model, systemPrompt, messages, maxTokens = 4096, temperature = 0.8) {
  const client = getGoogle();
  if (!client) throw new Error('Google AI API key not configured');
  
  const genModel = client.getGenerativeModel({ 
    model,
    systemInstruction: systemPrompt,
    generationConfig: {
      maxOutputTokens: maxTokens,
      temperature
    }
  });
  
  // Convert message history to Gemini format
  const history = messages.slice(0, -1).map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));
  
  const chat = genModel.startChat({ history });
  const lastMessage = messages[messages.length - 1].content;
  const result = await chat.sendMessage(lastMessage);
  
  return result.response.text();
}

// --- OPENROUTER (Free/cheap models) ---
let openrouterClient = null;
function getOpenRouter() {
  if (!openrouterClient && process.env.OPENROUTER_API_KEY) {
    openrouterClient = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY
    });
  }
  return openrouterClient;
}

export async function callOpenRouter(model, systemPrompt, messages, maxTokens = 1024, temperature = 0.7) {
  const client = getOpenRouter();
  if (!client) throw new Error('OpenRouter API key not configured');
  
  const response = await client.chat.completions.create({
    model,
    max_tokens: maxTokens,
    temperature,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }))
    ]
  });
  
  return response.choices[0].message.content;
}

// --- UNIFIED CALLER ---
const PROVIDERS = {
  anthropic: callAnthropic,
  openai: callOpenAI,
  google: callGoogle,
  openrouter: callOpenRouter
};

export async function callModel(provider, model, systemPrompt, messages, maxTokens, temperature) {
  const caller = PROVIDERS[provider];
  if (!caller) throw new Error(`Unknown provider: ${provider}`);
  return caller(model, systemPrompt, messages, maxTokens, temperature);
}
