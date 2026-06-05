# Theli Site — Hero Split Headline + Warm Stone-Pink Background

**Date:** 2026-06-05
**Status:** Approved (design decisions locked with user via live comparison)

## Goal

Two refinements to the live theli.app site, decided by viewing a live local comparison:

1. **Desktop hero headline split (Layout A):** "Nutrition, made *clear.*" left-aligned, "And kept to yourself." right-aligned, both full-width lines — a subtle editorial left/right split. Desktop only (≥900px). Mobile keeps its current single flowing block.
2. **"And kept to yourself." in green** (`var(--green)` = `#2E5D4B`), matching the existing green "*clear.*". Applied at **all breakpoints** (mobile + desktop).
3. **Background → Warm Stone Pink** `#E6D2C9`, replacing Dusty Mauve `#DDD5DA`. The cool mauve becomes a warm muted blush-stone. Green + turmeric accents stay; the warm gradient stop replaces the lavender one.

The Stone-Pink change also propagates to the **design system** (STYLE_GUIDE.md, design/tokens.json, memory) so the site and the app style guide stay in sync. This intentionally reverses the earlier "Dusty Mauve locked" decision.

## Locked decisions

| Decision | Value |
|---|---|
| Headline layout | A — full-width, line 2 right-aligned, desktop ≥900px only |
| "And kept to yourself." color | Green `#2E5D4B`, all breakpoints |
| Background | Warm Stone Pink `#E6D2C9` (was `#DDD5DA`) |
| Design-system sync | Yes — update STYLE_GUIDE.md + tokens.json + memory |
| Mobile structure | Unchanged (phrase is now green, layout otherwise identical) |

## Changes

### `~/repos/theli-site/index.html`
- Hero `<h1>` split into two spans (keeps a literal space between them so mobile flows naturally):
  ```html
  <h1 class="reveal"><span class="hl-a">Nutrition, made <em>clear.</em></span> <span class="hl-b">And kept to yourself.</span></h1>
  ```

### `~/repos/theli-site/styles.css`
- **Green phrase (global):** `.hero h1 .hl-b { color: var(--green); }`
- **Desktop split (≥900px):**
  ```css
  @media (min-width: 900px) {
    .hero-content { max-width: none; }
    .hero .eyebrow, .hero .lede, .hero .pron, .hero .cta-row, .hero .cta-note { max-width: 600px; }
    .hero h1 { max-width: none; }
    .hero h1 .hl-a { display: block; text-align: left; }
    .hero h1 .hl-b { display: block; text-align: right; }
  }
  ```
- **Background token:** `--paper: #E6D2C9`; retune the (currently unused) tints `--paper-2: #DBC5BD`, `--paper-3: #CFB8B1` to the warm ramp.
- **Body gradient:** second radial stop lavender `rgba(120,80,130,0.06)` → warm rose `rgba(190,120,95,0.07)` (green first stop unchanged).
- **Header backdrop:** `.site-header { background: rgba(221,213,218,0.72) }` → `rgba(230,210,201,0.72)`.
- **Privacy band off-white tracks the new paper** (6 spots): `.band` body `rgba(230,210,201,0.85)`; `.band .eyebrow` `rgba(230,210,201,0.78)`; `.band h2` `#E6D2C9`; `.promise-icon` `rgba(230,210,201,0.70)`; `.promise b` `#E6D2C9`; `.promise span` `rgba(230,210,201,0.72)`.
- Tokens consumed via `var(--paper)` (`.btn` text, `.nav .pill:hover`) update automatically.

### `~/repos/theli-site/privacy.html`
- No edit; inherits styles.css. Verify the warm bg renders correctly.

### `~/repos/clearlabel/STYLE_GUIDE.md` (light/site values only — keep dark Forest values)
- Line 9 prose: "Light surface = Dusty Mauve base" → "Warm Stone Pink base".
- `background` light `#DDD5DA` → `#E6D2C9`.
- `textOnAccent` light `#DDD5DA` → `#E6D2C9`.
- `--paper #DDD5DA` → `#E6D2C9`; `--paper-2 #D2C8CE` → `#DBC5BD`; `--paper-3 #C6BBC2` → `#CFB8B1`.
- Swift `static let background = Color(hex: "#DDD5DA")` → `#E6D2C9`.

### `~/repos/clearlabel/design/tokens.json`
- Both `"light": "#DDD5DA"` occurrences → `"#E6D2C9"`.

### Memory `amir-design-preferences.md`
- Update the locked background from Dusty Mauve to Warm Stone Pink `#E6D2C9`, noting the 2026-06-05 reversal and that the user accepted the warmer/softer direction after a live comparison.

## Cleanup
- Remove the throwaway `~/repos/theli-site/_compare/` prototype page before finalizing (not shipped).
- Remove stray local screenshots from `~/repos/clearlabel/` (`heroA/B-*.png`, `color*.png`, `hlb-*.png`, `.playwright-mcp/`).

## Verification
- **Desktop (≥900px):** "Nutrition, made *clear.*" left, "And kept to yourself." green and right-aligned; watermark behind.
- **Mobile (375px):** unchanged structure; "And kept to yourself." now green; no horizontal overflow.
- **Background:** Stone Pink across index.html + privacy.html; header backdrop matches; band off-white reads warm (not cool).
- **Accessibility:** `.band .eyebrow` at `rgba(230,210,201,0.78)` on `#234A3B` still ≥4.5:1 (verify, recompute if needed); body ink on `#E6D2C9` remains high-contrast.
- No console errors; Phosphor + Google Fonts still load.

## Deploy
Same as the prior redesign: merge to `main` and push → Netlify auto-deploys theli.app.

## Out of scope
- The `styles.css`/`app.js` `immutable` cache-header issue (returning-visitor staleness) — noted separately; not addressed here.
