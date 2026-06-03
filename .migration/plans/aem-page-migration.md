# Page Migration Plan — https://gururajkoni.dev/

## Overview

Migrate the homepage at `https://gururajkoni.dev/` to this AEM Edge Delivery Services (xwalk) project. This is a Universal Editor-based project (`aem-boilerplate-xwalk`) with existing blocks: hero, columns, cards, fragment, header, and footer.

## Prerequisites

- Source URL: `https://gururajkoni.dev/`
- Project type: xwalk (Universal Editor)
- Target org/site: `gururajkoni04/pilot-universal-v2`
- Preview URL pattern: `https://main--pilot-universal-v2--gururajkoni04.aem.page/`
- Existing blocks: hero, columns, cards, fragment, header, footer

## Migration Steps

### Phase 1: Page Analysis
- [ ] Analyze the source page structure (sections, blocks, content sequences)
- [ ] Identify block variants and content patterns
- [ ] Capture screenshots and cleaned HTML for reference
- [ ] Map source content to available EDS blocks (hero, columns, cards, etc.)
- [ ] Identify any new blocks needed that don't exist in the project

### Phase 2: Block Mapping & Infrastructure
- [ ] Create/update page template definition in `page-templates.json`
- [ ] Map DOM selectors to block variants
- [ ] Generate block parsers for each identified block variant
- [ ] Generate page transformers (cleanup, sections, metadata)
- [ ] Create any new block code (JS/CSS/JSON) for blocks not yet in the project

### Phase 3: Content Import
- [ ] Bundle import script from parsers + transformers
- [ ] Execute content import against the source URL
- [ ] Verify imported HTML structure matches EDS conventions

### Phase 4: Design Migration
- [ ] Extract design tokens (colors, typography, spacing) from source
- [ ] Apply site-level styles (fonts, CSS custom properties)
- [ ] Style each block variant to match the source design
- [ ] Verify visual fidelity via preview comparison

### Phase 5: Validation & QA
- [ ] Preview the migrated page on the local dev server
- [ ] Compare visual output against the original page
- [ ] Fix any styling or structural discrepancies
- [ ] Run linting (`npm run lint`)
- [ ] Verify accessibility and performance

## Checklist

- [ ] Source page analyzed and structure documented
- [ ] Block variants identified and mapped
- [ ] Import infrastructure (parsers/transformers) generated
- [ ] Content imported to `/content/` directory
- [ ] Block code created for any new blocks
- [ ] Design/styles migrated and applied
- [ ] Page renders correctly in local preview
- [ ] Visual comparison passes against original
- [ ] Linting passes
- [ ] Component models updated (`npm run build:json`) if new blocks added

## Risks & Considerations

- Personal/portfolio sites may use custom layouts that don't map directly to standard EDS blocks
- Interactive elements (animations, scroll effects) may need custom block JavaScript
- Dark themes or unique color schemes require careful design token extraction
- Single-page layouts with multiple scroll sections need proper section boundary mapping

## Execution

This plan requires **Execute mode** to proceed with implementation. The migration will use the `excat-site-migration` skill to orchestrate the full workflow, starting with page analysis of `https://gururajkoni.dev/`.
