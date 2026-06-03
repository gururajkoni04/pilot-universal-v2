/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-blog
 * Base block: carousel-blog
 * Source: https://gururajkoni.dev/
 * Selector: div[class^="_carouselContainer_tegko"]
 * Generated: 2026-06-02
 *
 * Source structure: Slick carousel with blog post cards.
 * Each slide contains an image, title (h3), date, and snippet wrapped in a link.
 * Slides are duplicated (cloned) for infinite scroll - parser deduplicates by href.
 *
 * Target structure (xwalk model carousel-blog-item):
 *   Row per slide: [image column] | [content column (title + date + snippet + link)]
 *   Field hints: media_image, media_imageAlt on image; content_text on richtext content
 */
export default function parse(element, { document }) {
  // Collect unique slides - slick duplicates slides with .slick-cloned class
  // Only use non-cloned slides to avoid duplicates
  const slideWrappers = element.querySelectorAll('.slick-slide:not(.slick-cloned) [class^="_slideWrapper_tegko"]');

  // Fallback: if no non-cloned slides found, deduplicate by href
  let slides = Array.from(slideWrappers);
  if (slides.length === 0) {
    const allWrappers = element.querySelectorAll('[class^="_slideWrapper_tegko"]');
    const seenHrefs = new Set();
    slides = Array.from(allWrappers).filter((wrapper) => {
      const link = wrapper.querySelector('a[class^="_cardLink_tegko"]');
      if (!link) return false;
      const href = link.getAttribute('href');
      if (seenHrefs.has(href)) return false;
      seenHrefs.add(href);
      return true;
    });
  }

  const cells = [];

  slides.forEach((slideWrapper) => {
    const cardLink = slideWrapper.querySelector('a[class^="_cardLink_tegko"]');
    const cardImage = slideWrapper.querySelector('img[class^="_cardImage_tegko"]');
    const cardTitle = slideWrapper.querySelector('h3[class^="_cardTitle_tegko"]');
    const cardDate = slideWrapper.querySelector('p[class^="_cardDate_tegko"]');
    const cardSnippet = slideWrapper.querySelector('p[class^="_cardSnippet_tegko"]');

    // Column 1: Image with field hints
    const imageCol = document.createElement('div');
    if (cardImage) {
      const img = document.createElement('img');
      img.src = cardImage.getAttribute('src');
      img.alt = cardImage.getAttribute('alt') || '';
      imageCol.append(img);
    }

    // Column 2: Content (title, date, snippet) with link
    const contentCol = document.createElement('div');

    if (cardTitle) {
      const heading = document.createElement('h3');
      heading.textContent = cardTitle.textContent;
      if (cardLink) {
        const link = document.createElement('a');
        link.href = cardLink.getAttribute('href');
        link.textContent = cardTitle.textContent;
        heading.textContent = '';
        heading.append(link);
      }
      contentCol.append(heading);
    }

    if (cardDate) {
      const datePara = document.createElement('p');
      datePara.textContent = cardDate.textContent;
      contentCol.append(datePara);
    }

    if (cardSnippet) {
      const snippetPara = document.createElement('p');
      snippetPara.textContent = cardSnippet.textContent.trim();
      contentCol.append(snippetPara);
    }

    cells.push([imageCol, contentCol]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-blog', cells });
  element.replaceWith(block);
}
