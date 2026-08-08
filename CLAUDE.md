# FoshanGarmentHub Website — CLAUDE.md

> Static B2B lead-generation website for Foshan (China) garment manufacturing. 5 pages, vanilla HTML/CSS/JS, English-only, no build step. Replaces a Codex-style AGENTS.md.

---

## 1. Project at a glance

- **What**: One direct gateway to specialized garment manufacturing across Foshan — kids' & adult clothing, activewear, knitwear, denim. OEM / ODM support since 2000.
- **Audience**: Overseas buyers (independent brands, e-commerce sellers, wholesalers, global sourcing teams).
- **Form**: Static site, no backend. Form is demo-only — does NOT submit.
- **Brand voice**: Confident, industrial, direct. Avoid hype words.

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
index.html          ← homepage (hero + offer + customers + strength + gallery + facility + social)
about.html          ← company positioning
factories.html      ← manufacturing network + quality route
gallery.html        ← filterable product gallery (JS-driven)
contact.html        ← inquiry form (demo, does not submit)

styles.css          ← all styles (CSS variables in :root)
script.js           ← navigation, reveal-on-scroll, gallery filter, lightbox, WhatsApp wiring
README.md           ← pre-launch checklist (form endpoint, real images, certificates, etc.)
CLAUDE.md           ← this file — project context for future Claude sessions
factory photo/      ← local photo asset (kept for reference)
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

- Text: `FoshanGarment` (dark `--ink`) + `HUB` (orange `--orange`), single inline-flex row.
- On dark sections the logo can invert; on light sections it stays dark.
- The "F" of "FoshanGarment" defines the left content edge.

---

## 5. Hero section (`index.html`)

- Background: cream `--paper`.
- Layout: full-width 2-column grid (1fr / 1fr). Image extends to right viewport edge.
- Padding: 100px top/bottom, left/right padded to align with logo "F".
- Total height: ~680px (tuned to fit in viewport without scrolling on most laptops).
- Right column: `min-height: 680px` matching copy height; image is `position:absolute; inset:0; object-fit:cover`.

### Hero content order (top to bottom)

1. Eyebrow: `One hub. The right factory.` — orange, with leading horizontal rule.
2. Title: `Made in Foshan.` (uppercase, huge).
3. Subtitle: `Since 2000.` (orange) + ` Your direct gateway to one of China's most concentrated cluster of garment factories.`
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
- Right text: `service@fsgarmenthub.cn` as clickable mailto link (orange, hover `#ffb38a`).
- Border-bottom: `1px solid rgba(255,90,31,.25)` (subtle orange tint).

**Email rule**: every occurrence of `service@FoshanGarmentHub.cn` in HTML MUST be `service@fsgarmenthub.cn`. Run `grep -onE "service@[A-Za-z.]+" *.html` to verify.

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
- Appears on ALL 5 pages, inserted right before `</body>`.
- Markup is identical across pages; only the `data-whatsapp` attr matters.

### Where WhatsApp buttons live

- Floating button (all 5 pages)
- Header `.btn-wa-outline` (index.html only — header CTA)
- Originally a hero `.btn-outline` "Chat on WhatsApp" — was REPLACED with the Specialised-in tag

---

## 9. Header / nav

- Light cream background (matches `--paper`).
- Logo on left, nav center-ish, buttons on right.
- Right buttons: `WhatsApp` (outline) + `Start a Project` (orange fill).
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

## 10. Cache-busting strategy

Every HTML file references assets with a query string version:

```html
<link rel="stylesheet" href="styles.css?v=23">
<script defer src="script.js?v=23"></script>
```

- Bump the `?v=N` number whenever `styles.css` or `script.js` content actually changes.
- Same number across all 5 HTML files (keeps them in sync).
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
- [ ] `service@fsgarmenthub.cn` confirmed as contact email (done).
- [ ] Connect inquiry form (`SITE_CONFIG.formEndpoint` + `initForms()`).
- [ ] Replace all Unsplash placeholder images with licensed company photography.
- [ ] Add real logo, favicon, OG image, canonical URL, address, hours, social links.
- [ ] Verify or remove certificate placeholders.
- [ ] Verify production figures, customer logos, capacity claims, response times.
- [ ] Add privacy + terms pages.
- [ ] Add server-side form security (upload rules, spam protection, consent logging).
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

### Add a new page
1. Copy an existing page as a template.
2. Update `<title>`, `<meta>`, and body sections.
3. Bump `?v=N` in the new page's CSS/JS links (match the global version).
4. Add to nav across all 5 pages.
5. Commit + push.

### Add a new section to homepage
1. Add markup inside `<main>` in `index.html` — use existing `.section` / `.section.dark` classes.
2. Use `.reveal` class on the section for fade-in-on-scroll (handled by `initReveals`).
3. New styles go in the appropriate block of `styles.css`.
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

---

## 15. Reference images

- `reference/` folder holds design reference images uploaded by the project owner.
- Not source assets — only used as inspiration. Keep out of deployable bundles if possible.

---

## 16. House rules for working in this repo

- **Always commit + push after meaningful changes** — do not leave uncommitted work.
- **Bump cache version on real CSS/JS changes**, keep it identical across all 5 HTML files.
- **Match existing code style**: vanilla, no frameworks, no preprocessors, no build step.
- **Preserve the existing CSS layering pattern**: original rules stay; new rules append (override via specificity when needed).
- **Never hardcode a real customer, capacity number, or certificate** — the site currently claims nothing it can't back up.
- **Use `--orange` not `#ff5a1f` in new CSS** — variables exist for a reason.
- **Mobile-first checks**: read the 680px breakpoint block after any hero/header change.