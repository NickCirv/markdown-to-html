#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── CSS THEMES ────────────────────────────────────────────────────────────────

const THEMES = {
  github: `
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #24292f; background: #ffffff; max-width: 860px; margin: 0 auto; padding: 32px 24px; }
    h1,h2,h3,h4,h5,h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; color: #1f2328; }
    h1 { font-size: 2em; border-bottom: 1px solid #d0d7de; padding-bottom: .3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #d0d7de; padding-bottom: .3em; }
    h3 { font-size: 1.25em; }
    h4 { font-size: 1em; }
    h5 { font-size: .875em; }
    h6 { font-size: .85em; color: #57606a; }
    p { margin-top: 0; margin-bottom: 16px; }
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    code { font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace; font-size: 85%; background: rgba(175,184,193,.2); border-radius: 6px; padding: .2em .4em; }
    pre { background: #f6f8fa; border-radius: 6px; padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; margin-bottom: 16px; }
    pre code { background: transparent; padding: 0; font-size: 100%; border-radius: 0; }
    blockquote { margin: 0 0 16px; padding: 0 1em; color: #57606a; border-left: .25em solid #d0d7de; }
    blockquote > :first-child { margin-top: 0; }
    blockquote > :last-child { margin-bottom: 0; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 16px; display: block; overflow: auto; }
    table th { font-weight: 600; }
    table th, table td { padding: 6px 13px; border: 1px solid #d0d7de; }
    table tr { background: #ffffff; border-top: 1px solid #d0d7de; }
    table tr:nth-child(2n) { background: #f6f8fa; }
    ul, ol { margin-top: 0; margin-bottom: 16px; padding-left: 2em; }
    li { margin-bottom: 4px; }
    li > ul, li > ol { margin-top: 4px; margin-bottom: 0; }
    hr { height: .25em; padding: 0; margin: 24px 0; background: #d0d7de; border: 0; }
    img { max-width: 100%; }
    .task-list-item { list-style: none; margin-left: -1.6em; }
    .task-list-item input { margin-right: .5em; }
    .footnotes { font-size: 85%; border-top: 1px solid #d0d7de; margin-top: 32px; padding-top: 16px; }
    .toc { background: #f6f8fa; border: 1px solid #d0d7de; border-radius: 6px; padding: 16px 24px; margin-bottom: 24px; }
    .toc h2 { font-size: 1em; margin-top: 0; margin-bottom: 8px; }
    .toc ul { margin-bottom: 0; }
    .lang-label { display: inline-block; background: #d0d7de; color: #57606a; font-size: 75%; padding: 2px 8px; border-radius: 6px 6px 0 0; font-family: ui-monospace, monospace; }
  `,
  dark: `
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #e6edf3; background: #0d1117; max-width: 860px; margin: 0 auto; padding: 32px 24px; }
    h1,h2,h3,h4,h5,h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; color: #f0f6fc; }
    h1 { font-size: 2em; border-bottom: 1px solid #30363d; padding-bottom: .3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #30363d; padding-bottom: .3em; }
    h3 { font-size: 1.25em; }
    h4 { font-size: 1em; }
    h5 { font-size: .875em; }
    h6 { font-size: .85em; color: #8b949e; }
    p { margin-top: 0; margin-bottom: 16px; }
    a { color: #58a6ff; text-decoration: none; }
    a:hover { text-decoration: underline; }
    code { font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace; font-size: 85%; background: rgba(110,118,129,.4); border-radius: 6px; padding: .2em .4em; }
    pre { background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; margin-bottom: 16px; }
    pre code { background: transparent; padding: 0; font-size: 100%; border-radius: 0; }
    blockquote { margin: 0 0 16px; padding: 0 1em; color: #8b949e; border-left: .25em solid #3d444d; }
    blockquote > :first-child { margin-top: 0; }
    blockquote > :last-child { margin-bottom: 0; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 16px; display: block; overflow: auto; }
    table th { font-weight: 600; }
    table th, table td { padding: 6px 13px; border: 1px solid #3d444d; }
    table tr { background: #0d1117; border-top: 1px solid #3d444d; }
    table tr:nth-child(2n) { background: #161b22; }
    ul, ol { margin-top: 0; margin-bottom: 16px; padding-left: 2em; }
    li { margin-bottom: 4px; }
    li > ul, li > ol { margin-top: 4px; margin-bottom: 0; }
    hr { height: .25em; padding: 0; margin: 24px 0; background: #30363d; border: 0; }
    img { max-width: 100%; }
    .task-list-item { list-style: none; margin-left: -1.6em; }
    .task-list-item input { margin-right: .5em; }
    .footnotes { font-size: 85%; border-top: 1px solid #30363d; margin-top: 32px; padding-top: 16px; }
    .toc { background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 16px 24px; margin-bottom: 24px; }
    .toc h2 { font-size: 1em; margin-top: 0; margin-bottom: 8px; color: #f0f6fc; }
    .toc ul { margin-bottom: 0; }
    .lang-label { display: inline-block; background: #3d444d; color: #8b949e; font-size: 75%; padding: 2px 8px; border-radius: 6px 6px 0 0; font-family: ui-monospace, monospace; }
  `,
  light: `
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: Georgia, 'Times New Roman', serif; font-size: 17px; line-height: 1.7; color: #2d2d2d; background: #fafafa; max-width: 740px; margin: 0 auto; padding: 40px 28px; }
    h1,h2,h3,h4,h5,h6 { margin-top: 2em; margin-bottom: .75em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 700; line-height: 1.3; color: #111; }
    h1 { font-size: 2.2em; }
    h2 { font-size: 1.6em; }
    h3 { font-size: 1.3em; }
    h4 { font-size: 1.1em; }
    h5 { font-size: 1em; }
    h6 { font-size: .9em; color: #666; }
    p { margin-top: 0; margin-bottom: 1.2em; }
    a { color: #1a66ff; text-decoration: underline; text-underline-offset: 2px; }
    a:hover { color: #003ecc; }
    code { font-family: 'Courier New', Courier, monospace; font-size: 87%; background: #f0f0f0; border-radius: 3px; padding: .15em .35em; }
    pre { background: #f5f5f5; border-left: 4px solid #ccc; padding: 16px 20px; overflow: auto; font-size: 87%; line-height: 1.5; margin-bottom: 1.5em; border-radius: 0 4px 4px 0; }
    pre code { background: transparent; padding: 0; font-size: 100%; }
    blockquote { margin: 0 0 1.2em; padding: 0 0 0 1.2em; color: #555; border-left: 3px solid #bbb; font-style: italic; }
    blockquote > :first-child { margin-top: 0; }
    blockquote > :last-child { margin-bottom: 0; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 1.5em; }
    table th { font-weight: 700; background: #f0f0f0; }
    table th, table td { padding: 8px 14px; border: 1px solid #ddd; }
    table tr:nth-child(2n) { background: #f9f9f9; }
    ul, ol { margin-top: 0; margin-bottom: 1.2em; padding-left: 1.8em; }
    li { margin-bottom: 6px; }
    li > ul, li > ol { margin-top: 6px; margin-bottom: 0; }
    hr { margin: 2em 0; border: none; border-top: 2px solid #e0e0e0; }
    img { max-width: 100%; }
    .task-list-item { list-style: none; margin-left: -1.5em; }
    .task-list-item input { margin-right: .5em; }
    .footnotes { font-size: 87%; border-top: 2px solid #e0e0e0; margin-top: 2.5em; padding-top: 1em; }
    .toc { background: #f5f5f5; border: 1px solid #ddd; border-radius: 4px; padding: 16px 24px; margin-bottom: 2em; }
    .toc h2 { font-size: 1em; margin-top: 0; margin-bottom: 8px; }
    .toc ul { margin-bottom: 0; }
    .lang-label { display: inline-block; background: #e0e0e0; color: #555; font-size: 75%; padding: 2px 8px; border-radius: 3px 3px 0 0; font-family: monospace; }
  `
};

// ─── MARKDOWN PARSER ───────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseInline(text, noHighlight) {
  const slots = [];
  const slot = (html) => { slots.push(html); return `\x00S${slots.length - 1}\x00`; };

  // 1. Auto-links <url> and <email> — must come before raw HTML preservation
  text = text.replace(/<(https?:\/\/[^\s>]+)>/g, (_, url) => slot(`<a href="${url}">${url}</a>`));
  text = text.replace(/<([^@\s>]+@[^\s>]+\.[^\s>]+)>/g, (_, email) => slot(`<a href="mailto:${email}">${email}</a>`));

  // 2. Preserve raw HTML tags
  text = text.replace(/<[a-zA-Z/][^>]*>/g, (m) => slot(m));

  // 2. Inline code (preserve before escaping)
  text = text.replace(/`([^`]+)`/g, (_, c) => slot(`<code>${escapeHtml(c)}</code>`));

  // 3. Images ![alt](url) or ![alt](url "title") — before escaping
  text = text.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g, (_, alt, url, title) => {
    const t = title ? ` title="${escapeHtml(title)}"` : '';
    return slot(`<img src="${url}" alt="${escapeHtml(alt)}"${t}>`);
  });

  // 4. Links [text](url) or [text](url "title") — before escaping
  text = text.replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g, (_, txt, url, title) => {
    const t = title ? ` title="${escapeHtml(title)}"` : '';
    return slot(`<a href="${url}"${t}>${escapeHtml(txt)}</a>`);
  });

  // 5. Footnote references [^id]
  text = text.replace(/\[\^([^\]]+)\]/g, (_, id) =>
    slot(`<sup><a href="#fn-${id}" id="fnref-${id}">${id}</a></sup>`)
  );

  // 7. Escape remaining text
  text = escapeHtml(text);

  // 8. Bold + italic
  text = text.replace(/\*{3}(.+?)\*{3}/g, '<strong><em>$1</em></strong>');
  text = text.replace(/_{3}(.+?)_{3}/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*{2}(.+?)\*{2}/g, '<strong>$1</strong>');
  text = text.replace(/_{2}(.+?)_{2}/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
  text = text.replace(/_([^_\n]+?)_/g, '<em>$1</em>');

  // 9. Strikethrough
  text = text.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // 10. Hard line breaks (2 spaces + newline)
  text = text.replace(/  \n/g, '<br>\n');

  // 11. Restore all slots
  text = text.replace(/\x00S(\d+)\x00/g, (_, i) => slots[parseInt(i)]);

  return text;
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function parseMarkdown(md, opts = {}) {
  const { noHighlight = false, toc: genToc = false } = opts;
  const lines = md.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const headings = [];
  const footnotes = {};
  const output = [];

  let i = 0;
  let inCodeBlock = false;
  let codeLang = '';
  let codeLines = [];
  let inList = false;
  let listStack = [];
  let inBlockquote = false;
  let bqLines = [];
  let inTable = false;
  let tableRows = [];
  let tableAlign = [];
  let inParagraph = false;
  let paraLines = [];

  function flushParagraph() {
    if (!inParagraph || paraLines.length === 0) return;
    inParagraph = false;
    const content = paraLines.join('\n');
    paraLines = [];
    output.push(`<p>${parseInline(content, noHighlight)}</p>`);
  }

  function flushList() {
    if (!inList) return;
    while (listStack.length > 0) {
      const { tag } = listStack.pop();
      output.push(`</${tag}>`);
    }
    inList = false;
  }

  function flushBlockquote() {
    if (!inBlockquote) return;
    inBlockquote = false;
    const inner = parseMarkdown(bqLines.join('\n'), { noHighlight });
    bqLines = [];
    output.push(`<blockquote>${inner}</blockquote>`);
  }

  function flushTable() {
    if (!inTable) return;
    inTable = false;
    let html = '<table>\n';
    tableRows.forEach((row, ri) => {
      if (ri === 1) return; // separator row
      const tag = ri === 0 ? 'th' : 'td';
      const cells = row.split('|').slice(1, -1);
      html += '<tr>';
      cells.forEach((cell, ci) => {
        const align = tableAlign[ci] ? ` style="text-align:${tableAlign[ci]}"` : '';
        html += `<${tag}${align}>${parseInline(cell.trim(), noHighlight)}</${tag}>`;
      });
      html += '</tr>\n';
    });
    html += '</table>';
    tableRows = [];
    tableAlign = [];
    output.push(html);
  }

  function getListIndent(line) {
    const m = line.match(/^(\s*)([-*+]|\d+\.) /);
    return m ? m[1].length : -1;
  }

  function getListType(line) {
    return /^\s*\d+\. /.test(line) ? 'ol' : 'ul';
  }

  function renderListItem(line) {
    // Task list
    const taskMatch = line.match(/^\s*[-*+] \[([ xX])\] (.*)/);
    if (taskMatch) {
      const checked = taskMatch[1].toLowerCase() === 'x' ? ' checked' : '';
      return `<li class="task-list-item"><input type="checkbox"${checked} disabled> ${parseInline(taskMatch[2], noHighlight)}</li>`;
    }
    const content = line.replace(/^\s*([-*+]|\d+\.) /, '');
    return `<li>${parseInline(content, noHighlight)}</li>`;
  }

  while (i < lines.length) {
    const line = lines[i];

    // Footnote definitions [^id]: text
    const fnMatch = line.match(/^\[\^([^\]]+)\]: (.*)/);
    if (fnMatch) {
      footnotes[fnMatch[1]] = fnMatch[2];
      i++;
      continue;
    }

    // Code fence
    if (/^```/.test(line)) {
      if (inCodeBlock) {
        // Close code block
        inCodeBlock = false;
        const escapedCode = codeLines.join('\n').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const langClass = codeLang ? ` class="language-${codeLang}"` : '';
        const label = (!noHighlight && codeLang) ? `<div class="lang-label">${codeLang}</div>` : '';
        output.push(`${label}<pre><code${langClass}>${escapedCode}</code></pre>`);
        codeLines = [];
        codeLang = '';
      } else {
        flushParagraph(); flushList(); flushBlockquote(); flushTable();
        inCodeBlock = true;
        codeLang = line.slice(3).trim().split(/\s/)[0];
      }
      i++;
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      i++;
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      flushParagraph();
      flushList();
      flushBlockquote();
      flushTable();
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6}) (.+)/);
    if (headingMatch) {
      flushParagraph(); flushList(); flushBlockquote(); flushTable();
      const level = headingMatch[1].length;
      const text = headingMatch[2].replace(/\s+#+\s*$/, '');
      const id = slugify(text);
      headings.push({ level, text, id });
      output.push(`<h${level} id="${id}">${parseInline(text, noHighlight)}</h${level}>`);
      i++;
      continue;
    }

    // Setext headings
    if (i + 1 < lines.length && /^={3,}$/.test(lines[i + 1].trim())) {
      flushParagraph(); flushList(); flushBlockquote(); flushTable();
      const id = slugify(line);
      headings.push({ level: 1, text: line, id });
      output.push(`<h1 id="${id}">${parseInline(line, noHighlight)}</h1>`);
      i += 2;
      continue;
    }

    if (i + 1 < lines.length && /^-{3,}$/.test(lines[i + 1].trim()) && line.trim() !== '') {
      flushParagraph(); flushList(); flushBlockquote(); flushTable();
      const id = slugify(line);
      headings.push({ level: 2, text: line, id });
      output.push(`<h2 id="${id}">${parseInline(line, noHighlight)}</h2>`);
      i += 2;
      continue;
    }

    // Horizontal rule
    if (/^(\*{3,}|-{3,}|_{3,})\s*$/.test(line.trim()) && !/^\s*[-*+] /.test(line)) {
      flushParagraph(); flushList(); flushBlockquote(); flushTable();
      output.push('<hr>');
      i++;
      continue;
    }

    // Blockquote
    if (/^> /.test(line) || line === '>') {
      flushParagraph(); flushList(); flushTable();
      inBlockquote = true;
      bqLines.push(line.replace(/^> ?/, ''));
      i++;
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
    }

    // Tables
    if (/^\|/.test(line)) {
      flushParagraph(); flushList();
      if (!inTable) { inTable = true; tableRows = []; tableAlign = []; }
      if (tableRows.length === 1 && /^\|[\s\-:|]+\|/.test(line)) {
        // Parse alignment row
        const cols = line.split('|').slice(1, -1);
        tableAlign = cols.map(c => {
          c = c.trim();
          if (/^:.*:$/.test(c)) return 'center';
          if (/^:/.test(c)) return 'left';
          if (/:$/.test(c)) return 'right';
          return '';
        });
      }
      tableRows.push(line);
      i++;
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Lists
    const listIndent = getListIndent(line);
    if (listIndent >= 0) {
      flushParagraph(); flushBlockquote(); flushTable();
      const type = getListType(line);

      if (!inList) {
        inList = true;
        listStack = [{ tag: type, indent: listIndent }];
        output.push(`<${type}>`);
      } else {
        const current = listStack[listStack.length - 1];
        if (listIndent > current.indent) {
          listStack.push({ tag: type, indent: listIndent });
          output.push(`<${type}>`);
        } else if (listIndent < current.indent) {
          while (listStack.length > 1 && listStack[listStack.length - 1].indent > listIndent) {
            const { tag } = listStack.pop();
            output.push(`</${tag}>`);
          }
        }
      }
      output.push(renderListItem(line));
      i++;
      continue;
    } else if (inList && /^\s+/.test(line)) {
      // Continuation of list item (indented content)
      output.push(parseInline(line.trim(), noHighlight));
      i++;
      continue;
    } else if (inList) {
      flushList();
    }

    // Raw HTML passthrough
    if (/^<[a-zA-Z]/.test(line.trim()) || /^<\/[a-zA-Z]/.test(line.trim())) {
      flushParagraph(); flushList(); flushBlockquote(); flushTable();
      output.push(line);
      i++;
      continue;
    }

    // Paragraph
    inParagraph = true;
    paraLines.push(line);
    i++;
  }

  // Flush remaining
  flushParagraph();
  flushList();
  flushBlockquote();
  flushTable();

  // Footnotes section
  if (Object.keys(footnotes).length > 0) {
    let fnHtml = '<div class="footnotes"><hr><ol>';
    for (const [id, def] of Object.entries(footnotes)) {
      fnHtml += `<li id="fn-${id}">${parseInline(def, noHighlight)} <a href="#fnref-${id}">↩</a></li>`;
    }
    fnHtml += '</ol></div>';
    output.push(fnHtml);
  }

  const body = output.join('\n');

  if (genToc && headings.length > 0) {
    const tocItems = headings.map(h => {
      const indent = '  '.repeat(h.level - 1);
      return `${indent}<li><a href="#${h.id}">${escapeHtml(h.text)}</a></li>`;
    }).join('\n');
    const tocHtml = `<nav class="toc"><h2>Table of Contents</h2><ul>\n${tocItems}\n</ul></nav>\n`;
    return tocHtml + body;
  }

  return body;
}

// ─── HTML WRAPPER ──────────────────────────────────────────────────────────────

function wrapHtml(content, opts = {}) {
  const { title = 'Document', theme = 'github', liveReload = false } = opts;
  const css = THEMES[theme] || THEMES.github;
  const liveReloadScript = liveReload ? `
  <script>
    const es = new EventSource('/__reload');
    es.onmessage = () => location.reload();
    es.onerror = () => { es.close(); setTimeout(() => location.reload(), 2000); };
  </script>` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>${css}</style>
</head>
<body>
${content}
${liveReloadScript}
</body>
</html>`;
}

function extractTitle(md, fallback = 'Document') {
  const m = md.match(/^#+ (.+)/m);
  return m ? m[1].replace(/\*+/g, '').trim() : fallback;
}

// ─── FILE OPERATIONS ───────────────────────────────────────────────────────────

function convertFile(inputPath, opts = {}) {
  const md = fs.readFileSync(inputPath, 'utf8');
  const title = opts.title || extractTitle(md, path.basename(inputPath, '.md'));
  const body = parseMarkdown(md, { noHighlight: opts.noHighlight, toc: opts.toc });
  return wrapHtml(body, { title, theme: opts.theme, liveReload: opts.liveReload });
}

function convertDir(dirPath, opts = {}) {
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
  if (files.length === 0) {
    console.error(`No .md files found in ${dirPath}`);
    return;
  }
  for (const file of files) {
    const inputPath = path.join(dirPath, file);
    const outputPath = path.join(dirPath, file.replace(/\.md$/, '.html'));
    const html = convertFile(inputPath, opts);
    fs.writeFileSync(outputPath, html, 'utf8');
    console.error(`  ${file} → ${path.basename(outputPath)}`);
  }
  console.error(`Converted ${files.length} file(s) in ${dirPath}`);
}

// ─── WATCH ────────────────────────────────────────────────────────────────────

function watchFile(inputPath, outputPath, opts) {
  let debounce = null;
  const rebuild = () => {
    try {
      const html = convertFile(inputPath, opts);
      if (outputPath) {
        fs.writeFileSync(outputPath, html, 'utf8');
        console.error(`[watch] rebuilt → ${outputPath}`);
      } else {
        process.stdout.write(html);
      }
    } catch (e) {
      console.error(`[watch] error: ${e.message}`);
    }
  };
  rebuild();
  fs.watch(inputPath, () => {
    clearTimeout(debounce);
    debounce = setTimeout(rebuild, 100);
  });
  console.error(`[watch] watching ${inputPath}`);
}

// ─── SERVE ────────────────────────────────────────────────────────────────────

function serveFile(inputPath, port, opts) {
  const sseClients = new Set();
  let cachedHtml = '';

  const rebuild = () => {
    try {
      cachedHtml = convertFile(inputPath, { ...opts, liveReload: true });
      for (const res of sseClients) {
        try { res.write('data: reload\n\n'); } catch {}
      }
    } catch (e) {
      console.error(`[serve] build error: ${e.message}`);
    }
  };

  rebuild();

  let debounce = null;
  fs.watch(inputPath, () => {
    clearTimeout(debounce);
    debounce = setTimeout(rebuild, 120);
  });

  const server = http.createServer((req, res) => {
    if (req.url === '/__reload') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });
      res.write(':\n\n');
      sseClients.add(res);
      req.on('close', () => sseClients.delete(res));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(cachedHtml);
  });

  server.listen(port, '127.0.0.1', () => {
    console.error(`[serve] http://localhost:${port}  (watching ${path.basename(inputPath)})`);
  });
}

// ─── HELP ────────────────────────────────────────────────────────────────────

function printHelp() {
  console.log(`
markdown-to-html (md2html) — Convert Markdown to beautiful standalone HTML
Zero dependencies. Pure Node.js built-ins only.

USAGE
  md2html <file.md>                     Convert to HTML, output to stdout
  md2html <file.md> -o <file.html>      Write to file
  md2html <directory>                   Convert all .md files in directory

OPTIONS
  -o, --output <file>      Write output to file instead of stdout
  --theme <name>           Theme: github (default), dark, light
  --title <text>           HTML page title (default: first h1 in document)
  --toc                    Generate table of contents
  --no-highlight           Skip language labels on code blocks
  --watch                  Watch file and rebuild on change
  --serve [port]           Serve with live reload (default port: 3000)
  -h, --help               Show this help
  -v, --version            Show version

EXAMPLES
  md2html README.md
  md2html README.md -o README.html
  md2html README.md --theme dark --toc
  md2html README.md --serve 8080
  md2html ./docs           (converts all .md files in ./docs)
  md2html README.md --watch --theme github

THEMES
  github    GitHub-style light theme (default)
  dark      GitHub dark theme
  light     Clean minimal serif theme
`.trim());
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    printHelp();
    process.exit(0);
  }

  if (args.includes('-v') || args.includes('--version')) {
    const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
    console.log(pkg.version);
    process.exit(0);
  }

  const opts = {
    output: null,
    theme: 'github',
    title: null,
    toc: false,
    noHighlight: false,
    watch: false,
    serve: false,
    port: 3000
  };

  let inputPath = null;

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '-o' || a === '--output') { opts.output = args[++i]; }
    else if (a === '--theme') { opts.theme = args[++i]; }
    else if (a === '--title') { opts.title = args[++i]; }
    else if (a === '--toc') { opts.toc = true; }
    else if (a === '--no-highlight') { opts.noHighlight = true; }
    else if (a === '--watch') { opts.watch = true; }
    else if (a === '--serve') {
      opts.serve = true;
      const next = args[i + 1];
      if (next && /^\d+$/.test(next)) { opts.port = parseInt(next); i++; }
    }
    else if (!a.startsWith('-')) { inputPath = a; }
  }

  if (!inputPath) {
    console.error('Error: no input file or directory specified.');
    printHelp();
    process.exit(1);
  }

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: path not found: ${inputPath}`);
    process.exit(1);
  }

  const stat = fs.statSync(inputPath);

  if (stat.isDirectory()) {
    convertDir(inputPath, opts);
    return;
  }

  if (!inputPath.endsWith('.md') && !inputPath.endsWith('.markdown')) {
    console.error(`Warning: input file does not have a .md extension: ${inputPath}`);
  }

  if (opts.serve) {
    serveFile(inputPath, opts.port, opts);
    return;
  }

  if (opts.watch) {
    watchFile(inputPath, opts.output, opts);
    return;
  }

  const html = convertFile(inputPath, opts);

  if (opts.output) {
    fs.writeFileSync(opts.output, html, 'utf8');
    console.error(`Written to ${opts.output}`);
  } else {
    process.stdout.write(html);
  }
}

main();
