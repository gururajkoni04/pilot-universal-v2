# Re-Migration Plan — https://gururajkoni.dev/

## Overview

Re-migrate the homepage at `https://gururajkoni.dev/` to this AEM Edge Delivery Services (xwalk) project. The previous migration completed all infrastructure steps but the final content file (`content/index.plain.html`) is no longer present — only `content/nav.plain.html` exists currently. All import infrastructure (parsers, transformers, block code, page templates) is still intact.

## Current State (from previous migration)

- **Project type:** xwalk (Universal Editor)
- **Target org/site:** `gururajkoni04/pilot-universal-v2`
- **Infrastructure intact:**
  - 7 parsers: hero-portfolio, cards-icon, cards-service, carousel-blog, carousel-portfolio, columns-contact, hero-romantic
  - Transformers: gururajkoni-cleanup, gururajkoni-sections, hinata-cleanup
  - Import scripts: import-homepage.js, import-hinata-page.js (+ bundles)
  - Page templates: homepage + hinata-page (with full block mappings and sections)
  - Block variant code: hero-portfolio, cards-icon, cards-service, carousel-blog, carousel-portfolio, columns-contact, hero-romantic
- **Design system:** brand.css with dark theme tokens, styles.css updated, Inter font configured
- **Missing:** `content/index.plain.html` (needs re-import)

## Migration Steps

### Phase 1: Re-Import Content
- [ ] Re-run the bundled import script (`import-homepage.bundle.js`) against `https://gururajkoni.dev/`
- [ ] If site is rate-limited (429), retry with `--disable-http2` or wait and retry
- [ ] Verify `content/index.plain.html` is generated with all 6 blocks parsed

### Phase 2: Verify Preview
- [ ] Start dev server and preview `http://localhost:3000/`
- [ ] Check that all sections render (hero, about, technologies, services, blogs, works, contact)
- [ ] Confirm dark theme styling from brand.css is applied

### Phase 3: Design Refinement (if source site accessible)
- [ ] Extract exact computed styles from blocks on the source page
- [ ] Apply per-block CSS styling for visual fidelity
- [ ] Run visual comparison between original and migrated page

## Checklist

- [ ] Content re-imported to `content/index.plain.html`
- [ ] All 6 block instances parsed successfully in import log
- [ ] Page renders correctly in local preview
- [ ] Dark theme applied (background, text colors)
- [ ] Block styling refined (if source accessible)
- [ ] Linting passes (`npm run lint`)

## Notes

- The source site previously returned 429 (rate limited) during import — this may recur
- All analysis artifacts from the previous migration are still available in `migration-work/homepage-backup/`
- If the site remains inaccessible, content can be manually reconstructed from `migration-work/homepage-backup/cleaned.html` using the existing parsers

## Execution

This plan requires **Execute mode** to proceed. It will use `excat-content-import` to re-run the existing bundled import script against the homepage URL.
