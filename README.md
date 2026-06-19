<div align="center">

# markdown-to-html

**Convert Markdown to standalone HTML — zero dependencies, three themes, live reload.**

[![License](https://img.shields.io/badge/license-MIT-brightgreen?labelColor=0B0A09)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?labelColor=0B0A09)](package.json)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?labelColor=0B0A09)](package.json)

</div>

## Install

```bash
npx github:NickCirv/markdown-to-html <file.md>
```

Or install globally:

```bash
npm install -g github:NickCirv/markdown-to-html
```

## Usage

```bash
md2html README.md                        # Convert to stdout
md2html README.md -o README.html         # Write to file
md2html README.md --theme dark --toc     # Dark theme + table of contents
md2html README.md --serve 3000          # Serve with live reload
md2html ./docs                           # Convert all .md files in a directory
```

| Flag | Description |
|------|-------------|
| `-o, --output <file>` | Write output to file instead of stdout |
| `--theme <name>` | `github` (default), `dark`, `light` |
| `--title <text>` | HTML page title (default: first h1) |
| `--toc` | Generate table of contents |
| `--no-highlight` | Skip language labels on code blocks |
| `--watch` | Watch file and rebuild on change |
| `--serve [port]` | Serve with live reload (default: 3000) |

## What it does

Converts Markdown to a fully standalone HTML file with all CSS inlined — no CDN, no external requests, no build step. Ships three themes (GitHub light, GitHub dark, clean serif) and a built-in live-reload server for editing docs in the browser. Handles headings, tables, task lists, footnotes, nested lists, code blocks with language labels, and raw HTML passthrough. Uses only Node.js built-in modules.

---

<sub>Zero dependencies · Node ≥18 · MIT · by <a href="https://github.com/NickCirv">NickCirv</a></sub>
