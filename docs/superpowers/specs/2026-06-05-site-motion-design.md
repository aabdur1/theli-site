# Theli Site — Motion Polish ("feel alive")

**Date:** 2026-06-05
**Status:** Approved (signed off live). Web-only polish — does NOT transfer to the app (SwiftUI has its own motion; shared timing lives in tokens.json `motion`).

## Goal
Four restrained, reduced-motion-gated additions on top of the existing reveal/blur motion.

## Changes

### `app.js`
- **Staggered reveals:** grid groups (`.steps`, `.features-grid`) assign `data-d = i * 75ms` to their `.reveal` children, so items cascade in as the group enters view (hero keeps its `i * 90ms` cascade). The privacy band still reveals as a single unit (no per-promise stagger — avoids double-motion).
- **Hero-watermark parallax:** on scroll (rAF, passive), translate `.hero-watermark` by `scrollY * 0.14` (capped under 1000px). Skipped entirely under `prefers-reduced-motion: reduce`.

### `styles.css`
- **Hover micro-interactions** under `@media (hover: hover) and (prefers-reduced-motion: no-preference)`:
  - `.feature-item:hover` → icon lifts 3px + turns `--green-lite`, name → `--green`.
  - `.step:hover .step-num` → `scale(1.04)`.
  - `.promise:hover .promise-icon` → lifts 2px.
- **Theme cross-fade:** `:root.theme-anim, :root.theme-anim *` transitions `background-color/color/border-color/fill` 0.45s (not `transform`, so it never fights hover/parallax). Class is added only during a toggle.

### `theme.js`
- On toggle (motion-safe only): add `theme-anim` to `<html>`, remove after 500ms, so the dark/light switch cross-fades instead of hard-cutting.

## Accessibility / robustness
- Everything gates on `prefers-reduced-motion` (reveals already show instantly; parallax + theme-fade skipped; hovers disabled).
- Progressive enhancement: no JS → content visible (reveal fallback), no parallax, instant theme switch.
- Hovers are `hover: hover` only (no sticky states on touch).

## Verification
- Stagger delays applied (steps 0/75/150; features 0/75/…/375); watermark transform scales with scroll (~70px @ 500px); `theme-anim` added on toggle; hovers defined.
- No layout shift / overflow; light + dark both fine.

## Deploy
Merge to `main` → Netlify auto-deploys.
