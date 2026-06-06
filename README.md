# theli.app — marketing site + privacy policy

Static site for **Theli**, a privacy-first iOS nutrition scanner. No build step, no npm,
no third-party deps, no trackers — plain HTML/CSS + two small progressive-enhancement
scripts. Self-hosted fonts (Phosphor icons) + Google Fonts (Eczar / Hanken Grotesk / Noto
Serif Tamil). Light (Warm Stone Pink) and dark (Forest) themes with a toggle.

```
index.html              landing page
privacy.html            privacy policy (served at /privacy and /privacy.html)
styles.css              shared styles + light/dark themes (:root[data-theme])
app.js                  scroll reveals + hero-watermark parallax + name audio
theme.js                dark/light theme: pre-paint set + toggle + localStorage
favicon.svg             kolam app-mark (root, by convention)
apple-touch-icon.png    180×180 home-screen icon (root, by convention)
assets/img/             og-image.png (social card) + screens/ (app screenshots)
assets/audio/           theli-pronunciation.mp3 (name pronunciation clip)
vendor/                 self-hosted Phosphor Icons (CSS + web fonts)
docs/                   design specs, screenshot guide, app handoff
netlify.toml            publish dir + security headers + caching + www→apex redirect
```

Both scripts are external so the CSP stays `script-src 'self'` (no inline JS). All motion
is gated behind `prefers-reduced-motion`.

Local preview: open `index.html` directly, or `python3 -m http.server` in this dir.

---

## Deploy (Netlify)

1. Create a **public** GitHub repo (e.g. `theli-site`) and push this folder to it.
2. Netlify → **Add new site → Import from Git** → pick the repo. No build command needed
   (`netlify.toml` sets `publish = "."`). Deploy.
3. Netlify → **Domain management → Add a custom domain** → `theli.app`. Netlify will
   auto-provision a Let's Encrypt cert. `.app` is HSTS-preloaded (HTTPS-mandatory) — this
   is handled automatically; we also send the `Strict-Transport-Security … preload` header.

## DNS (stays at Namecheap — do NOT move nameservers)

theli.app uses **Namecheap DNS** and **Namecheap's free email forwarding** is already wired
(MX → `eforwardN.registrar-servers.com` + SPF). Moving nameservers to Netlify would break
that free forwarding. So keep DNS at Namecheap and only repoint the **web** records.

In Namecheap → Domain List → theli.app → **Advanced DNS**:

**Web → Netlify (replace the parking record):**

| Type        | Host | Value                          | Notes |
|-------------|------|--------------------------------|-------|
| A Record    | `@`  | `75.2.60.5`                    | Netlify load balancer (apex). Remove the existing parking A record `162.255.119.242`. |
| CNAME Record| `www`| `<your-site>.netlify.app`      | From your Netlify site name. The `netlify.toml` 301-redirects www → apex. |

*(Alternative for the apex: an `ALIAS Record` `@` → `apex-loadbalancer.netlify.com` — Namecheap
BasicDNS supports ALIAS. The A record above is the simplest and works everywhere.)*

Also remove any Namecheap **URL Redirect Record** on `@`/`www` left over from parking.

**Email → leave untouched (already working):** keep all `MX` records pointing to
`eforwardN.registrar-servers.com` and the `v=spf1 include:spf.efwd.registrar-servers.com ~all`
TXT record. These coexist with the web records above.

## Email forwarding (Namecheap, free — no AWS needed)

Namecheap → Domain List → theli.app → **Redirect Email** (Mailbox forwarding):
add `hello@theli.app` → your real inbox. That's the address used on this site and in the
app's Open Food Facts `User-Agent`. (AWS SES is not required; only consider it if you later
want to *send* mail as @theli.app, which would mean moving MX to SES.)

---

## Design

Brand system (shared with the app, source of truth in the app repo's `STYLE_GUIDE.md` +
`design/tokens.json`):

- **Themes:** light = Warm Stone Pink `#E6D2C9`, dark = Forest `#0F1C14`. Tokens live in
  `:root` / `:root[data-theme="dark"]`; the toggle defaults to OS preference, persists in
  `localStorage`, and sets the theme before paint (no flash).
- **Type:** Eczar (display serif) + Hanken Grotesk (body) + Noto Serif Tamil (wordmark).
- **Signature touches:** hero "clear." is a hollow outline (`-webkit-text-stroke` +
  `paint-order`) that blurs into focus on load; subtle kolam (sikku) section dividers
  (hairline + three turmeric pulli); staggered reveals, gentle hovers, theme cross-fade,
  watermark parallax.
- Per-change design rationale: `docs/superpowers/specs/`. App handoff: `docs/DESIGN_HANDOFF.md`.

> The marketing-specific flourishes (outlined "clear.", blur-to-clarity, split headline,
> kolam dividers, web animations) are **site-only** — the iOS app uses the same *tokens +
> type + dark theme* but its own native components and SwiftUI motion. See `docs/DESIGN_HANDOFF.md`.

## Caching

`styles.css` and `app.js` keep stable filenames (no build-step hashing), so `netlify.toml`
serves them `Cache-Control: public, max-age=0, must-revalidate` — the browser revalidates
via ETag (cheap 304s) and always picks up edits on deploy. **Do not** set `immutable` on
these stable-named assets; it strands returning visitors on a stale stylesheet.

## Keep in sync

`privacy.html` mirrors the Theli app's actual data behavior. If the app's data flows change
(new network call, analytics, cloud sync, etc.), update the privacy policy **before** that
ships — it's the App Store submission policy and the source of the OFF `User-Agent` contact.
Canonical app source of truth: the private `aabdur1/theli` repo (`CLAUDE.md`).
