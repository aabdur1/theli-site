# Theli Site — Hero Split Headline, Warm Stone-Pink Background, "clear." Outline + Blur-to-Clarity

**Date:** 2026-06-05
**Status:** Approved (every value locked with the user via an iterative live local preview)

## Goal

Refine the live theli.app hero and palette, decided by toggling a live local comparison page:

1. **Desktop headline split (Layout A):** "Nutrition, made *clear.*" left, "And kept to yourself." right-aligned — a full-width editorial split at ≥900px. Mobile keeps its current single flowing block.
2. **"And kept to yourself." → green** `var(--green)` (`#2E5D4B`), all breakpoints.
3. **"clear." → clean outlined (hollow) word** using `-webkit-text-stroke` + `paint-order: stroke fill` so only a crisp outer outline shows (no interior stroke tangle). Stroke 4.5px desktop / ~3.15px mobile; interior fill = the paper bg color; stays italic.
4. **"clear." blurs into clarity on load:** a one-shot `blur(18px)→blur(0)` + fade-in over **1.7s**, gated behind `prefers-reduced-motion`.
5. **Background → Warm Stone Pink** `#E6D2C9`, replacing Dusty Mauve `#DDD5DA`, with the ripple updates below. Green + turmeric accents stay; the lavender gradient stop becomes a warm rose.

The Stone-Pink change propagates to the **design system** (STYLE_GUIDE.md, design/tokens.json, memory) so the site and app style guide stay in sync. This intentionally reverses the earlier "Dusty Mauve locked" decision (user accepted the warmer direction after seeing it live).

## Locked decisions

| Decision | Value |
|---|---|
| Headline layout | A — full-width, line 2 right-aligned, desktop ≥900px only |
| "And kept to yourself." | Green `#2E5D4B`, all breakpoints |
| "clear." treatment | Outline via `-webkit-text-stroke` + `paint-order: stroke fill`; fill = paper bg; italic |
| "clear." stroke weight | 4.5px desktop, ~3.15px mobile (0.7×) |
| "clear." animation | `blur(18px)→0` + opacity `0→1`, 1.7s `cubic-bezier(0.22,1,0.36,1)`, 0.12s delay; reduced-motion-gated |
| Background | Warm Stone Pink `#E6D2C9` (was `#DDD5DA`) |
| Design-system sync | Yes — STYLE_GUIDE.md + tokens.json + memory |
| Mobile | Structure unchanged; phrase green; outline + animation apply (thinner stroke) |

## Changes

### `~/repos/theli-site/index.html`
- Hero `<h1>` split into two spans (literal space between them so mobile flows naturally):
  ```html
  <h1 class="reveal"><span class="hl-a">Nutrition, made <em>clear.</em></span> <span class="hl-b">And kept to yourself.</span></h1>
  ```

### `~/repos/theli-site/styles.css`
- **Green phrase (global):** `.hero h1 .hl-b { color: var(--green); }`
- **Outlined "clear." (global, the `em`):**
  ```css
  .hero h1 em {
    font-style: italic;
    -webkit-text-fill-color: var(--paper);   /* interior = bg → reads hollow */
    -webkit-text-stroke: 3.15px var(--ink);  /* mobile weight */
    paint-order: stroke fill;                 /* fill over stroke → clean outer outline */
    display: inline-block;                    /* enables filter/animation */
  }
  ```
  (Remove the old `.hero h1 em { font-style: italic; color: var(--green); font-weight: 500; }` green-fill rule.)
- **Blur-to-clarity animation (reduced-motion-gated):**
  ```css
  @media (prefers-reduced-motion: no-preference) {
    .hero h1 em { animation: clarify 1.7s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
    @keyframes clarify { 0% { filter: blur(18px); opacity: 0; } 100% { filter: blur(0); opacity: 1; } }
  }
  ```
- **Desktop split + heavier outline (≥900px):**
  ```css
  @media (min-width: 900px) {
    .hero-content { max-width: none; }
    .hero .eyebrow, .hero .lede, .hero .pron, .hero .cta-row, .hero .cta-note { max-width: 600px; }
    .hero h1 { max-width: none; }
    .hero h1 .hl-a { display: block; text-align: left; }
    .hero h1 .hl-b { display: block; text-align: right; }
    .hero h1 em { -webkit-text-stroke: 4.5px var(--ink); }
  }
  ```
- **Background token:** `--paper: #E6D2C9`; retune the (unused) tints `--paper-2: #DBC5BD`, `--paper-3: #CFB8B1`.
- **Body gradient:** second radial stop lavender `rgba(120,80,130,0.06)` → warm rose `rgba(190,120,95,0.07)` (green first stop unchanged).
- **Header backdrop:** `.site-header { background: rgba(221,213,218,0.72) }` → `rgba(230,210,201,0.72)`.
- **Privacy band off-white tracks new paper** (6 spots): `.band` body `rgba(230,210,201,0.85)`; `.band .eyebrow` `rgba(230,210,201,0.78)`; `.band h2` `#E6D2C9`; `.promise-icon` `rgba(230,210,201,0.70)`; `.promise b` `#E6D2C9`; `.promise span` `rgba(230,210,201,0.72)`.
- Tokens consumed via `var(--paper)` (`.btn` text, `.nav .pill:hover`) update automatically.

### `~/repos/theli-site/privacy.html`
- No edit; inherits styles.css. Verify the warm bg renders.

### `~/repos/clearlabel/STYLE_GUIDE.md` (light/site values only — keep dark Forest values)
- Line 9 prose "Light surface = Dusty Mauve base" → "Warm Stone Pink base".
- `background` light `#DDD5DA` → `#E6D2C9`; `textOnAccent` light `#DDD5DA` → `#E6D2C9`.
- `--paper #DDD5DA` → `#E6D2C9`; `--paper-2 #D2C8CE` → `#DBC5BD`; `--paper-3 #C6BBC2` → `#CFB8B1`.
- Swift `static let background = Color(hex: "#DDD5DA")` → `#E6D2C9`.

### `~/repos/clearlabel/design/tokens.json`
- Both `"light": "#DDD5DA"` occurrences → `"#E6D2C9"`.

### Memory `amir-design-preferences.md`
- Update locked background Dusty Mauve → Warm Stone Pink `#E6D2C9` (note the 2026-06-05 reversal, accepted after live comparison). Add the "clear." outline + blur-to-clarity treatment as a design signal.

## Cleanup
- Remove the throwaway `~/repos/theli-site/_compare/` prototype page (not shipped).
- Remove stray local screenshots from `~/repos/clearlabel/` (`hero*.png`, `color*.png`, `clear*.png`, `clarify*.png`, `.playwright-mcp/`).

## Verification
- **Desktop (≥900px):** "Nutrition, made *clear.*" left, "And kept to yourself." green right; "clear." a clean 4.5px hollow outline (no interior tangle); blurs into focus on load; watermark behind.
- **Mobile (375px):** unchanged structure; phrase green; outline ~3.15px reads cleanly; no horizontal overflow.
- **Animation:** plays once on load (1.7s) when motion allowed; static sharp outline under `prefers-reduced-motion: reduce`.
- **Background:** Stone Pink across index.html + privacy.html; header backdrop matches; band off-white reads warm.
- **Accessibility:** `.band .eyebrow` at `rgba(230,210,201,0.78)` on `#234A3B` still ≥4.5:1 (verify); body ink on `#E6D2C9` high-contrast. The outlined "clear." is a decorative display accent (meaning carried by the full sentence).
- **Cross-browser:** `-webkit-text-stroke`, `paint-order`, and `filter` are supported in Chromium/Safari/Firefox. Confirm on the live site after deploy.
- No console errors; Phosphor + Google Fonts load.

## Deploy
Merge to `main` → Netlify auto-deploys theli.app.

## Out of scope
- The `styles.css`/`app.js` `immutable` cache-header issue (returning-visitor staleness) — noted separately.
