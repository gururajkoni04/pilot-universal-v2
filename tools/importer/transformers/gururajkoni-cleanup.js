/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: gururajkoni cleanup.
 * Removes non-authorable site chrome and carousel artifacts.
 * Selectors from captured DOM of https://gururajkoni.dev/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove slick carousel cloned slides (duplicates that interfere with block parsing)
    // Found in captured HTML: <div class="slick-slide slick-cloned">
    const clonedSlides = element.querySelectorAll('.slick-slide.slick-cloned');
    clonedSlides.forEach((slide) => slide.remove());

    // Remove slick carousel arrow buttons (non-authorable UI)
    // Found in captured HTML: <button class="slick-arrow slick-prev"> and <button class="slick-arrow slick-next">
    WebImporter.DOMUtils.remove(element, ['.slick-arrow']);

    // Remove decorative star canvas background
    // Found in captured HTML: <div class="absolute left-0 top-0 z-[-1]"> containing <canvas>
    const starCanvas = element.querySelector('div.absolute.left-0.top-0');
    if (starCanvas) starCanvas.remove();
  }

  if (hookName === H.after) {
    // Remove navigation/header (non-authorable site chrome)
    // Found in captured HTML: <div class="_navbar_container_u0659_1">
    WebImporter.DOMUtils.remove(element, ['[class^="_navbar_container_u0659"]']);

    // Remove footer section (non-authorable site chrome)
    // Found in captured HTML: <section id="_footer_1ez18_1">
    WebImporter.DOMUtils.remove(element, ['[id^="_footer_1ez18"]']);

    // Remove leftover non-content elements
    WebImporter.DOMUtils.remove(element, ['noscript', 'link']);
  }
}
