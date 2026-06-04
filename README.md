# theli.app — marketing site + privacy policy

Static site for **Theli**, a privacy-first iOS nutrition scanner. No build step, no
dependencies, no trackers — plain HTML/CSS + one small progressive-enhancement script.

```
index.html     landing page
privacy.html   privacy policy (served at /privacy and /privacy.html)
styles.css     shared styles
app.js         scroll-reveal (external so CSP stays script-src 'self')
netlify.toml   publish dir + security headers + www→apex redirect
```

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

## Keep in sync

`privacy.html` mirrors the Theli app's actual data behavior. If the app's data flows change
(new network call, analytics, cloud sync, etc.), update the privacy policy **before** that
ships — it's the App Store submission policy and the source of the OFF `User-Agent` contact.
Canonical app source of truth: the private `aabdur1/theli` repo (`CLAUDE.md`).
