/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-contact
 * Base block: columns
 * Source: https://gururajkoni.dev/
 * Structure: 2-column layout - Column 1: contact form, Column 2: image
 * Note: Columns blocks do NOT require field hint comments (per xwalk hinting rules)
 * Generated: 2026-06-02
 */
export default function parse(element, { document }) {
  // Column 1: Contact form content
  const formContainer = element.querySelector('form[class^="_form_container"], div[class^="_form_"]');
  const formTitle = element.querySelector('h4[class^="_form_title"], h4, h3');
  const inputs = Array.from(element.querySelectorAll('input[class^="_input_"]'));
  const textarea = element.querySelector('textarea[class^="_input_"], textarea');
  const submitButton = element.querySelector('button[class^="_btn_container"], button');

  // Build column 1 content (form elements)
  const col1Content = [];
  if (formTitle) {
    col1Content.push(formTitle);
  }

  // Represent form fields as text placeholders for authoring
  inputs.forEach((input) => {
    const p = document.createElement('p');
    const placeholder = input.getAttribute('placeholder') || input.getAttribute('name') || 'Input field';
    p.textContent = placeholder;
    col1Content.push(p);
  });

  if (textarea) {
    const p = document.createElement('p');
    const placeholder = textarea.getAttribute('placeholder') || 'Message';
    p.textContent = placeholder;
    col1Content.push(p);
  }

  if (submitButton) {
    // Button has two spans (hover + normal) - pick just one to avoid duplication
    const btnSpan = submitButton.querySelector('span[class^="_btn_1"], span:last-child');
    const buttonText = btnSpan ? btnSpan.textContent.trim() : submitButton.textContent.trim().split('\n')[0].trim();
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = buttonText || 'Get in touch';
    const p = document.createElement('p');
    p.appendChild(link);
    col1Content.push(p);
  }

  // Column 2: Image - create a proper picture element with absolute URL
  const image = element.querySelector('div[class^="_img_container"] img, img[class^="_img_"]');

  const col2Content = [];
  if (image) {
    const picture = document.createElement('picture');
    const img = document.createElement('img');
    // Use the fully resolved src from the DOM (absolute URL)
    const src = image.src || image.getAttribute('src') || '';
    img.src = src;
    // Use descriptive alt to prevent icon conversion by the markdown serializer
    img.alt = 'Contact section illustration';
    img.setAttribute('width', '500');
    img.setAttribute('height', '500');
    picture.appendChild(img);
    col2Content.push(picture);
  }

  // Build cells: single row with 2 columns
  const cells = [
    [col1Content, col2Content],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-contact', cells });
  element.replaceWith(block);
}
