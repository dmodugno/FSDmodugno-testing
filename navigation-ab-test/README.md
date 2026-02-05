# FamilySearch Navigation A/B Test

This repository contains an internal A/B testing prototype for evaluating **logged-in navigation, Home, and AI assistant patterns** for FamilySearch.

The project is intentionally split into **architecture (WHY)**, **implementation (HOW)**, and **decision history (WHEN)** to support both human collaborators and AI-assisted development.

---

## How to Use This Repository

If you are:
- **Trying to understand design intent or UX decisions** → read `ARCHITECTURE.md`
- **Building or modifying the UI / logic** → read `IMPLEMENTATION.md`
- **Looking for historical context** → read `DECISION_LOG.md`
- **Trying to run or test the prototype** → continue below

---

## Overview

This project tests two logged-in navigation variants:

- **Variant A**
  - Left navigation
  - Right-side drawer system
  - Docked, split-view AI assistant (can coexist with drawers)

- **Variant B**
  - Top navigation bar
  - Traditional overlay AI assistant

Both variants support the same feature set but differ in layout and interaction patterns.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

---

## Testing URLs

### Local Development
- **Variant A**: `http://localhost:5173/navigation-ab-test/`
- **Variant B**: `http://localhost:5173/navigation-ab-test/variant-b`

### User Context Parameters

URL parameters allow simulation of different user types:

- `membership=LDS` or `membership=non-LDS`
- `experience=new | casual | power`

**Examples:**
- `http://localhost:5173/navigation-ab-test/?membership=LDS&experience=casual`
- `http://localhost:5173/navigation-ab-test/variant-b?membership=non-LDS&experience=new`

---

## Test Banner (Internal Use)

An internal test banner is available for:
- Switching between Variant A and Variant B
- Toggling church membership
- Changing experience level
- Inspecting current test context

**Toggle:**
- macOS: `Cmd + Shift + T`
- Windows: `Ctrl + Shift + T`

---

## What This Repo Is (and Is Not)

**This repo is:**
- A UX and interaction prototype
- A testbed for navigation, Home, and AI assistant patterns
- A shared workspace for human + AI collaboration

**This repo is not:**
- A production codebase
- A finalized design spec
- A replacement for FamilySearch production systems

---

## Architecture & Behavior Documentation

Detailed behavior, rationale, and constraints are intentionally **not duplicated** in this README.

Please refer to:
- **ARCHITECTURE.md** — navigation, Home, and AI design decisions
- **IMPLEMENTATION.md** — layout contracts, drawer coordination, AI split-view logic
- **DECISION_LOG.md** — historical decision record

---

## Project Structure (High-Level)

```
src/
├── components/
│   ├── NavigationA.jsx
│   ├── LeftSidebarB.jsx
│   ├── RightDrawer.jsx
│   ├── RightDrawerB.jsx
│   ├── AIChatOverlay.jsx
│   ├── FamilyTree/
│   └── Home/
├── contexts/
├── mocks/
├── VariantA.jsx
├── VariantB.jsx
└── main.jsx
```

For full implementation details, see `IMPLEMENTATION.md`.

---

## Notes for Contributors

- Architectural intent lives in `ARCHITECTURE.md`
- Implementation changes should respect documented constraints
- All significant decisions should be appended to `DECISION_LOG.md`

When in doubt, **do not update this README** — update the appropriate canonical document instead.
