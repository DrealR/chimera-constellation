# Health Check

**Automated status of all services. The Constellation's pulse.**

---

## What It Monitors

### Portals (Is the door open?)

```
CHECK EACH PORTAL:
  reemifai.org          → HTTP 200?
  grove.reemifai.org    → HTTP 200?
  honeydew.reemifai.org → HTTP 200?
  study.reemifai.org    → HTTP 200?
  cinevault.app         → HTTP 200?

IF DOWN:
  Alert. Log time. Track uptime percentage.
```

### Agents (Is the crew alive?)

```
CHECK EACH AGENT:
  Send test prompt → response received?
  Response quality → does it align with CHIMERA?
  Response time → within expected latency?
  Model status → is the underlying model still serving?

IF UNRESPONSIVE:
  Check model status on provider.
  Try backup model.
  Alert if no backup works.
```

### Infrastructure (Is the ship sailing?)

```
CHECK:
  Constellation API (port 5050) → responding?
  Mycelium (memory layer) → connected?
  Signal bot → alive?
  Telegram bot → alive?
  Discord bot → alive?

IF DOWN:
  Watchdog restarts.
  Log restart count.
  Alert if restart loop detected.
```

### Repos (Is the body healthy?)

```
CHECK EACH REPO:
  Last commit date → is it stale?
  Doc count → has it changed unexpectedly?
  Manifest → is it current?
  Cross-references → any broken links?

REPORT:
  "chimera-cooking: 1 doc. Last updated Jan 15.
   Consider: is this repo being fed?"
```

---

## The Health Report

Daily report format:

```
CONSTELLATION HEALTH — 2026-02-11

CHANNELS (checked 2026-02-11 10:53):
  [OK] iMessage    — RESTORED (was down, watchdog wasn't monitoring)
  [OK] Discord     — healthy, session resumed, posting outbox
  [OK] Telegram    — healthy, polling every 10s
  [OK] Signal      — running, listening on +13479427119
  [⚠️] WhatsApp    — process running, needs public webhook URL
  [OK] Constellation API — port 5050, responding

PORTALS:
  [OK] reemifai.org       (uptime: 99.8%)
  [OK] cinevault.app      (uptime: 99.5%)
  [--] grove.reemifai.org (not yet deployed)
  [--] honeydew.reemifai.org (not yet deployed)
  [--] study.reemifai.org (not yet deployed)

INFRASTRUCTURE:
  [OK] Watchdog daemon — now monitors 8 transports (iMessage added)
  [OK] Mycelium (Supabase) — connected, depositing pheromones
  [OK] Honeydew Loop — captain + crew running
  [OK] Dreamland — processing

BUGS FIXED (2026-02-11):
  [✓] iMessage added to watchdog TRANSPORTS — will auto-restart
  [✓] user_id undefined in exhale() — was crashing reddit_hunter
      (constellation.py: now reads from _breath_user_id global)

REPOS:
  core:          2,426 docs  (updated today)
  framework:       420 docs  (LOCKED — sacred number held)
  system:           33 docs  (updated Feb 11)
  relationships:    32 docs  (updated Feb 11)
  body:             16 docs  (updated Feb 11)
  ai:               16 docs  (updated Feb 11)
  constellation:    27 docs  (created Feb 11)
  basketball:       13 docs
  chess:            15 docs
  music:            14 docs
  cooking:           1 doc   (⚠️ THIN — needs content)

CROSS-POLLINATION:
  Manifest files deployed to all 10 repos.
  See cross-pollinate report for details.
```

---

## The Six Metrics Applied

The health check IS the system health metrics from chimera-system, applied to the Constellation itself:

```
1. RATIO:     Are givers (agents) outnumbering takers (failures)?
2. FLOW:      Is data flowing both ways (input → output → feedback)?
3. MEMBRANE:  Are safety layers working (immune, filtering)?
4. OBSERVER:  Can the system see itself (this health check)?
5. CANCER:    Is any part extracting without giving (stale agents)?
6. BREATH:    Is the full cycle completing (receive → process → respond → rest)?
```

---

## Running

```
# Manual:
./automation/health-check.sh

# Automated (daily at 6am):
# 0 6 * * * /path/to/health-check.sh >> /path/to/health.log

# Alert conditions:
# - Any portal down > 5 minutes
# - Any agent unresponsive > 1 hour
# - Framework doc count ≠ 420
# - Restart loop detected (> 3 restarts in 1 hour)
```

---

*The pulse. Check it daily. The Constellation is a living system — and living systems need monitoring, not because they're fragile, but because awareness IS health.*

---

**See also:** [chimera-system: System Health Metrics](../../system/health/system-health-metrics.md) — The six metrics
**See also:** [cross-pollinate.md](cross-pollinate.md) — Staleness detection
**See also:** [sync-agents.md](sync-agents.md) — Agent sync pipeline
