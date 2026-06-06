# Theli Site — Real App Screenshots (product visual)

**Date:** 2026-06-06
**Status:** Approved (signed off live). Fills the long-standing #1 gap — the site now *shows* the app.

## Source
Real screens from the implemented iOS app (`~/repos/clearlabel/views/`, Forest dark, Eczar), resized to 680px-wide PNGs into `theli-site/screens/`: `fooditem.png`, `barcode.png`, `label.png`, `confirm.png`.

## Approach (A — hero device + illustrated steps)

### Hero — two-column on desktop (≥900px)
- `.hero-content` becomes a grid: **text left** (`.hero-text`: eyebrow, headline, lede, pron, CTAs, note) + **bigger phone right** (`.hero-device`, the FoodItem screen).
- Grid: `minmax(0,1fr) clamp(290px,28vw,322px)`, `max-width:none` (overrides the base 680px cap — important), device `width:100%` fills its column.
- Headline resized for the narrower column: `font-size: clamp(34px, 3.9vw, 52px)`; `.hl-a`/`.hl-b` are `display:block; white-space:nowrap` so each phrase sits on its own single line ("Nutrition, made *clear.*" / "And kept to yourself.") — the `vw` font scaling keeps `nowrap` from overflowing down to 900px. `em` stroke 3.5px at this size.
- **Mobile (<900px): unchanged** — phone hidden (`@media (max-width:899px){ .hero-device{display:none} }`), headline reverts to the base full size + natural wrap. The hero stays the clean type-only one.

### How it works — illustrated steps
- Each of the 3 steps gets a `.step-shot` device above the number: **01 barcode scan → 02 label camera → 03 Confirm**. Shown on desktop and mobile (the steps carry the screens on mobile since the hero phone is hidden there).

### Device treatment
- `.device`: minimal frame — `#0B130D` bezel, thin border, rounded 32px, soft shadow; dark-mode variant adds a faint green ring for separation on Forest.
- `.device .screen`: `aspect-ratio: 680/1410` + `object-fit: cover; object-position: center bottom` — **crops the top status bar in CSS**, hiding the personal Dynamic-Island widget without reprocessing assets.
- Hero image loads eagerly (above the fold); step images `loading="lazy"`.

## Verification
- Desktop: text left, headline two single lines, FoodItem phone right; no overflow down to 960px (`nowrap` scales to fit, exact at ~960).
- Mobile: hero phone hidden, headline full-size, steps stacked with phones; no horizontal overflow.
- Dark + light: device frame reads in both.

## Cleanup
- Remove stray local screenshots from `~/repos/clearlabel/`.

## Deploy
Merge to `main` → Netlify auto-deploys.

## Later (noted, not now)
The empty-home and sparse-history screens were skipped (weaker data). Reshoot screens with richer data once the app has real usage, then optionally add a History/home screen to the hero or a small gallery.
