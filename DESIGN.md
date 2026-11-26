---
name: Tearsheet
description: A free risograph zine of interface parts; two fluoro inks overprinted on newsprint stock.
colors:
  stock: "#f6f6f2"
  sheet: "#fafaf7"
  ink: "#1b1b20"
  ink-2: "#4a4a55"
  soft: "#dcdcd4"
  pink: "#ff48b0"
  pink-text: "#c2187a"
  blue: "#0078bf"
  blue-text: "#1f4f9e"
  on-blue: "#ffffff"
  code-bg: "#1b1b20"
  code-ink: "#f0f0ea"
  black-stock: "#131317"
  black-sheet: "#1c1c21"
  black-ink: "#f0f0ea"
  black-ink-2: "#b9b9c4"
  black-soft: "#34343c"
  black-pink: "#ff5cbc"
  black-blue: "#3f8cff"
  black-blue-text: "#8fb4ff"
  black-on-blue: "#0b0b0e"
  black-code-bg: "#0b0b0e"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(54px, 17.5vw, 290px)"
    fontWeight: 800
    lineHeight: 0.8
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(56px, 9vw, 140px)"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "34px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "tnum"
  label:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.2
  code:
    fontFamily: "JetBrains Mono, ui-monospace, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  none: "0px"
  chip: "4px"
  key: "6px"
  file: "10px"
  tab: "12px"
  dialog: "18px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "18px"
  lg: "28px"
  xl: "64px"
  gutter: "24px"
  wrap: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.on-blue}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-cover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.on-blue}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "56px"
  button-pink:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "34px"
  button-donate:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "40px"
  button-outline-hover:
    backgroundColor: "{colors.soft}"
  chip-in-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "38px"
  chip-in-link-hover:
    backgroundColor: "{colors.soft}"
  ink-chip-selected:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "40px"
  nav-link-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  find-field:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0 8px 0 14px"
    height: "44px"
  page-sheet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "26px 28px 22px"
  code-file:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.code-ink}"
    typography: "{typography.code}"
    rounded: "{rounded.file}"
    padding: "16px"
---

# Design System: Tearsheet

## Overview

**Creative North Star: "The Risograph Zine"**

The site is a free zine handed out at the door. Two fluorescent inks, pink and blue, are printed over a cool newsprint stock and allowed to overprint, so where they cross they multiply toward purple. Display type is set enormous and heavy, doubled into a pink layer and a blue layer that sit slightly out of register. Every component is a printed page: an off-white sheet laid on the stock at a fractional tilt, with a pink-bordered preview window and a dashed perforation where the code tears off. The guide is the back half of the same issue, and its dos and don'ts are stamped rather than badged.

Density is generous and editorial on the cover and spreads, tighter on the toolbar, index and code. Ornament is entirely print-borne: a faint fractal paper grain over everything, tone-modulated halftone screens in the two inks at riso screen angles, a dashed spine fold with two line-drawn staples, dotted leaders in the contents list. The dark theme is not an inversion; it is the same two inks printed on black stock, with the blend mode switched from multiply to screen so overprints still read as light mixing.

The world refuses the dark sidebar-plus-card-grid component library and the clean SaaS hero. The component library the site sells has its own, deliberately neutral token set (see Components, "The Product's Own Tokens"); the zine displays it and never adopts it.

The issue is free and says so plainly. A short "Free forever" note follows the back page, and any request for support is a quiet, optional aside in the same ink: never a popup, a gate, a banner or a nag, and absent entirely until a donation link is configured.

**Key Characteristics:**
- Two inks only (pink, blue) plus ink-black, on newsprint stock; overprint via `mix-blend-mode`.
- Halftone is a real screen: dot size carries tone, each ink at its own angle and pitch.
- Doubled, misregistered heavy display type that snaps into register on interaction.
- Components presented as tilted paper sheets with soft cast shadows, never as rounded cards.
- Pills for every control; square corners for every sheet of paper.
- One custom property, `--blend`, flips the whole print process between light (multiply) and black stock (screen).

## Colors

Newsprint neutrals carry the reading; two fluoro inks carry identity, action and state.

### Primary
- **Fluoro Pink** (pink): The signature ink. Selected states (format chip, index row, TOC item), every other thumb-index tab, the copy button, highlighter marks behind bold text, link underlines, the preview-window frame, bullet dots, list markers, selection and caret, and the fully drenched centerfold spread (always pink paper in both themes, screened with a fixed-blue plate). It is a fill and a stroke, not a text color on stock.
- **Deep Pink** (pink-text): The legible pink, for the few pink words that must sit on light paper (the centerfold count on the shelf, the Don't stamp). On black stock these revert to Fluoro Pink.

### Secondary
- **Riso Medium Blue** (blue): The action ink. Primary buttons (Open the issue, Tear out), the overprint layer of every doubled headline, the Do stamp's top band, callout panels, alternating thumb-index tabs, the second halftone screen.
- **Blue Text** (blue-text): Blue at text contrast: folios, counts, table headers, "Why" labels, section numerals, index group labels.
- **On Blue** (on-blue): Text and icons on blue fills; white on light stock, near-black on black stock.

### Neutral
- **Newsprint Stock** (stock): Page background (under a 0.16 grain the field reads as cool newsprint, about #f3f3ef), sticky masthead and toolbar, tear-off code area, inner key caps.
- **Sheet White** (sheet): Each printed page, the index dialog, the find field, checklist items.
- **Ink Black** (ink): Body text, every 2px rule and border, current nav pill fill. Also the fixed text color on every pink fill, in both themes.
- **Second Ink** (ink-2): Muted text, dotted leaders and dotted rules, placeholder text.
- **Soft Gray** (soft): Hover wash for outline controls and tabs, inline code ground, the dot grid inside preview frames.
- **Code Press** (code-bg / code-ink): The dark code file block, identical in spirit in both themes.

### Black Stock (dark theme)
The `black-*` tokens replace their light counterparts under `[data-theme="dark"]`: stock goes to near-black, sheets lift one step, ink becomes the warm off-white, pink and blue brighten for screen blending, and on-blue becomes near-black.

### Named Rules
**The Two Inks Rule.** Identity color is pink and blue only. Any third hue on the site chrome is a mistake; purple exists only where the two inks overprint.

**The Black On Pink Rule.** Text and icons on a pink fill are always Ink Black (#1b1b20), in light and dark themes alike. Pink fills never carry white text.

**The Ink Is Not Text Rule.** Fluoro Pink on stock does not reach text contrast; standalone pink words go in Deep Pink on light paper, or become a highlighter fill behind ink-black text. Two exceptions: the doubled overprint headline, where the blue layer carries the legibility and the pink layer is ink, not text; and the "UI" in the Tearsheet logotype, which is brand mark and exempt from text contrast. Only the logotype gets the second exemption.

## Typography

**Display Font:** Bricolage Grotesque, variable 200 to 800, self-hosted (with system-ui, sans-serif)
**Body Font:** Bricolage Grotesque (same family, regular weight)
**Label/Mono Font:** JetBrains Mono, variable, self-hosted, for code, file names and key caps only

**Character:** One grotesque does all the talking, pushed from a quiet 400 for reading up to a squashed, tightly tracked 800 for headlines that read like poster type. Mono appears only where the content is literally code.

### Hierarchy
- **Display** (800, clamp(54px, 17.5vw, 290px), line-height 0.8, -0.04em): The cover masthead, doubled in two inks. The guide cover uses the same treatment at clamp(64px, 11vw, 176px).
- **Headline** (800, clamp(56px, 9vw, 140px), line-height 0.82, -0.04em): Category spread titles and the centerfold. Back page, the free note and guide chapters step down to clamp(48px, 6vw, 88px), clamp(44px, 6vw, 84px) at line-height 0.9, and clamp(40px, 5vw, 64px).
- **Title** (800, 34px, line-height 1, -0.03em): The name on each printed page; dialog title at 40px.
- **Body** (400, 18px, line-height 1.55, tabular numerals): Running text. Page descriptions at 17px; guide paragraphs capped at 66ch, the free note at 19px and 62ch, cover blurb at 38ch.
- **Label** (600 to 800, 15px): Controls, nav, folios, meta lines, chips. Uppercase with 0.08em tracking only for index group headings, vertical thumb tabs and the rubber stamps.
- **Code** (JetBrains Mono, 13px, line-height 1.65): Code files, file names, key caps (12px).

### Named Rules
**The One Family Rule.** Bricolage Grotesque carries every non-code word; hierarchy comes from weight (400 vs 800), size and tracking, not from a second display face.

**The Heavy Headline Rule.** Every heading is 800 weight with negative tracking (-0.02em to -0.04em) and line-height at or below 1. Headings balance with `text-wrap: balance`; paragraphs use `pretty`.

## Layout

A single centered measure, `min(100% - 48px, 1280px)`, holds every band. The cover fills the first viewport (`100svh` minus the masthead) as a two-row grid: giant title centered, a three-column foot (blurb, two-column contents list, format picker plus primary action) ruled off with a 2px line. Below it a sticky toolbar band (find, tokens toggle, format chips, scrolling collection shelf) docks under the 60px sticky masthead.

The parts page runs cover, toolbar, one spread per collection in a fixed order (Actions, Forms, Content, Data, Feedback, Navigation, Overlays, Sections), the Experimental parts as the pink centerfold (always last, labelled "Weird" in navigation), the back page, the free note, then the colophon. Folios run continuously across every collection (p.01 onward), so a page number is an address in the whole issue, not within a spread.

Spreads are a two-column grid of pages with a 28px gap, collapsing to one column under 1000px. Wide parts (navbars, tables, step indicators, stat groups, and every part whose layout is full-page, which makes the whole Sections collection) span both columns as full-width sheets. Spreads open with 64px of top space; the centerfold and back page use 72px; the free note uses 64px top and 72px bottom. The guide is a 240px sticky table of contents beside a single column, collapsing to one column with the TOC hidden under 960px.

Navigation stacks by viewport: thumb-index tabs cut into the right edge on screens at least 1400 by 860, a pink floating Index button under 1000px, and an index dialog that becomes a bottom sheet under 760px. Under 760px the toolbar stops sticking. When the thumb tabs show, they replace the collection shelf, which is hidden. The thumb index carries one tab per collection (nine), sized to fit the 860px minimum viewport height that gates it.

Sticky chrome is measured, not guessed: script writes the live masthead height plus the sticky toolbar band (when it sticks) into `--nav-h`. Anchor jumps land at `scroll-padding-top: calc(var(--nav-h) + 14px)` and the thumb tabs dock at `calc(var(--nav-h) + 18px)`.

**The Spine Rule.** One continuous zine runs cover to checklist; new sections are spreads, centerfolds or back pages of the same issue, separated by full-width 2px ink rules; a note that continues the band before it (guide chapters, the free note after the back page) opens on a 2px dashed perforation instead. Never boxed panels.

## Elevation & Depth

Depth is physical paper, not interface layering. Sheets cast soft, low-opacity shadows as if lying on a table, some rotated a fraction of a degree; controls stay flat and are defined by 2px ink borders. A fixed fractal-noise grain (opacity 0.16, blended) sits over the whole page.

### Shadow Vocabulary
- **Sheet on table** (`box-shadow: 0 1px 1px rgb(0 0 0 / 0.08), 0 14px 28px -16px rgb(0 0 0 / 0.35)`): Every printed component page.
- **Loose leaf** (`box-shadow: 0 10px 22px -16px rgb(0 0 0 / 0.4)`): Do/Don't cards and checklist items (a lighter variant, `0 8px 18px -14px`).
- **Held up** (`box-shadow: 0 30px 70px -20px rgb(0 0 0 / 0.55)`): The index dialog, over a 45% ink scrim with 3px blur.
- **Floating** (`box-shadow: 0 10px 24px -10px rgb(0 0 0 / 0.5)`): The mobile Index button only.
- **Focus ring** (`box-shadow: 0 0 0 3px stock, 0 0 0 6px ink`): Every focusable element, a stock gap then an ink ring.

### Named Rules
**The Paper Not Panels Rule.** Only paper objects (pages, cards, the index sheet) cast shadows; buttons, chips and fields never do, except the floating mobile Index button that hovers over content.

**The Halftone Rule.** Ink screens are drawn, not tiled: dot radius is tone times pitch times 0.62, with tone falling from the centre as (1 - d)^1.35 and dots under 0.35px dropped. Pink prints at 15° on an 11px pitch, blue at 75° on a 9px pitch (blue plate at 0.6 opacity), both through `var(--blend)`, redrawn on resize and theme change. The centerfold carries a third plate from the same drawing routine: Riso Medium Blue fixed at #0078bf in both themes (the centerfold is always pink paper), 75° on a 10px pitch, multiply at 0.55 opacity, bleeding off its top-left corner.

**The Small Tilt Rule.** Rotation stays under half a degree for sheets (-0.35deg, 0.3deg on alternating pages, 700px and up) and only stamps tilt further (-4deg, 3deg).

## Shapes

Two shape families, never mixed on one object. Paper is square: pages, the centerfold, Do/Don't cards and checklist items have no radius. Controls are pills: buttons, format chips, nav links, the find field, index field, TOC items and spread index chips all use a full 999px radius, with circles for the close button and checklist ticks. In between sit a few small, functional radii: 4px stamps and inline code, 6px key caps and example frames, 10px code files and dialog rows, 12px top-only shelf tabs, 18px for the index dialog.

Strokes are print rules: 2px solid ink for structure, 2px dashed for perforations and guide chapter breaks, 2px dotted for leaders and soft dividers, 3px pink for preview frames, 8px colored top bands on Do (blue) and Don't (pink).

## Components

### Buttons
Confident printed pills; color says what they do.
- **Shape:** full pill (999px).
- **Primary (blue):** blue fill, on-blue text, 800 weight. "Open the issue" on the cover is the large form (56px tall, 22px display weight); "Tear out" on each page is 46px. Hover on the cover action tilts it (-2deg, scale 1.03).
- **Pink:** the copy button and the Index fab, pink fill with ink-black text; on success the copy button turns to code-ink white.
- **Outline:** 2px ink border, transparent fill, label weight; hover washes to soft gray. Used for the black-stock toggle and unselected format chips.
- **Donate:** the pink pill again at the tear-out size (46px, 0 20px, 800), ink-black text, a line-drawn coffee cup; hover tilts it -2deg like the cover action. It lives only inside the free note.
- **Expanded state:** an open tear-out button swaps to transparent with an inset 2px ink ring.

### Chips
- **Format chips ("inks"):** a radiogroup of outline pills; the checked chip fills Fluoro Pink with ink-black text and a pink border.
- **Spread index chips:** sheet-white pills with a 1.5px ink border and a blue-text count; hover fills pink. On the centerfold they invert to ink on hover.

### Cards / Containers
- **Printed page:** square sheet-white page, 26px 28px 22px padding, sheet-on-table shadow, alternating fractional tilt. Head row: title left, blue-text folio ("p. 12") right. Below: description, a 3px pink preview frame over a soft dot grid, a "Why it works" note, pink-dotted meta line, then the tear-out button.
- **Tear-off:** opens below a 2px dashed perforation with a scissors mark, on stock, bleeding to the page edge; it animates in by unclipping downward with a slight -1.5deg tilt.
- **Code file:** code-bg block, 10px radius, file-name header in mono, pink copy pill.

### Inputs / Fields
- **Find field:** a button styled as a pill field (44px, sheet fill, 2px ink border) with a search icon and a mono key-cap hint; it opens the index.
- **Index field:** 52px stock pill with a 2px ink border; on focus-within it gains a 3px pink ring. Caret is pink.
- **Checkbox:** native checkbox with pink accent; checklist ticks are 24px ink-ringed circles that fill pink and strike their label through in pink.

### Navigation
- **Masthead:** sticky, stock ground, 2px ink bottom rule; logotype at 800 with "UI" in Fluoro Pink in both themes (a logotype, exempt from text contrast); nav links are pills, current page filled ink with stock text. After the issue line sits the optional "Chip in" link: a 38px pill with a 2px dashed ink border (a coupon cut line) and a coffee-cup line icon; hover turns the border solid over a soft-gray wash. It shrinks to a 38px icon-only circle at 1000px and below and is dropped at 420px and below. The same masthead, chip included, heads the guide.
- **Shelf:** horizontally scrolling tabs with 12px top corners; the current tab is a sheet-white tab with an ink border and a 4px pink top band.
- **Thumb index:** vertical uppercase tabs cut into the right edge (10px outer corners), each tab a solid ink: odd tabs blue with on-blue text, even tabs pink with ink-black text. The current tab is ink with stock text and steps out 12px. No side stripes.
- **Index dialog:** a printed index sheet with combobox search, uppercase blue-text group headings over dotted rules, and pink-filled selected rows. The current collection carries a small "You are here" ink pill (12px, 800, stock text); on a selected row it inverts to pink text on ink.

### Overprint Headline (signature)
Every major heading is set twice: a pink layer and a blue layer offset by about 0.04em by 0.03em, both blended. On hover or focus of its page the blue layer slides further out of register (0.07em, -0.04em); arriving at a page from navigation plays a 1.1s misregister-and-snap with a pink outline flash. All of it switches off under reduced motion.

### Free Note and Donation
A plain closing note on stock after the back page, opened by a dashed perforation within the measure: an 800-weight single-ink heading, one body paragraph stating the commitment, and an optional second line in Second Ink (16px) that ends in the pink Donate pill. Every donation element (the note's second line, the masthead Chip in on both pages) carries a `data-donate` marker and stays hidden, with no layout gap, until a donation URL is configured; the "free forever" paragraph shows regardless.

**The Quiet Hat Rule.** Support is a hat by the door, never a hand on the shoulder. Donation lives in exactly two places, the masthead chip and the free note, is styled as an ordinary in-world control, and is never a popup, modal, sticky banner, gate, countdown or interruption of a part, its code or the guide. With no URL configured it does not render at all.

### Stamps (guide)
Do and Don't labels are rubber stamps: uppercase 800 display, 2.5px border in the text color, 4px radius, rotated -4deg (Do, blue-text) and 3deg (Don't, Deep Pink).

### The Product's Own Tokens
The components the zine sells are styled by a separate, neutral `--ui-*` token set (system-ui font, white and zinc surfaces, indigo #4f46e5 accent, 12px and 8px radii, soft shadows, indigo focus ring, with a dark variant). That set lives in the shipped `tokens.css` and renders only inside preview iframes, code listings and guide examples. It is the product, not the site's world: never style zine chrome with `--ui-*`, and never restyle the components into zine colors.

## Do's and Don'ts

### Do:
- **Do** route every overprint through `mix-blend-mode: var(--blend)` so the black-stock theme screens where the light theme multiplies.
- **Do** set ink-black (#1b1b20) text on every pink fill, in both themes.
- **Do** use pills for controls and square paper for content; keep radii from the `rounded` scale.
- **Do** draw structure with 2px ink rules, perforations with 2px dashes, leaders with 2px dots.
- **Do** keep sheet tilts under half a degree and gate them to 700px and wider.
- **Do** use the doubled two-ink treatment for display and spread headings, with the real text exposed once to assistive tech.
- **Do** give every motion (misregister, tear, dialog, thumbs) a `prefers-reduced-motion` fallback.
- **Do** draw ink halftones as tone-modulated screens at the plate angles (pink 15°, blue 75°).
- **Do** drive sticky offsets from the measured `--nav-h`, never a hard-coded pixel value.
- **Do** draw ornament such as staples and folds as flat ink line art.
- **Do** mark every donation element with `data-donate` and keep it hidden until a donation URL exists; state "free" as the commitment, with support as an optional aside.

### Don't:
- **Don't** introduce a third identity hue or a second display typeface; color texture comes from halftone dot screens and grain.
- **Don't** set Fluoro Pink (#ff48b0) as standalone text on light stock; use Deep Pink or a pink highlighter fill instead (overprint headlines and the logotype excepted).
- **Don't** put white text on pink.
- **Don't** give in-flow controls cast shadows or give paper sheets rounded corners.
- **Don't** let `--ui-*` product tokens leak into site chrome.
- **Don't** stand in a uniform CSS dot grid for an ink halftone screen.
- **Don't** use metallic or photographic gradients for print objects; they are ink drawings.
- **Don't** set body or label copy in JetBrains Mono; mono is for code only.
- **Don't** ask for support through popups, modals, sticky banners, gates or anything placed between a visitor and a part, its code or the guide.
