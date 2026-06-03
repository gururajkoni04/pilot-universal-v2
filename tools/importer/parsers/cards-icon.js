/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-icon
 * Base block: cards
 * Source: https://gururajkoni.dev/
 * Selector: div[class^="_tech_container_1bjz1"]
 * Description: Converts technology icon grid into Cards block rows.
 *   Each <abbr> element with an icon image becomes a card row with
 *   image (col 1) and text/title (col 2).
 * Generated: 2026-06-02
 */
export default function parse(element, { document }) {
  // Extract all technology items - each is an <abbr> with title and nested <img>
  const techItems = element.querySelectorAll('abbr[title], [class*="tech_"]:not([class*="container"]):not([class*="tech_img"])');

  const cells = [];

  techItems.forEach((item) => {
    // Get the icon image from within the abbr element
    const img = item.querySelector('img');
    // Get the technology name from the title attribute or alt text
    const title = item.getAttribute('title') || (img ? img.getAttribute('alt') : '') || '';

    // Build image cell with field hint for xwalk
    const imageCell = document.createElement('div');
    const fieldHintImage = document.createComment(' field:image ');
    imageCell.appendChild(fieldHintImage);
    if (img) {
      imageCell.appendChild(img.cloneNode(true));
    }

    // Build text cell with field hint for xwalk
    const textCell = document.createElement('div');
    const fieldHintText = document.createComment(' field:text ');
    textCell.appendChild(fieldHintText);
    if (title) {
      const p = document.createElement('p');
      p.textContent = title;
      textCell.appendChild(p);
    }

    // Each card is a row with [image, text]
    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-icon', cells });
  element.replaceWith(block);
}
