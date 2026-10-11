# TOMOLI Website — CLAUDE.md

> Static B2B lead-generation website for Foshan (China) garment manufacturing. 4 pages, vanilla HTML/CSS/JS, **multilingual (7 languages)**, no build step. Replaces a Codex-style AGENTS.md.

---

## 1. Project at a glance

- **What**: One direct gateway to specialized garment manufacturing across Foshan — kids' & adult clothing, activewear, knitwear, denim. OEM / ODM support since 2000.
- **Audience**: Overseas buyers (independent brands, e-commerce sellers, wholesalers, global sourcing teams).
- **Form**: Static site, no backend. Form is demo-only — does NOT submit.
- **Languages**: 7 supported — `en` (English, default), `id` (Indonesian), `th` (Thai), `ru` (Russian), `ar` (Arabic, RTL), `zh-TW` (Traditional Chinese), `tl` (Filipino/Tagalog). See §9c for the i18n contract.
- **Brand voice**: Confident, industrial, direct. Avoid hype words.

**Pages (4 total)**:
1. **Home** (`index.html`) — hero + Why us + What we offer + social newsroom.
2. **Products** (`products.html`) — Children's Apparel + Adult's Apparel. Up to 10 photo slots per category, each with a caption (e.g. "dress") beneath.
3. **About** (`about.html`) — Section 1 "Get to know us" (intro prose + stats), Section 2 "Core features" (5 cards with photos), Section 3 facility thumbnails (4 cards with captions).
4. **Contact** (`contact.html`) — Section 1 location info (Location / Contact No / Email / Map), Section 2 Send Message form (Name / Email / Phone or WhatsApp / Message).

---

## 2. Tech stack

| Layer | Choice |
|---|---|
| Markup | HTML5, one file per page |
| Styles | Single `styles.css` (vanilla CSS, no preprocessor) |
| Scripts | Single `script.js` (vanilla JS, no framework) |
| Images | Unsplash URLs as placeholders — replace before launch |
| Fonts | Google Fonts: Barlow Condensed (display) + DM Sans (body) |
| Build | None — open `index.html` directly or serve with `python -m http.server` |
| Version control | Git + GitHub (`Gg-002/foshangarmenthub`) |

---

## 3. File map

```
index.html          ← homepage (hero + why us + what we offer + social)
products.html       ← 2 categories: Children's Apparel + Adult's Apparel (10 photo slots each)
about.html          ← 3 sections: Get to know us / Core features / Facility thumbnails
contact.html        ← 2 sections: Location info (with map) + Send Message form

styles.css          ← all styles (CSS variables in :root)
script.js           ← navigation, reveal-on-scroll, WhatsApp wiring
README.md           ← pre-launch checklist (form endpoint, real images, certificates, etc.)
CLAUDE.md           ← this file — project context for future Claude sessions
factory photo/      ← local photo asset (kept for reference, not yet wired in)
reference/          ← design reference images uploaded by owner (not deploy assets)
```

**GitHub**: https://github.com/Gg-002/foshangarmenthub (auto-push on commit).

---

## 4. Design system

### Colors (CSS custom properties in `:root`)

| Variable | Value | Use |
|---|---|---|
| `--ink` | `#14201d` | Body text, dark UI |
| `--paper` | `#f2f0e9` | Page background, light surfaces |
| `--orange` | `#ff5a1f` | Brand accent, eyebrows, CTAs, "Since 2000", category highlights |
| `--muted` | `#66716e` | Secondary text |
| `--line` | `rgba(20,32,29,.18)` | Borders, dividers |
| Dark utility bar | `#0b1210` | Top black strip + footer + WhatsApp float |
| WhatsApp green | `#25D366` | Floating button only |

### Typography

- **Display** (headings): `'Barlow Condensed', sans-serif` — weight 800, uppercase, tight tracking.
- **Body**: `'DM Sans', sans-serif` — weights 400/500/600/700.
- Hero title size: `clamp(70px, 11vw, 140px)` on desktop, `54px` on mobile.
- Subtitle: `clamp(19px, 1.75vw, 26px)`, weight 700, uppercase.
- Eyebrow: 12–13px, weight 700, uppercase, orange, with a leading horizontal rule.

### Logo

- Text: `TOMOLI` (dark `--ink`), single span.
- On dark sections the logo can invert; on light sections it stays dark.
- The "T" of "TOMOLI" defines the left content edge.

---

## 5. Hero section (`index.html`)

- Background: cream `--paper`.
- Layout: full-width 2-column grid (1fr / 1fr). Image extends to right viewport edge.
- Padding: 100px top/bottom, left/right padded to align with logo "T".
- Total height: ~680px (tuned to fit in viewport without scrolling on most laptops).
- Right column: `min-height: 680px` matching copy height; image is `position:absolute; inset:0; object-fit:cover`.

### Hero content order (top to bottom)

1. Eyebrow: `One hub. The right factory.` — orange, with leading horizontal rule.
2. Title: `Made with / Profession` (uppercase, huge).
3. Subtitle: 1-line value prop — `Direct Factory With No Middlemen`.
4. Specialised-in tag: bordered box with orange left bar; `Specialised in` label (dark, divider-right) + categories in orange.

---

## 6. Specialised-in tag

```html
<span class="hero-specialties">
  <span class="spec-label">Specialised in</span>
  <span class="spec-cat">Kids' & adult clothing</span>
  <span class="spec-sep">·</span>
  <span class="spec-cat">Activewear</span>
  <span class="spec-sep">·</span>
  <span class="spec-cat">Knitwear</span>
  <span class="spec-sep">·</span>
  <span class="spec-cat">Denim</span>
</span>
```

- Max-width: 580px (aligns with subtitle text edges).
- Left orange accent bar (`::before`): 6×38px, position absolute.
- "Specialised in" gets a right border separator; categories are orange and bold.

---

## 7. Utility strip (top of every page)

- Background: black `#0b1210`.
- Height: 38px.
- Left text: `Since 2000 · Foshan, Guangdong, China · Global OEM / ODM` (orange).
- Right text: `hello@tomoliapparel.com` as clickable mailto link (orange, hover `#ffb38a`).
- Border-bottom: `1px solid rgba(255,90,31,.25)` (subtle orange tint).

**Email rule**: every occurrence of `hello@tomoliapparel.com` in HTML MUST be `hello@tomoliapparel.com`. Run `grep -onE "service@[A-Za-z.]+" *.html` to verify.

---

## 8. WhatsApp integration

### Config (`script.js`) — LIVE

```js
const SITE_CONFIG = {
  whatsappNumber: '16047679938',     // 604 = Vancouver BC, Canada
  whatsappMessage: "Hello\nCan we help you?"
};
```

- `whatsappNumber`: international format, NO `+`, spaces, or punctuation.
- `whatsappMessage`: plain text, use `\n` for line breaks.

### Wiring

- `data-whatsapp` attribute on any element triggers wiring via `initWhatsApp()`.
- If `whatsappNumber` is set, `href` becomes `https://wa.me/<number>?text=<encodeURIComponent(message)>`.
- If not set, falls back to `contact.html`.

**Critical**: use `encodeURIComponent()` (NOT `URLSearchParams.set()`) — the latter encodes spaces as `+` but may mishandle newlines on some platforms. `encodeURIComponent` reliably produces `%0A` for `\n`.

### Floating button (on every page)

- 58×58px circle, `#25D366`, bottom-right (24px / 18px on mobile).
- Inline SVG WhatsApp logo (30×30 / 26×26 on mobile).
- `z-index: 99`, `position: fixed`.
- Hover: scale 1.08, deeper shadow.
- Appears on ALL 4 pages, inserted right before `</body>`.
- Markup is identical across pages; only the `data-whatsapp` attr matters.

### Where WhatsApp buttons live

- Floating button (all 4 pages)
- Header `.btn-wa-outline` (every page header)
- Inline `.btn-outline` "Chat on WhatsApp" appears on `products.html` (Section: "Next step")

---

## 9. Header / nav

- Light cream background (matches `--paper`).
- Logo on left, nav center-ish, buttons on right.
- Nav links: **4 items only** — Home · Products · About · Contact (in that order).
- Right buttons: `WhatsApp` (outline) + `Start a Project` (orange fill). The Start a Project button is hidden on the Contact page (user is already there).
- Mobile: hamburger menu (`.menu-toggle`), full-screen nav drawer.

---

## 9b. Social media newsroom (index.html)

- Section ID: `#social`.
- Layout: 2-column grid (`.social-grid`) — LinkedIn card + Instagram card.
- Each card has:
  - **Platform badge** (`.social-badge`): 46×46px rounded square with brand color.
    - LinkedIn: solid `#0a66c2` + white "in"
    - Instagram: classic 5-stop gradient (`#f09433 → #e6683c → #dc2743 → #cc2366 → #bc1888`) + white "IG"
  - **Platform name + handle placeholder** (`.social-meta`).
  - **Two post previews** (`.social-post`): white card with orange left bar, contains "Latest post" / "Previous post" eyebrow + sample body text.
  - **Follow CTA** (`.social-follow`): outlined button linking to platform.
- Card hover: translateY(-4px) + soft shadow.
- Mobile: stacks to single column, follow button goes full-width.

### State: HANDLE PLACEHOLDERS

- `.social-handle` text is currently `"Handle to be configured"` for BOTH platforms.
- `.social-follow` `href` is currently `#` for BOTH platforms.
- Post body text is currently generic filler copy.
- **Owner will provide real LinkedIn company URL + Instagram handle later.** When they do, update:
  - `.social-handle` → `@their-handle`
  - `.social-follow[href]` → real URL
  - Post text → recent actual posts (manually, since static site)
- Static site cannot auto-pull from LinkedIn / Instagram APIs — this is intentional manual placeholders.

---

## 9c. Internationalisation (i18n) — 7 languages

The site is multilingual even though CLAUDE.md previously said "English-only". Every user-facing string lives in **two places** that must stay in sync:

1. **Inline default in HTML** — the text between `<tag ... data-i18n="key">...</tag>`. This is what visitors see before JS runs and what search engines index. **Always English** in source.
2. **Translation entries in `script.js`** — inside the `const I18N = { ... }` object, one block per language (en / id / th / ru / ar / zh-TW / tl). Each block maps the same `data-i18n` key to a translated string.

### How it works at runtime

- `script.js` reads the saved language from `localStorage.lang` (default `en`), then on `DOMContentLoaded` replaces every `[data-i18n]` element's text with `I18N[currentLang()][key]`.
- `<select id="lang-select">` in the header lets the visitor switch — change writes back to `localStorage` and re-applies.
- Arabic (`ar`) toggles `<html dir="rtl">` so layout flips.
- `data-i18n-placeholder` is also supported for `<input>` / `<textarea>` placeholders.
- The script.js block at lines 21–33 has the full header comment — read it before editing the system.

### Supported languages

| Code | Language | Notes |
|---|---|---|
| `en` | English | Default. Source for all HTML inline text. |
| `id` | Indonesian | |
| `th` | Thai | |
| `ru` | Russian | |
| `ar` | Arabic | RTL. Verify `<html dir>` toggle still works after any structural change. |
| `zh-TW` | Traditional Chinese | |
| `tl` | Filipino / Tagalog | |

The `<option>` list in `index.html` (`#lang-select`) MUST list all 7 in the same order as the table.

### **Mandatory rule** — when changing any user-facing string

Any time you change wording that visitors see, you **MUST** update both:

1. The inline English default in the relevant `.html` file (the text inside the `data-i18n` tag).
2. **All 7 entries** for that key inside `I18N` in `script.js` — `en`, `id`, `th`, `ru`, `ar`, `zh-TW`, `tl`. Even if the change is a single sentence, every language block needs the matching translation appended or rewritten.

Translating only English (or only a subset of languages) means non-English visitors see a stale English fallback while their selector says e.g. "中文" — a worse UX than no translation at all.

> Existing translations are machine-grade. Before launch, have a native speaker review each language block in `I18N`.

### Adding a new key

1. Add `data-i18n="section.key"` to the HTML element with the English inline text.
2. Add `'section.key': 'English text'` to the `en` block.
3. Add the translated value to **all 6 other language blocks**.
4. Bump cache version (§10), commit, push.

### Adding an 8th language

1. In `script.js`, append a new block to `I18N`: `'<code>': { ... }` with every key currently defined in `en` translated.
2. In **all 4** HTML files, add `<option value="<code>">Name</option>` to `#lang-select` in the same order as the table above (append at end).
3. If the new language is RTL, add it to the `dir` toggle logic in `script.js`.
4. Bump cache version, commit, push.

---

## 10. Cache-busting strategy

Every HTML file references assets with a query string version:

```html
<link rel="stylesheet" href="styles.css?v=24">
<script defer src="script.js?v=24"></script>
```

- Bump the `?v=N` number whenever `styles.css` or `script.js` content actually changes.
- Same number across all 4 HTML files (keeps them in sync).
- Bump via `sed -i 's/?v=N/?v=N+1/g' *.html` then commit.

If you change only HTML content (no CSS/JS), bumping is optional but harmless.

---

## 11. Git workflow

### Branch

`master` is the only branch. Single linear history.

### Commit cadence

After each meaningful change, automatically:
```bash
git add .
git commit -m "<imperative summary>"
git push origin master
```

### Common operations

| Need | Command |
|---|---|
| View history | `git log --oneline` |
| See one commit's diff | `git show <hash>` |
| Undo last commit, keep changes | `git reset --soft HEAD~1` |
| Undo last commit, drop changes | `git reset --hard HEAD~1` ⚠️ |
| Undo a pushed commit (safe) | `git revert <hash>` |
| Restore one file from old commit | `git checkout <hash> -- <file>` |
| Travel to old state (read-only) | `git checkout <hash>` then `git checkout master` to return |

### Restoring previous state in a new session

Read the recent log with `git log --oneline`, identify the desired hash, then either `git checkout <hash> -- <files>` (surgical) or `git revert <hash>` (creates a new commit undoing it).

---

## 12. Mobile / responsive

- Breakpoints: 980px (tablet) and 680px (phone).
- Hero switches to single column, image below text.
- Buttons become full-width on mobile.
- WhatsApp float shrinks to 52×52 with 18px offset.
- Header collapses to hamburger menu at 680px.

---

## 13. Pre-launch checklist (mirrors `README.md`)

These items are still placeholders — DO NOT mark site as production-ready until verified:

- [ ] Replace `SITE_CONFIG.whatsappNumber` already done (`16047679938`).
- [ ] `hello@tomoliapparel.com` confirmed as contact email (done).
- [ ] Connect Send Message form (`SITE_CONFIG.formEndpoint` + `initForms()`). Current fields: Name / Email / Phone or WhatsApp / Message.
- [ ] Replace all Unsplash placeholder images with licensed company photography (products page has 20 photo slots; about page has 9 — 5 feature + 4 thumbnail).
- [ ] Add real logo, favicon, OG image, canonical URL, address, hours, social links.
- [ ] Verify map embed coordinates / replace with proper Google Maps embed.
- [ ] Verify or remove capacity claims (30+ years, 100,000+ m², 500+ workers, 100+ machines).
- [ ] Add privacy + terms pages.
- [ ] Add server-side form security (spam protection, consent logging).
- [ ] Run accessibility, link, mobile, performance audits.

---

## 14. Common tasks

### Configure LinkedIn / Instagram when handles arrive

1. In `index.html`, search for `social-handle` (×2) and `data-platform` (×2).
2. Replace `"Handle to be configured"` with the real `@handle`.
3. Replace `href="#"` on `.social-follow` with real profile URL.
4. Replace the two placeholder post bodies per card with the most recent 2 real posts.
5. Bump cache version.
6. Commit + push.

### Add a product photo to Products page
1. Drop image into `factory photo/products/` (or wherever you keep assets).
2. Open `products.html`. Each category has 10 `<figure class="product-card">` slots.
3. Replace the `<img src>` and `<figcaption>` caption text.
4. Bump cache version, commit, push.

### Add a new page
1. Copy `products.html` (or another existing page) as a template — already has the 4-link nav.
2. Update `<title>`, `<meta>`, and body sections.
3. Add a new nav entry to **all 4** existing HTML files (keep the order Home / Products / About / Contact, append after Contact if needed).
4. Bump `?v=N` in the new page's CSS/JS links (match the global version).
5. Commit + push.

### Add a new section to a page
1. Add markup inside `<main>` — use existing `.section` / `.section.dark` classes.
2. Use `.reveal` class on the section for fade-in-on-scroll (handled by `initReveals`).
3. New styles go in the appropriate block of `styles.css` (append, don't refactor).
4. Bump cache version.
5. Commit + push.

### Replace Unsplash image with real asset
1. Drop file into `factory photo/` or new folder.
2. Update `<img src="...">` in the relevant HTML.
3. Update alt text to match.
4. Commit + push.

### Change WhatsApp number or message
1. Edit `SITE_CONFIG` in `script.js`.
2. Bump cache version.
3. Commit + push.

### Change a user-facing string (text visitors see)
1. Update the inline English default in the relevant `.html` file (the text inside the `data-i18n="key"` tag).
2. Update **all 7 entries** for that key in `I18N` inside `script.js` — `en`, `id`, `th`, `ru`, `ar`, `zh-TW`, `tl`. See §9c for the full i18n contract.
3. Bump cache version, commit, push.

> Skipping the non-English entries will leave non-English visitors seeing stale English copy while their selector claims another language — worse than not translating at all.

---

## 15. Reference images

- `reference/` folder holds design reference images uploaded by the project owner.
- Not source assets — only used as inspiration. Keep out of deployable bundles if possible.

---

## 16. House rules for working in this repo

- **Always commit + push after meaningful changes** — do not leave uncommitted work.
- **Bump cache version on real CSS/JS changes**, keep it identical across all 4 HTML files.
- **Match existing code style**: vanilla, no frameworks, no preprocessors, no build step.
- **Preserve the existing CSS layering pattern**: original rules stay; new rules append (override via specificity when needed).
- **Never hardcode a real customer, capacity number, or certificate** — the site currently claims nothing it can't back up.
- **Use `--orange` not `#ff5a1f` in new CSS** — variables exist for a reason.
- **Mobile-first checks**: read the 680px breakpoint block after any hero/header change.