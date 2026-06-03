/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-hinata-page.js
  var import_hinata_page_exports = {};
  __export(import_hinata_page_exports, {
    default: () => import_hinata_page_default
  });

  // tools/importer/parsers/hero-romantic.js
  function parse(element, { document }) {
    const image = element.querySelector(":scope > div > img, :scope > div img, :scope img");
    const heading = element.querySelector(":scope > h1, :scope > h2, :scope h1");
    const description = element.querySelector(":scope > p, :scope p");
    const buttons = Array.from(element.querySelectorAll(':scope button, :scope a.button, :scope a[class*="btn"]'));
    const ctaLinks = buttons.map((btn) => {
      if (btn.tagName === "A") return btn;
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = btn.textContent.trim();
      return link;
    });
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(" field:image "));
    if (image) {
      const pic = document.createElement("picture");
      const img = document.createElement("img");
      img.src = image.src || image.getAttribute("src") || "";
      img.alt = image.alt || image.getAttribute("alt") || "";
      pic.appendChild(img);
      imageCell.appendChild(pic);
    }
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(" field:text "));
    if (heading) {
      const h = document.createElement(heading.tagName || "h1");
      h.textContent = heading.textContent.trim();
      textCell.appendChild(h);
    }
    if (description) {
      const p = document.createElement("p");
      p.innerHTML = description.innerHTML;
      textCell.appendChild(p);
    }
    if (ctaLinks.length > 0) {
      const ctaContainer = document.createElement("p");
      ctaLinks.forEach((link, idx) => {
        if (idx > 0) ctaContainer.appendChild(document.createTextNode(" "));
        const strong = document.createElement("strong");
        const a = document.createElement("a");
        a.href = link.href || "#";
        a.textContent = link.textContent;
        strong.appendChild(a);
        ctaContainer.appendChild(strong);
      });
      textCell.appendChild(ctaContainer);
    }
    const cells = [
      [imageCell],
      [textCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-romantic", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/hinata-cleanup.js
  function transform(hookName, element, payload) {
    if (hookName === "beforeTransform") {
      const introCard = element.querySelector("#intro-card");
      if (introCard) introCard.remove();
      const successCard = element.querySelector("#success-card");
      if (successCard) successCard.remove();
      const heartSpan = element.querySelector("#question-card > div > span");
      if (heartSpan) heartSpan.remove();
    }
  }

  // tools/importer/import-hinata-page.js
  var PAGE_TEMPLATE = {
    name: "hinata-page",
    description: "Hinata sub-page",
    urls: [
      "https://gururajkoni.dev/hinata"
    ],
    blocks: [
      {
        name: "hero-romantic",
        instances: ["#question-card"]
      }
    ],
    sections: [
      {
        id: "section-1-question",
        name: "Question",
        selector: "#question-card",
        style: "rose-gradient",
        blocks: ["hero-romantic"],
        defaultContent: []
      }
    ]
  };
  var parsers = {
    "hero-romantic": parse
  };
  var transformers = [
    transform
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
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
  var import_hinata_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/hinata"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_hinata_page_exports);
})();
