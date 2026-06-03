/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroPortfolioParser from './parsers/hero-portfolio.js';
import cardsIconParser from './parsers/cards-icon.js';
import cardsServiceParser from './parsers/cards-service.js';
import carouselBlogParser from './parsers/carousel-blog.js';
import carouselPortfolioParser from './parsers/carousel-portfolio.js';
import columnsContactParser from './parsers/columns-contact.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/gururajkoni-cleanup.js';
import sectionsTransformer from './transformers/gururajkoni-sections.js';

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Personal portfolio homepage with hero, about, and project sections',
  urls: [
    'https://gururajkoni.dev/'
  ],
  blocks: [
    {
      name: 'hero-portfolio',
      instances: ['div.relative.w-screen.h-screen > section > div[class^="_container_11uuf"]']
    },
    {
      name: 'cards-icon',
      instances: ['div[class^="_tech_container_1bjz1"]']
    },
    {
      name: 'cards-service',
      instances: ['div[class^="_card_container_hvhor"]']
    },
    {
      name: 'carousel-blog',
      instances: ['div[class^="_carouselContainer_tegko"]']
    },
    {
      name: 'carousel-portfolio',
      instances: ['div[class^="_carousel_wrapper_1jk4x"]']
    },
    {
      name: 'columns-contact',
      instances: ['div[class^="_container_1iknq"]']
    }
  ],
  sections: [
    {
      id: 'section-1-hero',
      name: 'Hero',
      selector: 'div.relative.w-screen.h-screen',
      style: null,
      blocks: ['hero-portfolio'],
      defaultContent: []
    },
    {
      id: 'section-2-about',
      name: 'About',
      selector: 'section.max-w-\\[90\\%\\]:nth-of-type(1)',
      style: 'dark',
      blocks: [],
      defaultContent: ['h1[class^="_title_1dw4f"]', 'div[class^="_para_1dw4f"]']
    },
    {
      id: 'section-3-technologies',
      name: 'Technologies',
      selector: 'section.max-w-\\[90\\%\\]:nth-of-type(2)',
      style: 'dark',
      blocks: ['cards-icon'],
      defaultContent: []
    },
    {
      id: 'section-4-services',
      name: 'Services',
      selector: 'section.max-w-\\[90\\%\\]:nth-of-type(3)',
      style: 'dark',
      blocks: ['cards-service'],
      defaultContent: ['h1[class^="_title_hvhor"]', 'p[class^="_subtitle_hvhor"]']
    },
    {
      id: 'section-5-blogs',
      name: 'Blogs',
      selector: 'section.max-w-\\[90\\%\\]:nth-of-type(4) > section',
      style: 'dark',
      blocks: ['carousel-blog'],
      defaultContent: []
    },
    {
      id: 'section-6-works',
      name: 'Works',
      selector: 'section.max-w-\\[90\\%\\]:nth-of-type(5)',
      style: 'dark',
      blocks: ['carousel-portfolio'],
      defaultContent: []
    },
    {
      id: 'section-7-contact',
      name: 'Contact',
      selector: 'div.contact section',
      style: 'dark',
      blocks: ['columns-contact'],
      defaultContent: ['h1[class^="_title_1iknq"]', 'p[class^="_subtitle_1iknq"]']
    },
    {
      id: 'section-8-footer',
      name: 'Footer',
      selector: 'section[id^="_footer_1ez18"]',
      style: 'dark',
      blocks: [],
      defaultContent: []
    }
  ]
};

// PARSER REGISTRY
const parsers = {
  'hero-portfolio': heroPortfolioParser,
  'cards-icon': cardsIconParser,
  'cards-service': cardsServiceParser,
  'carousel-blog': carouselBlogParser,
  'carousel-portfolio': carouselPortfolioParser,
  'columns-contact': columnsContactParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach(blockDef => {
    blockDef.instances.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach(element => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach(block => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map(b => b.name),
      }
    }];
  }
};
