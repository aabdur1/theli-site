# Theli — screenshot shot list & capture guide

Operational guide for producing the real app screenshots that feed **both** the
marketing site (`assets/img/screens/`) and the App Store listing. The current files in
`assets/img/screens/` are throwaway placeholders — replace them following this.

Theli supports **System / Light / Dark** (default System) via Settings →
Appearance. **Every shot in this set was captured in the Forest dark theme on
purpose** — to match the marketing site's Forest palette and keep the set
cohesive. (Older drafts said the app was forced dark via
`.preferredColorScheme(.dark)`; that's stale — appearance is now user-selectable.)

---

## 0. The conventions (every shot obeys these)

Apple's marketing convention, applied consistently so the set looks like one
considered thing rather than snapshots:

- **One device for the whole set.** Don't mix. For the App Store use the
  **iPhone 17 Pro Max** simulator (6.9", **1320 × 2868** — the required size).
  The same shots downscale fine for the site.
- **Status bar: 9:41, 100% charged, full Wi-Fi/cellular, no carrier clutter, no
  personal photo.** 9:41 is Apple's standard marketing time. The simulator has
  no contact poster, so the Dynamic Island stays clean (this is what made the
  placeholders look off — a real face in the notch on a privacy app).
- **No device frame in the raw capture.** `simctl ... screenshot` gives bare
  screen content. The website wraps each shot in its own `.device` bezel; the
  App Store wants frame-less screens too. (If you want glossy framed marketing
  images later, frame them separately — keep the raw ones unframed.)
- **Clean, realistic data.** Filled food names (never the empty "Food name"
  placeholder), tidy one-line servings (not run-on OCR text), a believable-but
  -tasteful diary. Avoid anything that reads as a bug.
- **Consistent content across the set** — same person's "day," sensible
  numbers, nothing alarming or joke-y.

---

## 1. Capture commands (Simulator — everything except the two camera views)

```bash
# Boot the device you'll standardize on
xcrun simctl boot "iPhone 17 Pro Max"        # 6.9" / 1320 × 2868
open -a Simulator

# Apple-standard clean status bar (run once after boot; persists for the session)
xcrun simctl status_bar booted override \
  --time "9:41" \
  --batteryState charged --batteryLevel 100 \
  --cellularMode active --cellularBars 4 --operatorName "" \
  --wifiMode active --wifiBars 3 \
  --dataNetwork wifi

# Capture each screen (repeat per shot)
xcrun simctl io booted screenshot ~/Desktop/theli/01-home.png

# To clear the override later:
xcrun simctl status_bar booted clear
```

> Tip: ⌘S in the Simulator also saves a screenshot, but `simctl io ... screenshot`
> is scriptable and guarantees native resolution.

---

## 2. The shot list

Ordered as an App Store narrative (scan → review → log → see progress → privacy).
All dark theme. Captions are short marketing headlines for the App Store; the
site uses its own step copy.

| # | Screen | Stage it like this | Demonstrates | App Store caption |
|---|--------|--------------------|--------------|-------------------|
| 1 | **Home / Today** (`HomeView`) | A believable day: 3–4 items across Breakfast/Lunch/Snack, macro totals sitting **under** targets (not maxed/over). Editorial-stat header populated. | The payoff — a calm daily diary, grouped by meal, totalled vs targets. | *Your whole day, made clear.* |
| 2 | **Barcode scan** (`BarcodeScanView`) | Camera overlay with the barcode **inside the reticle** (see §3). Calm, neutral product + background. | Point at a barcode → instant lookup. | *Point. Theli reads the barcode.* |
| 3 | **Label scan** (`LabelScanView`) | Camera overlay, Nutrition Facts panel filling the frame, "Fill the frame…" hint visible (see §3). | No barcode? Read the label, on-device. | *No barcode? Read the label.* |
| 4 | **Confirm / review** (`ConfirmView`) | **Food name filled**, **one-line serving** (e.g. "26 crackers (30 g)"), serving-control row visible, "Tap any value to correct it" present. | One review screen; adjust serving, every number recomputes; edit anything. | *Check it, tweak the serving, log it.* |
| 5 | **History / trends** | 7-day (or 30-day) Swift Chart with a few days of data so the trend reads. Averages visible. | Progress over time, not just today. | *See the trend, not just today.* |
| 6 | **Settings / privacy** | Show the Apple Health toggle (opt-in) + targets; anything that signals on-device/no-account. | The privacy promise, in-app. | *No account. Health sync is opt-in.* |
| 7 | **Manual entry** (`ManualEntryView`) *(optional)* | Name + 4 core macros filled with a real food. | Log anything, even with no barcode/label. | *Add anything by hand.* |
| 8 | **Tip jar** *(optional, not a hero)* | The StoreKit tip sheet (small/medium/large). | Free app, optional support. | *Free forever. Tips optional.* |

**Minimum viable set:** 1–6. Shots 7–8 are nice-to-have. App Store allows up to
10; 5–6 strong ones beats 10 weak ones.

### Where each lands on the website
`assets/img/screens/` currently holds 4 files the site references directly — replace them:

| Site slot | File | Use shot |
|-----------|------|----------|
| Hero device (desktop) | `assets/img/screens/fooditem.png` | **#4 Confirm** (filled name) or **#1 Home** |
| Step 01 | `assets/img/screens/barcode.jpg` | **#2 Barcode** |
| Step 02 | `assets/img/screens/label.jpg` | **#3 Label** |
| Step 03 | `assets/img/screens/confirm.png` | **#4 Confirm** |

> **Site crop:** the `.device .screen` frame is `aspect-ratio: 680 / 1410` with
> `object-fit: cover; object-position: center bottom`. A full 1320×2868 shot is
> cover-cropped and anchored to the bottom, so the **top of the status bar may
> clip** — keep nothing critical in the top ~6%, or pre-crop to ~680:1410.
> Consider adding a **History shot (#5)** as a 4th site visual later — the
> features grid lists "History & trends" but no screen currently shows it.

---

## 3. The two camera views (the hard ones)

The Simulator has no camera, and on a real device the scanner auto-advances the
instant a barcode/label is detected — so you can't hold the framed state to
shoot it. Three ways, best first:

1. **Overlay over a static image in an Xcode `#Preview` (recommended).** The
   reticle, instruction text, and Cancel/shutter chrome are just a SwiftUI
   overlay. Render that overlay on top of a clean still (a bundled `Image`
   instead of `CameraPreview`) in a Preview, and screenshot it. Result:
   pixel-perfect framing, any background you like, barcode sitting exactly
   inside the reticle, and you never touch the live capture path. Cleanest
   output by far.
2. **`#if DEBUG` freeze the auto-advance.** Gate the "barcode found → navigate"
   and the label auto-capture behind a debug flag / launch argument so the
   framed live preview just **stays put** on device. Hold it on a clean surface
   in good light, Volume-Up + Side button to capture, **revert the flag before
   commit** (same discipline as the temporary OCR dump that was reverted).
3. **Freeze (option 2), then stage a cleaner scene.** The HUD is real; only the
   product/background is controlled.

For both camera shots: neutral surface, even light, a product whose packaging
**doesn't fight the calm palette** (the placeholder's bright-red box was the
loudest thing on the page), and the scan target **actually inside the frame**.

---

## 4. App Store size reference

iPhone-only app (`TARGETED_DEVICE_FAMILY = iPhone`).

- **6.9" display — required:** **1320 × 2868** (portrait). iPhone 17 Pro Max /
  16 Pro Max. Apple scales this down to cover smaller devices, so this one set
  is sufficient.
- 6.5" (1242 × 2688) and others are optional — skip unless you want per-size
  tuning.
- Portrait only. PNG or JPEG, no transparency, no rounded-corner masking.

---

## 5. Pre-capture checklist

- [ ] Right device booted (17 Pro Max for App Store sizes), same one for all shots
- [ ] `status_bar override` applied — 9:41, 100%, full bars, no operator name
- [ ] App in dark theme (it's forced dark — just confirm)
- [ ] Diary staged with believable data; macros under targets
- [ ] Confirm screen: food name filled, serving is a clean single line
- [ ] No personal info, no debug overlays, no error/empty states
- [ ] Camera shots: target inside the frame, clean background, calm product
- [ ] Captured at native resolution (`simctl io ... screenshot`), unframed
- [ ] Site files cropped/anchored so the status bar isn't clipped awkwardly
