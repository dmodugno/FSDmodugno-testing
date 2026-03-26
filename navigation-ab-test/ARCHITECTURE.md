This document defines non-negotiable system rules.

## Documentation Governance Rules

This repository enforces a strict separation between behavioral architecture and implementation mechanics.

### ARCHITECTURE.md Owns:

- Behavioral rules
- Interaction invariants
- Surface hierarchy definitions
- State exclusivity rules
- Non-goals
- Acceptance criteria

This file must NOT contain:

- JSX or React code
- Hook implementations
- CSS classes or Tailwind utilities
- Component file paths
- State variable names
- Animation durations or pixel values

If a new behavior is introduced, it must be defined here first before it is implemented.

If ARCHITECTURE.md and IMPLEMENTATION.md contradict each other, ARCHITECTURE.md is the source of truth.

Do not reorganize or refactor documentation structure unless explicitly instructed.

# FamilySearch Navigation Architecture

This document captures architectural decisions, design rationale, and guiding principles for the FamilySearch Navigation A/B Test project.

## Table of Contents
- [Mental Models & Rules](#mental-models--rules)
- [Design Decisions](#design-decisions)
- [Drawer Interaction Rules](#drawer-interaction-rules)
- [AI Assistant (Chat) Placement](#ai-assistant-chat-placement)
- [AI Split-View Pattern (Variant A)](#ai-split-view-pattern-variant-a)
- [Desktop Toolbar Visibility](#desktop-toolbar-visibility)
- [What Does Not Belong in Navigation](#what-does-not-belong-in-navigation)
- [Mobile Navigation & AI State Machine](#mobile-navigation--ai-state-machine)
- [Mobile Acceptance Criteria](#mobile-acceptance-criteria)
- [Mobile & Responsive Guidance](#mobile--responsive-guidance)
- [Navigation Menu Items](#navigation-menu-items)
- [Logged-in Home Architecture](#logged-in-home-architecture)
  - [Home Mode Resolution Rules (Non-negotiable)](#home-mode-resolution-rules-non-negotiable)
  - [Home Non-Goals](#home-non-goals)
- [Future Enhancements](#future-enhancements)
- [References](#references)

---

## Mental Models & Rules

These mental models and rules are the "source of truth" that explain **why** the navigation is structured the way it is.

### The 4 Questions Model

- **Left navigation** answers: *"Where do I go?"* (destinations)
- **Main content** answers: *"What do I do?"* (primary actions)
- **Details drawer** answers: *"What is this?"* (context, metadata, filters)
- **Tools drawer** answers: *"What do I need right now?"* (global utilities)

### Destination-Only Rule (Left Navigation)

- Left nav contains **destinations**, not actions.
- If an item is primarily an action (e.g., "Add person"), it belongs in the **main content** or in-page CTAs.
- Discovery experiences / Activities do not live in left nav.

### Drawer Separation Rule

- The right side is one region, but it serves **distinct jobs**.
- Do not mix global tools with contextual details in the same surface.
- The system must allow users to keep context visible while getting help.

---

## Design Decisions

### Why Shared Components?

**Decision:** Use shared components with props for variant differences instead of duplicating code.

**Rationale:**
1. **Single Source of Truth**: Design changes apply to both variants automatically
2. **Reduced Bugs**: No risk of updating one variant but forgetting the other
3. **Easier Maintenance**: One file to update instead of two
4. **Clear Separation**: Variant-specific logic is isolated in wrapper components
5. **Props Over Duplication**: Better to have a few conditional props than duplicate 90% of code

**Example:** LeftNavigation.jsx with `showHeader` prop vs two separate files

### Why Inline SVG Chevrons?

**Decision:** Use inline SVG instead of Unicode characters (▶) or icon files.

**Rationale:**
1. **Consistency**: Looks the same across all browsers and operating systems
2. **No Dependencies**: Doesn't rely on icon files that may not exist
3. **Easy Styling**: Can use Tailwind classes directly
4. **Performance**: No additional HTTP requests
5. **Maintainability**: Self-contained, no external file references to break

**Previous Approach (Rejected):**
- Unicode `▶` character: Inconsistent rendering across systems
- Image files (`ArrowDown.svg`, `ArrowRight.svg`): Required managing icon files, broke if files missing

### Navigation Highlight Logic

**Decision:** Show green highlight when section is collapsed OR when it contains the active page.

**Rationale:**
1. **User Feedback**: Users need to know which section contains their current page
2. **Collapsed State**: When collapsed, highlight indicates "this section is relevant"
3. **Expanded State**: Highlight moves to specific page within section
4. **Prevents Conflicts**: Gray hover state only applies when not active

### Drawer Content Indexing

**Decision:** Adjust drawer indices based on whether environment switcher exists.

**Problem:** Variant A has 9 drawers (starting with environment switcher), Variant B has 5 drawers (no environment switcher). Messages drawer is index 1 in A, but index 0 in B.

**Solution:** RightDrawerContent.jsx calculates indices dynamically based on the presence of the environment switcher.

**Why:** Keeps drawer content logic centralized without hardcoding indices.

### Details Drawer: Explicit Open (No Global Auto-Open)

**Decision:** The **Details/Context** drawer opens only via explicit user affordances (e.g., clicking a person to open person details, clicking a Filters button to open filters).

**Rationale:**
1. Preserves user control and prevents UI churn.
2. Avoids conflicts with global tools and AI assistance.
3. Matches existing FamilySearch expectations (details open when invoked).

**Rule:** Do not auto-open the Details drawer globally on page load or simply because selection changes.

---

## Drawer Interaction Rules

### Right-Side Region (Desktop)

- The UI uses a single right-side region.
- **Details drawer** and **Tools drawer** are mutually exclusive.
- The user explicitly opens each drawer.

### Details / Context Drawer

- Opens via explicit affordances (Person selected, Record selected, Filters button, etc.).
- Content is page-aware and selection-aware.
- Closing is user-controlled.

### Tools Drawer

- Opens only when user selects a tool icon.
- Contains global utilities that work across the site.
- Must not contain page-specific filters or selection-specific details.

### Priority / Coexistence

- Tools drawer can replace Details drawer.
- Details drawer can replace Tools drawer.
- AI assistant should not force either drawer to close.

### Person Detail Drawer Pattern

**Implementation:** PersonDetailDrawer.jsx provides person-specific details in the Family Tree context.

**Behavior:**
- Opens when user clicks on a person card in the Family Tree
- Slides in from right with 320px width (w-80)
- Replaces RightDrawer when opened (mutually exclusive)
- Opening RightDrawer closes PersonDetailDrawer automatically
- Opening PersonDetailDrawer closes RightDrawer automatically

**Drawer Coordination:**
State management in parent components (VariantA/VariantB) ensures mutually exclusive behavior through coordinated handlers.

**Layout Structure:**
- Both drawers always rendered in DOM
- PersonDetailDrawer: slides from 0px to 320px based on `isOpen`
- RightDrawer: 64px icon bar (always visible) + 320px content panel (conditional)
- Only one content panel (320px) visible at a time

**User-Aware Content:**
- LDS-specific badges (B, C, I, E, SP, SS) conditionally rendered
- Uses `useUser()` hook to check `user.churchMembership === 'LDS'`
- Non-LDS users see same drawer without badge section

### Drawer Width Standardization

**Decision:** All drawers use 320px (w-80) for consistent width.

**Rationale:**
- Uniform user experience across all drawer types
- Easier layout coordination (only one width to manage)
- Simplified responsive breakpoint calculations
- Consistent with RightDrawer/RightDrawerB pattern

**Implementation:**
- PersonDetailDrawer: `w-80` when open
- RightDrawer/RightDrawerB content panel: `w-80` when active
- Icon bar: Always `w-16` (64px)

---

## AI Assistant (Chat) Placement

**Decision:** The AI assistant is **separate from the right drawer**.

**Rationale:**
- Users often need AI help **while keeping** filters/details visible (e.g., search results + filters, tree person details).
- AI is conversational and stateful; drawers are reference surfaces.

**Implementation Guidance (Desktop):**
- AI appears as a right-anchored overlay/panel.
- It must be able to coexist with the Details drawer.
- It should be user-invoked and dismissible/minimizable.

**Implementation Guidance (Mobile):**
- AI appears as a separate bottom sheet/modal (mobile cannot show both simultaneously).

### Single Session Model

**Decision:** Only one AI chat session can exist at a time (always ID: 1).

**Rationale:**
- Org decision: Users should focus on one conversation at a time
- Simplifies mental model: single persistent chat vs managing multiple sessions
- Reduces cognitive load: no need to switch between multiple chat windows
- History preservation: Conversation persists until explicitly closed or reset

**State Management:**
Single chat object (not array) with ID always set to 1. AI Help button creates new chat if none exists, or maximizes chat if minimized.

**User Actions:**
- **AI Help button**: Opens new chat OR maximizes minimized chat
- **Minimize button**: Collapses chat to bottom bar
- **New button** (in chat header): Resets conversation (clears messages)
- **Close button**: Completely removes chat session

**Reset Functionality:**
"New" button in chat header clears messages while keeping the session (ID remains 1).

**Key Behaviors:**
- Chat ID always 1 (session identifier, not incremented)
- Minimize/maximize functionality preserved
- Messages persist until reset or close
- No multiple chat instances or minimized chat bars

---

## AI Split-View Pattern (Variant A)

**Decision:** Variant A implements a split-view pattern for AI chat that integrates with the drawer system, while Variant B maintains the original overlay pattern.

**Rationale:**
- Better space utilization: Content column only appears when AI or drawer is open
- Context preservation: AI and drawer coexist in 50/50 vertical split
- Smooth transitions: Auto-adjusts height when drawer state changes
- Backward compatibility: Variant B maintains original overlay behavior
- Single component: AIChatOverlay serves both variants via mode detection

See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for complete implementation details including three AI states (Collapsed, Split View, Full Height), layout architecture, state coordination, dual-mode component logic, and design specifications.

### Key Benefits

1. **Space Efficiency**: Content column only exists when needed
2. **Context Preservation**: AI and drawer coexist without interference
3. **Smooth Transitions**: Auto-adjusts height based on drawer state
4. **Backward Compatibility**: Variant B maintains original overlay behavior
5. **Single Component**: AIChatOverlay serves both variants via mode detection

---

## Desktop Toolbar Visibility

The desktop toolbar remains part of the existing navigation / tool surface hierarchy. Hiding it does not create a new surface. Toolbar visibility is independent from drawer visibility.

### Behavioral Rule

On desktop, the toolbar may be hidden by the user and later restored.
- Only the toolbar / icon bar is dismissible.
- An already-open drawer remains visible when the toolbar is hidden and continues to follow its existing close rules.

This behavior exists to reduce persistent chrome when the user does not need toolbar access, while preserving a clear affordance to bring it back.

### Variant A

- The toolbar may be collapsed using a chevron affordance at the bottom of the toolbar.
- When collapsed, only the toolbar / icon bar slides out of view.
- A single recall affordance remains visible at the bottom-right of the screen to restore the toolbar only.
- Activating that affordance restores the toolbar.

### Variant B

- The toolbar may be shown or hidden using a control in the top bar.
- Activating that control toggles toolbar visibility.
- Toggling the toolbar does not close an already-open drawer.

### Invariants

- This change applies to desktop only.
- Hiding the toolbar does not create a new surface.
- Hiding the toolbar does not change AI lifecycle rules.
- Hiding the toolbar does not change drawer exclusivity rules.
- The toolbar remains the same desktop tool surface whether visible or hidden.
- Toolbar visibility and drawer visibility are independent states.
- Hiding the toolbar does not close or hide an already-open drawer.
- Mobile behavior is unchanged.

## What Does Not Belong in Navigation

These are explicit non-goals to prevent navigation bloat and confusion.

- **Activities / discovery experiences** (they belong in Home/Explore, not left nav)
- Primary creation actions (e.g., "Add person", "Attach source") — keep in main content
- Context-specific filters/details (keep in Details drawer)
- Conversational AI (keep as overlay, not as a drawer mode)

---
## Mobile Navigation & AI State Machine

This section defines the canonical mobile interaction hierarchy and state transitions.

Mobile must preserve the same mental model as desktop while serializing surfaces into a single active layer at a time.

### Surface Hierarchy (Highest to Lowest Priority)

1. **Hamburger Navigation (Full-Screen Overlay)**
2. **AI Assistant (Full-Screen Mode)**
3. **Bottom Sheets (Notifications, Messages, Tools, Context Drawers)**
4. **Main Content**

At any moment, only one surface layer may be interactive.

---

### Global Rules

- The Hamburger menu is a full-screen overlay and blocks all other surfaces.
- Only one bottom sheet may be open at a time.
- Bottom sheets do not stack.
- Opening the Hamburger immediately dismisses any open bottom sheet.
- Opening AI dismisses any open bottom sheet and replaces the application chrome.
- AI full-screen mode hides the top navigation bar.
- Minimizing AI preserves the session globally.
- Closing AI destroys the session.
- Navigation between pages does not mutate AI session context.

---

### Hamburger Navigation Behavior (Mobile)

- Opens as a full-screen overlay.
- Only one navigation section may be expanded at a time (accordion behavior).
- The section containing the current page auto-expands on open.
- The current page is highlighted.
- All other sections remain collapsed.
- User may collapse all sections.
- Selecting a destination immediately closes the overlay and navigates.

---

### Bottom Sheet Behavior (Mobile)

- Notifications, Messages, and Tools open as bottom sheets.
- Switching between top-bar icons closes the current sheet before opening the next.
- Tapping Hamburger while a bottom sheet is open immediately replaces the sheet with the Hamburger overlay.
- Tools acts as a hub. Selecting a tool replaces the current sheet with the selected tool sheet.

---

### AI Assistant (Mobile)

- AI opens as a full-screen immersive mode.
- AI replaces the top bar and all navigation chrome.
- AI may be opened from Tools or contextual page affordances.
- AI context persists across navigation when minimized.
- AI context remains attached to the session until explicitly removed or the chat is closed.
- AI does not auto-update context when navigating to a new page.

---

### State Exclusivity Invariant

The system must never allow:
- Hamburger + Bottom Sheet simultaneously.
- Multiple bottom sheets simultaneously.
- Bottom Sheet + AI simultaneously.

All transitions must result in a single active surface.

---

## Mobile Acceptance Criteria

These criteria are the definition of “done” for mobile behavior. They are written to be testable via prototype walkthrough or QA.

### Navigation Layering

- **Hamburger is full-screen.** When open, the top-bar icons are not interactive.
- **Hamburger blocks everything.** No bottom sheet or AI surface may be open simultaneously.
- **Hamburger replaces current surface immediately.** If a bottom sheet is open, tapping Hamburger must open Hamburger without a perceived delay.

### Hamburger Orientation + Accordion Rules

- On open, the section containing the current page **auto-expands**.
- The current page item is **highlighted**.
- Only one section may be expanded at a time (accordion).
- User may collapse all sections (no section expanded).
- If the user expands a different section, the previously expanded section collapses.
- Selecting a destination closes Hamburger immediately and navigates.
- Provide brief pressed feedback (~100–150ms) on destination tap before closing.

### Bottom Sheets (Notifications / Messages / Tools)

- Only one bottom sheet may be open at a time.
- Bottom sheets never stack.
- Switching between Notifications and Messages uses **Option B** behavior: close current sheet, then open the next.
- Tools opens as a hub sheet; selecting a tool replaces the hub with the selected tool sheet.
- Tool sheets provide a **Back** affordance to return to the Tools hub.

### AI Assistant (Mobile)

- AI opens as **full-screen immersive mode** and replaces the application chrome.
- While AI is open, Hamburger and bottom sheets are not available.
- **Minimize** preserves the AI session and returns to the app; a globally persistent entry point remains available.
- **Close** destroys the AI session.
- AI context persists with the session across navigation when minimized.
- AI does not auto-update context when navigating to a new page.

### Required Demo Scenarios (Must Pass)

1. Open Hamburger → current section auto-expands; active item highlighted; only one section open; can collapse all.
2. Open Notifications → tap Messages → Notifications closes then Messages opens.
3. With any bottom sheet open → tap Hamburger → Hamburger opens immediately (sheet dismissed without a perceived delay).
4. Open Tools → open a child tool → child replaces hub; Back returns to hub.
5. Open AI → chrome replaced; cannot open Hamburger or bottom sheets.
6. Minimize AI → persistent entry remains across pages; reopen continues same session.

## Mobile & Responsive Guidance

**Goal:** Preserve the same mental model while adapting surfaces for small screens.

### Recommended Mobile Navigation Pattern

- Use a top-bar Hamburger as the single entry point for destinations.
- The Hamburger opens as a full-screen overlay.
- No bottom navigation is used.
- Global utilities are exposed via top-bar icons (Notifications, Messages, Tools).

### Drawer Adaptation

- Desktop right drawer becomes a **bottom sheet** on mobile.
- Details/Context is a bottom sheet opened by explicit affordances.
- Tools is a separate bottom sheet opened by a tools icon.
- AI assistant is a separate full-screen mode on mobile (do not stack; replaces chrome).

---

## Navigation Menu Items

### Current Menu Structure (LDS Members)

1. **Home** (link)
2. **Search records** (expandable)
   - Historical Records
   - People in Family Tree
   - Unindexed Records
   - Historical Images
   - Catalog
   - Books
   - Newspapers
3. **Build my family tree** (expandable)
   - Family Tree
   - Person List
   - Manage Trees
4. **Preserve memories** (expandable)
   - Gallery
   - Family Feed
   - Together App
5. **Get involved** (expandable)
   - Your Impact
   - Index Records (nested expandable)
     - Quick Name Review
     - Full Name Review
     - Indexing Review
6. **Temple** (expandable, LDS only)
   - My Reservations
   - Ordinances Ready
   - Family Name Assist
   - Schedule Temple Appointment
7. **Help and learning** (expandable)
   - Locations
   - Getting started
   - Classes and Videos
   - Community
   - One-on-One Help
   - FamilySearch Wiki

**Bottom Section:**
8. **Account settings** (expandable)
   - Personal (nested expandable)
     - Profile Information
     - Notifications
   - Security and Access (nested expandable)
     - Account and Security
     - Permissions
9. **Sign Out** (link)

### Right Drawer Items

**Variant A (9 drawers):**
0. Environment Switcher
1. Messages
2. Notifications
3. Recent People Viewed
4. Followed People
5. To-do List
6. Source Box
7. Language Picker
8. Contacts

**Variant B (7 drawers):**
0. Messages
1. Notifications
2. Recent People Viewed
3. Followed People
4. To-do List
5. Source Box
6. Contacts

### Drawer Index Mapping Notes (Implementation Detail)

Variant B reuses shared drawer content from Variant A.

Drawer indices are **not authoritative in this document** and are intentionally abstracted in code to avoid tight coupling between variants.

- The presence or absence of the Environment Switcher changes drawer index offsets.
- Index calculation and content mapping logic live in `RightDrawerContent.jsx`.
- This document describes **what drawers exist**, not how indices are resolved at runtime.

When debugging or extending drawer behavior, always refer to the implementation in shared components rather than relying on index numbers here.

---

## Logged-in Home Architecture

# Logged-in Home – Strategy & States

## Purpose
This document captures the **agreed strategy for the logged-in Home experience** at FamilySearch. It defines the role of Home, the different Home states ("modes"), and how discovery experiences (Activities) are exposed without overwhelming users.

---

## Core Role of Home

**Home answers three questions, in order:**
1. *Where do I start?*
2. *What should I do next (if anything)?*
3. *What else could I explore?*

Home is **not** a dashboard and does not mirror navigation. It is a guided starting point.

---

## Discovery vs Tree Building (Key Insight)

Research shows that:
- Most users come to FamilySearch to **discover**, not to build a tree.
- The family tree unlocks deeper value, but is rarely the initial motivation.

**Design implication:**
- Discovery must feel valuable *before* a tree exists.
- Tree creation should be positioned as a **benefit** (save, connect, continue), not as a requirement.

---

## Logged-in Home States (Final)

### 1. Baseline – No Context
**Who:** Users who just signed up with no clear entry intent (e.g., clicked "Sign up").

**Behavior:**
- Calm, minimal, orienting.
- One primary CTA (discovery-first): e.g., *Search historical records*.
- One or two secondary paths (e.g., Learn how it works).
- No activities.

---

### 2. Baseline – Contextual Entry
**Who:** Users who signed in from a known entry point (Search, Record, Tree, Temple, etc.).

**Behavior:**
- Primary CTA continues that momentum (e.g., *Continue searching records*).
- No guessing about next best action.
- No activities.

---

### 3. Baseline – Empty Tree (Beginner On-Ramp)
**Who:** Logged-in users with empty or near-empty trees.

**Behavior:**
- Discovery-first primary CTA (Search / Explore).
- Secondary CTA: *Save what you find by starting a tree*.
- **One optional, carefully selected activity** shown as a confidence builder.

**Allowed baseline activities (rotated, one at a time):**
- All About Me
- Surname Origins
- Picture My Heritage

**Rules:**
- Never more than one activity.
- Clearly optional.
- Disappears once user adds data or returns.

---

### 4. Baseline – Assisted Session
**Who:** Helpers / consultants signing in to help someone else (FamilySearch Center, class, etc.).

**Behavior:**
- Minimal UI.
- Primary CTA: *Start helping someone*.
- Secondary: Search records / Access another tree.
- No activities, no personal progress prompts.

---

### 5. Research Mode
**Who:** Users explicitly choosing research or inferred with high confidence.

**Behavior:**
- Search-centric modules.
- Recent searches, collections, saved items.
- No activities.

---

### 6. Build Tree Mode
**Who:** Users explicitly choosing to work on their tree or inferred with confidence.

**Behavior:**
- Tree-centric modules.
- Hints, followed people, recent changes.
- No activities.

---

### 7. Explore Mode
**Who:** Users explicitly choosing to explore or browse.

**Behavior:**
- Activities become first-class.
- Card-based, visually rich layout.
- Full activity catalog.

**Activities that live here:**
- Together App
- Record My Story
- Compare-a-Face
- Where Am I From?
- Famous Relatives
- All About Me
- Surname Origins
- Picture My Heritage

---

### 8. Temple Mode
**Who:** Users doing temple-related work.

**Behavior:**
- Temple workflows and status.
- No discovery or activities.

---

## Behavior / Mode Service (Summary)

- Home adapts based on **explicit user choice first**, inference second.
- Backend service returns:
  - mode
  - confidence
  - source (explicit / inferred / default)
- `UNKNOWN` is a valid state.
- UI must work fully without correct inference.

### Home Mode Resolution Rules (Non-negotiable)

These rules are the canonical contract for how the UI and backend behavior determine which Home mode to render. They are non-negotiable and must be preserved across prototypes and experiments.

1. **Explicit user choice overrides all inference.**
   - If a user explicitly selects a Home mode (Research, Build Tree, Explore, Temple), that mode is authoritative until the user changes it.

2. **Assisted session (helper) has second priority.**
   - If the session source indicates an assisted context (e.g., kiosk, FamilySearch Center, consultant flow), render the Assisted Session baseline regardless of tree state.

3. **Empty Tree baseline applies next.**
   - If user has an empty or near-empty tree and no explicit mode is set, render the Empty Tree baseline (with at most one optional activity).

4. **Contextual entry applies after empty tree.**
   - If the user arrived via a known entry point (record, search result, temple flow) and no higher-priority rule applies, honor that contextual continuation.

5. **No-context baseline is the fallback.**
   - When none of the above conditions apply, render the No-Context baseline.

6. **Confidence and source metadata must be exposed.**
   - The mode service must return `{ mode, confidence, source }`. UI must treat `confidence` < threshold as non-authoritative and preserve user ability to select mode manually.

7. **UI must be resilient to wrong inference.**
   - All Home UIs must work with `mode=UNKNOWN` and provide an obvious control for the user to pick or change mode.

---

## Key Home Principles

- Discovery invites users in; Home should not force direction.
- Activities are for **confidence and exploration**, not obligation.
- Baseline Home should feel quiet and safe.
- Tree creation emerges naturally from discovery.

### Home Non-Goals

The following are explicit non-goals for the logged-in Home. They are intended to prevent scope creep and to keep Home testable and separable from Navigation.

- **Home is not a replacement for Navigation.** Navigation remains the canonical place for destinations and deep links.
- **Home will not perform global layout changes that break navigation tests.** Do not add new navigation destinations or change nav labels as part of Home experiments.
- **Home will not contain more than one baseline activity for empty tree users.** (See the Empty Tree rules.)
- **Home will not auto-perform destructive actions or implicit saves.** All write actions must be explicit and user-confirmed.
- **Home is not the place for complex multi-step workflows.** Long workflows (indexing flows, temple reservation flows, advanced source attachments) remain destination pages or modals launched from nav or content.
- **Home will not depend on perfect inference.** Home must expose clear controls for users to choose modes or dismiss suggestions.

---

## Guiding Statement
> FamilySearch should feel valuable before a tree exists — and even more valuable once one does.

---

## Future Enhancements

### Potential Improvements
- [ ] Implement actual functionality for Messages drawer (send/receive)
- [ ] Add real-time notifications system
- [ ] Connect to actual FamilySearch API for recent people data
- [ ] Add keyboard navigation support
- [ ] Implement search functionality in drawers
- [ ] Add unit tests for shared components
- [ ] Add E2E tests for user flows

### Design System Opportunities
- Extract color palette to centralized config
- Create reusable Badge component
- Create reusable Avatar component
- Standardize spacing/sizing in design tokens
- Create Storybook for component documentation

---

## References

See IMPLEMENTATION.md for canonical implementation examples and DECISION_LOG.md for historical decisions.

*Last updated: 2026-01-27*
*Project: FamilySearch Navigation A/B Test*
