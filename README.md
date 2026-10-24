# CodePilot — AI Code Assistant (Mini Copilot-style demo)

A premium dark, VS Code-style web app that helps you write code: inline
autocomplete, prompt-to-code, code explanation, bug finding and refactoring —
all locally, with no API key and no backend.

## What it does

- **Editor:** VS Code-style dark theme, line numbers, language switcher
  (Python, JavaScript, HTML), sample loader, copy and clear.
- **Inline autocomplete:** type a common pattern (`for`, `def`, `if`,
  `fetch`, `console`, `class` …) and a suggestion appears — press **Tab**
  or **Accept** to insert it. 25+ patterns across Python, JavaScript, HTML.
- **Prompt to code:** write a prompt like “Python me login function banao”
  or “JavaScript me array sort karo” and matching code is generated into
  the editor from a template library (23 templates).
- **AI panel:**
  - *Explain code* — plain-language explanation based on detected constructs.
  - *Find bug* — checks for common mistakes (Python missing `:`,
    `print` without parentheses, JS `=` vs `===`, old `var`, unused variable).
  - *Refactor* — shows an improved version for common patterns, with an
    Apply button.
- **Snippet library:** click a snippet to insert it into the editor.
- **History:** recent prompts are shown in the sidebar.

## How to run (no build step)

```bash
cd codepilot-ai-assistant
python3 -m http.server 8000
# open http://localhost:8000
```

Or open `index.html` directly in a browser.

## Try it

1. Click **Load sample**, or switch language to JavaScript / HTML.
2. In the editor, type `for` on a new line and press **Tab**.
3. In Prompt to code, try “Python me login function banao”.
4. Click **Explain code**, then **Find bug**, then **Refactor**.

## Screenshots

### Editor

![CodePilot editor](docs/screenshots/editor.png)

### Prompt to code

![CodePilot prompt to code](docs/screenshots/prompt-code.png)

### Explain code

![CodePilot explain code](docs/screenshots/explain.png)

## Files

- `index.html` — layout: sidebar, editor, AI panel
- `styles.css` — VS Code-style dark theme, no external fonts/libraries
- `app.js` — editor, autocomplete, prompt matching, explain/bug/refactor
- `data.js` — samples, autocomplete patterns, prompt templates, snippets
- `TESTING.md` — test results
- `docs/screenshots/` — screenshots of the running app

## Honest note — what this is NOT

This is a **local, template / pattern-based demo, NOT a large language
model and NOT the real GitHub Copilot**. The real Copilot is trained on
billions of lines of code and runs on cloud LLM infrastructure; no single
offline demo can replicate that.

What this demo does prove, for a portfolio: editor UI, autocomplete UX,
prompt matching, code analysis heuristics, and a clean, production-looking
product. Upgrade path: keep the same prompt-to-code flow, but replace the
template lookup in `app.js` (`generate()`) with a call to a hosted LLM API
(using a key the user supplies), keeping the same explain / bug / refactor
panel layout.

## GitHub

Code is pushed to `Ali-Raza-161/CodePilot-` on the main branch.
GitHub Pages is **not** enabled yet — to make the demo live, enable it in
Settings > Pages, deploy from the main branch, /(root).
