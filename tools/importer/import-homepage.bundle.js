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

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-portfolio.js
  function parse(element, { document }) {
    const heroImage = element.querySelector('img:not([src^="data:"])');
    const imageCell = [];
    if (heroImage) {
      const imageHint = document.createComment(" field:image ");
      imageCell.push(imageHint);
      imageCell.push(heroImage);
    }
    const textCell = [];
    const textHint = document.createComment(" field:text ");
    textCell.push(textHint);
    const intro = element.querySelector('p[class*="_intro_"], p:first-of-type');
    if (intro) {
      const h1 = document.createElement("h1");
      h1.innerHTML = intro.innerHTML;
      textCell.push(h1);
    }
    const desc = element.querySelector('p[class*="_desc_"], p:nth-of-type(2)');
    if (desc) {
      const p = document.createElement("p");
      p.textContent = desc.textContent;
      textCell.push(p);
    }
    const btnContainer = element.querySelector('button[class*="_btn_container_"], button[class*="_btn_"]');
    if (btnContainer) {
      const btnText = btnContainer.querySelector('span[class*="_btn_"]:not([class*="_hover_"])');
      const ctaText = btnText ? btnText.textContent.trim() : btnContainer.textContent.trim();
      if (ctaText) {
        const link = document.createElement("a");
        link.href = "#works";
        link.textContent = ctaText;
        const ctaParagraph = document.createElement("p");
        ctaParagraph.appendChild(link);
        textCell.push(ctaParagraph);
      }
    }
    const cells = [];
    cells.push([imageCell]);
    cells.push([textCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-portfolio", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-icon.js
  function parse2(element, { document }) {
    const techItems = element.querySelectorAll('abbr[title], [class*="tech_"]:not([class*="container"]):not([class*="tech_img"])');
    const cells = [];
    techItems.forEach((item) => {
      const img = item.querySelector("img");
      const title = item.getAttribute("title") || (img ? img.getAttribute("alt") : "") || "";
      const imageCell = document.createElement("div");
      const fieldHintImage = document.createComment(" field:image ");
      imageCell.appendChild(fieldHintImage);
      if (img) {
        imageCell.appendChild(img.cloneNode(true));
      }
      const textCell = document.createElement("div");
      const fieldHintText = document.createComment(" field:text ");
      textCell.appendChild(fieldHintText);
      if (title) {
        const p = document.createElement("p");
        p.textContent = title;
        textCell.appendChild(p);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-icon", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-service.js
  function parse3(element, { document }) {
    const cardItems = element.querySelectorAll('[class*="_tilt_hvhor"]');
    const cells = [];
    cardItems.forEach((card) => {
      const img = card.querySelector('img[class*="_img_hvhor"], img[class*="img"]');
      const title = card.querySelector('p[class*="_name_hvhor"], [class*="_name_"]');
      const description = card.querySelector('p[class*="_text_hvhor"], [class*="_text_"]');
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:image "));
      if (img) {
        const picture = document.createElement("picture");
        const imgEl = document.createElement("img");
        imgEl.src = img.src || img.getAttribute("src") || "";
        imgEl.alt = img.alt || img.getAttribute("alt") || "";
        picture.appendChild(imgEl);
        imageCell.appendChild(picture);
      }
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:text "));
      if (title) {
        const heading = document.createElement("p");
        heading.innerHTML = "<strong>" + (title.textContent || "").trim() + "</strong>";
        textCell.appendChild(heading);
      }
      if (description) {
        const desc = document.createElement("p");
        desc.textContent = (description.textContent || "").trim();
        textCell.appendChild(desc);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-service", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-blog.js
  function parse4(element, { document }) {
    const slideWrappers = element.querySelectorAll('.slick-slide:not(.slick-cloned) [class^="_slideWrapper_tegko"]');
    let slides = Array.from(slideWrappers);
    if (slides.length === 0) {
      const allWrappers = element.querySelectorAll('[class^="_slideWrapper_tegko"]');
      const seenHrefs = /* @__PURE__ */ new Set();
      slides = Array.from(allWrappers).filter((wrapper) => {
        const link = wrapper.querySelector('a[class^="_cardLink_tegko"]');
        if (!link) return false;
        const href = link.getAttribute("href");
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
      const imageCol = document.createElement("div");
      if (cardImage) {
        const img = document.createElement("img");
        img.src = cardImage.getAttribute("src");
        img.alt = cardImage.getAttribute("alt") || "";
        imageCol.append(img);
      }
      const contentCol = document.createElement("div");
      if (cardTitle) {
        const heading = document.createElement("h3");
        heading.textContent = cardTitle.textContent;
        if (cardLink) {
          const link = document.createElement("a");
          link.href = cardLink.getAttribute("href");
          link.textContent = cardTitle.textContent;
          heading.textContent = "";
          heading.append(link);
        }
        contentCol.append(heading);
      }
      if (cardDate) {
        const datePara = document.createElement("p");
        datePara.textContent = cardDate.textContent;
        contentCol.append(datePara);
      }
      if (cardSnippet) {
        const snippetPara = document.createElement("p");
        snippetPara.textContent = cardSnippet.textContent.trim();
        contentCol.append(snippetPara);
      }
      cells.push([imageCol, contentCol]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-blog", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-portfolio.js
  function parse5(element, { document }) {
    const slides = element.querySelectorAll(".slick-slide:not(.slick-cloned)");
    const cells = [];
    slides.forEach((slide) => {
      const card = slide.querySelector('[class*="_card_"]');
      if (!card) return;
      const projectLink = card.querySelector('a[class*="_project_link_"]');
      const img = card.querySelector('img[class*="_img_"]:not([src^="data:"])');
      const heading = card.querySelector('h2[class*="_name_"]');
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:media_image "));
      if (img) {
        const picture = document.createElement("picture");
        const imgEl = document.createElement("img");
        imgEl.src = img.src;
        imgEl.alt = img.alt || "";
        picture.appendChild(imgEl);
        imageCell.appendChild(picture);
      }
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:content_text "));
      if (heading) {
        const h2 = document.createElement("h2");
        h2.textContent = heading.textContent;
        textCell.appendChild(h2);
      }
      if (projectLink) {
        const link = document.createElement("a");
        link.href = projectLink.href;
        link.textContent = heading ? heading.textContent : "View Project";
        textCell.appendChild(link);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-portfolio", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-contact.js
  function parse6(element, { document }) {
    const formContainer = element.querySelector('form[class^="_form_container"], div[class^="_form_"]');
    const formTitle = element.querySelector('h4[class^="_form_title"], h4, h3');
    const inputs = Array.from(element.querySelectorAll('input[class^="_input_"]'));
    const textarea = element.querySelector('textarea[class^="_input_"], textarea');
    const submitButton = element.querySelector('button[class^="_btn_container"], button');
    const col1Content = [];
    if (formTitle) {
      col1Content.push(formTitle);
    }
    inputs.forEach((input) => {
      const p = document.createElement("p");
      const placeholder = input.getAttribute("placeholder") || input.getAttribute("name") || "Input field";
      p.textContent = placeholder;
      col1Content.push(p);
    });
    if (textarea) {
      const p = document.createElement("p");
      const placeholder = textarea.getAttribute("placeholder") || "Message";
      p.textContent = placeholder;
      col1Content.push(p);
    }
    if (submitButton) {
      const btnSpan = submitButton.querySelector('span[class^="_btn_1"], span:last-child');
      const buttonText = btnSpan ? btnSpan.textContent.trim() : submitButton.textContent.trim().split("\n")[0].trim();
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = buttonText || "Get in touch";
      const p = document.createElement("p");
      p.appendChild(link);
      col1Content.push(p);
    }
    const image = element.querySelector('div[class^="_img_container"] img, img[class^="_img_"]');
    const col2Content = [];
    if (image) {
      const picture = document.createElement("picture");
      const img = document.createElement("img");
      const src = image.src || image.getAttribute("src") || "";
      img.src = src;
      img.alt = "Contact section illustration";
      img.setAttribute("width", "500");
      img.setAttribute("height", "500");
      picture.appendChild(img);
      col2Content.push(picture);
    }
    const cells = [
      [col1Content, col2Content]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-contact", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/gururajkoni-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      const clonedSlides = element.querySelectorAll(".slick-slide.slick-cloned");
      clonedSlides.forEach((slide) => slide.remove());
      WebImporter.DOMUtils.remove(element, [".slick-arrow"]);
      const starCanvas = element.querySelector("div.absolute.left-0.top-0");
      if (starCanvas) starCanvas.remove();
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, ['[class^="_navbar_container_u0659"]']);
      WebImporter.DOMUtils.remove(element, ['[id^="_footer_1ez18"]']);
      WebImporter.DOMUtils.remove(element, ["noscript", "link"]);
    }
  }

  // tools/importer/transformers/gururajkoni-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { document } = payload;
      const template = payload.template;
      if (!template || !template.sections || template.sections.length < 2) {
        return;
      }
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) {
          continue;
        }
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Personal portfolio homepage with hero, about, and project sections",
    urls: [
      "https://gururajkoni.dev/"
    ],
    blocks: [
      {
        name: "hero-portfolio",
        instances: ['div.relative.w-screen.h-screen > section > div[class^="_container_11uuf"]']
      },
      {
        name: "cards-icon",
        instances: ['div[class^="_tech_container_1bjz1"]']
      },
      {
        name: "cards-service",
        instances: ['div[class^="_card_container_hvhor"]']
      },
      {
        name: "carousel-blog",
        instances: ['div[class^="_carouselContainer_tegko"]']
      },
      {
        name: "carousel-portfolio",
        instances: ['div[class^="_carousel_wrapper_1jk4x"]']
      },
      {
        name: "columns-contact",
        instances: ['div[class^="_container_1iknq"]']
      }
    ],
    sections: [
      {
        id: "section-1-hero",
        name: "Hero",
        selector: "div.relative.w-screen.h-screen",
        style: null,
        blocks: ["hero-portfolio"],
        defaultContent: []
      },
      {
        id: "section-2-about",
        name: "About",
        selector: "section.max-w-\\[90\\%\\]:nth-of-type(1)",
        style: "dark",
        blocks: [],
        defaultContent: ['h1[class^="_title_1dw4f"]', 'div[class^="_para_1dw4f"]']
      },
      {
        id: "section-3-technologies",
        name: "Technologies",
        selector: "section.max-w-\\[90\\%\\]:nth-of-type(2)",
        style: "dark",
        blocks: ["cards-icon"],
        defaultContent: []
      },
      {
        id: "section-4-services",
        name: "Services",
        selector: "section.max-w-\\[90\\%\\]:nth-of-type(3)",
        style: "dark",
        blocks: ["cards-service"],
        defaultContent: ['h1[class^="_title_hvhor"]', 'p[class^="_subtitle_hvhor"]']
      },
      {
        id: "section-5-blogs",
        name: "Blogs",
        selector: "section.max-w-\\[90\\%\\]:nth-of-type(4) > section",
        style: "dark",
        blocks: ["carousel-blog"],
        defaultContent: []
      },
      {
        id: "section-6-works",
        name: "Works",
        selector: "section.max-w-\\[90\\%\\]:nth-of-type(5)",
        style: "dark",
        blocks: ["carousel-portfolio"],
        defaultContent: []
      },
      {
        id: "section-7-contact",
        name: "Contact",
        selector: "div.contact section",
        style: "dark",
        blocks: ["columns-contact"],
        defaultContent: ['h1[class^="_title_1iknq"]', 'p[class^="_subtitle_1iknq"]']
      },
      {
        id: "section-8-footer",
        name: "Footer",
        selector: 'section[id^="_footer_1ez18"]',
        style: "dark",
        blocks: [],
        defaultContent: []
      }
    ]
  };
  var parsers = {
    "hero-portfolio": parse,
    "cards-icon": parse2,
    "cards-service": parse3,
    "carousel-blog": parse4,
    "carousel-portfolio": parse5,
    "columns-contact": parse6
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
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
  var import_homepage_default = {
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
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
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
  return __toCommonJS(import_homepage_exports);
})();
