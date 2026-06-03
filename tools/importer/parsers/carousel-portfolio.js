/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-portfolio
 * Base block: carousel
 * Source: https://gururajkoni.dev/
 * Generated: 2026-06-02
 *
 * Container block: each slide becomes one row with two columns:
 *   Col 1: image (field: media_image)
 *   Col 2: text content - heading + link (field: content_text)
 *
 * UE Model fields:
 *   - media_image (reference) - project screenshot
 *   - media_imageAlt (collapsed into media_image - skipped)
 *   - content_text (richtext) - project name heading + view link
 */
export default function parse(element, { document }) {
  // Select only non-cloned slides to avoid duplicates from slick carousel
  const slides = element.querySelectorAll('.slick-slide:not(.slick-cloned)');

  const cells = [];

  slides.forEach((slide) => {
    const card = slide.querySelector('[class*="_card_"]');
    if (!card) return;

    const projectLink = card.querySelector('a[class*="_project_link_"]');
    const img = card.querySelector('img[class*="_img_"]:not([src^="data:"])');
    const heading = card.querySelector('h2[class*="_name_"]');

    // Column 1: Image with field hint
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:media_image '));
    if (img) {
      const picture = document.createElement('picture');
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      picture.appendChild(imgEl);
      imageCell.appendChild(picture);
    }

    // Column 2: Text content (heading + link) with field hint
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:content_text '));
    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      textCell.appendChild(h2);
    }
    if (projectLink) {
      const link = document.createElement('a');
      link.href = projectLink.href;
      link.textContent = heading ? heading.textContent : 'View Project';
      textCell.appendChild(link);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-portfolio', cells });
  element.replaceWith(block);
}
