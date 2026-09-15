# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

The site has an initial build: `index.html` + `css/styles.css` + `js/main.js`, plus `public/images/` with real company assets (warehouse photo, org chart, logos, etc.) supplied by the user over time. `requirements.md` is the original spec — the live page has since diverged from it in places (see Page structure below), so when the two disagree, trust the code over the spec.

## What this project is

A single-page corporate landing site for **나르샤팜 (Narsha Pharm)**, a Korean company that connects global API (Active Pharmaceutical Ingredient) suppliers with Korean pharmaceutical companies. The site is being built via "vibe coding" with Claude Code — natural-language prompts driving iterative generation/editing of the page, not a conventional dev workflow with a task tracker.

Reference source site: https://narshapharm.co.kr/ (About page: https://narshapharm.co.kr/8-2/). The About Us content mirrors that real page.

## Prescribed tech approach

Per `requirements.md` §7: a single `index.html` with a small number of accompanying CSS/JS files — no framework, no build step. This is intentional (matches the vibe-coding editing loop), not a placeholder decision — don't introduce a bundler/framework unless the user asks.

No local dev server tooling (Node/Python) is available in this environment — to preview changes, spin up a throwaway static file server (e.g. a small PowerShell `HttpListener` script) rather than assuming `npx serve` or `python -m http.server` will work.

## Deployment

The site is deployed to both GitHub Pages (`master` branch, root) and Vercel (auto-deploys on push to `master` via the GitHub integration, project `narshapharm/narshapharm` → `narshapharm.vercel.app`).

`vercel.json` pins `outputDirectory` to `.` — **do not remove this**. The repo has a `public/` directory that holds real company assets (warehouse photo, org chart, logos, unrelated docs) rather than a build output; Vercel's zero-config "Other" framework detection otherwise assumes a `public/` folder *is* the site root and serves 404s for everything since `index.html` lives at the repo root, not inside `public/`.

## Page structure (one-page scroll site)

Fixed header (logo + nav) → shared HERO → three anchored chapters → footer:
- `#about` — About Us: company intro, 3 core services, "Why Narsha Pharm?" (4 strengths), "By The Numbers" (4 stats)
- `#products` — Product List: the original 6-card `.products-grid` (bottle-icon cards: Nizatidine, L-Carnitine, Ascorbic acid, Upadacitinib, Vonoprazan Fumarate, Bempedoic acid) stays as a curated highlight row, followed below by a 3-tab full data table (`.tab-btn`/`.tab-panel`, switching handled in `js/main.js`) — **DMF List** (65 registered APIs), **Excipient** (12 items), **New Pipeline** (7 upcoming APIs). Table content was transcribed from `public/images/list 1.png`–`list 6.png` (real registration filings: DMF List ← list 1–4, Excipient ← list 5, New Pipeline ← list 6) and simplified slightly — the source spreadsheet's yellow row highlighting and a redundant "repeat country name in English in the remarks column" pattern were dropped as spreadsheet artifacts, not meaningful data. DMF List defaults active on load. When the source images gain new rows, re-read them and append rather than re-deriving the whole table from memory.
- `#organization` — Organization: org chart (CEO → 영업팀/Sales, 원료개발/Sourcing, RA, 원료관리실/Warehouse), sourced from `public/images/oragnization.png` and rebuilt as styled HTML/CSS rather than an embedded screenshot, to stay consistent with the rest of the site and remain responsive. This replaced an earlier Contact section (contact form + info) — direct contact info (Tel/Fax/address) now lives only in the footer (`id="footer"`, linked from the hero's "Become a Partner" CTA).

Mobile nav collapses to a hamburger; anchors scroll smoothly.

## Design tokens (from requirements.md §2–§3)

Color system — mostly white/light-gray with deep navy as the dominant brand color; royal/vivid blue reserved for interactive elements (CTAs, links, icons) only; gold used sparingly as a brand accent. Do not introduce other saturated colors.

| Token | Hex | Use |
|---|---|---|
| Deep navy (primary) | `#0B2E5B` | header, hero, section titles, footer |
| Royal blue (accent/CTA) | `#0E50C0` | buttons, links, icons |
| Vivid blue (secondary accent) | `#0172FC` | featured headlines |
| Amber gold (point accent) | `#E09000` | small accents/dividers only, tied to brand's "trust" value — use minimally |
| White | `#FFFFFF` | base background |
| Light gray | `#F0F0F0` | shallow section separation |
| Dark navy-gray (body text) | `#1F2937` | |
| Medium gray (secondary text) | `#6B7280` | |

Typography: **Pretendard** for all body/UI text (fallback `'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif`), Poppins/Inter acceptable for English hero headlines. Headlines bold (700+), body 400/500, generous line-height (~1.7 for body copy). Numeric stats use tabular figures.

## Content accuracy requirements

- Footer business info (§5 of requirements.md) — Head office address, KGSP Warehouse address, Tel/Fax — must be reproduced **exactly**, in both English and Korean, with no typos or omissions. This is legally-facing business registration info.
- Logo is a transparent PNG with a dark navy/gold mark — only place it on light backgrounds, or add padding, so it stays legible against a deep-navy header/footer.
- Any content still marked `[TBD]` in requirements.md (About copy finalization, full product list, footer copyright line) should remain visibly/traceably marked `[TBD]` in the implementation until the user supplies real values — don't invent facts to fill these in.

## Responsive & accessibility requirements (§7)

Three breakpoints: desktop ≥1024px, tablet 768–1023px, mobile <768px. Grid reflow: services 3→1 col, "Why" 4→2×2, products 6→3×2→1-2 col, stats 4→2×2. Hero images skip `loading="lazy"`; other images lazy-load. Body text contrast ≥4.5:1. Use semantic tags (`header`, `main`, `section`, `footer`) and `lang="ko"`.
