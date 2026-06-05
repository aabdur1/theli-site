# Theli Site — Dark Mode + Toggle

**Date:** 2026-06-05
**Status:** Approved (dark theme signed off as the app's primary palette; toggle shipped to site)

## Goal

Add a dark theme to theli.app using the documented **Forest** dark palette (`design/tokens.json`), with a header toggle. Doubles as sign-off for the iOS app's primary (dark-first) theme.

## Behavior
- `theme.js` (external, CSP-safe `'self'`) sets `data-theme` on `<html>` **before paint** (no flash): saved choice → else OS `prefers-color-scheme` → else light.
- Header toggle (sun/moon Phosphor icon) flips `data-theme` and persists to `localStorage['theli-theme']`.
- On both `index.html` and `privacy.html` (added Phosphor stylesheet to privacy.html for the icon).

## Token mapping (dark, from tokens.json)
`--paper #0F1C14`, `--paper-2 #162B1F`, `--paper-3 #0A1610`, `--ink #E0EDE6`, `--ink-soft #7AA88C`, `--ink-faint #4A7A60`, `--green #4A9070`, `--green-deep #3E7D63`, `--green-lite #62A887`, `--turmeric #D4903A`, `--line rgba(78,160,110,0.15)`, `--line-soft rgba(78,160,110,0.08)`. `color-scheme` set per theme.

## Component overrides under `:root[data-theme="dark"]`
- `body` background-image → subtle green/amber glows (not the light lavender/rose).
- `.site-header` backdrop → `rgba(15,28,20,0.72)`.
- `.hero-watermark` → `rgba(98,168,135,0.06)` (the light-theme dark-green glyph would vanish on dark).
- `.band` → pinned to `#15301F` + faint border, so it stays a distinct deep-green panel instead of brightening to the lighter `--green-deep`.
- Everything else cascades through the tokens (buttons invert correctly; outlined "clear." stays hollow since fill = `--paper`; kolam dots use `--turmeric`).

## Accessibility
- mint `#E0EDE6` on `#0F1C14` ≈ very high contrast; secondary `#7AA88C` clears AA for body text.
- Toggle is a `<button>` with `aria-label`; survives the ≤640px rule that hides text nav links.

## Verification
- Toggle flips theme, persists, no flash on reload; sun/moon swap correctly.
- Hero, how-it-works, privacy band, pricing, footer all legible in dark; no overflow.
- Light theme unchanged.

## Cleanup
- Remove stray local screenshots from `~/repos/clearlabel/`.

## Deploy
Merge to `main` → Netlify auto-deploys.

## Handoff note
This validates the app's dark-first Forest theme. The site's marketing flourishes (outlined "clear.", blur-to-clarity, split headline, kolam dividers) remain site-specific and should not be ported literally into the app.
