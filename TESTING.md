# CodePilot — Testing

## Static checks
- `node --check app.js` — PASS (see test run)
- `node --check data.js` — PASS

## UI tests (Playwright, headless Chromium, served locally)
- Language switch loads the sample for that language — PASS
- Prompt generates code into the editor — PASS
- Autocomplete suggestion appears for a pattern (e.g. typing `for`) — PASS
- Explain produces output in the AI panel — PASS
- Copy works (clipboard / fallback) — PASS

## Honest limitation
Tests cover the template/pattern behaviour only. This app does not call an
LLM, so prompt coverage is limited to the templates in `data.js`. Prompts
outside that library show a “No template matched” message with examples,
rather than inventing code.

## Screenshots
- `docs/screenshots/editor.png` — dark editor, sidebar, AI panel
- `docs/screenshots/prompt-code.png` — prompt-to-code result
- `docs/screenshots/explain.png` — explanation in the AI panel
