/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-portfolio
 * Base block: hero
 * Source: https://gururajkoni.dev/
 * Generated: 2026-06-02
 *
 * UE Model fields:
 *   - image (reference) + imageAlt (collapsed)
 *   - text (richtext)
 *
 * Source structure:
 *   div._container_11uuf_1
 *     p._intro_11uuf_14 > span._name_11uuf_25
 *     p._desc_11uuf_31
 *     button._btn_container_11uuf_40 > span._btn_11uuf_40 + img (arrow icon)
 */
export default function parse(element, { document }) {
  // --- Row 1: Image (optional - source may not have a hero image) ---
  const heroImage = element.querySelector('img:not([src^="data:"])');

  const imageCell = [];
  if (heroImage) {
    const imageHint = document.createComment(' field:image ');
    imageCell.push(imageHint);
    imageCell.push(heroImage);
  }

  // --- Row 2: Text (richtext - intro, description, CTA) ---
  const textCell = [];
  const textHint = document.createComment(' field:text ');
  textCell.push(textHint);

  // Extract intro/heading paragraph
  const intro = element.querySelector('p[class*="_intro_"], p:first-of-type');
  if (intro) {
    // Convert intro paragraph to a heading for semantic structure
    const h1 = document.createElement('h1');
    h1.innerHTML = intro.innerHTML;
    textCell.push(h1);
  }

  // Extract description paragraph
  const desc = element.querySelector('p[class*="_desc_"], p:nth-of-type(2)');
  if (desc) {
    const p = document.createElement('p');
    p.textContent = desc.textContent;
    textCell.push(p);
  }

  // Extract CTA button as a link
  const btnContainer = element.querySelector('button[class*="_btn_container_"], button[class*="_btn_"]');
  if (btnContainer) {
    const btnText = btnContainer.querySelector('span[class*="_btn_"]:not([class*="_hover_"])');
    const ctaText = btnText ? btnText.textContent.trim() : btnContainer.textContent.trim();

    if (ctaText) {
      const link = document.createElement('a');
      link.href = '#works';
      link.textContent = ctaText;
      const ctaParagraph = document.createElement('p');
      ctaParagraph.appendChild(link);
      textCell.push(ctaParagraph);
    }
  }

  // Build cells array matching UE model structure
  // Each row is an array of columns; simple block = 1 column per row
  const cells = [];

  // Row 1: image (always present as a row even if empty for xwalk)
  cells.push([imageCell]);

  // Row 2: text (richtext content)
  cells.push([textCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-portfolio', cells });
  element.replaceWith(block);
}
