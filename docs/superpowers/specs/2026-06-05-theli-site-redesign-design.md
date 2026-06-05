# Theli site redesign — design spec
**Date:** 2026-06-05
**Scope:** Token swap (Fraunces → Eczar, warm paper → Dusty Mauve) + targeted visual polish on hero, steps, pricing, and privacy band.
**Files changed:** `index.html`, `styles.css`, `privacy.html`, new `vendor/twemoji.min.js`. (`app.js` is not modified.)

---

## 1. Goals

- Apply the locked `STYLE_GUIDE.md` tokens to the live site (currently still using Fraunces + warm paper `#F6F2E9`).
- Elevate the weakest sections (steps, hero) beyond a mechanical token swap.
- Make the pricing section useful for skeptical visitors scanning for a specific free feature.
- Establish consistent icon rendering across all platforms via Twemoji.
- Add the no-emoji rule to the style guide.

**Not in scope:** structural layout changes to the privacy policy page, new copy, App Store link (not live yet), Tamil accent details throughout (deferred to a future session).

---

## 2. Token swap

### CSS variables (`styles.css` `:root`)

Replace the current warm-paper variables with the Dusty Mauve tokens from `STYLE_GUIDE.md §9`:

```css
:root {
  --paper:      #DDD5DA;   /* was #F6F2E9 */
  --paper-2:    #D2C8CE;   /* was #EFE8D9 */
  --paper-3:    #C6BBC2;   /* was #E7DECB */
  --ink:        #1A1820;   /* was #1B1A16 */
  --ink-soft:   #4E4854;   /* was #4F4A3E */
  --ink-faint:  #867880;   /* was #837C6B */
  --green:      #2E5D4B;   /* unchanged */
  --green-deep: #234A3B;   /* unchanged */
  --green-lite: #3E7D63;   /* unchanged */
  --turmeric:   #C8852E;   /* unchanged */
  --line:       rgba(26,24,32,0.13);   /* was rgba(27,26,22,0.12) */
  --line-soft:  rgba(26,24,32,0.07);   /* was rgba(27,26,22,0.07) */

  --serif: "Eczar", Georgia, serif;           /* was "Fraunces" */
  --sans:  "Hanken Grotesk", -apple-system, sans-serif;  /* unchanged */
  --tamil: "Noto Serif Tamil", serif;         /* unchanged */
}
```

### Google Fonts (`index.html` + `privacy.html` `<head>`)

Replace the Fraunces import with Eczar:

```html
<link href="https://fonts.googleapis.com/css2?family=Eczar:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Hanken+Grotesk:wght@400;500;600&family=Noto+Serif+Tamil:wght@400;500;600&display=swap" rel="stylesheet">
```

### Background radial gradient (`styles.css` `body`)

Update to complement Dusty Mauve (green top-left, lavender top-right):

```css
background-image:
  radial-gradient(120% 80% at 12% -8%, rgba(62,125,99,0.09), transparent 55%),
  radial-gradient(90% 70% at 100% 0%,  rgba(120,80,130,0.06), transparent 50%);
```

The existing turmeric-tinted right gradient (`rgba(200,133,46,0.08)`) is removed — it clashes with the cooler Dusty Mauve base.

### Header backdrop (`styles.css` `.site-header`)

```css
background: rgba(221,213,218,0.72);   /* was rgba(246,242,233,0.72) */
```

### Typography rule

Eczar has different optical weight to Fraunces. Adjust `h1, h2, h3`:

```css
h1, h2, h3 {
  font-family: var(--serif);
  font-weight: 600;        /* was 500 — Eczar reads lighter at 500 */
  line-height: 1.05;
  letter-spacing: -0.02em;
}
```

---

## 3. Hero — watermark glyph

**Decision:** Approach A. The தெளி glyph becomes a large ghosted watermark positioned behind right-side of the hero. Text is left-aligned (not centered). The glyph acts as structural atmosphere rather than a standalone decorative element.

### Layout changes

- Hero content: left-aligned, `max-width: 680px`.
- Tamil glyph: `position: absolute; right: -2%; top: -10%` — partially crops off the right edge on desktop.
- Hero section: `position: relative; overflow: hidden`.
- Remove `.hero .tamil-glyph` as a stacked/inline element; replace with `.hero-watermark` (absolute positioned).

### CSS additions

```css
.hero { position: relative; overflow: hidden; }

.hero-watermark {
  position: absolute;
  right: -2%;
  top: -10%;
  font-family: var(--tamil);
  font-size: clamp(220px, 34vw, 380px);
  line-height: 1;
  color: rgba(46,93,75,0.07);
  pointer-events: none;
  user-select: none;
  letter-spacing: -0.01em;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 680px;
}
```

### HTML structure change

```html
<section class="hero">
  <div class="wrap">
    <div class="hero-watermark" aria-hidden="true">தெளி</div>
    <div class="hero-content">
      <p class="eyebrow reveal">Privacy-first nutrition scanner · iPhone</p>
      <h1 class="reveal">…</h1>
      <!-- rest of hero content unchanged -->
    </div>
  </div>
</section>
```

The original `<div class="tamil-glyph reveal">தெளி</div>` is removed from the stacked flow.

---

## 4. Steps — editorial numbers

**Decision:** Approach A. Big Eczar turmeric `01 / 02 / 03` numbers as the dominant visual element. No card backgrounds. Three columns separated by vertical hairlines.

### Replace `.steps` + `.step` with:

```css
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

.step {
  padding: 24px 32px 32px;
  border-right: 1px solid var(--line-soft);
  /* remove: background, border-radius, box-shadow, hover transform */
}
.step:first-child { padding-left: 0; }
.step:last-child  { border-right: none; padding-right: 0; }

.step-num {
  font-family: var(--serif);
  font-size: clamp(60px, 9vw, 88px);
  font-weight: 800;
  color: var(--turmeric);
  line-height: 1;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.step h3 {
  font-size: clamp(18px, 2.2vw, 22px);
  margin: 0 0 10px;
  /* inherits h3 serif rule */
}

.step p {
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.6;
}
```

### HTML change (each `.step`)

Replace `<span class="num">01 / Barcode</span>` with `<span class="step-num">01</span>`. The mode label ("Barcode", "Label", "Log") is removed — the h3 is descriptive enough without it.

### Mobile (≤820px)

```css
@media (max-width: 820px) {
  .steps { grid-template-columns: 1fr; }
  .step {
    border-right: none;
    border-bottom: 1px solid var(--line-soft);
    padding: 28px 0;
  }
  .step:last-child { border-bottom: none; }
}
```

---

## 5. Privacy band — token + polish

The dark green band structure is kept. Token updates:

- `background`: `var(--green-deep)` — same `#234A3B`, already correct.
- `color` on body text: update from `#EDE9DC` → `rgba(221,213,218,0.85)` (Dusty Mauve tinted off-white).
- `.band h2` color: `#DDD5DA` (was `#FBF8F0`).
- `.band::after` watermark glyph opacity: keep `0.045`.
- `.promise b` font: Eczar 600 (was Fraunces 500) — inherits via `var(--serif)`.
- `.promise .tick` replaced with a Twemoji icon (see §7 below). Remove `font-size: 20px` tick rule.
- `.band .eyebrow` color: `rgba(221,213,218,0.55)` (was `#9FD4BC`).

No layout changes to the band.

---

## 6. Pricing section — hybrid

**Decision:** Big statement (top) + feature grid (below) + tip jar footnote. Replaces the current centered minimal layout.

### Layout

```css
/* Remove: .support { text-align: center } and .support .inner { max-width: 56ch } */

.support-top {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: end;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--line-soft);
  margin-bottom: 40px;
}

.price-tag {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(48px, 7vw, 72px);
  font-weight: 500;
  color: var(--green);
  line-height: 1;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin-bottom: 32px;
}

.feature-item {
  padding: 20px 28px 20px 0;
  border-bottom: 1px solid var(--line-soft);
}
.feature-item:nth-child(3n+2) {
  padding-left: 28px;
  border-left: 1px solid var(--line-soft);
  border-right: 1px solid var(--line-soft);
}
.feature-item:nth-child(3n) { padding-left: 28px; padding-right: 0; }

.feature-icon { font-size: 22px; color: var(--green); display: block; margin-bottom: 10px; line-height: 1; }

.feature-name {
  font-family: var(--serif);
  font-size: 16px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 4px;
  line-height: 1.2;
}
.feature-desc { font-size: 13px; color: var(--ink-soft); line-height: 1.5; }

.tip-row {
  display: flex;
  align-items: flex-start;  /* baseline breaks with nested flex child */
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid var(--line-soft);
}
.tip-row-left { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.tip-icon { display: inline-block; width: 20px; height: 20px; }
.tip-icon img { width: 20px !important; height: 20px !important; }
.tip-label {
  font-size: 10px; font-weight: 600; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--turmeric);
  padding: 3px 10px; background: rgba(200,133,46,0.10);
  border: 1px solid rgba(200,133,46,0.20); border-radius: 999px;
  white-space: nowrap;
}
.tip-text { font-size: 13.5px; color: var(--ink-soft); line-height: 1.55; }
.tip-text strong { color: var(--ink); font-weight: 600; }
```

### Mobile (≤720px)

```css
@media (max-width: 720px) {
  .support-top { grid-template-columns: 1fr; gap: 16px; }
  .features-grid { grid-template-columns: 1fr 1fr; }
  .feature-item:nth-child(2n) {
    padding-left: 20px;
    border-left: 1px solid var(--line-soft);
    border-right: none;
  }
  .feature-item:nth-child(2n+1) { padding-right: 20px; padding-left: 0; }
  .feature-item:nth-child(3n+2) {
    /* reset the 3-col rule */
    border-right: none;
  }
}
```

### HTML structure for `<section class="support">`

```html
<section class="support">
  <div class="wrap">
    <div class="support-top">
      <div>
        <span class="eyebrow">Pricing</span>
        <h2>Free. The whole thing.</h2>
        <p>Every feature is open — scanning, label OCR, your daily log, targets, history. Theli is built as a labour of care, not a funnel.</p>
      </div>
      <div class="price-tag" aria-label="no paywall">no<br>paywall</div>
    </div>

    <div class="features-grid">
      <div class="feature-item">
        <i class="ph ph-barcode feature-icon" aria-hidden="true"></i>
        <div class="feature-name">Barcode scanning</div>
        <div class="feature-desc">Open Food Facts + USDA fallback for US products</div>
      </div>
      <div class="feature-item">
        <i class="ph ph-camera feature-icon" aria-hidden="true"></i>
        <div class="feature-name">Label OCR</div>
        <div class="feature-desc">On-device Vision — the photo never leaves your phone</div>
      </div>
      <div class="feature-item">
        <i class="ph ph-clipboard-text feature-icon" aria-hidden="true"></i>
        <div class="feature-name">Daily log</div>
        <div class="feature-desc">Meals, totals, and macro targets</div>
      </div>
      <div class="feature-item">
        <i class="ph ph-chart-line-up feature-icon" aria-hidden="true"></i>
        <div class="feature-name">History &amp; trends</div>
        <div class="feature-desc">Macro summaries and averages over time</div>
      </div>
      <div class="feature-item">
        <i class="ph ph-pencil-simple feature-icon" aria-hidden="true"></i>
        <div class="feature-name">Manual entry</div>
        <div class="feature-desc">Log foods with no barcode or label</div>
      </div>
      <div class="feature-item">
        <i class="ph ph-heart feature-icon" aria-hidden="true"></i>
        <div class="feature-name">Apple Health sync</div>
        <div class="feature-desc">Opt-in, write-only, no data read back</div>
      </div>
    </div>

    <div class="tip-row">
      <div class="tip-row-left">
        <i class="ph ph-jar tip-icon" aria-hidden="true"></i>
        <span class="tip-label">Optional</span>
      </div>
      <span class="tip-text"><strong>Tip jar</strong> — if Theli earns a place on your home screen and you'd like to chip in toward the Apple Developer fee, there's a small consumable IAP. It unlocks nothing. Entirely voluntary.</span>
    </div>
  </div>
</section>
```

---

## 7. Icons — Phosphor Icons (regular weight)

**Why Phosphor over emoji:** Raw emoji render via OS-level fonts and look meaningfully different across macOS/iOS, Android, and Windows. Phosphor is an MIT-licensed icon font with consistent rendering everywhere — and its barcode, jar, and camera icons are clearly more legible than any emoji equivalent.

**Why Phosphor over Lucide:** Phosphor has a native `ph-barcode` icon (actual vertical scanlines) and `ph-jar` — both relevant to Theli. Lucide's barcode renders as a QR-like grid and lacks a jar icon.

### Self-hosting

```bash
npm install @phosphor-icons/web
# copy into the repo:
cp node_modules/@phosphor-icons/web/src/regular/style.css vendor/phosphor-regular.css
cp -r node_modules/@phosphor-icons/web/src/regular/fonts/ vendor/fonts/
```

Update the CSS path in `phosphor-regular.css` to point to `../vendor/fonts/` (relative to `styles.css` location).

```html
<!-- In <head> of index.html -->
<link rel="stylesheet" href="vendor/phosphor-regular.css">
```

No JavaScript required — Phosphor is a pure CSS icon font.

### Icon class reference

| Location | Class |
|---|---|
| Pricing — barcode scanning | `ph ph-barcode` |
| Pricing — label OCR | `ph ph-camera` |
| Pricing — daily log | `ph ph-clipboard-text` |
| Pricing — history & trends | `ph ph-chart-line-up` |
| Pricing — manual entry | `ph ph-pencil-simple` |
| Pricing — Apple Health | `ph ph-heart` |
| Pricing — tip jar | `ph ph-jar` |
| Privacy band — no account | `ph ph-user-minus` |
| Privacy band — no trackers | `ph ph-shield-slash` |
| Privacy band — on-device | `ph ph-device-mobile` |
| Privacy band — log stays local | `ph ph-house-simple` |
| Privacy band — only barcode leaves | `ph ph-scan` |
| Privacy band — Health write-only | `ph ph-heart` |

### Usage pattern

```html
<!-- Feature grid item -->
<div class="feature-item">
  <i class="ph ph-barcode feature-icon" aria-hidden="true"></i>
  <div class="feature-name">Barcode scanning</div>
  <div class="feature-desc">Open Food Facts + USDA fallback for US products</div>
</div>

<!-- Tip jar row -->
<div class="tip-row">
  <div class="tip-row-left">
    <i class="ph ph-jar tip-icon" aria-hidden="true"></i>
    <span class="tip-label">Optional</span>
  </div>
  <span class="tip-text">…</span>
</div>

<!-- Privacy band promise (replaces .tick span) -->
<i class="ph ph-user-minus promise-icon" aria-hidden="true"></i>
```

### CSS sizing

Replace the Twemoji `img` overrides in §6 with:

```css
/* Phosphor icon sizing */
.feature-icon { font-size: 22px; color: var(--green); display: block; margin-bottom: 10px; line-height: 1; }
.tip-icon     { font-size: 18px; color: var(--turmeric); flex-shrink: 0; }
.promise-icon { font-size: 18px; color: rgba(221,213,218,0.75); flex-shrink: 0; line-height: 1.3; }
```

Remove the existing `.promise .tick { color: #79C9A4; font-size: 20px; flex: none; line-height: 1.4; }` rule.

---

## 8. Style guide additions

Add the following to `STYLE_GUIDE.md` under a new **§11 Platform Rules** section:

```markdown
## 11. Platform Rules

### No raw OS emoji
Never use raw Unicode emoji characters in production HTML/CSS/JS. Emoji rendering is
controlled by the OS font stack — the same character looks meaningfully different on
macOS/iOS, Android, and Windows. Use purpose-built icon sets instead:

- **Phosphor Icons** (web): MIT-licensed icon font, consistent rendering everywhere.
  Self-host via `@phosphor-icons/web`. Use `<i class="ph ph-[name]">` — no JS needed.
- **SF Symbols** (iOS app): system icons only; no emoji in SwiftUI views.

This applies to all surfaces: marketing site, privacy policy, any future web views.
```

---

## 9. Privacy policy page (`privacy.html`)

Only the token swap applies — no layout changes. Ensure:
- Google Fonts `<link>` is updated to Eczar (same import as `index.html`).
- CSS variables pick up automatically since `privacy.html` links `styles.css`.
- No icons on this page, so the Phosphor stylesheet is not needed here.

---

## 10. Future work (not in scope)

- **Subtle Tamil accents throughout** — small தெளி glyphs or Tamil letterforms as section dividers or decorative elements. Discussed; deferred to a dedicated design pass once the token swap is live and the site can be evaluated at rest.
- **App Store badge / screenshot** — hero could include a phone mockup once the app ships.
- **Dark mode site** — the app ships dark; the site is light-only for now. Revisit post-launch.

---

## 11. Files changed summary

| File | Change |
|---|---|
| `styles.css` | Token swap, hero watermark styles, steps editorial styles, support/pricing rewrite, Phosphor icon sizing rules |
| `index.html` | Google Fonts import, Phosphor stylesheet link, hero HTML structure, step `.num` → `.step-num`, support section HTML rewrite with `<i class="ph …">` icons |
| `privacy.html` | Google Fonts import only |
| `vendor/phosphor-regular.css` | New file — self-hosted Phosphor Icons regular weight stylesheet |
| `vendor/fonts/` | New directory — Phosphor web font files referenced by the stylesheet |
| `STYLE_GUIDE.md` (clearlabel repo) | Add §11 Platform Rules / no-emoji rule |

**`app.js` is not changed** — scroll-reveal logic is unaffected. Phosphor is a pure CSS icon font; no JS needed.
