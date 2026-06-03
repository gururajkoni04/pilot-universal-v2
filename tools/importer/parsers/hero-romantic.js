/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-romantic
 * Base block: hero
 * Source: https://gururajkoni.dev/hinata
 * Selector: #question-card
 * Generated: 2026-06-02
 *
 * Model fields (from _hero-romantic.json):
 *   - image (reference) -> row 1
 *   - imageAlt (collapsed into image alt attribute)
 *   - text (richtext) -> row 2 (heading + paragraph + CTA links)
 */
export default function parse(element, { document }) {
  // --- Extract image (validated selector: img with alt="Hinata" inside first child div) ---
  const image = element.querySelector(':scope > div > img, :scope > div img, :scope img');

  // --- Extract heading (validated selector: h1 direct child) ---
  const heading = element.querySelector(':scope > h1, :scope > h2, :scope h1');

  // --- Extract paragraph text (validated selector: p direct child) ---
  const description = element.querySelector(':scope > p, :scope p');

  // --- Extract CTA buttons and convert to anchor links ---
  // Source has <button> elements; convert them to <a> links for AEM CTA pattern
  const buttons = Array.from(element.querySelectorAll(':scope button, :scope a.button, :scope a[class*="btn"]'));
  const ctaLinks = buttons.map((btn) => {
    // If it's already an anchor, use it directly
    if (btn.tagName === 'A') return btn;
    // Convert button to anchor link for AEM CTA pattern
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = btn.textContent.trim();
    return link;
  });

  // --- Build cells array matching model structure ---
  // Row 1: image field
  const imageCell = document.createDocumentFragment();
  imageCell.appendChild(document.createComment(' field:image '));
  if (image) {
    const pic = document.createElement('picture');
    const img = document.createElement('img');
    img.src = image.src || image.getAttribute('src') || '';
    img.alt = image.alt || image.getAttribute('alt') || '';
    pic.appendChild(img);
    imageCell.appendChild(pic);
  }

  // Row 2: text field (heading + description + CTA links as richtext)
  const textCell = document.createDocumentFragment();
  textCell.appendChild(document.createComment(' field:text '));
  if (heading) {
    const h = document.createElement(heading.tagName || 'h1');
    h.textContent = heading.textContent.trim();
    textCell.appendChild(h);
  }
  if (description) {
    const p = document.createElement('p');
    p.innerHTML = description.innerHTML;
    textCell.appendChild(p);
  }
  // Add CTA links as paragraph with links (standard AEM CTA pattern)
  if (ctaLinks.length > 0) {
    const ctaContainer = document.createElement('p');
    ctaLinks.forEach((link, idx) => {
      if (idx > 0) ctaContainer.appendChild(document.createTextNode(' '));
      const strong = document.createElement('strong');
      const a = document.createElement('a');
      a.href = link.href || '#';
      a.textContent = link.textContent;
      strong.appendChild(a);
      ctaContainer.appendChild(strong);
    });
    textCell.appendChild(ctaContainer);
  }

  const cells = [
    [imageCell],
    [textCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-romantic', cells });
  element.replaceWith(block);
}
