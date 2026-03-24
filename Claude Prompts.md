Your “Prompt Pack” (Vite + GH Pages ready)

Prompt: Generate prototype code (Vite + GH Pages)

Copy/paste this into Claude:

You are my senior UX engineer pair. Build a TESTABLE prototype in a Vite + React repo and deploy to GitHub Pages.

Repo + deploy constraints:
- Vite + React
- Must work on GitHub Pages under base path "/<REPO_NAME>/"
- Include updates to vite.config.js with base: "/<REPO_NAME>/"
- Prefer single-page prototype. If routing is needed, use HashRouter (not BrowserRouter).
- Keep it minimal: App.jsx + at most 1-2 components.
- Mock data only (no backend).
- Accessibility: semantic HTML, labels, keyboard navigation, WCAG 2.1 AA.

Prototype brief:
[PASTE brief + flow + states here]

Deliverables:
1) List files to create/modify
2) Provide full code for each file
3) Provide commands to run locally
4) Provide deploy steps for GitHub Pages (using gh-pages package OR GitHub Actions—pick gh-pages unless I request otherwise)
Before writing code: confirm base-path and whether routing is required.

Prompt: GH Pages deploy setup (gh-pages package)

Set up deployment for a Vite React repo to GitHub Pages at "/<REPO_NAME>/".

Deliver:
- package.json scripts required (dev/build/deploy)
- dev dependency needed
- any config changes (vite.config.js base)
- exact command sequence to publish
Keep changes minimal.

Prompt: Fix-only iteration

Update ONLY what is needed. Keep component names and structure unchanged unless required.

Issues:
1) ...
2) ...

Output:
- updated files with full code
- short list of changes