# Cross-Pollination System

**Automated staleness detection across repos. The mycelium that keeps the organism in sync.**

---

## The Problem

When body/applied/cancer.md gets updated with new P=NP framing, system/patterns/cancer.md also needs the insight. And relationships/ references membrane theory from body/. And framework/ has the P=NP connection to all of it.

Right now this is manual. That breaks at scale.

---

## The Solution

Automated FLAGGING, not automated rewriting. Each repo has its own voice and depth. Auto-rewriting is dangerous. Auto-flagging staleness is essential.

---

## How It Works

### 1. Manifest Files

Every repo contains a `manifest.json` that maps:
- Repo identity and relationships
- Every doc and its cross-references
- Last updated timestamps
- Upstream and peer dependencies

```json
{
  "name": "chimera-body",
  "upstream": ["chimera-system"],
  "peers": ["chimera-relationships"],
  "downstream": ["chimera-constellation"],
  "docs": [
    {
      "path": "applied/cancer.md",
      "references": [
        "system/patterns/cancer.md",
        "system/scales/cellular.md",
        "system/axioms/topology.md",
        "relationships/core/the-membrane.md"
      ],
      "last_updated": "2026-02-11"
    }
  ]
}
```

### 2. Staleness Detection

After any push to any repo, the cross-pollination script:

```
1. SCAN all manifest.json files across repos
2. BUILD dependency graph (who references whom)
3. COMPARE timestamps:
   - If referenced doc updated MORE recently
     than referencing doc → FLAG as potentially stale
4. REPORT:
   "body/cancer.md was updated Feb 11
    but system/patterns/cancer.md
    hasn't been touched since Feb 9.
    Possible staleness."
5. CC or human decides what to update
```

### 3. What It Does NOT Do

```
NOT auto-rewrite docs (each has its own voice)
NOT auto-merge content (context matters)
NOT auto-delete references (might still be valid)
NOT make any changes without human decision

ONLY flags. ONLY reports. ONLY suggests.
The human (Brook) or the builder (Franky/CC) decides.
```

---

## The Cross-Pollination Script

Located at: `automation/cross-pollinate.sh`

```bash
#!/bin/bash
# Cross-pollinate: scan repos for stale references

CHIMERA_ROOT="$HOME/chimera"
REPOS=(ai basketball body chess cooking core framework
       music relationships system constellation)

for repo in "${REPOS[@]}"; do
  manifest="$CHIMERA_ROOT/$repo/manifest.json"
  if [ -f "$manifest" ]; then
    # Parse manifest, check timestamps, flag staleness
    # Implementation: jq + git log + date comparison
    echo "Scanning $repo..."
  fi
done
```

Full implementation requires `jq` for JSON parsing and `git log` for actual last-modified dates (more accurate than manifest timestamps).

---

## Running It

```
# Manual run:
./automation/cross-pollinate.sh

# After every push (git hook):
# Add to .git/hooks/post-push in each repo

# Scheduled (cron):
# 0 6 * * * /path/to/cross-pollinate.sh
```

---

*The mycelium. Invisible. Underground. Connecting every tree in the forest. When one tree gets nutrients, the network knows.*

---

**See also:** [sync-agents.md](sync-agents.md) — How agent context updates
**See also:** [health-check.md](health-check.md) — System-wide health monitoring
