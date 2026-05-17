---
name: app-store-screenshots
description: Use when building App Store or Google Play screenshot pages, generating exportable marketing screenshots for iOS and/or Android apps, or scaffolding a screenshot editor with Next.js. Triggers on app store, play store, screenshots, marketing assets, html-to-image, phone mockup, android screenshots, feature graphic.
---

# App Store & Google Play Screenshots Generator

## Overview

Scaffold a pre-built Next.js + ShadCN editor that lets the user design and export App Store **and** Google Play screenshots as **advertisements** (not UI showcases). The editor handles all the heavy lifting:

- Live preview at the canvas's true resolution (scaled to fit)
- Drag-to-reorder slides, inline text editing, layout switcher per slide
- Drop-target screenshot picker (file → embedded data URI)
- Auto-save to `localStorage` (debounced)
- Easy iOS ↔ Android platform switch — separate slide decks live side by side
- One-click bulk PNG export at every Apple/Google-required resolution via `html-to-image`
- Light/dark variant toggle per slide, theme presets, locale select

Supported devices out of the box:
- **iPhone** (portrait) — Apple App Store
- **iPad** (portrait) — Apple App Store
- **Android Phone** (portrait) — Google Play
- **Android Tablet 7"** (portrait + landscape) — Google Play
- **Android Tablet 10"** (portrait + landscape) — Google Play
- **Feature Graphic** (1024×500 banner) — Google Play store listing header

## Core Principle

**Screenshots are advertisements, not documentation.** Every screenshot sells one idea. If you're showing UI, you're doing it wrong — you're selling a *feeling*, an *outcome*, or killing a *pain point*. Use this skill's interactive editor to iterate on copy and layout fast; do not hand-craft the page from scratch.

## What This Skill Does

1. **Copies a pre-built template** from `template/` (co-located with this `SKILL.md`) into the user's working directory.
2. Installs dependencies with the user's package manager.
3. Drops the user's screenshots into `public/screenshots/...` and their app icon into `public/`.
4. (Optionally) prefills `src/lib/defaults.ts` with the user's app name and starting copy so the first preview is meaningful.
5. Starts the dev server and tells the user to open the editor in the browser.

You should NOT write `page.tsx`, device frames, or export logic by hand. They live in the template.

## Step 1: Gather Input (Before Scaffolding)

Ask the user these. Do not proceed until you have answers:

### Required

1. **App screenshots** — "Where are your app screenshots? (PNG files of actual device captures)"
2. **App icon** — "Where is your app icon PNG?"
3. **App name** — "What's the app called?"
4. **Feature list** — "List your app's features in priority order. What's the #1 thing your app does?"
5. **Style direction** — "What style do you want? You can either (a) pick one of the named deep-spec styles, or (b) describe your own vibe in your own words (warm/organic, dark/moody, clean/minimal, bold/colorful, plus any reference apps you like) and I'll build a custom palette. The template also ships with `clean-light`, `dark-bold`, `warm-editorial`, and `ocean-fresh` palette presets you can start from. The named deep specs live in `style-prompts/` — see `style-prompts.md` for the full index. Currently available: Retro Rubberhose Mascot, Moody Curated Dating, Paper Sticker Skeuomorphic, Dreamy Pastel Couples, Hand-Drawn Editorial Tasks, Glossy 3D K-Beauty Creator. If the user names one of these — or describes something that clearly matches one — read `style-prompts/_QUALITY_BAR.md` first, then the matching deep spec file, and apply its entire spec (palette, gradients, shadows, rotations, per-slide breakdown). If the user describes a fully custom style, fall back to the General Visual Design Principles below and pick the closest deep spec as a starting reference."

### Optional

6. **Target stores** — Apple App Store only, Google Play only, or both? Determines which platform decks to seed.
7. **iPad / Android tablet screenshots** — If yes, what sizes and orientations?
8. **Feature Graphic** — Want a 1024×500 Play Store banner too?
9. **Localized screenshots** — Languages? (e.g. en, de, es, pt, ja, ar, he)
10. **Number of slides** — Apple allows up to 10, Google Play up to 8.
11. **Brand colors / font** — If they want a custom theme beyond the four presets.
12. **Additional instructions** — Anything specific.

**IMPORTANT:** If the user gives instructions at any point, follow them. They override skill defaults.

## Step 2: Scaffold the Template

### Detect Package Manager

Priority: **bun > pnpm > yarn > npm**.

```bash
which bun && echo bun || which pnpm && echo pnpm || which yarn && echo yarn || echo npm
```

### Copy the Template

The template lives at `<this skill dir>/template/` — when the skill is installed, the whole folder is already on disk. Copy its contents (NOT the folder itself) into the user's working directory. The trailing `/.` copies dotfiles like `.gitignore` too.

```bash
# Replace <SKILL_DIR> with the absolute path to this skill (the directory containing SKILL.md).
cp -R "<SKILL_DIR>/template/." "$PWD/"
```

If the target directory already has a `package.json`, ask the user before overwriting. For an in-place upgrade, copy only the files the user hasn't customized.

### Install Dependencies

```bash
bun install      # or pnpm install / yarn / npm install
```

### Drop the User's Assets

Move the user's screenshots into the layout the template expects:

```
public/
├── app-icon.png                      # ← user's app icon
├── mockup.png                        # ← already copied by the template (iPhone bezel)
└── screenshots/
    ├── apple/
    │   ├── iphone/{locale}/01.png … N.png
    │   └── ipad/{locale}/01.png   … N.png
    └── android/
        ├── phone/{locale}/01.png  … N.png
        ├── tablet-7/{portrait|landscape}/{locale}/...
        └── tablet-10/{portrait|landscape}/{locale}/...
```

The default sample slides reference filenames `01.png`–`05.png` per device under `en/`. If the user names their screenshots differently, either rename them or update `src/lib/defaults.ts` so the initial deck points at the right files. The user can also drag-drop files directly into the editor at runtime — those become embedded data URIs and don't need to live on disk.

### (Optional) Seed Initial Copy

If the user provided headlines, edit `src/lib/defaults.ts` to set:
- `appName`
- `tagline`
- `themeId` (one of `"clean-light" | "dark-bold" | "warm-editorial" | "ocean-fresh"`, or add a new entry to `THEMES` in `src/lib/constants.ts`)
- Starter slides per device with the user's `label` + `headline` + screenshot paths

Otherwise, leave the defaults — the user can rewrite copy in the editor.

### Start the Dev Server

```bash
bun dev    # → http://localhost:3000
```

Tell the user to open the URL and start editing. The editor auto-saves; they can close the tab and resume.

## Step 3: Coach the User on Copy

Inside the editor the user will write headlines themselves, but they often need guidance. Apply these rules when reviewing their copy or generating suggestions.

### The Iron Rules

1. **One idea per headline.** Never join two things with "and."
2. **Short, common words.** 1-2 syllables. No jargon unless it's domain-specific.
3. **3-5 words per line.** Must be readable at thumbnail size in the App Store.
4. **Line breaks are intentional.** Newlines in the textarea map directly to visible breaks.

### Three Approaches

| Type | What it does | Example |
|------|-------------|---------|
| **Paint a moment** | You picture yourself doing it | "Check your coffee without opening the app." |
| **State an outcome** | What your life looks like after | "A home for every coffee you buy." |
| **Kill a pain** | Name a problem and destroy it | "Never waste a great bag of coffee." |

### Bad-to-Better

| Weak | Better | Why |
|------|--------|-----|
| Track habits and stay motivated | Keep your streak alive | one idea, faster to parse |
| Organize tasks with AI summaries | Turn notes into next steps | outcome-first, less jargon |
| Save recipes with tags and favorites | Find dinner fast | sells the benefit, not the UI |

### Narrative Arc

The user's slide deck should follow a rough arc (skip slots that don't fit):

| Slot | Purpose |
|------|---------|
| #1 | **Hero / Main Benefit** — the ONLY slide most people see |
| #2 | **Differentiator** — what makes the app unique |
| #3 | **Ecosystem** — widgets, watch, extensions (skip if N/A) |
| #4+ | **Core Features** — one per slide, most important first |
| 2nd-to-last | **Trust Signal** — "made for people who [X]" |
| Last | **More Features** — pills listing extras (skip if few features) |

### Layout Variation

Vary the `layout` field across slides. The editor exposes:
- `hero` — centered headline + bottom-anchored device
- `device-bottom` — same composition, smaller headline
- `device-top` — flipped, device above caption (good contrast slide)
- `two-devices` — back + front phones layered
- `no-device` — big standalone headline (use sparingly)
- `split-landscape` — caption left + device right (tablet landscape only)
- `feature-graphic` — Play Store banner (1024×500)

Never repeat the same layout twice in a row. Use 1-2 `inverted` (dark) slides for visual rhythm.

## Visual Design Principles

These rules are derived from studying the best app store screenshots in the wild (Superlist, Headspace, CRED, (Not Boring) Camera, Arc Search, Linktree, Gentler Streak, etc.). They apply regardless of which style preset the user picks. Style-specific tokens (fonts, palette, accents) live in `style-prompts.md` — point the user there.

### 1. The background is a designed surface — never white

Plain white is the amateur tell. Every great deck uses a deliberate surface: a saturated color block, a warm cream/off-white (`#F4F1EC`-ish), a dark navy/near-black, or a gradient. The background can shift per slide (Headspace, Linktree do this), but it must read as intentional, not default.

### 2. Headlines dominate

The headline occupies roughly the **top 30–40%** of the canvas — much bigger than a typical web hero. If a person can't read it at thumbnail size with no zoom, redesign.

### 3. Mixed emphasis inside the headline

Almost every great headline has one word styled differently from the rest — a contrast color, an italic script, a heavier weight, or a hand-drawn underline. Examples:
- Superlist: "The one app that fits **your whole day**" (script + coral)
- Headspace: "Stress **less**" (`less` orange against black)
- Arc Search: "**Fastest** way to search. **Cleanest** way to browse." (purple / navy)

Flat single-color headlines look weaker. Pick one emphasis word per slide.

### 4. Decorative accents are the rule, not the exception

Top decks layer at least one of these on most slides:
- Hand-drawn squiggles, arrows, scribbles (Superlist)
- Sparkles / glow (Gentler Streak, Arc)
- Label badges on the visual ("SUPER RAW", "Cinematic", "LUT")
- Floating widget chips with real stats ("$3,630 earned", "11,175 steps") — these tell the story without copy
- Award lockups on the hero only (Apple Design Award, Webby, star count)

A bare phone on a bare bg with a bare headline is the default-skill output. Add one accent.

### 5. Phone framing is a deliberate choice — vary it across the deck

Three common framings, each carries a different feeling:
- **Bezelless / minimal frame** — maximizes UI legibility, modern (Arc, Linktree, Gentler)
- **Tilted floating phone with soft shadow** — product / advertorial feel (Superlist, CRED hero)
- **Full device with visible bezel, dead-center** — editorial, premium (CRED, NB Camera)

Mix at least two framings across the deck.

### 6. Proof anchors the hero, nothing else

Award badges, press quotes, star counts, install counts — concentrate them on **slide 1 only**. Spreading them dilutes both the proof and the rest of the slides. NB Camera does this perfectly: Verge quote + Apple Design Award + 15,000+ stars all on the cover, none after.

### 7. Density inside the phone, sparsity outside

The screenshot inside the phone can (and should) be a real, dense product capture — actual lists, dashboards, charts, conversations. The space *outside* the phone is the opposite: one headline, one visual, one optional sub-line, one optional badge. Don't add bullet lists, multi-line paragraphs, or competing logos around the device.

### 8. Break the phone parade

Every 2–3 slides, drop the phone and use a different hero element to keep visual rhythm:
- 3D rendered product object (NB Camera's stylized camera)
- Photographic still (NB Camera slide 2)
- Real human / lifestyle photo (Linktree)
- Mascot illustration (Headspace's mascot, Gentler Streak's character)
- Typographic feature wall (Superlist's last slide)
- Phone grid mosaic (Linktree's "Trusted by 70M+" final slide)

### 9. Last slide pattern

The closer is almost always one of two things:
- **Feature wall** — a vertical list of one-word features styled as big type ("Real-time collaboration / Offline support / Widgets / Integrations…")
- **Phone mosaic** — multiple bezelless mini-screenshots arranged in a grid to convey "look at all the things this does"

Pick one. Don't make the last slide another single-feature hero — it wastes the spot.

### 10. Thumbnail test (mandatory before export)

Shrink the slide to ~160px wide (App Store search-result size). Squint. Can you read the headline? Can you tell what the app does in under a second? If not, the headline is too long, the type is too thin, or there's no contrast between text and background. Fix before exporting.

## Step 4: Localization

The editor exposes a locale dropdown; switching it changes the `locale` field on the project state. Screenshots are looked up under `public/screenshots/.../{locale}/...`, so put localized PNGs in matching folders.

- Don't literally translate — rewrite for the target market.
- Re-check line breaks per locale; German/French/Portuguese often need shorter claims.
- For RTL (`ar`, `he`, `fa`, `ur`), the template handles direction inversion through CSS — let the user verify each slide looks intentional, not just flipped.

## Step 5: Export Time

Inside the editor, the user picks a device, picks a target size from the dropdown, and hits **Export all**. PNGs download with zero-padded numbered filenames. Repeat per device.

If exports come out blank or with black screen rectangles:
- Verify source screenshots are RGB (not RGBA). The template flattens via `objectFit: cover`, but truly transparent sources can still produce black regions.
- Confirm preload completed — check the browser console for `preloadImages` errors.
- The export double-call (`toPng` twice in a row) is built-in; do not remove it.

## Step 6: Final QA Gate

### Message Quality
- One idea per slide
- Hero slide communicates the main benefit in one second
- Readable at arm's length at thumbnail size

### Visual Quality
- No two adjacent slides share the same layout
- Landscape tablet slides use `split-landscape` — never two devices side-by-side
- At least one contrast (`inverted: true`) slide when the deck is long enough

### Export Quality
- No clipped text or assets after scaling to export size
- Screenshots correctly aligned inside every device frame
- Filenames sort correctly (zero-padded numeric prefixes)
- Feature Graphic exports cleanly at 1024×500 (no device frame)

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Edited `page.tsx` instead of using the editor | Roll back the edit; let users iterate in the browser |
| Tried to rebuild device frames from scratch | They're in `src/components/editor/device-frames.tsx` — modify there |
| Pasted screenshots into git directly | `public/screenshots/...` is fine to commit; data-URI uploads stored in `localStorage` aren't shareable across machines |
| Wrong directory layout for tablet screenshots | See Step 2 — `android/tablet-7/portrait/{locale}/...` etc. |
| Reset wiped the deck | Reset clears `localStorage`; export first or back up `localStorage` JSON before resetting |
| Export is blank | Source PNGs probably have alpha — flatten to RGB |
| `bun dev` port collision | Template defaults to `next dev`; let Next pick the next free port (3001+) |

## Template Reference

The template structure (after copy):

```
project/
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── components.json              # ShadCN config (for future `shadcn add`)
├── public/
│   ├── mockup.png               # iPhone bezel (do NOT replace without re-measuring PHONE_SCREEN)
│   ├── app-icon.png             # → user supplies
│   └── screenshots/...
└── src/
    ├── app/
    │   ├── layout.tsx           # Font + root layout
    │   ├── page.tsx             # Renders <ScreenshotEditor />
    │   └── globals.css          # Tailwind + ShadCN tokens
    ├── components/
    │   ├── editor/
    │   │   ├── screenshot-editor.tsx   # Top-level editor (state, autosave, export)
    │   │   ├── toolbar.tsx             # Platform tabs, device select, theme, locale, export
    │   │   ├── sidebar.tsx             # Slide list with @dnd-kit reordering
    │   │   ├── slide-thumb.tsx         # Draggable slide card
    │   │   ├── preview-stage.tsx       # ResizeObserver-scaled live preview
    │   │   ├── inspector.tsx           # Right-pane controls for active slide
    │   │   ├── screenshot-picker.tsx   # File drop + picker
    │   │   ├── slide-canvas.tsx        # Data-driven slide renderer (all layouts)
    │   │   └── device-frames.tsx       # Phone, AndroidPhone, IPad, tablets
    │   └── ui/                         # Minimal ShadCN primitives (button, select, etc.)
    └── lib/
        ├── constants.ts                # Canvas sizes, export sizes, themes, frame ratios
        ├── defaults.ts                 # Initial slide decks per device
        ├── types.ts                    # Slide / ProjectState / Theme types
        ├── storage.ts                  # useProject() — localStorage autosave hook
        ├── image-cache.ts              # preloadImages + img() helper
        └── utils.ts                    # cn() helper
```

## Hand-off Behavior

When you finish scaffolding:

1. State the URL and that the dev server is running.
2. Mention which platforms have starter decks seeded (iOS, Android, both).
3. Call out any user-supplied screenshots that didn't match the expected filenames (so they can rename or use the in-editor drop target).
4. Point the user at the **Export all** button once they're happy with the layouts.
