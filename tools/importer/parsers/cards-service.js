/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-service variant.
 * Base block: cards
 * Source: https://gururajkoni.dev/
 * Selector: div[class^="_card_container_hvhor"]
 * Generated: 2026-06-02
 *
 * Source structure: Container with multiple ._tilt_hvhor_42 card items.
 * Each card has an overlay with description text (._text_hvhor_102),
 * an image (._img_hvhor_81), and a title (._name_hvhor_95).
 *
 * Target structure (xwalk container block): Each card = one row with two columns:
 *   Column 1: image (field: image)
 *   Column 2: richtext with title + description (field: text)
 */
export default function parse(element, { document }) {
  // Find all card items within the container
  const cardItems = element.querySelectorAll('[class*="_tilt_hvhor"]');

  const cells = [];

  cardItems.forEach((card) => {
    // Extract image from the card
    const img = card.querySelector('img[class*="_img_hvhor"], img[class*="img"]');

    // Extract title (the card name)
    const title = card.querySelector('p[class*="_name_hvhor"], [class*="_name_"]');

    // Extract description text (in the overlay)
    const description = card.querySelector('p[class*="_text_hvhor"], [class*="_text_"]');

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));
    if (img) {
      const picture = document.createElement('picture');
      const imgEl = document.createElement('img');
      imgEl.src = img.src || img.getAttribute('src') || '';
      imgEl.alt = img.alt || img.getAttribute('alt') || '';
      picture.appendChild(imgEl);
      imageCell.appendChild(picture);
    }

    // Build text cell with field hint - combine title and description
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));
    if (title) {
      const heading = document.createElement('p');
      heading.innerHTML = '<strong>' + (title.textContent || '').trim() + '</strong>';
      textCell.appendChild(heading);
    }
    if (description) {
      const desc = document.createElement('p');
      desc.textContent = (description.textContent || '').trim();
      textCell.appendChild(desc);
    }

    // Each card is a row with [image, text] columns
    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-service', cells });
  element.replaceWith(block);
}
