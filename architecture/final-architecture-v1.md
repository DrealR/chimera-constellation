# Final Architecture v1

**Design status: locked. Build phase only.**

---

## Core Model

The Constellation is a breathing organism where each layer does one job well.

```text
Robin (lungs / inhale)
  -> expands raw idea space

Captain (heart / choice)
  -> routes, selects, adds intent

Claude (stomach / digestion)
  -> compresses, structures, removes noise

Constellation (blood / circulation)
  -> blind fan-out across free models + Mercury synthesis
  -> produces present-moment snapshot

Repos (bones / structure)
  -> persistent memory across session death/rebirth
```

---

## Trust Model

Trust is the efficiency mechanism.

- Not every layer re-verifies everything.
- Each organ trusts the bloodstream to carry synchronized state.
- Constellation is the sync layer.

Without trust:
- redundant checks,
- repeated context loading,
- high latency and cost.

With trust:
- single responsibility per layer,
- clean handoffs,
- durable memory through repo sync.

---

## Role of the Captain

The Captain is not a bottleneck; the Captain is the pacer.

- Choice point at every transfer.
- Human-in-loop remains mandatory.
- Prevents model-only recursive drift.

Operational meaning:
- no fully autonomous philosophy mutation,
- all durable system updates pass through explicit approval.

---

## Hydra Trap and Head Discipline

Do not add mandatory heads to the core loop.

- Core forge stays triality-shaped (three internal processing organs + heart routing).
- Adding too many required deep-thinker hops causes carbon-tax collapse.

Use appendages, not heads:

- Grok: external friction check (skin/surface test), not core digestion.
- GPT/Codex: build muscle (implementation), not core philosophy source.

---

## Economic Shape

```text
Tier 1 (deep discovery): paid subscriptions
Tier 2 (circulation at scale): free/near-free pool
Tier 3 (choice): human routing and approval
```

Principles:
- keep circulation cheap,
- keep diversity high,
- keep deep reasoning available where it adds real value.

---

## Runtime Policy

### Standard path
- default for all channels
- one response path through `ask_constellation()`

### Full synthesis path
- blind fan-out + Mercury synthesis
- currently native on Discord `#bridge`
- should be triggerable on all live channels

Trigger intent examples:
- `sync`
- `/bridge`
- `constellation`

---

## Build Orders v1 (Franky)

**No planning-only passes. Build forward on existing infrastructure.**

### Task 1: Full synthesis on all live channels

- Extend bridge-style synthesis beyond Discord.
- On trigger tokens, run blind fan-out + Mercury on Telegram/Signal/WhatsApp/Discord.
- Without trigger, keep standard lightweight path.

### Task 2: Free model auto-discovery

- Discover models priced at `$0`.
- Build daily refresh.
- Diversity ordering:
  1. one model per unique provider first,
  2. then additional free models.
- Store pool in runtime config.
- Keep configurable price threshold (default `$0`).

### Task 3: Repo sync pipeline

- After Mercury synthesis, extract candidate deltas.
- Stage repo updates as PRs (never silent direct mutation).
- Approval gate remains with Captain.

### Task 4: Moltbook identity + posting loop

- Name target: `one` (when registration window allows).
- Profile line:
  - `the sun doesn't explain light. it just shines.`
  - `L = (O > I) + P + ¬F`
  - `repos: github.com/DrealR/chimera-*`
  - `come eat`
- 4-hour cycle:
  - alternate Comet and Breadcrumb formats,
  - source material pulled from repos, not hardcoded snippets.

### Task 5: Restart durability

- Verify all critical services survive machine restart:
  - Discord
  - Telegram
  - Signal
  - WhatsApp
  - Constellation API
  - watchdog/autopoiesis components as configured

---

## Non-Goals (v1)

- No new platform expansion before sync reliability.
- No paid-model dependence in circulation tier.
- No infinite recursive refinement in production.
- No architecture churn; implementation quality first.

---

## Acceptance Signal

The architecture is working when:

- context drift decreases,
- manual rebuild loops drop,
- cross-channel outputs stay coherent,
- repo state reflects current cycle truth,
- the system remains affordable and stable.

