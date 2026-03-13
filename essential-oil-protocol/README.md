# Essential Oil Protocol Engine MVP

A Progressive Web App (PWA) that implements a deterministic Essential Oil Protocol Engine.

## Features

- **Pick Oils**: Select oils with drag-and-drop reordering
- **Protocol Generation**: Deterministic pure function engine
- **Saved Sets**: Store frequently used oil combinations
- **Overrides**: Customize oil properties per requirements
- **Backup/Restore**: Export and import all data
- **Offline Support**: Fully functional PWA after first load

## Tech Stack

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **Storage**: Dexie (IndexedDB)
- **Validation**: Zod
- **Testing**: Vitest
- **PWA**: vite-plugin-pwa + Workbox
- **Router**: React Router (Hash mode for GitHub Pages)

## Installation

```bash
npm install --legacy-peer-deps
```

## Development

```bash
npm run dev
```

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# UI mode
npm run test:ui
```

## Build

```bash
npm run build
```

## Deployment

GitHub Actions automatically deploys to GitHub Pages on push to main.

The app will be available at: `https://<username>.github.io/essential-oil-protocol/`

## Architecture

### Storage Rules

- **baseRules.json**: NEVER stored in IndexedDB, always loaded from `/public`
- **IndexedDB**: Stores ONLY overrides, savedSets, and settings
- **Effective Rules**: `baseRules + overrides` computed on load

### Engine Function

Pure function that generates protocol plan:

```typescript
generatePlan(
  {
    selection: string[],
    profile: { type: "adult" | "kid", age?: number },
    dayIndex: number
  },
  effectiveRules
)
```

### Key Rules

1. **Frequency**: 3 times per day (global default)
2. **Mode 1**: Apply oil to ALL marked areas
3. **Stack per area**: Multiple oils per area allowed
4. **Topical Precedence**: If oil has placements → excluded from mix
5. **Mix Construction**: 1 Base + 1 Head + up to 7 Hearts
6. **Limone Split**: Limone → Legs only, Limone V.A. → other areas
7. **Rotation**: Sequential finite rotation (no cycling)

## Golden Test Cases

All tests verify core engine behavior:

1. **Mix + Topical Precedence**: Oils with placements excluded from mix
2. **Limone Split Rule**: Automatic split between Limone and Limone V.A.
3. **Sequential Finite Rotation**: Day-by-day rotation without cycling
4. **Mouth/Fumes Both**: Dual mode (ingestion + inhalation)

## Oil Name Normalization

Supported aliases:
- "Timo z" → "Timo zygis"
- "Carota" → "Carrot seed"
- "Arancio amaro" → "Arancia Amara"
- "Limone V.A." → "Limone VA"

## License

MIT
