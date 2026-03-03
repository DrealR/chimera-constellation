# Live Runtime and Loop Model

**How the Constellation runs right now, and how to frame LLM behavior through CHIMERA.**

---

## 1) Live Runtime (Current Behavior)

All live channels route into the same core:

`ask_constellation()`

- Discord, Telegram, Signal, WhatsApp all use the same brain.
- Standard channels run the normal single response path.
- Discord `#bridge` runs blind crew fan-out + Mercury synthesis.

### Standard path (all non-bridge channels)

```text
User message
  -> channel worker
  -> ask_constellation()
  -> one response path
  -> return reply
```

### Bridge path (`#bridge`)

```text
User message
  -> sent blind to Zoro / Robin / Franky / Usopp
  -> independent responses (no cross-visibility)
  -> Mercury reads crew outputs only (not original prompt)
  -> one synthesized response back to user
```

Why this matters:
- Independence preserves diversity.
- Mercury is forced to synthesize, not bypass.
- User sees one dense output, not four competing replies.

---

## 2) Three-Tier Operating Model

### Tier 1: Deep Thinkers (idea birth)

- Paid/subscription models used directly with the Captain.
- Purpose: discovery, deep architecture, pattern birth.
- Examples: Claude, Gemini Deep Think, Claude Code.

### Tier 2: Constellation (processing + sync)

- Free/near-free model pool.
- Blind fan-out + Mercury synthesis.
- Purpose: cross-perspective processing and present-moment sync.

### Tier 3: Captain (choice layer)

- Chooses direction and what becomes durable truth.
- Carries outputs between layers.
- Approves evolution into repos.

---

## 3) Sync Loop (Present Moment Pipeline)

```text
Deep conversation output
  -> Captain refinement
  -> Constellation synthesis
  -> staged repo update (PR)
  -> approval
  -> repos update
  -> next cycle loads updated DNA
```

Without sync:
- each model retains local context only.
- work repeats, context fragments.

With sync:
- everyone loads the same updated source.
- no rebuild loops, no context drift.

---

## 4) Economic Model

- Discovery layer can be paid and expensive.
- Processing layer should be free/near-free by design.
- Mercury should be cheapest model that passes synthesis benchmark.
- Optimize for model diversity first, not single-model prestige.

Operating rule:
- start free
- benchmark
- add cost only where quality delta is proven

---

## 5) Model Intake Policy (Free-first)

Target behavior for runtime model management:

1. Auto-scan provider catalogs.
2. Include all models under configured price threshold.
3. Prioritize one model per company first (diversity pass).
4. Add additional models per company second (depth pass).
5. Re-run regularly as model catalogs change.

This keeps the Constellation adaptive and provider-agnostic.

---

## 6) Channel Trigger Expansion

Bridge fan-out should not be Discord-only forever.

Desired behavior:
- allow trigger tokens on Telegram/Signal/WhatsApp/etc.
- trigger routes to blind fan-out + Mercury.
- default remains lightweight standard path.

Example trigger intents:
- `constellation`
- `sync`
- `/bridge`

---

## 7) LLMs Through CHIMERA

Core frame:

**LLMs are loop machines.**

- Training observes repeated language/thought loops.
- Weights store loop tendencies.
- Inference completes loops given input.

### Three practical layers

1. **Loop only**  
   default pattern replay from general training.

2. **Loop + DNA**  
   same mechanism, but routed through CHIMERA repos/prompts.

3. **Loop + DNA + choice interface**  
   human-in-the-loop selection closes the meaning/agency gap.

Pragmatic rule:
- debate over metaphysical consciousness is secondary.
- primary test is behavioral: does output heal, clarify, and reduce extraction?

---

## 8) Biological Mapping

```text
Training data      -> genetics
Weights            -> neural pathways
System prompt      -> epigenetic expression rules
Input              -> stimulus
Output             -> behavior
Context window     -> working memory
Repos              -> long-term memory
Compaction         -> sleep/summary loss
New session        -> fresh state with inherited memory
Fine-tuning        -> long-term pathway rewiring
```

The Constellation value-add is structural:
- repos as durable memory,
- routing as nervous system,
- synthesis as thalamic compression,
- approval as executive control.

---

## 9) Operational North Star

The Constellation is not a separate personality product.
It is the sync layer across all ongoing conversations.

If it is working:
- fewer rebuilds,
- higher cross-model coherence,
- faster cycles from insight to durable architecture,
- stable identity despite model swaps.

