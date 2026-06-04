# Theli — Design Session Handoff

**For:** a fresh Claude Code session (use **Sonnet** — this is taste/iteration work, not deep
reasoning; cheaper + a clean context window).
**From:** an Opus session that built theli.app + did the brand/market work.
**Date:** 2026-06-04.

> Start by reading the auto-loaded memory (especially `amir-design-preferences`,
> `user-amir-profile`, `nutrition-scanner-app-status`). Then read this doc.

---

## The point of this session (read this first)

Amir noticed that **the sites Claude has built for him all look generically similar** — a
recognizable "stock Claude" signature. A repo survey confirmed it: serif display faces
(Fraunces on Theli, Lora on his portfolio `amir-site`), the Noto Serif Tamil heritage glyph
reused, warm-paper/muted palettes, generous whitespace, one botanical-green accent, subtle
scroll-reveals. (`chi-street-sweep` is the outlier — Catppuccin.)

The honest diagnosis Amir and the prior session reached: **these choices were Claude's
default taste, not Amir's — his real visual preferences were never elicited.**

**So this session's job is NOT to jump to a style guide.** It is to:
1. **Elicit Amir's actual taste** (reference apps/sites he loves, mood words, dislikes) —
   one question at a time. Do not assume the serif/warm-paper template.
2. Propose **bold, genuinely distinct** directions — things that do NOT read as a stock
   Claude site. Distinctiveness is the explicit goal (Theli is a portfolio piece).
3. Converge with Amir on one direction (incl. **light + dark**).
4. **Record what you learn** back into the `amir-design-preferences` memory so it compounds.

He is fine with the current theli.app look but wants the *next* layer of decisions to be
his, and more differentiated. Treat "looks like a default Claude site" as a failure mode.

## Process

- Use **superpowers:brainstorming** to run the taste-elicitation + direction discussion
  (one question at a time; present options; get approval). Amir **consented to the visual
  companion** (browser mockups) — use it for palette/type/layout comparisons and a mock
  screen or two; it's the right tool for judging design by sight, not hex codes.
- Then use **frontend-design:frontend-design** for execution quality.
- The brainstorming skill normally ends at writing-plans; here the concrete **deliverable is
  a style guide doc** (below), so adapt: present/approve the design, then write it.

---

## The deliverable (original handoff, still stands)

Commit **`STYLE_GUIDE.md`** into the **APP repo**: `~/repos/clearlabel/STYLE_GUIDE.md`
(that's where the iOS app session reads it). Optionally also `design/tokens.json`
(machine-readable, so it transcribes cleanly into a SwiftUI Theme). Express everything as
**named tokens**, not prose.

⚠️ A **parallel session is actively working in `~/repos/clearlabel`** (branch
`build/theli-mvp`, implementing the app). To avoid disturbing its in-flight changes,
`git add` **only** `STYLE_GUIDE.md` (and `design/tokens.json`) and commit just those paths —
do not stage the whole repo.

**Cover, as tokens:**
1. **Color** — semantic roles, each with a hex for **LIGHT and DARK** (app ships dark; site
   is warm-paper light — define both): background, surface/elevated, accentPrimary
   (botanical green), accentSecondary (turmeric), textPrimary/Secondary/Tertiary, separator,
   success, warning/destructive, + per-macro colors if rings/charts use them
   (calories/protein/carbs/fat). Target WCAG AA.
2. **Typography** — families mapped to a scale → iOS text-style roles (largeTitle, title,
   title2, headline, body, subheadline, footnote, caption): family + weight + size(pt) +
   line-height + tracking. Flag which roles must support **Dynamic Type** (scale, not fixed).
   NOTE: font families are part of what's up for reconsideration this session — don't assume
   Fraunces/Hanken survive. Noto Serif Tamil is for the தெளி wordmark ONLY.
3. **Spacing** — 4/8-pt scale (xs…xxl); section paddings; list-row insets.
4. **Shape** — corner radii (card, button, input, sheet); hairline/border widths.
5. **Elevation** — shadow/blur tokens or flat+material; which surfaces use
   `.ultraThinMaterial` etc.
6. **Components** (spec each with the tokens it uses): primary/secondary/tertiary button;
   card/grouped surface; LIST ROW (the Confirm nutrition rows); text input; SEGMENTED
   CONTROL (the ½ / 1 / 1½ / 2 serving selector); MACRO RING / progress; chip/tag; sheet;
   nav bar/toolbar; empty-state.
7. **Iconography** — SF Symbols weight/scale + any custom marks; the clarity/leaf motif.
8. **Motion** — the app analog of the site's scroll-reveal (durations, easing); calm.

**iOS must-bakes (into the spec, not afterthoughts):** light + dark, Dynamic Type, 44×44pt
min tap targets, safe areas, accessible contrast, no dark patterns (especially the tip jar).

**Reference surfaces (make it concrete):** HomeView (today's log + day-totals header + macro
rings), ConfirmView (nutrition rows + serving control), ScanModeView (3 mode cards), camera
overlays, Settings. Live source of truth for the current look = deployed **theli.app**.

---

## Current assets / state (so you don't rediscover it)

- **theli.app is LIVE** (warm-paper light design). Site repo: `~/repos/theli-site` (public,
  auto-deploys on push to `main` via Netlify). Files: `index.html`, `privacy.html`,
  `styles.css`, `app.js`.
- **Current tokens (the light/site baseline):** paper `#F6F2E9`, ink `#1B1A16`, botanical
  green `#2E5D4B` (+ deep `#234A3B`, lite `#3E7D63`), turmeric `#C8852E`. Fonts: Fraunces
  (display), Hanken Grotesk (body), Noto Serif Tamil (தெளி wordmark).
- **App repo:** `~/repos/clearlabel` (private `aabdur1/theli`, branch `build/theli-mvp`).
  Swift 6 / SwiftUI / SwiftData, iOS 17+, iPhone-only. **Monetization is decided: all free +
  an optional StoreKit consumable tip jar (no feature gating).**
- **Pending design decision that stalled this session** (re-open it with Amir, don't just
  pick): the app's **dark palette character** — options floated were *warm dark* (espresso,
  carries paper warmth), *botanical dark* (green-tinted), *neutral dark* (charcoal,
  accent-forward). Amir also raised possibly reconsidering whether the app should default to
  the same warm-paper **light** as the site, with dark as the alternate. All of this is fair
  game — but resolve it via the taste-elicitation first, not in isolation.

## Don't repeat these

- Don't open with "here are 3 warm-paper-serif options." That's the trap. Start by learning
  what Amir actually likes.
- Don't silently reuse Fraunces + warm paper + green just because they're already there.
  They might survive — but only as a deliberate choice, ideally after seeing alternatives.
