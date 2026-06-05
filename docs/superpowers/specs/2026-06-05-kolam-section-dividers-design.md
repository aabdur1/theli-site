# Theli Site — Subtle Kolam Section Dividers

**Date:** 2026-06-05
**Status:** Approved (chosen from a live motif exploration; deliberately pared back to one subtle element)

## Goal

Add a quiet Tamil (kolam) reference to elevate the site — **the smallest tasteful touch, not a motif system.** After exploring four motif families (kolam, gopuram, Chettinad tile, mango) and several knot/divider treatments, the knots read as too literal/heavy. The chosen element is the most minimal kolam reference: the **pulli (dots)**.

**Treatment:** the existing plain section divider becomes a hairline broken at center by **three small turmeric kolam dots** (middle slightly larger). Used only at the two paper-to-paper section breaks. Static (no animation). The green privacy band and the footer already separate themselves, so they get no divider.

## Changes

### `~/repos/theli-site/styles.css`
Replace the plain `.divider { height:1px; background:var(--line); border:0; }` with:
```css
.divider {
  display: flex; align-items: center; justify-content: center;
  gap: 9px; border: 0; height: auto; background: none;
  margin: clamp(8px, 3vw, 28px) 0;
}
.divider::before, .divider::after {
  content: ""; flex: 1 1 auto; max-width: 360px; height: 1px; background: var(--line);
}
.divider i { width: 5px; height: 5px; border-radius: 50%; background: var(--turmeric); display: block; }
.divider i:nth-child(2) { width: 6px; height: 6px; }
```

### `~/repos/theli-site/index.html`
- Replace the existing `<hr class="divider" />` (hero→how) with:
  ```html
  <div class="wrap"><div class="divider" role="separator" aria-hidden="true"><i></i><i></i><i></i></div></div>
  ```
- Add the same divider at the privacy-band → pricing boundary (between `</section>` of `#privacy` and `<section class="support">`).

## Verification
- Both dividers render as a centered hairline broken by three turmeric dots; subtle, not busy.
- Mobile: no horizontal overflow; dots/hairline scale fine.
- Decorative only (`role="separator"`, `aria-hidden`); no animation.

## Cleanup
- Remove the throwaway `~/repos/theli-site/_motif/` exploration pages.
- Remove stray local screenshots from `~/repos/clearlabel/`.

## Deploy
Merge to `main` → Netlify auto-deploys theli.app.

## Considered and dropped
Kolam knots (twin-oval, pinwheel, Solomon, etc.), footer crest, privacy-band framing, scattered knot accents, and the draw-on animation — all cut as "too much." Reopen only if a bolder pass is wanted later.
