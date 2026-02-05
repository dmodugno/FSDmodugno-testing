## Document Rules (Read First)

This document must comply with ARCHITECTURE.md.

If you add new guidance:
- Place it in the most specific section.
- Operational notes go in the Appendix.
- Rationale belongs in ARCHITECTURE.md.

## Table of Contents

- Component Architecture
- UI/UX Conventions
- Code Patterns
- File Organization
- Architectural Implementation Details
- How to Add New Context Drawers
- AI Assistant State Management
- AI Split-View Pattern Implementation (Variant A)
- Appendix: Development Workflow
- Appendix: Troubleshooting


# Navigation & AI Implementation Contract

This document defines **how** the navigation, drawers, and AI assistant
are implemented to satisfy the architectural constraints defined in ARCHITECTURE.md.

It contains **layout contracts, component responsibilities, interaction rules,
and canonical reference implementations**.

This document is the primary source of truth for:
- Engineers
- Claude Code
- Anyone building or refactoring the system

---

## Component Architecture

### Shared Components Pattern

The project uses a **shared components pattern** to maximize code reuse between Variant A and Variant B while allowing for variant-specific differences.

#### Shared Components

**1. LeftNavigation.jsx** (Shared left navigation)
- **Purpose**: Single source of truth for left navigation menu across both variants
- **Props**:
  - `isCollapsed` (boolean): Controls collapsed/expanded state
  - `onToggleSidebar` (function): Callback for toggle button
  - `currentPage` (string): Current active page
  - `onPageChange` (function): Navigation callback
  - `showHeader` (boolean): Controls header visibility (logo + toggle button)
- **Key Feature**: `showHeader` prop allows Variant A to show header, Variant B to hide it
- **Used by**: NavigationA.jsx (with header), LeftSidebarB.jsx (without header)

**2. RightDrawerContent.jsx** (Shared drawer content)
- **Purpose**: Centralized drawer content rendering for all drawer types
- **Props**:
  - `activeDrawer` (number): Current active drawer index
  - `drawerItems` (array): Array of drawer item definitions
  - `showEnvironmentSwitcher` (boolean): Controls environment switcher visibility
  - `onEnvironmentChange` (function): Callback for environment changes
- **Handles**:
  - Environment Switcher (Variant A only, drawer index 0)
  - Messages drawer (drawer index 1 in Variant A, index 0 in Variant B)
  - Notifications drawer
  - Recent People Viewed drawer (drawer index 3 in Variant A, index 2 in Variant B)
  - Default placeholder content
- **Used by**: RightDrawer.jsx, RightDrawerB.jsx

**3. RecentPeopleViewed.jsx** (Shared drawer component)
- **Purpose**: "Recent people viewed" drawer UI
- **Features**:
  - Search box with GO button
  - Logged-in user profile section
  - Divider line
  - "Recently Viewed People" section with EDIT link
  - List of people with badges (purple/yellow/blue)
  - TreePedigree icon for each person
  - Empty state with "+ ADD UNCONNECTED PERSON"
- **Used by**: RightDrawerContent.jsx

**4. Messages.jsx** (Shared drawer component)
- **Purpose**: Messages/Chats drawer UI
- **Features**:
  - Search bar for people and chats
  - Collapsible sections: "Unread", "Private", "Family Groups", "Threads"
  - "CREATE PRIVATE CHAT" button
  - Chat list with avatars, names, message previews, dates
  - "Show event chats" toggle at bottom
  - UI-only implementation (no functionality)
- **Used by**: RightDrawerContent.jsx

#### Page-Specific Components

**FamilyTree/** (Family Tree visualization)

**FamilyTreePage.jsx**
- **Purpose**: Main family tree visualization page
- **Props**:
  - `onPersonClick` (function): Callback when person card is clicked
- **Features**:
  - Multi-generation pedigree view (current person + 2 parent generations)
  - Landscape/portrait view toggle
  - Connection lines between generations
  - Integration with PersonDetailDrawer via click handlers

**CoupleCard.jsx**
- **Purpose**: Displays husband and wife as a single card unit
- **Props**:
  - `husband` (object): Husband person data
  - `wife` (object): Wife person data
  - `marriage` (object): Marriage information
  - `hasChildren` (boolean): Whether couple has children
  - `showNavigation` (boolean): Show navigation arrows
  - `onPersonClick` (function): Click handler for person selection
- **Features**:
  - Click handlers on husband and wife sections
  - Hover effects for clickable person cards
  - Profile photos, names, lifespans
  - Marriage date and location
  - Navigation chevron arrows (optional)

**PersonDetailDrawer.jsx**
- **Purpose**: Shows detailed person information in context drawer
- **Props**:
  - `person` (object): Selected person data
  - `isOpen` (boolean): Drawer visibility
  - `onClose` (function): Close callback
  - `isSplit` (boolean, optional): For Variant A split-view coordination
- **Features**:
  - Slides in from right (320px width)
  - User-aware content (LDS badges conditional)
  - Quality score badge
  - Sources/Memories/Collaborate links
  - PERSON/TREE toggle buttons
  - Vitals, Events, Facts sections
  - Brief Life History section
- **User Context**: Uses `useUser()` hook for conditional rendering
- **Coordination**: Mutually exclusive with RightDrawer
- **Variant A Behavior**: Renders in flex container, works with split-view AI chat

#### Variant-Specific Wrapper Components

**NavigationA.jsx**
- Wrapper for LeftNavigation with `showHeader={true}`
- Maintains API compatibility with Variant A page

**LeftSidebarB.jsx**
- Wrapper for LeftNavigation with `showHeader={false}`
- Maintains API compatibility with Variant B page

**RightDrawer.jsx** (Variant A)
- 9 drawer icons including environment switcher
- Uses RightDrawerContent with `showEnvironmentSwitcher={true}`
- Handles environment change toast notifications
- Supports `iconBarOnly` prop for split-view layout (renders only 64px icon bar)

**RightDrawerB.jsx** (Variant B)
- 5 drawer icons (no environment switcher, language, help removed)
- Uses RightDrawerContent with `showEnvironmentSwitcher={false}`
- Uses `drawerItems.slice(3)` for icon bar (indices 3-7)

**AIChatOverlay.jsx** (Dual-mode component)
- Supports both Variant A (container mode) and Variant B (overlay mode)
- Mode detection via `isSplit` prop presence
- Variant A: Dark grey theme, flex container, integrates with split-view
- Variant B: White theme, fixed overlay, independent positioning

### When to Create Shared Components

Create a shared component when:
1. **Same UI appears in both variants** - Even with minor differences, use props to handle variants
2. **Logic is duplicated** - Consolidate business logic in one place
3. **Design changes need to propagate** - Single source of truth for design updates
4. **Code maintainability improves** - Reduces risk of inconsistencies

Keep components separate when:
1. **Fundamental differences exist** - Different structures or behaviors
2. **No code reuse benefit** - Completely different implementations
3. **Props would be too complex** - Over-parameterization makes code harder to understand

---

## UI/UX Conventions

### Color System

**Active/Selected States**
- Background: `bg-green-50`
- Text: `text-green-700`
- Border: `border-green-600`
- Border width: `border-l-4` (left border for navigation items)

**Badge Colors** (for person/group types)
- **Purple** (Private Person): `bg-purple-100 text-purple-700`
- **Yellow** (Public Person): `bg-yellow-100 text-yellow-700`
- **Blue** (Family Groups): `bg-blue-100 text-blue-700`

**Hover States**
- Gray background: `hover:bg-gray-50` or `hover:bg-gray-100`
- Only apply when item is not active

**Text Colors**
- Primary: `text-gray-900`
- Secondary: `text-gray-700`
- Tertiary/descriptions: `text-gray-500`
- Interactive elements: `text-gray-400` (icons that change on interaction)

### Spacing & Layout

**Padding Standards**
- Large items (navigation buttons): `p-4`
- Medium items (sub-items, drawer sections): `p-3`
- Small items (nested sub-items): `px-4 py-2`

**Icon Sizes**
- Main navigation icons: `w-6 h-6`
- Drawer icons: `w-5 h-5`
- Chevrons (main sections): `w-4 h-4`
- Chevrons (nested): `w-3 h-3`

**Spacing Between Elements**
- Icon to text: `mr-3`
- Inline elements: `ml-2`

### Typography

**Font Weights**
- Navigation labels: `font-medium`
- Active items: `font-medium`
- Section headers: `font-semibold`
- Descriptions: `font-normal` (default)

**Font Sizes**
- Navigation labels: `text-base` (default)
- Descriptions: `text-xs`
- Sub-items: `text-sm`
- Section headers: `text-sm font-semibold`

### Borders

**Dividers**
- Navigation items: `border-b border-gray-100`
- Major sections: `border-t-2 border-gray-200`
- Drawer header: `border-b border-gray-200`
- Component sections: `border-t border-gray-200`

**Sidebar Borders**
- Right border: `border-r border-gray-200`

---

## Code Patterns

### SVG Chevron Pattern (Expand/Collapse Indicators)

**Always use inline SVG chevrons**, never Unicode characters or image files.

**Standard Chevron Implementation:**
```jsx
<svg
  className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 5l7 7-7 7"
  />
</svg>
```

**Size Variations:**
- Main sections: `w-4 h-4`
- Nested sub-items: `w-3 h-3`

**States:**
- Collapsed: `rotate-0` (points right)
- Expanded: `rotate-90` (points down)
- Always include `transition-transform` for smooth animation

**Why inline SVG?**
- No dependency on icon files that may not exist
- Consistent rendering across all browsers
- Easy to style with Tailwind classes
- Single source of truth in code

### Collapsible Sections Pattern

**State Management:**
```jsx
const [expandedSection, setExpandedSection] = useState(null);
```

**Expansion Toggle:**
```jsx
const toggleSection = (section) => {
  setExpandedSection(expandedSection === section ? null : section);
};
```

**Animated Content:**
```jsx
<div
  className={`overflow-hidden transition-all duration-300 ease-in-out ${
    expandedSection === section ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
  }`}
>
  {/* Content */}
</div>
```

**Key Points:**
- Use `overflow-hidden` to clip content during animation
- `max-h-[2000px]` for expanded (adjust based on content height)
- `max-h-0` for collapsed
- `opacity-100` / `opacity-0` for fade effect
- `transition-all duration-300 ease-in-out` for smooth animation

### Active State Highlighting

**Navigation Items with Green Highlight:**
```jsx
className={`${
  currentPage === item.label
    ? 'bg-green-50 border-l-4 border-green-600 text-green-700'
    : 'hover:bg-gray-50'
}`}
```

**Important Rules:**
1. Active state shows green background (`bg-green-50`)
2. Active state includes left border (`border-l-4 border-green-600`)
3. Active state changes text color (`text-green-700`)
4. Hover state only applies when NOT active
5. For sections, highlight when collapsed OR when section contains active page

### Badge Pattern

**Badge Component:**
```jsx
<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
  Private Person
</span>
```

**Badge Colors:**
- Purple: `bg-purple-100 text-purple-700`
- Yellow: `bg-yellow-100 text-yellow-700`
- Blue: `bg-blue-100 text-blue-700`

### Avatar Pattern (Initials)

```jsx
<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700">
  {initials}
</div>
```

**Sizes:**
- Default: `w-10 h-10`
- Adjust based on context

---

## File Organization

### Component Structure

```
src/components/
├── Shared Components (used by both variants)
│   ├── LeftNavigation.jsx         # Shared left navigation
│   ├── RightDrawerContent.jsx     # Shared drawer content logic
│   ├── RecentPeopleViewed.jsx     # Recent people drawer
│   ├── Messages.jsx               # Messages/chats drawer
│   └── AIChatOverlay.jsx          # AI chat interface
│
├── Variant A Wrappers
│   ├── NavigationA.jsx            # Wrapper: LeftNavigation with header
│   └── RightDrawer.jsx            # 9 icons, environment switcher
│
├── Variant B Wrappers
│   ├── LeftSidebarB.jsx           # Wrapper: LeftNavigation without header
│   ├── TopNavigationB.jsx         # Variant B top navigation bar
│   └── RightDrawerB.jsx           # 5 icons, no environment switcher
│
├── FamilyTree/ (Page-specific components)
│   ├── FamilyTreePage.jsx         # Main family tree visualization
│   ├── CoupleCard.jsx             # Husband/wife card component
│   ├── PersonDetailDrawer.jsx     # Person details context drawer
│   ├── index.js                   # Exports for FamilyTree components
│   └── mockFamilyData.js          # Mock family tree data
│
└── Other Components
    ├── Header.jsx                 # Test banner header
    ├── Toast.jsx                  # Toast notifications
    ├── FloatingTestPanel.jsx      # Test mode panel (Ctrl+Shift+T)
    ├── DashboardContent.jsx       # Mock logged-in content
    └── Home/                      # Home page components
```

### When to Edit Shared vs Variant Files

**Edit Shared Component When:**
- Design change affects both variants
- Bug fix needed in common functionality
- New feature applies to both variants
- Navigation items need to be added/removed

**Edit Variant Wrapper When:**
- Adding/removing drawer icons
- Changing variant-specific behavior (e.g., toast notifications)
- Adjusting variant-specific props
- Modifying header/top nav structure

**Example Scenarios:**

| Change | File to Edit |
|--------|-------------|
| Add new menu item to navigation | LeftNavigation.jsx (shared) |
| Fix chevron icon bug | LeftNavigation.jsx (shared) |
| Add 10th drawer icon in Variant A | RightDrawer.jsx (Variant A only) |
| Change "Recent People" UI | RecentPeopleViewed.jsx (shared) |
| Add new collapsible section in Messages | Messages.jsx (shared) |
| Remove environment switcher from Variant A | RightDrawer.jsx (Variant A only) |

---

## Appendix: Development Workflow

### Local Development

```bash
# Navigate to project
cd "/Users/dmodugno/Library/CloudStorage/OneDrive-ChurchofJesusChrist/UX Hackaton/navigation-ab-test"

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev

# Open browser to:
# http://localhost:5173/navigation-ab-test/
# http://localhost:5173/navigation-ab-test/variant-b
```

### Testing Both Variants

1. **Variant A**: `http://localhost:5173/navigation-ab-test/`
2. **Variant B**: `http://localhost:5173/navigation-ab-test/variant-b`
3. **With User Types**: Add `?membership=LDS&experience=casual`
4. **Toggle Test Banner**: `Cmd+Shift+T` (Mac) or `Ctrl+Shift+T` (Windows)

### Making Changes

1. **Identify scope**: Does change affect both variants or just one?
2. **Edit appropriate file**: Shared component or variant wrapper
3. **Test both variants**: Ensure no regressions
4. **Check responsive**: Test collapsed/expanded states
5. **Verify interactions**: Hover, active, expanded states work correctly

### Building & Deploying

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Verify deployment
# Check: https://yourusername.github.io/navigation-ab-test/
```

### Git Workflow

```bash
# Check status
git status

# Stage changes
git add <specific-files>  # Prefer specific files over git add .

# Commit with meaningful message
git commit -m "Add Schedule Temple Appointment menu item

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to remote
git push origin main
```

**Important:**
- Never use `git add -A` or `git add .` carelessly (may include sensitive files)
- Always review `git status` and `git diff` before committing
- Write clear, descriptive commit messages
- Never commit `.env` files or credentials

---

## Common Patterns Reference

### Adding a New Menu Item

```jsx
// In LeftNavigation.jsx allMenuItems array
{
  id: 'unique-id',
  icon: `${baseUrl}icons/IconName.svg`,
  label: 'Menu Label',
  description: 'Short description',
  subItems: [
    { label: 'Sub Item 1', link: '#' },
    { label: 'Sub Item 2', link: '#' }
  ]
}
```

### Adding Nested Expandable Sub-Items

```jsx
{
  label: 'Parent Item',
  expandable: true,
  subItems: [
    { label: 'Nested Item 1', link: '#' },
    { label: 'Nested Item 2', link: '#' }
  ]
}
```

### Creating a Toggle Switch

```jsx
<button
  onClick={() => setShowOption(!showOption)}
  className="w-full flex items-center justify-between"
>
  <span className="text-sm text-gray-700">Option Label</span>
  <div
    className={`w-11 h-6 rounded-full transition-colors ${
      showOption ? 'bg-green-600' : 'bg-gray-300'
    }`}
  >
    <div
      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform mt-0.5 ${
        showOption ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
      }`}
    />
  </div>
</button>
```

---

## Appendix: Troubleshooting

### Chevrons Not Showing
- Check that you're using inline SVG, not image files or Unicode
- Verify className includes `transition-transform` and `rotate-90` / `rotate-0`

### Active Highlighting Not Working
- Ensure `currentPage` prop matches menu item label exactly
- Check conditional logic: `currentPage === item.label`
- For sections, use `isSectionActive(item.subItems)` helper

### Drawer Content Not Showing Correctly
- Verify drawer index calculation in RightDrawerContent.jsx
- Check `showEnvironmentSwitcher` prop is set correctly
- Ensure drawer indices align between icon bar and content

### Hover States Conflicting with Active States
- Hover should only apply when item is NOT active
- Use conditional: `${isActive ? 'bg-green-50' : 'hover:bg-gray-50'}`

---

## AI Split-View Pattern — Invariants Summary

The following invariants must hold for all implementations and refactors:

- The right-side content column width is fixed at 320px (`w-80`).
- The icon bar width is fixed at 64px (`w-16`).
- The content column exists only when at least one of the following is true:
  - A global tool drawer is open
  - A context drawer is open (e.g., Person Detail, Organize Gallery)
  - AI chat is open and not minimized
- Context drawers are mutually exclusive with each other and with global tool drawers.
- Context drawers MUST close when the user navigates to a different page.
- Global tool drawers MUST remain open when navigating between pages.
- AI chat may coexist with a context drawer via split view.
- Minimizing AI chat removes the content column if no drawer is open.

Do not change these invariants without updating ARCHITECTURE.md and DECISION_LOG.md.

## Architectural Implementation Details

This section contains implementation code extracted from architectural decisions. See ARCHITECTURE.md for the rationale behind these patterns.

### Navigation Highlight Logic Implementation

```jsx
className={`${
  isSectionActive(item.subItems) && (isCollapsed || expandedSection !== item.id)
    ? 'bg-green-50 border-l-4 border-green-600'
    : 'hover:bg-gray-50'
}`}
```

### Drawer Content Indexing Implementation

```jsx
const messagesIndex = showEnvironmentSwitcher ? 1 : 0;
const recentPeopleIndex = showEnvironmentSwitcher ? 3 : 2;
```

### Person Detail Drawer Coordination

**Drawer Coordination:**
```jsx
// In VariantA/VariantB
const handlePersonClick = (person) => {
  setSelectedPerson(person);
  setActiveDrawer(null); // Close right drawer
};

const handleDrawerToggle = (index) => {
  setActiveDrawer(activeDrawer === index ? null : index);
  if (activeDrawer !== index) {
    setSelectedPerson(null); // Close person drawer
  }
};
```

**LDS Badge Conditional Rendering:**
```jsx
import { useUser } from '../../contexts/UserContext';

const { user } = useUser();

{user && user.churchMembership === 'LDS' && (
  <div className="flex gap-2 mb-6">
    {['B', 'C', 'I', 'E', 'SP', 'SS'].map((badge) => (
      <button key={badge}>{badge}</button>
    ))}
  </div>
)}
```

---

## How to Add New Context Drawers

This section provides a step-by-step guide for adding new page-specific context drawers following the established pattern.

### Context Drawers vs Global Tool Drawers

**Context Drawers** (Page-Specific):
- Examples: PersonDetailDrawer, OrganizeGalleryDrawer, RecordDetailDrawer
- Purpose: Show contextual information specific to the current page
- Behavior: **MUST close when user navigates to a different page**
- State: Managed at parent level (VariantA.jsx / VariantB.jsx)
- Location: Rendered between `<main>` and `<RightDrawer>` as siblings

**Global Tool Drawers** (RightDrawer icons):
- Examples: Messages, Notifications, Recent People Viewed, To-do List
- Purpose: Global utilities that work across all pages
- Behavior: **STAY OPEN when navigating between pages**
- State: Managed via `activeDrawer` at parent level
- Location: Rendered within RightDrawer/RightDrawerB component

### When to Use Context Drawer Pattern

Use this pattern when:
- Drawer shows information specific to an item on the current page
- Drawer content is only relevant to one page/feature
- User interaction on page triggers drawer (e.g., clicking person, clicking organize button)
- Drawer should close when user leaves the page

### Step-by-Step Implementation

#### Step 1: Create the Drawer Component

Create a new component file (e.g., `NewContextDrawer.jsx`):

```jsx
export default function NewContextDrawer({ isOpen, onClose }) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="bg-white h-full overflow-y-auto w-full">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Drawer Title</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Close drawer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div>
          {/* Your drawer content here */}
        </div>
      </div>
    </div>
  );
}
```

**Key Rules for Component:**
- ✅ Use `bg-white h-full overflow-y-auto w-full` on outer div
- ✅ Keep it simple - NO positioning, NO width transitions, NO z-index
- ✅ Accept `isOpen` and `onClose` props (even if `isOpen` isn't used internally)
- ✅ Always render content (parent controls visibility)

#### Step 2: Add State at Parent Level

In both `VariantA.jsx` and `VariantB.jsx`, add state for your drawer:

```jsx
const [newContextDrawerOpen, setNewContextDrawerOpen] = useState(false);
```

#### Step 3: Add Import

```jsx
import NewContextDrawer from './components/NewContextDrawer';
```

#### Step 4: Add Handler Functions

```jsx
// New context drawer management
const handleNewContextDrawerClick = () => {
  setNewContextDrawerOpen(!newContextDrawerOpen);
  // Close other context drawers and global drawer when opening
  if (!newContextDrawerOpen) {
    setActiveDrawer(null);
    setSelectedPerson(null);
    setOrganizeGalleryOpen(false); // Close other context drawers
  }
};

const handleCloseNewContextDrawer = () => {
  setNewContextDrawerOpen(false);
};
```

#### Step 5: Update Mutual Exclusivity

Update existing handlers to close your new drawer:

```jsx
// In handleDrawerToggle
const handleDrawerToggle = (index) => {
  setActiveDrawer(activeDrawer === index ? null : index);
  if (activeDrawer !== index) {
    setSelectedPerson(null);
    setOrganizeGalleryOpen(false);
    setNewContextDrawerOpen(false); // Add this line
  }
};

// In handlePersonClick
const handlePersonClick = (person) => {
  setSelectedPerson(person);
  setActiveDrawer(null);
  setOrganizeGalleryOpen(false);
  setNewContextDrawerOpen(false); // Add this line
};

// In handleOrganizeGalleryClick
const handleOrganizeGalleryClick = () => {
  setOrganizeGalleryOpen(!organizeGalleryOpen);
  if (!organizeGalleryOpen) {
    setActiveDrawer(null);
    setSelectedPerson(null);
    setNewContextDrawerOpen(false); // Add this line
  }
};
```

#### Step 6: Close on Page Navigation

Update `handlePageChange` to close context drawer:

```jsx
const handlePageChange = (pageName) => {
  setCurrentPage(pageName);
  window.location.hash = pageName;

  // Close context drawers when changing pages (global tool drawers stay open)
  setSelectedPerson(null);
  setOrganizeGalleryOpen(false);
  setNewContextDrawerOpen(false); // Add this line
};
```

#### Step 7: Render Drawer in Layout

**For Variant B** (simpler layout):

```jsx
{newContextDrawerOpen && (
  <div className="w-80 flex-shrink-0">
    <NewContextDrawer
      isOpen={true}
      onClose={handleCloseNewContextDrawer}
    />
  </div>
)}
```

Place this between `<main>` and `<RightDrawerB>` as a sibling.

**For Variant A** (split-view with AI):

Add to the content column conditional:

```jsx
{((chat && !chat.isMinimized) || activeDrawer !== null || selectedPerson || organizeGalleryOpen || newContextDrawerOpen) && (
  <div className="flex flex-col w-80 border-l-2 border-gray-200">
    {/* Top section - Drawer area */}
    {(activeDrawer !== null || selectedPerson || organizeGalleryOpen || newContextDrawerOpen) && (
      <div className={/* ... */}>
        {selectedPerson ? (
          <PersonDetailDrawer /* ... */ />
        ) : organizeGalleryOpen ? (
          <OrganizeGalleryDrawer /* ... */ />
        ) : newContextDrawerOpen ? (
          <NewContextDrawer
            isOpen={true}
            onClose={handleCloseNewContextDrawer}
          />
        ) : activeDrawer !== null ? (
          /* RightDrawer content */
        ) : null}
      </div>
    )}
    {/* AI Chat section */}
  </div>
)}
```

Also update AI split detection:

```jsx
isSplit={activeDrawer !== null || !!selectedPerson || organizeGalleryOpen || newContextDrawerOpen}
```

And the collapsed AI bar button text:

```jsx
{activeDrawer !== null || selectedPerson || organizeGalleryOpen || newContextDrawerOpen ? 'Open Split' : 'Open Full'}
```

#### Step 8: Pass Callback to Page Component

Update the page component call to pass the handler:

```jsx
<YourPage onOpenNewContextDrawer={handleNewContextDrawerClick} />
```

In the page component, call this when user triggers the drawer:

```jsx
export default function YourPage({ onOpenNewContextDrawer }) {
  return (
    <div>
      <button onClick={onOpenNewContextDrawer}>
        Open Drawer
      </button>
    </div>
  );
}
```

### Anti-Patterns (DO NOT DO THIS)

❌ **Do NOT manage state in page components**
```jsx
// WRONG - state inside page component
function GalleryPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // ...
}
```

❌ **Do NOT use fixed positioning in drawer component**
```jsx
// WRONG - fixed positioning
<div className="fixed right-0 top-0">
```

❌ **Do NOT add width transitions in drawer component**
```jsx
// WRONG - width transitions handled by component
<div className={`transition-all ${isOpen ? 'w-80' : 'w-0'}`}>
```

❌ **Do NOT render drawer inside page component**
```jsx
// WRONG - drawer rendered in page
function GalleryPage() {
  return (
    <div>
      {/* Page content */}
      <OrganizeGalleryDrawer /> {/* WRONG! */}
    </div>
  );
}
```

❌ **Do NOT forget to close on page navigation**
```jsx
// WRONG - missing in handlePageChange
const handlePageChange = (pageName) => {
  setCurrentPage(pageName);
  // Missing: setNewContextDrawerOpen(false);
}
```

### Checklist

When adding a new context drawer, verify:

- [ ] Component uses `bg-white h-full overflow-y-auto w-full` (no positioning/transitions)
- [ ] State added at parent level (VariantA.jsx and VariantB.jsx)
- [ ] Handler functions added (open and close)
- [ ] Mutual exclusivity updated (all handlers close your drawer)
- [ ] Page navigation closes drawer (`handlePageChange`)
- [ ] Drawer rendered between `<main>` and `<RightDrawer>` with conditional wrapper
- [ ] Variant A: Added to content column conditional and AI split detection
- [ ] Callback passed to page component
- [ ] Page component calls callback on user action

### Complete Reference Implementation

See OrganizeGalleryDrawer implementation:
- Component: `src/components/OrganizeGalleryDrawer.jsx`
- Parent integration: `src/VariantA.jsx` lines 21, 97-108, 131, 144-147, 162-166, 206, 235
- Parent integration: `src/VariantB.jsx` lines 21, 97-108, 118, 151-158
- Page integration: `src/components/GalleryPage.jsx` line 1, 121

---

### AI Assistant State Management

**State Management:**
```jsx
// Single chat object, not array
const [chat, setChat] = useState(null);

// AI Help button behavior
const handleOpenNewChat = () => {
  if (!chat) {
    // Create new chat if none exists
    setChat({ id: 1, title: 'AI Chat', messages: [], isMinimized: false });
  } else if (chat.isMinimized) {
    // Maximize existing chat if minimized
    setChat({ ...chat, isMinimized: false });
  }
  // If chat exists and is open, do nothing
};
```

**Reset Functionality:**
```jsx
const handleResetChat = () => {
  if (chat) {
    setChat({ ...chat, messages: [] }); // Clear messages, keep session
  }
};

// In AIChatOverlay header
<button onClick={onReset}>New</button>
```

---

## AI Split-View Pattern Implementation (Variant A)

This section contains the complete implementation details for Variant A's split-view AI pattern. See ARCHITECTURE.md for the architectural decision and key benefits.

### Three AI States (Variant A)

**1. Collapsed State**
- Small header bar at bottom-right (320px wide, 48px height)
- Dark grey background (`bg-[#3a3a3a]`) with white text
- Fixed overlay positioned at `right: 64px` (next to icon bar)
- Rounded top corners (8px)
- Displays: AI icon + "AI Assistant" label + action button
- Button shows context-aware text:
  - "Open Split" when drawer/person detail is open
  - "Open Full" when no drawer is open
- Only visible when chat doesn't exist OR chat is minimized
- Does NOT steal space from main content area

**2. Split View State**
- 320px content column appears (flex-col layout)
- Drawer/PersonDetail takes top 50% (h-1/2)
- AI chat takes bottom 50% (h-1/2)
- Rounded top corners on AI container (8px)
- Dark grey outer container with white inner chat area
- Auto-adjusts when drawer opens/closes
- Border between drawer and AI (`border-b border-gray-300`)

**3. Full Height State**
- AI expands to full height of 320px content column
- No drawer/PersonDetail visible
- NO rounded corners (flat top edge)
- Dark grey outer container with white inner chat area
- Content column only exists when AI is open

### Layout Architecture

**Conditional Content Column:**
```jsx
{/* Right side container with split view support */}
<div className="flex h-full">
  {/* Content column (320px) - only when AI is open OR drawer is open */}
  {((chat && !chat.isMinimized) || activeDrawer !== null || selectedPerson) && (
    <div className="flex flex-col w-80">
      {/* Top section - Drawer area */}
      {(activeDrawer !== null || selectedPerson) && (
        <div className={`${
          chat && !chat.isMinimized ? 'h-1/2 border-b border-gray-300' : 'h-full'
        } overflow-y-auto bg-white`}>
          {/* Drawer content */}
        </div>
      )}

      {/* Bottom section - AI Chat area */}
      {chat && !chat.isMinimized && (
        <div className={`${
          activeDrawer !== null || selectedPerson ? 'h-1/2' : 'h-full'
        } overflow-hidden`}>
          <AIChatOverlay isSplit={activeDrawer !== null || !!selectedPerson} />
        </div>
      )}
    </div>
  )}

  {/* Icon bar (64px) */}
  <RightDrawer iconBarOnly={true} />
</div>

{/* Collapsed/Minimized AI bar (fixed overlay) */}
{(!chat || chat.isMinimized) && (
  <div className="fixed bottom-0 right-16 w-80 h-12 bg-[#3a3a3a] rounded-t-lg">
    {/* Dark grey header with white text */}
  </div>
)}
```

### State Coordination

**Opening AI when drawer is open:**
- AI auto-compresses to bottom 50%
- Drawer remains in top 50%
- Content column (320px) appears/expands

**Opening drawer when AI is at full height:**
- AI auto-compresses to bottom 50%
- Drawer takes top 50%
- Content column already exists, splits vertically

**Closing drawer when in split view:**
- AI auto-expands to full height (h-full)
- Content column remains (320px)
- Rounded corners removed from AI

**Minimizing AI:**
- Content column disappears if no drawer is open
- Collapsed bar appears as fixed overlay
- Main content area reclaims space

### Dual-Mode AIChatOverlay Component

**Mode Detection:**
```jsx
// Detect if we're in new mode (Variant A) or old mode (Variant B)
const isNewMode = isSplit !== undefined;
```

**Variant A (Container Mode):**
- Requires `isSplit` prop (boolean)
- Dark grey outer container (`bg-[#3a3a3a]`)
- White inner chat area with dark border
- Fits parent flex container (w-full, h-full)
- Rounded corners when `isSplit === true`
- NO rounded corners when `isSplit === false` (full height)
- Minimized state handled by parent (returns null)

**Variant B (Overlay Mode):**
- No `isSplit` prop provided (undefined)
- White theme throughout
- Fixed positioning at bottom-right
- 400px × 600px dimensions
- Manages own minimized state (renders minimized bar)

**Conditional Rendering Logic:**
```jsx
export default function AIChatOverlay({ chat, onClose, onMinimize, onMaximize, onReset, isMinimized, index, drawerOpen, isSplit }) {
  const isNewMode = isSplit !== undefined;

  // Old minimized rendering (Variant B)
  if (isMinimized && !isNewMode) {
    return (/* fixed overlay minimized bar */);
  }

  // New minimized state handled by parent (Variant A)
  if (isMinimized && isNewMode) {
    return null;
  }

  // Old overlay mode (Variant B)
  if (!isNewMode) {
    return (/* fixed overlay 400px × 600px white theme */);
  }

  // New container mode (Variant A)
  return (
    <div className={`bg-[#3a3a3a] flex flex-col w-full h-full ${
      isSplit ? 'rounded-t-lg shadow-lg' : ''
    }`}>
      {/* Dark grey header with white text */}
      <div className="flex-1 bg-white border-2 border-[#3a3a3a] m-2 rounded-lg">
        {/* White chat content area */}
      </div>
    </div>
  );
}
```

### RightDrawer Icon-Bar-Only Mode

**Implementation:**
```jsx
export default function RightDrawer({ activeDrawer, onDrawerToggle, iconBarOnly = false }) {
  if (iconBarOnly) {
    return (
      <aside className="w-16 bg-white border-l border-gray-200 h-full flex flex-col items-center py-4">
        {/* Just the icon bar */}
      </aside>
    );
  }
  // Normal mode - render both panel and icon bar
  return (/* ... */);
}
```

### Design Specifications

**Colors:**
- AI container background: `#3a3a3a` (dark grey)
- AI header text: white
- Chat content background: white
- Chat content border: `border-2 border-[#3a3a3a]`

**Dimensions:**
- Content column width: 320px (`w-80`)
- Icon bar width: 64px (`w-16`)
- Collapsed bar height: 48px (`h-12`)
- Collapsed bar width: 320px (`w-80`)

**Rounded Corners:**
- Collapsed state: 8px top corners (`rounded-t-lg`)
- Split view: 8px top corners (`rounded-t-lg`)
- Full height: NO rounded corners

**Positioning:**
- Collapsed bar: `fixed bottom-0 right-16` (right of icon bar)
- Content column: Flexbox layout (not fixed)

