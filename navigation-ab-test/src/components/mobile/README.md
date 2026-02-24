# Mobile Navigation System

## Overview

This directory contains the **canonical mobile navigation implementation** following the strict architectural rules defined in:

- **ARCHITECTURE.md** → Mobile Navigation & AI State Machine
- **IMPLEMENTATION.md** → Mobile State Machine Implementation Contract

## Hard Requirements

### 1. Single Discriminated State

```javascript
// ✅ CORRECT - Single state
const { mobileSurface } = useMobileNavigation();

// ❌ WRONG - Multiple booleans
const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
const [isAIOpen, setIsAIOpen] = useState(false);
```

### 2. Only One Surface Active at a Time

Valid states (mutually exclusive):
- `NONE` - Main content only
- `HAMBURGER` - Full-screen navigation overlay
- `BOTTOM_SHEET_NOTIFICATIONS` - Notifications bottom sheet
- `BOTTOM_SHEET_MESSAGES` - Messages bottom sheet
- `BOTTOM_SHEET_TOOLS` - Tools hub
- `BOTTOM_SHEET_TOOL_CHILD` - Specific tool detail
- `AI_FULL` - Full-screen AI mode

### 3. Enforced Invariants

The system **MUST** guarantee:

✅ Hamburger never coexists with bottom sheets
✅ Bottom sheets never stack
✅ AI_FULL never coexists with hamburger or bottom sheets
✅ Hamburger always replaces current surface immediately
✅ Bottom sheet switching animates close → open
✅ AI minimize preserves session
✅ AI close destroys session
✅ Navigation does not mutate AI session

## Architecture

### State Machine Hook

**`useMobileNavigation.js`** - Centralized state management

```javascript
const {
  // State
  mobileSurface,      // Current active surface
  aiSession,          // AI session (persistent)
  selectedTool,       // Currently selected tool

  // Hamburger
  openHamburger,
  closeHamburger,

  // Bottom Sheets
  openNotifications,
  openMessages,
  openTools,
  openToolChild,
  closeBottomSheet,

  // AI
  openAIFull,
  minimizeAI,
  closeAI,
  resetAIChat,

  // Navigation
  navigateToPage,

  // Helpers
  isActive,
  SURFACES
} = useMobileNavigation();
```

### Components

1. **`HamburgerOverlay.jsx`** - Full-screen navigation menu
   - Accordion behavior (one section expanded at a time)
   - Auto-expands section containing current page
   - Selecting destination closes overlay and navigates

2. **`BottomSheet.jsx`** - Generic bottom sheet container
   - Backdrop + sliding animation
   - Configurable height
   - Close on backdrop tap

3. **`ToolsHub.jsx`** - Tools selection list
   - Displayed in bottom sheet
   - Selecting tool replaces hub with tool detail (not stacked)

4. **`MobileAIFull.jsx`** - Full-screen AI assistant
   - Replaces entire app chrome
   - Session persists when minimized
   - Session destroyed when closed

5. **`MobileTopBar.jsx`** - Mobile navigation bar
   - Hamburger button
   - Logo/branding
   - Tool icons (Notifications, Messages, Tools)

## Usage

### Step 1: Import Hook and Components

```javascript
import { useMobileNavigation } from '../hooks/useMobileNavigation';
import {
  HamburgerOverlay,
  BottomSheet,
  ToolsHub,
  MobileAIFull,
  MobileTopBar
} from './components/mobile';
```

### Step 2: Initialize State Machine

```javascript
const {
  mobileSurface,
  aiSession,
  openHamburger,
  openNotifications,
  openMessages,
  openTools,
  openAIFull,
  minimizeAI,
  closeAI,
  closeBottomSheet,
  isActive,
  SURFACES
} = useMobileNavigation();
```

### Step 3: Detect Mobile Screen

```javascript
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768); // Tailwind 'md' breakpoint
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);
```

### Step 4: Render Layout

```javascript
if (isMobile) {
  return (
    <div className="h-screen flex flex-col">
      {/* INVARIANT: AI_FULL replaces all chrome */}
      {isActive(SURFACES.AI_FULL) ? (
        <MobileAIFull
          aiSession={aiSession}
          onMinimize={minimizeAI}
          onClose={closeAI}
        />
      ) : (
        <>
          {/* Top Bar */}
          <MobileTopBar
            onOpenHamburger={openHamburger}
            onOpenNotifications={openNotifications}
            onOpenMessages={openMessages}
            onOpenTools={openTools}
          />

          {/* Main Content */}
          <main className="flex-1">
            {/* Your page content */}
          </main>

          {/* INVARIANT: Only one surface at a time */}

          {/* Hamburger */}
          {isActive(SURFACES.HAMBURGER) && (
            <HamburgerOverlay
              isOpen={true}
              onClose={closeHamburger}
              currentPage={currentPage}
              onNavigate={handlePageChange}
              menuItems={menuItems}
            />
          )}

          {/* Notifications */}
          {isActive(SURFACES.BOTTOM_SHEET_NOTIFICATIONS) && (
            <BottomSheet
              isOpen={true}
              onClose={closeBottomSheet}
              title="Notifications"
            >
              {/* Notifications content */}
            </BottomSheet>
          )}

          {/* Messages */}
          {isActive(SURFACES.BOTTOM_SHEET_MESSAGES) && (
            <BottomSheet
              isOpen={true}
              onClose={closeBottomSheet}
              title="Messages"
            >
              <Messages />
            </BottomSheet>
          )}

          {/* Tools Hub */}
          {isActive(SURFACES.BOTTOM_SHEET_TOOLS) && (
            <BottomSheet
              isOpen={true}
              onClose={closeBottomSheet}
              title="Tools"
            >
              <ToolsHub tools={tools} onSelectTool={handleToolSelect} />
            </BottomSheet>
          )}
        </>
      )}
    </div>
  );
}
```

## State Transition Examples

### Opening Hamburger

```javascript
// User taps hamburger button
openHamburger();

// Effect: Any open bottom sheet is immediately dismissed
// mobileSurface changes from BOTTOM_SHEET_* → HAMBURGER
```

### Switching Between Bottom Sheets

```javascript
// User is viewing Notifications
// mobileSurface = BOTTOM_SHEET_NOTIFICATIONS

// User taps Messages icon
openMessages();

// Effect:
// 1. Notifications sheet animates closed
// 2. Messages sheet animates open
// 3. mobileSurface changes to BOTTOM_SHEET_MESSAGES
```

### Opening AI

```javascript
// User selects "AI Assistant" from Tools
openAIFull();

// Effect:
// 1. Bottom sheet closes immediately
// 2. AI full screen appears
// 3. mobileSurface = AI_FULL
// 4. Top bar is hidden
```

### Minimizing AI

```javascript
// User taps minimize in AI header
minimizeAI();

// Effect:
// 1. AI closes to minimized indicator
// 2. mobileSurface = NONE
// 3. aiSession PERSISTS
// 4. User can navigate pages, session remains
```

### Closing AI

```javascript
// User taps close in AI header
closeAI();

// Effect:
// 1. AI closes completely
// 2. mobileSurface = NONE
// 3. aiSession = null (destroyed)
```

## Common Mistakes to Avoid

### ❌ WRONG: Using Multiple Boolean States

```javascript
// DON'T DO THIS
const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
const [isAIOpen, setIsAIOpen] = useState(false);
```

**Problem:** No guarantee of mutual exclusivity. Multiple surfaces can be "open" simultaneously, violating invariants.

### ❌ WRONG: Scattered Conditional Rendering

```javascript
// DON'T DO THIS
{isHamburgerOpen && <HamburgerOverlay />}
{isNotificationsOpen && <NotificationsSheet />}
{isMessagesOpen && <MessagesSheet />}
```

**Problem:** Logic is scattered. Hard to verify invariants. Can render multiple surfaces.

### ❌ WRONG: Mutating AI Session on Navigation

```javascript
// DON'T DO THIS
const handlePageChange = (page) => {
  setCurrentPage(page);
  if (aiSession) {
    setAiSession({ ...aiSession, context: page }); // ❌ WRONG
  }
};
```

**Problem:** Violates the invariant "Navigation does not mutate AI session state."

### ✅ CORRECT: Using State Machine

```javascript
const { mobileSurface, isActive, SURFACES } = useMobileNavigation();

{isActive(SURFACES.HAMBURGER) && <HamburgerOverlay />}
{isActive(SURFACES.BOTTOM_SHEET_NOTIFICATIONS) && <NotificationsSheet />}
{isActive(SURFACES.BOTTOM_SHEET_MESSAGES) && <MessagesSheet />}
```

**Benefit:** Single source of truth. Invariants enforced automatically.

## Testing Invariants

Before deploying, verify:

1. **One Surface at a Time**
   - Open hamburger → no sheets visible
   - Open notification sheet → hamburger not visible
   - Open AI → no hamburger or sheets visible

2. **No Stacking**
   - Open notifications → tap messages → notifications closes first

3. **Hamburger Priority**
   - Open any sheet → tap hamburger → sheet immediately closes

4. **AI Session Persistence**
   - Open AI, add message, minimize → message persists
   - Navigate to different page → message still persists
   - Reopen AI → message is there

5. **AI Session Destruction**
   - Open AI, add message, close → message gone
   - Reopen AI → fresh session, no messages

## Files

```
src/
├── hooks/
│   └── useMobileNavigation.js         ← State machine
├── components/mobile/
│   ├── HamburgerOverlay.jsx           ← Full-screen navigation
│   ├── BottomSheet.jsx                ← Generic bottom sheet
│   ├── ToolsHub.jsx                   ← Tools selection
│   ├── MobileAIFull.jsx               ← Full-screen AI
│   ├── MobileTopBar.jsx               ← Mobile nav bar
│   ├── index.js                       ← Exports
│   ├── MOBILE_INTEGRATION_EXAMPLE.jsx ← Reference implementation
│   └── README.md                      ← This file
```

## References

- **ARCHITECTURE.md** → Mobile Navigation & AI State Machine (lines 260-353)
- **IMPLEMENTATION.md** → Mobile State Machine Implementation Contract (lines 439-537)
- **MOBILE_INTEGRATION_EXAMPLE.jsx** → Complete integration example

## Questions?

If you encounter a scenario not covered by the state machine, **STOP** and:

1. Check if it violates an invariant
2. Consult ARCHITECTURE.md and IMPLEMENTATION.md
3. Do NOT add workarounds that break the state machine

The system is designed to be comprehensive. If you need to break an invariant, you must update the architecture documentation first.
