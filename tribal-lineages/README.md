# Tribal Genealogy System Prototype

A React prototype demonstrating a dual-structure genealogical system combining Individual (Person) Tree View and Group (Tribal) Tree View.

## Features

- **Individual Tree View** - Display biological family trees with parents, person, and children
- **Group Tree View** - Display tribal/group hierarchies with parent, current, and child groups
- **Group Members List** - View all members of a specific group
- **Smooth CSS Transitions** - Animated navigation between views
- **Arabic + Latin Names** - Bilingual display (Arabic text renders LTR)
- **Interactive Navigation** - Click group names to switch to group view, click member counts to see lists

## Tech Stack

- **Vite** - Build tool and dev server
- **React 19** - UI framework
- **React Router DOM** - Multi-page navigation
- **CSS** - Custom styling with transitions (no UI library)
- **Functional Components** - Modern React patterns

## Project Structure

```
tribal-lineages/
├── src/
│   ├── components/
│   │   ├── PersonCard.jsx      # Displays individual person information
│   │   └── GroupCard.jsx       # Displays tribal group information
│   ├── pages/
│   │   ├── HomePage.jsx        # Landing page with navigation links
│   │   ├── IndividualTreeView.jsx  # Biological tree view (parents → person → children)
│   │   ├── GroupMembersListView.jsx  # List of all group members
│   │   └── GroupTreeView.jsx   # Group hierarchy view (parent → group → children/siblings)
│   ├── data/
│   │   └── genealogyData.json  # Hardcoded seed data
│   ├── utils/
│   │   └── dataUtils.js        # Helper functions for data access
│   ├── App.jsx                 # Main app with router setup
│   ├── App.css                 # Global styles and animations
│   └── index.css               # Base styles
└── package.json
```

## Data Model

### Person
- `id` - Unique identifier
- `arabicName` - Arabic name
- `latinName` - Latinized name
- `fatherId` - Reference to father (nullable)
- `motherId` - Reference to mother (nullable)
- `spouseIds` - Array of spouse IDs
- `groupMembershipIds` - Array of group memberships
- `founderOfGroupId` - Group founded by this person (nullable)

### Group
- `id` - Unique identifier
- `arabicName` - Arabic name
- `latinName` - Latinized name
- `classification` - Type (شعب, قبيلة, فخذ, عائلة)
- `parentGroupId` - Reference to parent group (nullable)
- `childGroupIds` - Array of child group IDs
- `memberPersonIds` - Array of member person IDs

## Routes

- `/` - Home page with navigation links
- `/individual/:personId` - Individual tree view
- `/individual?group=:groupId` - Group members list (clickable to navigate to person's tree)
- `/group/:groupId` - Group hierarchy view

## Running the Project

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Seed Data

The prototype includes these individuals:
- أوس (Aws)
- مالك بن أوس (Malik ibn Aws)
- مرة بن مالك (Murrah ibn Malik)
- علي بن مرة (Ali ibn Murrah)

And these groups:
- القحطانية (Al-Qahtaniyah) — شعب
- الأوس (Al-Aws) — قبيلة
- آل مرة (Al Murrah) — قبيلة
- بشر (Bishr) — فخذ
- علي بن مرة (Ali branch) — فخذ
- جابر (Jaber) — فخذ
- الحنزاب (Al-Hinzab) — عائلة
- الدمنان (Al-Damnan) — عائلة
- الزقيمة (Al-Zuqaymah) — عائلة
- الشبيب (Al-Shubayb) — عائلة
- الشاجع (Al-Shaji) — عائلة

## Navigation Behavior

1. **Individual Tree View** - Person cards are informational only (not clickable)
2. **Group Link Click** - Navigates to group tree view
3. **Members Count Click** - Navigates to group members list
4. **Member Card Click** (in list view) - Navigates to that person's tree view
5. **Group View Logic**:
   - If group has children → show children
   - If no children → show siblings (with current group highlighted)

## Design Decisions

- **No RTL Handling** - Arabic text renders left-to-right as specified
- **CSS Transitions** - Lightweight fade-in and slide-in animations
- **Color Coding** - Blue for individuals, purple for groups
- **Responsive Design** - Mobile-friendly grid layouts
- **Prototype-Level** - Simple, clean code without over-engineering
