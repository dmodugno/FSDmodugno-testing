# UX Hackaton Projects

Monorepo for UX hackathon projects and experiments, deployed to GitHub Pages.

**Live Site:** https://dmodugno.github.io/FSDmodugno-testing/

## Projects

### 1. [Origin Cards A/B Test](./origin-cards-ab-test/)
A/B test comparing two different approaches to country origin card selection:
- **Version A** (`/`): Traditional layout with direct country selection
- **Version B** (`/explore`): Hero-first design with animated background

**Tech Stack:** React 18, Vite, Tailwind CSS, React Router

**Live Demo:** https://dmodugno.github.io/FSDmodugno-testing/origin-cards-ab-test/

### 2. [Navigation A/B Test](./navigation-ab-test/)
Prototype testing two different navigation patterns with mobile support and AI assistant integration:
- **Variant A:** Split-view AI with desktop left navigation
- **Variant B:** Full-screen AI with top navigation bar

**Tech Stack:** React 19, Vite, Tailwind CSS, React Router

**Live Demo:** https://dmodugno.github.io/FSDmodugno-testing/navigation-ab-test/ (protected - requires access token)

---

## Infrastructure Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - GitHub Pages deployment architecture, SPA routing system, and adding new projects
- **[navigation-ab-test/AUTH_README.md](./navigation-ab-test/AUTH_README.md)** - Token-based authentication for protected projects

## Repository Structure

```
UX Hackaton/
├── origin-cards-ab-test/         # Origin cards A/B test
├── navigation-ab-test/           # Navigation patterns prototype
├── essential-oil-protocol/       # Essential oil recommendation engine
├── logged-in-homepage/           # Logged-in homepage experiment
├── tribal-lineages/              # Tribal lineages visualization
├── time-tracker/                 # Time tracking tool (submodule)
├── .github/workflows/            # GitHub Actions deployment
├── DEPLOYMENT.md                 # Infrastructure documentation
└── README.md                     # This file
```

## Adding New Projects

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on:
- Configuring SPA routing for GitHub Pages
- Adding projects to the deployment workflow
- Setting up vite configuration and 404 handling
- Optional token-based authentication

Quick checklist:
1. Create project folder with React/Vite setup
2. Configure `vite.config.js` with correct base path
3. Create `404.html` with appropriate `pathSegmentsToKeep`
4. Add redirect handler to `index.html`
5. Update `.github/workflows/deploy-navigation-ab-test.yml`
6. Update root `404.html` traffic router
7. Deploy via GitHub Actions
