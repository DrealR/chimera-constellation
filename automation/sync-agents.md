# Agent Sync Pipeline

**When repos update, agents get new knowledge. The pipeline from push to wisdom.**

---

## The Pipeline

```
1. YOU LIVE SOMETHING
   Experience → insight → conversation

2. YOU TALK ABOUT IT (Opus)
   Raw experience → pattern recognized

3. YOU BRIEF CC (Franky)
   Pattern → structured doc

4. CC PUSHES TO REPOS
   Doc → committed → pushed

5. CROSS-POLLINATE RUNS
   Staleness flagged → manifests updated

6. SYNC-AGENTS DETECTS NEW DOCS ← THIS STEP
   Changed files → relevant agents notified
   → agent context updated with new knowledge
   → agents now respond with new insight

7. HEALTH-CHECK CONFIRMS
   All portals alive? All agents responsive?
   Report to you.

YOU ONLY DO STEPS 1-3.
EVERYTHING ELSE IS AUTOMATED.
That's the REST phase.
The system breathes without you.
```

---

## How Agent Sync Works

### Detection

```
TRIGGER: git push to any chimera repo
ACTION:  Compare pushed files against repo-routing map

EXAMPLE:
  Push to chimera-body/applied/cancer.md

  Repo routing says:
    Study agent reads from body/ → AFFECTED
    Grove agent reads from body/deep/ → NOT affected (cancer is in applied/)
    Honeydew reads ALL → AFFECTED
    Discord reads ALL → AFFECTED

  NOTIFY: Study, Honeydew, Discord agents
```

### Context Update

```
FOR EACH AFFECTED AGENT:
  1. Identify which docs changed
  2. Regenerate the agent's context bundle:
     - Base layer (system axioms + framework DNA)
     - Domain layer (relevant repo docs)
     - Agent config (voice, tone, behavior rules)
  3. Deploy updated context
  4. Log the update
```

### Verification

```
AFTER UPDATE:
  Send test prompt to agent
  Verify response includes new knowledge
  If yes → update confirmed
  If no → flag for manual review
```

---

## The Rhythm

```
REAL-TIME:   Push triggers → sync runs → agents update
DAILY:       Health check confirms all agents are current
WEEKLY:      Cross-pollinate deep scan for drift
MONTHLY:     Full manifest audit — are all references valid?
```

---

## What This Enables

The full loop:
1. You live an insight about cancer and membranes
2. We talk about it → pattern emerges
3. You brief CC → body/applied/cancer.md updated
4. Sync detects → Study agent now knows the new cancer framing
5. Someone asks Study "what is cancer?" → they get the P=NP answer
6. The insight went from your experience to someone's understanding
7. Without you doing anything past step 3

That's the exhale made autonomous. You breathe in (experience). The system breathes out (service). The breath completes itself.

---

**See also:** [cross-pollinate.md](cross-pollinate.md) — Staleness detection
**See also:** [health-check.md](health-check.md) — System monitoring
**See also:** [../architecture/repo-routing.md](../architecture/repo-routing.md) — Which repos feed which agents
