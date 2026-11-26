# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: static HTML/CSS/vanilla JS, no build step, no framework, no runtime dependencies. Chosen for performance (no JS framework payload, instant first paint) and because the site's own promise is "no install". Deployable to any static host (GitHub Pages, Netlify, Cloudflare Pages).

## Users

Designers and developers, equally. Developers come to copy working components into a project; designers come for inspiration, interaction ideas and a reference for web design rules. Both browse, preview, compare formats and copy code.

## Product Purpose

Tearsheet is a free library of prebuilt UI components plus a practical web design guide (dos and don'ts). Visitors preview each component live, pick a format, copy the code and ship. Success: a visitor leaves with working code in their framework and understands why it is designed the way it is.

## Positioning

- Any framework, no install: every component is offered as HTML + CSS, React, Vue and Svelte, copy-and-paste, zero dependencies.
- Teaches design: every component carries usage/accessibility notes, and the site includes a full dos and don'ts guide with a pre-launch checklist.
- Wild experimental pieces: alongside the solid basics, the library includes playful, experimental, show-off components nobody else ships.
- Totally free: MIT-0, no attribution, no accounts, no paid tier.

## Capabilities and Constraints

- Live previews render each component in an isolated iframe using the shared token set; light and dark themes.
- Code generation: React/Vue/Svelte are derived automatically from HTML for static components; interactive components carry hand-written framework versions.
- One shared tokens.css (CSS custom properties) drives every component's colours, radii, shadows and focus ring.
- Pages: index.html (gallery + tokens), guide.html (design guide + checklist).
- Name "Tearsheet" is a working name, not confirmed.

## Evidence on Hand

No users, testimonials, download counts, stars or press exist. Do not invent usage numbers, logos or quotes.

## Product Principles

1. Copy-paste must just work, in every listed format.
2. Every component practises what the guide preaches: accessible, keyboard-friendly, reduced-motion aware.
3. Basics are boringly reliable; experiments are genuinely surprising. Both are clearly labelled.
4. Free means free: no gates, no sign-ups, no upsell.

## Accessibility & Inclusion

WCAG 2.2 AA for the site and every component (contrast, keyboard, visible focus, prefers-reduced-motion). Experimental components must still be operable by keyboard and must degrade gracefully under reduced motion.
