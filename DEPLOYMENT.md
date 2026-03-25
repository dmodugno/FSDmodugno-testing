# GitHub Pages Deployment Infrastructure

This document describes the shared deployment infrastructure for the UX Hackaton monorepo, including multi-project GitHub Pages deployment and SPA routing with clean URLs.

## Overview

The monorepo deploys multiple projects to a single GitHub Pages site:
- **Root:** `https://dmodugno.github.io/FSDmodugno-testing/` (project index)
- **Projects:** `/origin-cards-ab-test/`, `/navigation-ab-test/`, etc.

Key features:
- Clean URLs without `#` hashes (e.g., `/navigation-ab-test/variant-b`)
- Automatic 404 handling that preserves routes and query parameters
- Support for React Router (or any SPA framework)
- Optional token-based authentication per project

## Architecture

### The Problem

GitHub Pages serves static files and has no server-side routing:
- Requesting `/navigation-ab-test/variant-b` returns 404 (file doesn't exist)
- SPA frameworks need the initial HTML to bootstrap before handling routes
- Refreshing on any route except root causes 404

### The Solution

Multi-layered redirect system that captures 404s and converts them into query parameters:

```
1. User requests: /navigation-ab-test/variant-b
2. GitHub Pages: 404 (no file found)
3. Root 404.html: Detects project, redirects to /?/variant-b
4. index.html loads and decodes route
5. JavaScript restores clean URL: /variant-b
6. React Router renders component
```

## Request Flow

```
External Request: /FSDmodugno-testing/navigation-ab-test/variant-b?access=TOKEN

         ↓ (GitHub Pages serves root 404.html)

Root 404.html checks pathname
         ↓ (Matches /navigation-ab-test/ pattern)

Redirects to: /FSDmodugno-testing/navigation-ab-test/?/variant-b&access=TOKEN

         ↓ (Browser loads index.html)

index.html script decodes /?/variant-b
         ↓
history.replaceState restores: /FSDmodugno-testing/navigation-ab-test/variant-b?access=TOKEN

         ↓ (React app initializes)

React Router matches /variant-b
         ↓
Component renders
```

## Key Files

### 1. Root-Level 404.html

**Location:** Created by `.github/workflows/deploy-navigation-ab-test.yml`
**Purpose:** Multi-project traffic router

Detects which project the 404 belongs to and redirects appropriately:

```javascript
if (path.indexOf('/FSDmodugno-testing/navigation-ab-test/') === 0) {
  // Extract route and redirect to navigation-ab-test
  var route = path.replace('/FSDmodugno-testing/navigation-ab-test/', '');
  window.location.replace('/FSDmodugno-testing/navigation-ab-test/?/' + route);
}
```

**When to update:** When adding a new project to the deployment.

### 2. Project-Level 404.html

**Example:** `navigation-ab-test/404.html`
**Purpose:** Captures routes and encodes them as query parameters

Key configuration:
```javascript
var pathSegmentsToKeep = 2;  // For /FSDmodugno-testing/navigation-ab-test/
```

Calculation:
- Count slashes in base path: `/FSDmodugno-testing/navigation-ab-test/` = 2 segments after domain
- Always verify: `base_path.split('/').length - 2`

**Encoding strategy:**
- Routes: `/variant-b` → `?/variant-b`
- Query params: `&` → `~and~` (prevents parsing conflicts)
- Hash fragments: Preserved as-is

### 3. Project index.html

**Example:** `navigation-ab-test/index.html`
**Purpose:** Decodes encoded routes and restores clean URLs

Must include redirect handler script (runs before React):
```javascript
if (l.search[1] === '/' ) {  // Detects /?/...
  var decoded = l.search.slice(1).split('&').map(function(s) {
    return s.replace(/~and~/g, '&')
  }).join('?');
  window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
}
```

### 4. vite.config.js

**Purpose:** Sets base path for asset loading and routing

```javascript
base: mode === 'production' ? '/FSDmodugno-testing/navigation-ab-test/' : '/'
```

**Critical:**
- Production base MUST match GitHub Pages deployment path
- Development base should be `/` for localhost
- Vite injects this as `import.meta.env.BASE_URL`
- React Router uses this as `basename`

### 5. GitHub Actions Workflow

**File:** `.github/workflows/deploy-navigation-ab-test.yml`
**Purpose:** Builds projects and creates deployment structure

Key responsibilities:
- Build each project with `npm run build`
- Copy dist folders to `_site/project-name/`
- Create root-level index.html (project landing page)
- Create root-level 404.html (traffic router)
- Deploy `_site/` to GitHub Pages

## Adding a New Project

### Step 1: Update GitHub Actions Workflow

Add build and deployment steps:
```yaml
- name: Build New Project
  working-directory: ./new-project
  run: |
    npm ci
    NODE_ENV=production npm run build

- name: Copy to deployment structure
  run: |
    mkdir -p _site/new-project
    cp -r new-project/dist/* _site/new-project/
```

### Step 2: Update Root 404.html Handler

Add detection logic to root 404.html creation:
```javascript
else if (path.indexOf('/FSDmodugno-testing/new-project/') === 0) {
  var route = path.replace('/FSDmodugno-testing/new-project/', '');
  var redirect = '/FSDmodugno-testing/new-project/?/' + route.replace(/&/g, '~and~');
  if (window.location.search) {
    redirect += '&' + window.location.search.slice(1).replace(/&/g, '~and~');
  }
  window.location.replace(redirect + window.location.hash);
}
```

### Step 3: Create Project 404.html

Create `new-project/404.html`:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>New Project</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 2; // Adjust based on path depth
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

### Step 4: Update Project index.html

Add redirect handler script in `<head>`:
```html
<script type="text/javascript">
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) {
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

### Step 5: Configure vite.config.js

Set production base path:
```javascript
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/FSDmodugno-testing/new-project/' : '/',
  build: {
    outDir: 'dist'
  },
  plugins: [
    react(),
    {
      name: 'copy-files',
      closeBundle() {
        copyFileSync('404.html', 'dist/404.html')
      }
    }
  ]
}))
```

### Step 6: Update Root index.html

Add link to new project in the root landing page.

## Common Issues

### 404 on Variant Routes

**Symptom:** Direct navigation or refresh on `/variant-b` shows 404
**Cause:** Missing or incorrect 404.html files
**Fix:** Verify all 404.html files exist and root 404.html includes project detection

### Blank Page After Routing

**Symptom:** Page loads but shows blank screen
**Cause:** Incorrect `pathSegmentsToKeep` or vite `base` path
**Fix:**
- Count path segments: `/FSDmodugno-testing/navigation-ab-test/` = 2
- Verify vite base matches deployment path exactly

### Assets Not Loading

**Symptom:** JavaScript/CSS 404 errors in console
**Cause:** Incorrect vite `base` configuration
**Fix:** Set `base: '/FSDmodugno-testing/project-name/'` in vite.config.js

### Query Parameters Lost

**Symptom:** URL parameters disappear after routing
**Cause:** Missing `~and~` encoding or incorrect decoding
**Fix:** Verify 404.html encodes `&` as `~and~` and index.html decodes it back

## Integration with Authentication

For protected projects (like navigation-ab-test), the routing system integrates seamlessly with token-based authentication:

1. User accesses URL with token: `?access=TOKEN`
2. Root 404.html preserves token during redirect
3. index.html restores clean URL with token intact
4. AuthGuard component validates token
5. Token removed from URL after validation (stored in sessionStorage)

See `navigation-ab-test/AUTH_README.md` for detailed authentication documentation.

## Architecture Principles

### Why This Approach?

**GitHub Pages Constraints:**
- No server-side routing or redirects
- Cannot configure 404 behavior per directory
- Only root-level 404.html is used site-wide

**Benefits of This Solution:**
- Clean URLs (no `#` hashes)
- Full SPA routing support
- Query parameter preservation
- Minimal performance overhead (one redirect on initial load)
- Works with any SPA framework

### URL Encoding Strategy

**Why encode routes in query parameters?**
- Preserves the path structure for decoding
- Avoids conflicts with existing query parameters
- Allows safe parsing of route + query + hash

**Why `~and~` for ampersands?**
- Prevents browser from parsing `&` as query delimiter
- Easy to reverse in JavaScript
- Preserves complex query strings

### pathSegmentsToKeep Calculation

Count the number of path segments in your base URL:

```
/FSDmodugno-testing/               → 1
/FSDmodugno-testing/project-name/  → 2
/org/repo/subfolder/project-name/  → 4
```

Formula: `base_path.split('/').filter(Boolean).length`

## Files Reference

**Root Level:**
- `.github/workflows/deploy-navigation-ab-test.yml` - Deployment orchestration
- Generated `_site/404.html` - Multi-project traffic router
- Generated `_site/index.html` - Project landing page

**Project Level (example: navigation-ab-test):**
- `404.html` - Route capture and encoding
- `index.html` - Route restoration
- `vite.config.js` - Base path configuration
- `src/main.jsx` - React Router with basename
- `.nojekyll` - Prevents Jekyll processing

## Additional Resources

- **Authentication:** See `navigation-ab-test/AUTH_README.md` for token-based auth
- **SPA GitHub Pages Pattern:** Based on [rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages)
- **React Router:** [reactrouter.com/web/api/BrowserRouter](https://reactrouter.com/web/api/BrowserRouter)

## Troubleshooting

Test your routing setup:
1. Direct navigation to root: `https://site.com/project/`
2. Direct navigation to route: `https://site.com/project/variant-b`
3. Refresh on route: Should maintain route
4. With query params: `https://site.com/project/route?foo=bar`
5. With hash: `https://site.com/project/route#section`

All should work without 404 errors. Check browser console for asset loading errors if you see blank pages.
