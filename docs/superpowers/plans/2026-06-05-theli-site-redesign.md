# Theli Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the locked style guide tokens (Eczar font, Dusty Mauve palette) to theli.app and elevate hero, steps, pricing, and privacy band sections with new layouts and Phosphor icon system.

**Architecture:** Pure static HTML/CSS/font-file changes — no build step, no npm runtime, no JS changes. Phosphor Icons loaded as a self-hosted CSS icon font. All changes land in `~/repos/theli-site/`; the STYLE_GUIDE.md addition lands in `~/repos/clearlabel/`. Deploy is automatic on push to `theli-site` `main` via Netlify.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, clamp()), Phosphor Icons 2.1.1 (regular weight, CSS font), Google Fonts (Eczar + Hanken Grotesk + Noto Serif Tamil).

---

## File Map

| File | Action | What changes |
|---|---|---|
| `vendor/phosphor-regular.css` | **Create** | Self-hosted Phosphor Icons stylesheet |
| `vendor/fonts/` | **Create** | Phosphor web font files (TTF/WOFF/WOFF2) |
| `styles.css` | **Modify** | Token swap + all new section CSS |
| `index.html` | **Modify** | Font import, Phosphor link, hero/steps/band/pricing HTML |
| `privacy.html` | **Modify** | Font import only |
| `~/repos/clearlabel/STYLE_GUIDE.md` | **Modify** | Add §11 Platform Rules |

`app.js` — not touched.

---

## Task 1: Self-host Phosphor Icons

**Files:**
- Create: `vendor/phosphor-regular.css`
- Create: `vendor/fonts/` (directory of font files)

- [ ] **Step 1: Extract Phosphor files via npm**

Run from `~/repos/theli-site/`:

```bash
cd ~/repos/theli-site
npm install @phosphor-icons/web@2.1.1
cp node_modules/@phosphor-icons/web/src/regular/style.css vendor/phosphor-regular.css
cp -r node_modules/@phosphor-icons/web/src/regular/fonts vendor/fonts
rm -rf node_modules package-lock.json
```

Expected: `vendor/phosphor-regular.css` exists; `vendor/fonts/` contains `.ttf`, `.woff`, `.woff2` files.

- [ ] **Step 2: Verify font paths are correct**

Open `vendor/phosphor-regular.css` and confirm the `@font-face` `src:` URLs reference `./fonts/Phosphor-Regular.ttf` (or similar). Since the CSS is at `vendor/phosphor-regular.css` and fonts are at `vendor/fonts/`, relative paths of the form `url("./fonts/…")` are already correct — no edits needed.

```bash
head -20 vendor/phosphor-regular.css
```

Expected: `url("./fonts/Phosphor…")` style paths. If paths differ (e.g. `../fonts/`), update them to `./fonts/`.

- [ ] **Step 3: Smoke-test one icon**

Temporarily add to the bottom of `index.html` (before `</body>`):

```html
<link rel="stylesheet" href="vendor/phosphor-regular.css">
<p style="font-size:40px"><i class="ph ph-barcode"></i> <i class="ph ph-camera"></i> <i class="ph ph-jar"></i></p>
```

Open `index.html` in a browser (file:// or `npx serve .`). Confirm three icons render — barcode (vertical lines), camera, jar.

- [ ] **Step 4: Remove the smoke-test markup**

Delete the two lines you just added. They were temporary.

- [ ] **Step 5: Commit**

```bash
cd ~/repos/theli-site
git add vendor/phosphor-regular.css vendor/fonts/
git commit -m "vendor: self-host Phosphor Icons 2.1.1 regular weight"
```

---

## Task 2: Token swap + font imports

**Files:**
- Modify: `styles.css` (`:root`, `body`, `.site-header`, `h1,h2,h3`)
- Modify: `index.html` (`<link>` in `<head>`)
- Modify: `privacy.html` (`<link>` in `<head>`)

- [ ] **Step 1: Replace the Google Fonts import in `index.html`**

Find the line:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Hanken+Grotesk:wght@400;500;600&family=Noto+Serif+Tamil:wght@400;500;600&display=swap" rel="stylesheet" />
```

Replace with:
```html
<link href="https://fonts.googleapis.com/css2?family=Eczar:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Hanken+Grotesk:wght@400;500;600&family=Noto+Serif+Tamil:wght@400;500;600&display=swap" rel="stylesheet">
```

Also add the Phosphor stylesheet link immediately after:
```html
<link rel="stylesheet" href="vendor/phosphor-regular.css">
```

- [ ] **Step 2: Replace the Google Fonts import in `privacy.html`**

Find and replace the same Fraunces import line with the Eczar import. Do **not** add the Phosphor link here (no icons on that page).

```html
<link href="https://fonts.googleapis.com/css2?family=Eczar:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Hanken+Grotesk:wght@400;500;600&family=Noto+Serif+Tamil:wght@400;500;600&display=swap" rel="stylesheet">
```

- [ ] **Step 3: Replace the `:root` block in `styles.css`**

Find the entire `:root { … }` block (lines 5–25) and replace it:

```css
:root {
  --paper:      #DDD5DA;
  --paper-2:    #D2C8CE;
  --paper-3:    #C6BBC2;
  --ink:        #1A1820;
  --ink-soft:   #4E4854;
  --ink-faint:  #867880;
  --green:      #2E5D4B;
  --green-deep: #234A3B;
  --green-lite: #3E7D63;
  --turmeric:   #C8852E;
  --line:       rgba(26,24,32,0.13);
  --line-soft:  rgba(26,24,32,0.07);

  --serif: "Eczar", Georgia, serif;
  --sans:  "Hanken Grotesk", -apple-system, BlinkMacSystemFont, sans-serif;
  --tamil: "Noto Serif Tamil", serif;

  --maxw: 1080px;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}
```

- [ ] **Step 4: Update `body` background-image in `styles.css`**

Find the `background-image:` property inside the `body { … }` block and replace it:

```css
  background-image:
    radial-gradient(120% 80% at 12% -8%, rgba(62,125,99,0.09), transparent 55%),
    radial-gradient(90% 70% at 100% 0%,  rgba(120,80,130,0.06), transparent 50%);
```

- [ ] **Step 5: Update header backdrop in `styles.css`**

Find `.site-header` and change the `background:` value:

```css
  background: rgba(221,213,218,0.72);
```

- [ ] **Step 6: Update heading font-weight in `styles.css`**

Find `h1, h2, h3 { … }` and change `font-weight` from `500` to `600`:

```css
h1, h2, h3 { font-family: var(--serif); font-weight: 600; line-height: 1.05; letter-spacing: -0.02em; }
```

- [ ] **Step 7: Open in browser and verify**

Open `index.html`. Confirm:
- Headlines render in Eczar (more upright than Fraunces — serifs are more geometric)
- Background is Dusty Mauve (`#DDD5DA`) — cooler/greyer, not warm parchment
- Gradient is green top-left, faint lavender top-right (not turmeric)
- Header backdrop matches the new paper colour when scrolled

- [ ] **Step 8: Commit**

```bash
cd ~/repos/theli-site
git add styles.css index.html privacy.html
git commit -m "style: swap Fraunces→Eczar and warm paper→Dusty Mauve tokens"
```

---

## Task 3: Hero — watermark glyph

**Files:**
- Modify: `index.html` (hero section structure)
- Modify: `styles.css` (`.hero`, `.hero-watermark`, `.hero-content`)

- [ ] **Step 1: Update the hero HTML in `index.html`**

Find the `<section class="hero">` block. Replace it entirely:

```html
<section class="hero">
  <div class="wrap">
    <div class="hero-watermark" aria-hidden="true">தெளி</div>
    <div class="hero-content">
      <p class="eyebrow reveal" style="margin-top:0">Privacy-first nutrition scanner · iPhone</p>
      <h1 class="reveal">Nutrition, made <em>clear.</em> And kept to yourself.</h1>
      <p class="lede reveal">Scan a barcode or photograph a label. Theli reads it in a beat — calories, macros, the whole panel — and logs it. No account. No ads. No tracking. Your food diary never leaves your phone.</p>
      <p class="pron reveal"><b>theli</b> &nbsp;·&nbsp; THEH-lee &nbsp;·&nbsp; Tamil (தெளி) for <em>clarity</em></p>
      <div class="cta-row reveal">
        <a class="btn" href="#how">See how it works <span aria-hidden="true">↓</span></a>
        <a class="btn ghost" href="privacy.html">Read the privacy promise</a>
      </div>
      <p class="cta-note reveal" style="margin-top:18px">Coming soon to the App Store · iPhone only</p>
    </div>
  </div>
</section>
```

Key changes from old markup:
- `<div class="tamil-glyph reveal">தெளி</div>` removed from the flow
- New `<div class="hero-watermark" aria-hidden="true">தெளி</div>` added (absolute positioned)
- All hero content wrapped in `<div class="hero-content">`

- [ ] **Step 2: Update hero CSS in `styles.css`**

Find the `/* ---- Hero ---- */` comment and replace **all** hero rules (`.hero`, `.hero .tamil-glyph`, `.hero h1`, `.hero h1 em`, `.hero .lede`, `.hero .pron`, `.hero .pron b`) with:

```css
/* ---- Hero ---- */
.hero {
  padding: clamp(70px, 13vw, 150px) 0 clamp(50px, 8vw, 90px);
  position: relative;
  overflow: hidden;
}

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

.hero h1 {
  font-size: clamp(44px, 8.5vw, 104px);
  margin: 0.18em 0 0;
  max-width: 14ch;
}
.hero h1 em { font-style: italic; color: var(--green); font-weight: 500; }
.hero .lede {
  font-size: clamp(18px, 2.3vw, 23px);
  color: var(--ink-soft);
  max-width: 46ch;
  margin-top: 28px;
}
.hero .pron { margin-top: 14px; font-size: 15px; color: var(--ink-faint); font-style: italic; }
.hero .pron b { font-style: normal; color: var(--ink-soft); font-weight: 600; }
```

- [ ] **Step 3: Open in browser and verify**

Confirm:
- Large ghosted தெளி glyph visible in the right side of the hero — partially crops off the edge on desktop
- Text is left-aligned, not centred
- Glyph sits behind the text (not overlapping it awkwardly)
- On narrow viewport (resize to ~375px) the watermark doesn't obscure text — the `overflow: hidden` on `.hero` clips it

- [ ] **Step 4: Commit**

```bash
cd ~/repos/theli-site
git add styles.css index.html
git commit -m "feat: hero watermark glyph — Tamil backdrop, left-aligned content"
```

---

## Task 4: Steps — editorial numbers

**Files:**
- Modify: `index.html` (three `.step` divs)
- Modify: `styles.css` (`.steps`, `.step`, `.step-num`, mobile breakpoint)

- [ ] **Step 1: Update the step HTML in `index.html`**

Find the `<div class="steps">` block. Replace the three `.step` divs:

```html
<div class="steps">
  <div class="step reveal">
    <span class="step-num">01</span>
    <h3>Point at the barcode</h3>
    <p>Theli looks it up in Open Food Facts, with a USDA fallback for US products that aren't there yet. Facts appear, scaled to your serving.</p>
  </div>
  <div class="step reveal">
    <span class="step-num">02</span>
    <h3>Or photograph the label</h3>
    <p>No barcode? Fresh, local, or imported food? Snap the Nutrition Facts panel. Apple's on-device Vision reads it — the photo never leaves your phone and is discarded after parsing.</p>
  </div>
  <div class="step reveal">
    <span class="step-num">03</span>
    <h3>Check it, then log it</h3>
    <p>One review screen. Adjust the serving and every number recomputes instantly. Tap to log. It lands in today's diary, grouped by meal, totaled against your targets.</p>
  </div>
</div>
```

Key change: `<span class="num">01 / Barcode</span>` → `<span class="step-num">01</span>` (number only, no mode label).

- [ ] **Step 2: Replace step CSS in `styles.css`**

Find `/* ---- How it works ---- */` and replace the `.steps` and `.step` rules (including the `@media (max-width: 820px)` for steps):

```css
/* ---- How it works ---- */
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}
.step {
  padding: 24px 32px 32px;
  border-right: 1px solid var(--line-soft);
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
  display: block;
}
.step h3 { font-size: clamp(18px, 2.2vw, 22px); margin: 0 0 10px; }
.step p  { color: var(--ink-soft); font-size: 15px; line-height: 1.6; }

@media (max-width: 820px) {
  .steps { grid-template-columns: 1fr; }
  .step {
    border-right: none;
    border-bottom: 1px solid var(--line-soft);
    padding: 28px 0;
  }
  .step:first-child { padding-left: 0; }
  .step:last-child  { border-bottom: none; }
}
```

Also **remove** the old `.step .num` rule (the one with `font-family: var(--serif); font-size: 15px; color: var(--turmeric)`) — it no longer exists.

- [ ] **Step 3: Open in browser and verify**

Confirm:
- Large turmeric `01` / `02` / `03` numbers dominate each column
- No card backgrounds, no rounded corners, no hover lift
- Thin vertical hairlines separate the three columns on desktop
- On mobile (≤820px) columns stack vertically with horizontal hairlines instead

- [ ] **Step 4: Commit**

```bash
cd ~/repos/theli-site
git add styles.css index.html
git commit -m "feat: steps section — editorial turmeric numbers, no cards"
```

---

## Task 5: Privacy band — token polish + Phosphor icons

**Files:**
- Modify: `styles.css` (`.band`, `.band .eyebrow`, `.band h2`, `.promise`, `.promise-icon`)
- Modify: `index.html` (six `.promise` divs — swap `.tick` span for Phosphor `<i>`)

- [ ] **Step 1: Update band colour rules in `styles.css`**

Find the `/* ---- Privacy feature band ---- */` section. Update these specific values (keep layout properties unchanged):

```css
.band {
  background: var(--green-deep);
  color: rgba(221,213,218,0.85);   /* was #EDE9DC */
  border-radius: 28px;
  padding: clamp(40px, 7vw, 80px);
  position: relative; overflow: hidden;
}
.band .eyebrow { color: rgba(221,213,218,0.55); }    /* was #9FD4BC */
.band h2 { color: #DDD5DA; font-size: clamp(30px, 5vw, 52px); margin-top: 14px; max-width: 18ch; }  /* was #FBF8F0 */
```

- [ ] **Step 2: Replace `.promise .tick` CSS with `.promise-icon` in `styles.css`**

Find:
```css
.promise .tick { color: #79C9A4; font-size: 20px; flex: none; line-height: 1.4; }
```

Replace with:
```css
.promise-icon { font-size: 18px; color: rgba(221,213,218,0.70); flex-shrink: 0; line-height: 1.3; }
```

- [ ] **Step 3: Update the six `.promise` divs in `index.html`**

Find `<section id="privacy">`. Replace the six `.promise` divs (the whole `<div class="grid">` contents):

```html
<div class="grid">
  <div class="promise">
    <i class="ph ph-user-minus promise-icon" aria-hidden="true"></i>
    <div><b>No account, ever</b><span>Open the app and start. No sign-up, no email, no profile to hand over before you can scan.</span></div>
  </div>
  <div class="promise">
    <i class="ph ph-shield-slash promise-icon" aria-hidden="true"></i>
    <div><b>No ads, no analytics, no trackers</b><span>Zero third-party SDKs. Nothing watches how you use the app or what you eat.</span></div>
  </div>
  <div class="promise">
    <i class="ph ph-device-mobile promise-icon" aria-hidden="true"></i>
    <div><b>Labels read on-device</b><span>Photos are processed by Apple's Vision framework on your phone and discarded. No image is ever uploaded or stored.</span></div>
  </div>
  <div class="promise">
    <i class="ph ph-house-simple promise-icon" aria-hidden="true"></i>
    <div><b>Your log stays local</b><span>Your food diary lives in on-device storage only. There's no Theli server, no cloud sync, no backup we can read.</span></div>
  </div>
  <div class="promise">
    <i class="ph ph-scan promise-icon" aria-hidden="true"></i>
    <div><b>The only thing that leaves is a barcode number</b><span>Scanned barcodes go to Open Food Facts / USDA purely to look up a product. Nothing personal rides along.</span></div>
  </div>
  <div class="promise">
    <i class="ph ph-heart promise-icon" aria-hidden="true"></i>
    <div><b>Apple Health is opt-in &amp; write-only</b><span>If you ever turn on Health sync, Theli only writes entries you logged. It never reads your health data.</span></div>
  </div>
</div>
```

- [ ] **Step 4: Open in browser and verify**

Confirm:
- Privacy band renders on dark green background
- Phosphor icons appear in each promise row (muted off-white, ~18px)
- No `✓` tick character remains
- Body text is Dusty Mauve off-white (slightly cooler than the old cream)
- `.band::after` Tamil watermark still renders behind the content

- [ ] **Step 5: Commit**

```bash
cd ~/repos/theli-site
git add styles.css index.html
git commit -m "feat: privacy band — Dusty Mauve tokens + Phosphor icons replace tick"
```

---

## Task 6: Pricing section — hybrid layout

**Files:**
- Modify: `index.html` (`<section class="support">` complete replacement)
- Modify: `styles.css` (remove old support rules, add new)

- [ ] **Step 1: Replace the support section HTML in `index.html`**

Find `<section class="support">` and replace the entire section:

```html
<!-- SUPPORT -->
<section class="support">
  <div class="wrap">
    <div class="support-top reveal">
      <div>
        <span class="eyebrow">Pricing</span>
        <h2>Free. The whole thing.</h2>
        <p>Every feature is open — scanning, label OCR, your daily log, targets, history. Theli is built as a labour of care, not a funnel. If it earns a place on your home screen and you'd like to chip in toward the Apple Developer fee and keep it growing, there's a small, entirely optional tip jar. That's the only thing money touches.</p>
      </div>
      <div class="price-tag" aria-label="no paywall">no<br>paywall</div>
    </div>

    <div class="features-grid">
      <div class="feature-item reveal">
        <i class="ph ph-barcode feature-icon" aria-hidden="true"></i>
        <div class="feature-name">Barcode scanning</div>
        <div class="feature-desc">Open Food Facts + USDA fallback for US products</div>
      </div>
      <div class="feature-item reveal">
        <i class="ph ph-camera feature-icon" aria-hidden="true"></i>
        <div class="feature-name">Label OCR</div>
        <div class="feature-desc">On-device Vision — the photo never leaves your phone</div>
      </div>
      <div class="feature-item reveal">
        <i class="ph ph-clipboard-text feature-icon" aria-hidden="true"></i>
        <div class="feature-name">Daily log</div>
        <div class="feature-desc">Meals, totals, and macro targets</div>
      </div>
      <div class="feature-item reveal">
        <i class="ph ph-chart-line-up feature-icon" aria-hidden="true"></i>
        <div class="feature-name">History &amp; trends</div>
        <div class="feature-desc">Macro summaries and averages over time</div>
      </div>
      <div class="feature-item reveal">
        <i class="ph ph-pencil-simple feature-icon" aria-hidden="true"></i>
        <div class="feature-name">Manual entry</div>
        <div class="feature-desc">Log foods with no barcode or label</div>
      </div>
      <div class="feature-item reveal">
        <i class="ph ph-heart feature-icon" aria-hidden="true"></i>
        <div class="feature-name">Apple Health sync</div>
        <div class="feature-desc">Opt-in, write-only, no data read back</div>
      </div>
    </div>

    <div class="tip-row reveal">
      <div class="tip-row-left">
        <i class="ph ph-jar tip-icon" aria-hidden="true"></i>
        <span class="tip-label">Optional</span>
      </div>
      <span class="tip-text"><strong>Tip jar</strong> — if Theli earns a place on your home screen and you'd like to chip in toward the Apple Developer fee, there's a small consumable IAP. It unlocks nothing. Entirely voluntary.</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Replace support CSS in `styles.css`**

Find `/* ---- Support / tip jar ---- */` and replace all rules under it (`.support`, `.support .inner`, `.support h2`, `.support p`, `.price-tag`) with:

```css
/* ---- Pricing / support ---- */
.support-top {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: end;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--line-soft);
  margin-bottom: 40px;
}
.support-top h2 { font-size: clamp(30px, 5vw, 42px); margin-top: 14px; }
.support-top p  { color: var(--ink-soft); margin-top: 16px; font-size: 16px; line-height: 1.65; max-width: 46ch; }

.price-tag {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(48px, 7vw, 72px);
  font-weight: 500;
  color: var(--green);
  line-height: 1;
  letter-spacing: -0.02em;
  white-space: nowrap;
  flex-shrink: 0;
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
.feature-name { font-family: var(--serif); font-size: 16px; font-weight: 600; color: var(--ink); margin-bottom: 4px; line-height: 1.2; }
.feature-desc { font-size: 13px; color: var(--ink-soft); line-height: 1.5; }

.tip-row { display: flex; align-items: flex-start; gap: 12px; padding-top: 24px; border-top: 1px solid var(--line-soft); }
.tip-row-left { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.tip-icon  { font-size: 18px; color: var(--turmeric); line-height: 1; }
.tip-label {
  font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--turmeric); padding: 3px 10px;
  background: rgba(200,133,46,0.10); border: 1px solid rgba(200,133,46,0.20);
  border-radius: 999px; white-space: nowrap;
}
.tip-text { font-size: 13.5px; color: var(--ink-soft); line-height: 1.55; }
.tip-text strong { color: var(--ink); font-weight: 600; }

@media (max-width: 720px) {
  .support-top { grid-template-columns: 1fr; gap: 16px; }
  .price-tag { font-size: clamp(40px, 10vw, 56px); }
  .features-grid { grid-template-columns: 1fr 1fr; }
  .feature-item { padding: 16px 16px 16px 0; }
  .feature-item:nth-child(2n)   { padding-left: 16px; padding-right: 0; border-left: 1px solid var(--line-soft); border-right: none; }
  /* 2n+1 must also clear border-left: item 3 is both 3n+2 (gets border-left in 3-col) and 2n+1 (left column in 2-col, no border) */
  .feature-item:nth-child(2n+1) { padding-left: 0; padding-right: 16px; border-left: none; border-right: none; }
  /* belt-and-suspenders reset of the 3-col border-right */
  .feature-item:nth-child(3n+2) { border-right: none; }
}
```

- [ ] **Step 3: Open in browser and verify desktop layout**

Confirm:
- "Free. The whole thing." headline on left, large italic "no paywall" on right
- 3-column feature grid below, separated by hairlines
- All 6 Phosphor icons render in green at ~22px
- Tip jar row at bottom with jar icon + turmeric "Optional" pill

- [ ] **Step 4: Verify mobile layout**

Resize browser to 375px wide. Confirm:
- "no paywall" drops below the headline (single column)
- Feature grid becomes 2-column
- No horizontal overflow

- [ ] **Step 5: Commit**

```bash
cd ~/repos/theli-site
git add styles.css index.html
git commit -m "feat: pricing section — statement + free feature grid + tip jar"
```

---

## Task 7: Style guide §11 — no-emoji rule

**Files:**
- Modify: `~/repos/clearlabel/STYLE_GUIDE.md`

- [ ] **Step 1: Add §11 to STYLE_GUIDE.md**

Open `~/repos/clearlabel/STYLE_GUIDE.md`. Append the following at the end of the file (after §10 SwiftUI Implementation Notes):

```markdown
---

## 11. Platform Rules

### No raw OS emoji
Never use raw Unicode emoji characters in production HTML/CSS/JS. Emoji rendering is
controlled by the OS font stack — the same character looks meaningfully different on
macOS/iOS, Android, and Windows. Use purpose-built icon sets instead:

- **Phosphor Icons** (web): MIT-licensed icon font, consistent rendering everywhere.
  Self-host via `@phosphor-icons/web`. Use `<i class="ph ph-[name]" aria-hidden="true">` — no JS needed.
- **SF Symbols** (iOS app): system icons only; no emoji in SwiftUI views.

This applies to all surfaces: marketing site, privacy policy, any future web views.
```

- [ ] **Step 2: Commit to clearlabel repo**

```bash
cd ~/repos/clearlabel
git add STYLE_GUIDE.md
git commit -m "docs: add §11 Platform Rules — no raw OS emoji, use Phosphor/SF Symbols"
```

---

## Task 8: Final visual verification pass

**Files:** None modified — verification only.

- [ ] **Step 1: Full scroll on desktop**

Open `index.html` (or the live Netlify preview if already pushed). Scroll from top to bottom. Check each section in order:

| Section | What to verify |
|---|---|
| Header | Eczar wordmark, Dusty Mauve backdrop on scroll |
| Hero | Watermark glyph visible right side, text left-aligned, h1 large and confident |
| How it works | Large turmeric `01`/`02`/`03`, no card backgrounds, hairline dividers |
| Privacy band | Dark green, Phosphor icons (muted white), Dusty Mauve text |
| Pricing | Statement row, 3-col feature grid with green icons, tip jar footnote |
| Footer | Eczar brand mark, links legible |

- [ ] **Step 2: Mobile check (375px)**

Resize browser to 375px. Verify:
- Hero watermark doesn't obscure headline text
- Steps stack vertically
- Privacy grid collapses to single column
- Pricing feature grid becomes 2-column
- No horizontal scroll bar

- [ ] **Step 3: Check privacy.html**

Open `privacy.html`. Confirm Eczar loads for the document headline (`.doc h1`). No layout issues.

- [ ] **Step 4: Push to Netlify and verify live**

```bash
cd ~/repos/theli-site
git push origin main
```

Open `https://theli.app` in a fresh browser tab (not localhost) after Netlify deploys (~30s). Verify Phosphor font files load (no missing icon squares), Google Fonts load (Eczar renders), and no console errors.

- [ ] **Step 5: Final commit if any fixes were made**

If any tweaks were needed during verification:

```bash
cd ~/repos/theli-site
git add -p   # stage only what changed
git commit -m "fix: post-verification tweaks"
git push origin main
```
