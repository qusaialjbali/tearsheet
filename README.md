# Tearsheet

A free library of 98 interface components, printed as a risograph zine. Every component comes in **HTML + CSS, React, Vue and Svelte**, with a note on why it is built the way it is, plus a web design guide of dos and don'ts.

Free forever. MIT-0: copy, change and ship anything, commercially or not, with no attribution.

## For AI agents

Three ways to hand the library to an AI coding assistant. All serve the same components, tokens and design rules.

**A link.** Any agent that can read a web page can start from [llms.txt](https://qusaialjbali.github.io/tearsheet/llms.txt). Behind it: [api/components.json](https://qusaialjbali.github.io/tearsheet/api/components.json) and every component as `api/components/<id>.md` or `.json`, in all four formats.

**A command.** Node 18+, nothing to install ([tearsheet on npm](https://www.npmjs.com/package/tearsheet)):

```sh
npx tearsheet list
npx tearsheet search date
npx tearsheet add modal tabs --format react
npx tearsheet guide forms
```

`add` detects React, Vue or Svelte from package.json (plain HTML otherwise), writes each component into its own folder plus `tokens.css`, and never overwrites a file unless you pass `--force`.

**An MCP server.** Add this to your editor or agent app's MCP settings:

```json
{
  "mcpServers": {
    "tearsheet": {
      "command": "npx",
      "args": ["-y", "tearsheet", "mcp"]
    }
  }
}
```

Tools: `search_components`, `list_components`, `get_component` (any format), `get_design_tokens`, `get_design_rules`. Some apps name the top-level key differently (for example `servers`). On Windows, if `npx` is not found, use `"command": "cmd"` and put `"/c", "npx"` at the start of `args`.

## What makes it different

- **Receipts.** Every part publishes the evidence from CI: axe in light and dark, the tightest text contrast, the tab order, the accessibility tree, and what moves under reduced motion. See the receipt under any part, or [api/receipts.json](https://qusaialjbali.github.io/tearsheet/api/receipts.json).
- **Right-to-left and long text.** Every part is checked on a 390px phone flipped to right-to-left with Arabic sample text, and with every string 40% longer. Try both with the toggles above any preview.
- **Brand fitter.** One colour in, light and dark tokens out, moved only as far as WCAG AA needs: [the fitter](https://qusaialjbali.github.io/tearsheet/zine/fitter.html), `npx tearsheet tokens --accent "#e11d48"`, or the MCP tool.
- **Audit.** `npx tearsheet audit src` (or the MCP tool `review_ui`) checks your own UI code against the design guide: missing labels and alt text, clickable divs, icon buttons with no name, removed focus outlines, blocked zoom, motion without reduced-motion, and more. Each finding links to the rule it breaks. The library passes its own audit in CI.
- **Diff.** Every file carries a one-line stamp. `npx tearsheet diff` finds copied parts in a project and shows what changed upstream since you took them.

## What's inside

| Path | What it is |
| --- | --- |
| `index.html` | Redirects to the zine |
| `zine/index.html` | The component library (the zine) |
| `zine/guide.html` | The design guide (built, see below) |
| `zine/zine.css`, `zine/zine.js` | The zine's look and navigation |
| `shared/components*.js` | Every component's HTML, CSS and behaviour |
| `shared/codegen.js` | HTML → React / Vue / Svelte conversion, shared by the site, CLI and API |
| `shared/core.js` | Live previews, copy and theme on the site |
| `bin/`, `lib/` | The command-line tool and the MCP server |
| `build-api.js` | Builds `llms.txt` and the JSON/Markdown API in `api/` |
| `build-pages.js` | Builds one static page per component in `zine/parts/` and `sitemap.xml` |
| `tools/` | Checks (`check-code.js`, and `check-a11y.js`, which also writes `api/receipts.json`), head tags and the social card (`og.html` → `og.png`) |
| `lib/audit.js`, `lib/diff.js` | The audit rules and the line diff behind `tearsheet audit` and `tearsheet diff` |
| `shared/fitter.js`, `shared/stress.js` | Brand-fitting colour maths, and the RTL / Arabic / long-text rewrites used by the toggles and by CI |
| `zine/fitter.html` | The brand fitter page |
| `llms.txt`, `api/` | Generated for agents (do not edit by hand) |
| `shared/site-config.js` | Site settings you edit (the optional donation link) |
| `shared/guide-body.html` | Guide content |
| `build-guides.js` | Builds `zine/guide.html` from the guide content |
| `PRODUCT.md`, `DESIGN.md` | Product intent and the design system |

No build step and no dependencies: it is plain HTML, CSS and JavaScript.

## Run it locally

Any static server works, for example:

```sh
python -m http.server 5173
```

Then open http://localhost:5173.

## Common changes

- **Donation link:** set `DONATE_URL` in `shared/site-config.js`. While it is empty, the donation links stay hidden.
- **Guide text:** edit `shared/guide-body.html`, then run `npm run build`.
- **Receipts:** `npm run check:a11y` rewrites `api/receipts.json`; commit it with the change so the published evidence matches.
- **After changing components or the guide:** run `npm run build` so the guide page, `llms.txt`, `api/` and the part pages stay in step, then `npm run check` (CI runs both on every push).
- **Social card:** edit `tools/og.html`, then `npm run og` to re-render `og.png`.
- **Add a component:** add an entry to one of the `shared/components*.js` files. Interactive components put their behaviour in `setup` (the body of `function setup(root)`) and name their root element in `root`; React, Vue and Svelte versions are generated from it.
- **After changing CSS or JS:** bump the `?v=` number on the links in `zine/index.html` and `build-guides.js` so visitors get the new files instead of cached ones.

## Contributing

Requests, bug reports and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for how components are written and the bar each one has to clear.
