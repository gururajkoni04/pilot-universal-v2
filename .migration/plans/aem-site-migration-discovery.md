# Full Site Migration Plan — https://gururajkoni.dev

## Overview

Migrate the full site at `https://gururajkoni.dev` to this AEM Edge Delivery Services (xwalk) project. This builds upon the existing homepage migration that was already completed successfully.

## Current State (Already Completed)

The homepage (`https://gururajkoni.dev/`) has already been migrated:
- **Project type:** xwalk (Universal Editor)
- **Target org/site:** `gururajkoni04/pilot-universal-v2`
- **Content imported:** `content/index.plain.html`, `content/footer.plain.html`
- **6 block variants created:** hero-portfolio, cards-icon, cards-service, carousel-blog, carousel-portfolio, columns-contact
- **Import infrastructure:** 6 parsers, 2 transformers, bundled import script
- **Existing blocks:** hero, columns, cards, fragment, header, footer (boilerplate) + 6 new variants

## Migration Steps

### Phase 1: URL Discovery
- [ ] Crawl or check sitemap for `https://gururajkoni.dev` to discover all pages beyond the homepage
- [ ] Identify any sub-pages (e.g., /about, /blog/*, /projects/*)
- [ ] Generate complete URL list

### Phase 2: Template Classification
- [ ] Group discovered URLs into template types (homepage, blog-post, project-page, etc.)
- [ ] Update `page-templates.json` with new templates and their URLs
- [ ] Identify which pages share the same layout/structure

### Phase 3: Page Analysis (for new templates)
- [ ] Analyze representative page from each new template type
- [ ] Identify new block variants needed (beyond the 6 already created)
- [ ] Capture screenshots and cleaned HTML for each template

### Phase 4: Block Mapping & Infrastructure (for new templates)
- [ ] Map DOM selectors for new block variants
- [ ] Generate parsers for any new block variants
- [ ] Generate transformers for new templates if needed
- [ ] Create new block code (JS/CSS/JSON) for any new blocks

### Phase 5: Content Import
- [ ] Generate import scripts for each new template
- [ ] Bundle import scripts
- [ ] Run bulk content import for all discovered URLs
- [ ] Verify imported content files in `content/`

### Phase 6: Design Migration
- [ ] Extract design tokens (colors, typography, spacing) from the source
- [ ] Apply site-level styles (dark theme, fonts, CSS custom properties)
- [ ] Style each block variant to match the source design
- [ ] Verify visual fidelity via preview comparison

### Phase 7: Navigation & Footer
- [ ] Migrate the navigation/header from the source site
- [ ] Verify footer content (already imported as `content/footer.plain.html`)

### Phase 8: Validation & QA
- [ ] Preview all migrated pages on the local dev server
- [ ] Compare visual output against the original pages
- [ ] Fix styling or structural discrepancies
- [ ] Run linting (`npm run lint`)
- [ ] Verify accessibility and performance

## Checklist

- [ ] URL discovery completed — all site pages identified
- [ ] Templates classified and documented
- [ ] New page templates analyzed (if any beyond homepage)
- [ ] New block variants identified and mapped (if any)
- [ ] Import infrastructure generated for all templates
- [ ] All pages imported to `content/` directory
- [ ] Design/styles migrated and applied
- [ ] Navigation migrated
- [ ] Footer verified
- [ ] All pages render correctly in local preview
- [ ] Visual comparison passes against original
- [ ] Linting passes
- [ ] Component models updated (`npm run build:json`) if new blocks added

## Risks & Considerations

- Single-page apps (React/Next.js) may only have one actual HTML page — URL discovery may show only the root
- The gururajkoni.dev site appears to be a single-page React app with hash/section anchors rather than separate routes
- If the site is truly single-page, the existing homepage migration covers the full site content
- Design migration (dark theme, animations) will require custom CSS work

## Execution

This plan requires **Execute mode** to proceed with implementation. The migration will use the `excat-url-discovery` skill to discover pages and `excat-site-migration` to orchestrate any additional page migrations beyond what was already completed.
