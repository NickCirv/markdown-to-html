# Markdown Feature Test

Welcome to the **markdown-to-html** test file. This covers *all* supported features.

## Text Formatting

**Bold text** and __also bold__.
*Italic text* and _also italic_.
***Bold and italic*** and ___also bold italic___.
~~Strikethrough text~~.
Inline `code snippet` here.

## Links and Images

[GitHub](https://github.com) — a regular link.
[Link with title](https://example.com "Example Site").
Auto-link: <https://example.com>
Email auto-link: <hello@example.com>

![Alt text for image](https://via.placeholder.com/400x200 "Placeholder image")

## Headings

### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

## Code Blocks

```javascript
function greet(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
  return message;
}

greet('World');
```

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print([fibonacci(i) for i in range(10)])
```

```
Plain code block with no language label
```

## Blockquotes

> This is a simple blockquote.

> Blockquotes can contain **bold text** and `inline code`.
> They can span multiple lines.

## Lists

### Unordered Lists

- Item one
- Item two
  - Nested item 2a
  - Nested item 2b
    - Deeply nested item
- Item three

### Ordered Lists

1. First item
2. Second item
   1. Sub-item 2a
   2. Sub-item 2b
3. Third item

### Task Lists

- [x] Implement Markdown parser
- [x] Add built-in CSS themes
- [x] Support TOC generation
- [ ] Add more themes
- [ ] Write more tests

## Tables

| Feature       | Supported | Notes                  |
|:--------------|:---------:|----------------------:|
| Headings      | ✅        | H1 through H6         |
| Bold/Italic   | ✅        | All combinations      |
| Code blocks   | ✅        | With language labels  |
| Tables        | ✅        | With alignment        |
| Task lists    | ✅        | Check/uncheck state   |
| Footnotes     | ✅        | Inline references     |

## Horizontal Rules

---

Above and below are horizontal rules.

***

## Hard Line Breaks

First line.
Second line (after two trailing spaces).
Third line.

## Footnotes

This sentence has a footnote[^1] and another[^2].

[^1]: This is the first footnote definition.
[^2]: This is the second footnote definition with **bold** text.

## Raw HTML Passthrough

<div style="padding: 12px; background: #e8f4f8; border-radius: 6px; margin: 16px 0;">
  <strong>Note:</strong> This is raw HTML passed through directly.
</div>

## Setext-Style Headings

Setext H1
=========

Setext H2
---------

## End

All features tested successfully. Convert with:

```bash
node index.js test.md --theme dark --toc -o test.html
```
