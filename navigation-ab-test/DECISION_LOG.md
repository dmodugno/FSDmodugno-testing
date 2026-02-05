# Navigation & AI Decision Log

This file is an **append-only log of decisions** related to navigation, home, and AI.

It exists to preserve historical context and prevent decisions
from being re-litigated after implementation.

Do not rewrite or delete entries.

---

## Decision Log

Use this section to append new decisions as they are made.

- **2026-01-23** — Established intent-based left navigation + right-side Details/Tools separation; AI assistant separate overlay.

- **2026-01-27** — **Person Detail Drawer Implementation**: Created PersonDetailDrawer component for Family Tree context. Opens when clicking person cards. Slides in from right at 320px width. Includes user-aware content with LDS-only badges (B, C, I, E, SP, SS) conditionally rendered based on `user.churchMembership === 'LDS'`. Uses UserContext hook for church membership checks.

- **2026-01-27** — **Drawer Coordination Pattern**: Established mutually exclusive pattern for PersonDetailDrawer and RightDrawer. Both always rendered in DOM but only one content panel (320px) visible at a time. Opening one automatically closes the other through coordinated state management in VariantA/VariantB parent components. Icon bar (64px) remains always visible.

- **2026-01-27** — **Drawer Width Standardization**: Standardized all drawer widths to 320px (w-80) for consistent user experience. PersonDetailDrawer, RightDrawer content panel, and RightDrawerB content panel all use same width. Icon bars remain at 64px (w-16).

- **2026-01-27** — **Single AI Chat Session Model**: Changed from multiple chat sessions to single session model (always ID: 1). AI Help button opens new chat or maximizes minimized chat (never creates multiple). Added "New" button in chat header to reset conversation (clear messages). Minimize/maximize functionality preserved. Rationale: Organizational decision to focus users on one conversation at a time, reduce cognitive load, maintain simpler mental model.

- **2026-01-27** — **Family Tree Integration**: Implemented clickable person cards in FamilyTreePage with CoupleCard components. Added onPersonClick prop pattern propagated from VariantA/VariantB → FamilyTreePage → CoupleCard. Clicking husband or wife sections triggers PersonDetailDrawer with person data. Hover effects applied to indicate clickability.

- **2026-01-27** — **AI Split-View Pattern (Variant A)**: Implemented split-view pattern for AI chat in Variant A while maintaining Variant B's overlay pattern. Three states: Collapsed (fixed overlay, 320px × 48px, dark grey), Split View (50/50 with drawer, rounded corners), Full Height (no drawer, no rounded corners). Conditional 320px content column only exists when AI or drawer is open (not stealing space when collapsed). Refactored AIChatOverlay to support dual modes: Variant A uses container mode with `isSplit` prop (dark theme, flex layout), Variant B uses overlay mode without `isSplit` (white theme, fixed positioning). Added `iconBarOnly` prop to RightDrawer for Variant A's split-view layout. Auto-adjusts AI height when drawer opens/closes. Rationale: Better space utilization, context preservation (AI + drawer coexist), backward compatibility for Variant B.
