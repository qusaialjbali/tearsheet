# Contributing to Tearsheet

Thanks for helping. Everything here is given away under MIT-0, so anything you contribute is too: people can copy it into any project without credit.

## Ways to help

- **Request a component** with the "Component request" issue form.
- **Report a bug** (something broken, inaccessible or wrong in one of the four formats) with the "Bug report" form.
- **Ask or share** in [Discussions](https://github.com/qusaialjbali/tearsheet/discussions).
- **Send a pull request** for a fix or a new component.

## Run it locally

No build tools are needed to look at the site: serve the folder with any static server and open `zine/index.html`.

```sh
npx serve .          # or: python -m http.server
npm install          # only needed for the checks below
npm run build        # rebuilds the guide, the API, llms.txt and the part pages
npm run check        # compiles every component in every format, then runs axe
```

The accessibility check needs a browser: `npx playwright install chromium` (or it will use an installed Chrome or Edge).

## How a component is written

Each component is one entry in a file under `shared/` (`components*.js` for Issue 01):

```js
{
  id: 'hold-to-confirm',          // unique, kebab-case; becomes the file and URL name
  name: 'Hold to confirm',
  category: 'Experimental',       // the collection ("Experimental" is printed as "Weird")
  description: 'One sentence a person scanning the list would understand.',
  notes: 'Why it is built this way: the accessibility and behaviour decisions.',
  root: '.hold',                  // selector of the single root element, if it has setup
  html: `<div class="hold">…</div>`,
  css: `.hold { … }`,
  setup: `/* body of function setup(root) { … } */`,
}
```

- **Write it once.** React, Vue and Svelte versions are generated from `html`, `css` and `setup` by `shared/codegen.js`. Only add a `react`, `vue` or `svelte` override when generation truly cannot cope.
- **Use the tokens.** Colours, radii, shadows and focus rings come from `--ui-*` custom properties, so the component follows light, dark and any brand.
- **One root element** when there is a `setup`, and `setup` may return a cleanup function.
- **Prefix your class names** with something short and unique to the component (`.hold-…`), since all components share one page in the zine.

## The bar every component has to clear

- Works with a keyboard alone, with visible focus.
- Has real labels and the right roles; screen readers hear something sensible.
- Passes `npm run check`: compiles in all four formats, passes its own `tearsheet audit`, has no axe violations in light or dark, keeps contrast with tokens fitted to a hard brand colour, and fits a 390px phone right-to-left with Arabic text and with 40% longer text.
- Uses logical CSS where direction matters (`inset-inline-end`, `margin-inline-start`, `text-align: start`), so it mirrors in right-to-left languages.
- Respects `prefers-reduced-motion`. Anything that moves on its own for more than five seconds has a pause control.
- Looks right at 320px wide and in dark mode.
- Content is visible without JavaScript wherever that is possible.

## Before you open a pull request

1. `npm run build` and commit the generated files (CI fails if they are stale), plus `api/receipts.json` from `npm run check:a11y`.
2. `npm run check`.
3. If you changed CSS or JS that the site loads, bump its `?v=` number where the pages link it.
