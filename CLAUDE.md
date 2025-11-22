# CLAUDE.md - AI Assistant Development Guide

**Repository**: how-to-make-a-game
**Last Updated**: 2025-11-22
**Purpose**: Interactive course platform for game development education (like Genially)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Interactive Course Features](#interactive-course-features)
3. [Tech Stack](#tech-stack)
4. [Directory Structure](#directory-structure)
5. [Development Workflow](#development-workflow)
6. [Code Conventions](#code-conventions)
7. [Styling Guidelines](#styling-guidelines)
8. [Routing Patterns](#routing-patterns)
9. [State Management](#state-management)
10. [Data Fetching & API Layer](#data-fetching--api-layer)
11. [API Mocking with MSW](#api-mocking-with-msw)
12. [IndexedDB with Dexie](#indexeddb-with-dexie)
13. [Schema Validation with Zod](#schema-validation-with-zod)
14. [Internationalization (i18n)](#internationalization-i18n)
15. [PWA Support](#pwa-support)
16. [Tauri Desktop App](#tauri-desktop-app)
17. [Testing](#testing)
18. [Common Tasks](#common-tasks)
19. [Important Notes for AI Assistants](#important-notes-for-ai-assistants)

---

## Project Overview

This is an **interactive course platform** for game development education, similar to Genially. Built as a modern React SSG deployable to GitHub Pages or Cloudflare Pages.

### Key Features

- **Mindmap-based navigation** with zoom/pan/drag
- **Dual view modes** - Graph (mindmap) and Book (outline)
- **Sub-mindmap drill-down** - Click topic to expand sub-topics
- **Interactive demos** - Real-time data visualization
- **Type-safe routing** with file-based routes
- **Modern styling** with Tailwind CSS v4
- **PWA support** with offline capability
- **Desktop app** with Tauri 2.0

### Project Status

- **Current Branch**: `claude/interactive-course-ssg-01BEM3mCSMCsXsabma4c78gz`
- **Git Status**: Clean
- **Last Commit**: `5eb7f84 - feat: Add sub-mindmap drill-down navigation and book view mode`
- **Deployment Target**: GitHub Pages / Cloudflare Pages

---

## Interactive Course Features

### Course Topics (Main Mindmap)

6 main topics arranged in hexagonal layout:
1. **게임월드 모델링과 시뮬레이션** - ECS, physics, world simulation
2. **멀티플레이 정책** - Networking, synchronization
3. **게임 엔진** - Engine architecture
4. **에셋 관리** - Serialization, compression, storage
5. **빌드 배포** - Build pipelines, deployment
6. **크로스플랫폼** - Cross-platform development

### Interactive Demos

| Demo | Route | Description |
|------|-------|-------------|
| Serialization Benchmark | `/demo/serialization` | Compare JSON vs MessagePack vs Gzip |
| 3D Game World Viewer | `/demo/game-world` | Three.js entity visualization |

### Mindmap Components

```tsx
import { MindMap, BookView } from '@/components/mindmap'
import { mainCourseTree, assetManagementTree, gameWorldTree } from '@/content'

// Graph view with zoom/pan/drag
<MindMap
  data={currentMindmap}
  onNodeClick={handleNodeClick}
  onBack={goBack}
/>

// Outline/tree view
<BookView
  data={currentMindmap}
  subMindmaps={subMindmaps}
/>
```

### Navigation System

- **Breadcrumb navigation** - Track path through sub-mindmaps
- **View mode toggle** - Switch between graph and outline
- **Back button** - Return to parent mindmap
- **Node click handlers** - Drill down or navigate to demos

### Adding New Topics

1. Create mindmap data in `src/content/topics/[topic].ts`
2. Add to `subMindmaps` mapping in `src/routes/index.tsx`
3. Create demo component in `src/components/interactive/`
4. Add route in `src/routes/demo/[demo].tsx`

---

## Tech Stack

### Core Dependencies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | React | 19.2.0 | UI library with concurrent features |
| **Build Tool** | Vite | 7.1.7 | Fast dev server & bundler |
| **Language** | TypeScript | 5.7.2 | Type-safe JavaScript |
| **Routing** | TanStack Router | 1.132.0 | File-based routing with code splitting |
| **Data Fetching** | TanStack Query | 5.90.10 | Server state management |
| **State Management** | Zustand | 5.0.8 | Client state with slice pattern |
| **Styling** | Tailwind CSS | 4.0.6 | Utility-first CSS framework |
| **UI Components** | shadcn/ui | latest | Pre-built component system |
| **Icons** | Lucide React | 0.544.0 | Modern icon library |
| **API Mocking** | MSW | 2.12.2 | Mock Service Worker for API mocking |
| **Mock Database** | Dexie | 4.2.1 | IndexedDB wrapper for persistent mock data |
| **Validation** | Zod | 4.1.12 | Schema validation & type inference |
| **i18n** | i18next | 25.6.3 | Internationalization framework |
| **PWA** | vite-plugin-pwa | 1.1.0 | Progressive Web App support |
| **Desktop** | Tauri | 2.9.0 | Cross-platform desktop app framework |
| **Testing** | Vitest | 3.0.5 | Unit test framework |

### Key Utilities

- **clsx** (2.1.1) - Conditional className utility
- **tailwind-merge** (3.0.2) - Merge Tailwind classes safely
- **class-variance-authority** (0.7.1) - Component variant management
- **tw-animate-css** (1.3.6) - Animation utilities
- **web-vitals** (5.1.0) - Performance monitoring
- **react-i18next** (16.3.5) - React bindings for i18next
- **i18next-browser-languagedetector** (8.2.0) - Auto language detection
- **workbox-window** (7.4.0) - Service worker management

### Interactive Course Dependencies

- **framer-motion** - Animation library for mindmap transitions
- **@msgpack/msgpack** - Browser-compatible MessagePack serialization
- **recharts** - Data visualization for benchmark charts
- **pako** - Gzip compression for serialization demo
- **three** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F

### Radix UI Primitives

- **@radix-ui/react-dialog** (1.1.15)
- **@radix-ui/react-label** (2.1.8)
- **@radix-ui/react-progress** (1.1.8)
- **@radix-ui/react-select** (2.2.6)
- **@radix-ui/react-separator** (1.1.8)
- **@radix-ui/react-slot** (1.2.4)

### Development Tools

- **@tanstack/devtools-vite** (0.3.11) - Integrated devtools
- **@tanstack/react-devtools** - Global debugging panel
- **@tanstack/react-router-devtools** - Router state inspection
- **@tanstack/react-query-devtools** - Query state inspection
- **@testing-library/react** (16.2.0) - Component testing
- **jsdom** (27.0.0) - DOM test environment

### Package Manager

**IMPORTANT**: This project uses **pnpm v10.19.0** (not npm or yarn)

```bash
# Install dependencies
pnpm install

# DO NOT USE:
npm install  # Wrong package manager
yarn install # Wrong package manager
```

---

## Directory Structure

```
/home/user/how-to-make-a-game/
├── src/                          # Main source code
│   ├── api/                     # API layer
│   │   ├── client.ts           # API fetch wrapper
│   │   ├── config.ts           # API configuration (mock/real mode)
│   │   └── services/           # TanStack Query hooks
│   ├── components/              # React components
│   │   ├── mindmap/            # Mindmap navigation components
│   │   │   ├── MindMap.tsx     # Main canvas with zoom/pan/drag
│   │   │   ├── MindMapNode.tsx # Individual node with icons
│   │   │   ├── MindMapConnector.tsx # Bezier curve connections
│   │   │   ├── MindMapControls.tsx  # Zoom/fit buttons
│   │   │   ├── BookView.tsx    # Outline/tree view mode
│   │   │   └── index.ts        # Re-exports
│   │   ├── interactive/        # Interactive demo components
│   │   │   ├── BenchmarkDemo.tsx    # Serialization benchmark
│   │   │   └── GameWorldViewer.tsx  # 3D entity visualization
│   │   ├── Header.tsx          # Navigation header
│   │   ├── LanguageSelector.tsx # Language switcher
│   │   ├── PWAPrompt.tsx       # PWA prompts
│   │   └── ui/                 # shadcn/ui components
│   ├── content/                 # Course content data
│   │   ├── course-tree.ts      # Main mindmap with 6 topics
│   │   ├── topics/             # Sub-mindmap data
│   │   │   ├── asset-management.ts
│   │   │   └── game-world.ts
│   │   └── index.ts            # Re-exports
│   ├── db/                      # IndexedDB database
│   │   └── index.ts            # Dexie setup, entities, seed data
│   ├── hooks/                   # Custom React hooks
│   │   ├── index.ts            # Re-exports
│   │   └── usePWA.ts           # PWA installation & update hook
│   ├── lib/                     # Utility functions
│   │   ├── utils.ts            # cn() helper for class merging
│   │   ├── query-client.ts     # TanStack Query client config
│   │   └── i18n.ts             # i18next configuration with formatters
│   ├── locales/                 # Translation files
│   │   ├── index.ts            # Re-exports
│   │   ├── en.json             # English translations
│   │   ├── ko.json             # Korean translations
│   │   └── ja.json             # Japanese translations
│   ├── mocks/                   # MSW mock handlers
│   │   ├── browser.ts          # MSW browser setup
│   │   ├── handlers.ts         # API route handlers (uses IndexedDB)
│   │   └── schemas.ts          # Re-exports from src/schemas
│   ├── schemas/                 # Zod schema definitions
│   │   ├── api/                # API request/response schemas
│   │   ├── models/             # DB model schemas (mirrors Prisma)
│   │   └── index.ts            # Main entry point
│   ├── routes/                  # File-based routing (TanStack Router)
│   │   ├── __root.tsx          # Root layout
│   │   ├── index.tsx           # Landing page with mindmap
│   │   ├── topic/              # Topic pages
│   │   │   └── $topicId.tsx    # Dynamic topic page
│   │   ├── demo/               # Interactive demo pages
│   │   │   ├── serialization.tsx  # Benchmark demo
│   │   │   └── game-world.tsx     # 3D viewer demo
│   │   └── routeTree.gen.ts    # AUTO-GENERATED - DO NOT EDIT
│   ├── types/                   # TypeScript type definitions
│   │   ├── course.ts           # MindMapNode, BenchmarkResult, etc.
│   │   └── i18next.d.ts        # Type-safe i18n keys
│   ├── stores/                  # Zustand state management
│   │   ├── slices/             # apiSlice, uiSlice, taskSlice, workflowSlice
│   │   └── index.ts            # Combined store with middleware
│   ├── test/                    # Test utilities
│   │   ├── setup.ts            # Vitest setup
│   │   └── i18n-test-utils.tsx # i18n testing helpers
│   ├── types/                   # TypeScript type definitions
│   │   └── i18next.d.ts        # Type-safe i18n key definitions
│   ├── main.tsx                # App entry point
│   ├── styles.css              # Global styles + Tailwind config
│   └── vite-env.d.ts           # Vite type definitions
├── public/                      # Static assets
│   ├── mockServiceWorker.js    # MSW service worker
│   ├── favicon.ico             # Favicon
│   ├── logo192.png, logo512.png # PWA icons
│   └── manifest.json           # PWA manifest
├── src-tauri/                   # Tauri desktop app
│   ├── src/                    # Rust source code
│   │   ├── main.rs            # Main entry point
│   │   └── lib.rs             # App library
│   ├── capabilities/           # Tauri permissions
│   ├── icons/                  # App icons
│   ├── tauri.conf.json        # Tauri configuration
│   └── Cargo.toml             # Rust dependencies
├── prisma/schema.prisma        # Database schema (source of truth)
├── vite.config.ts              # Vite build config (includes PWA)
└── package.json                # Dependencies & scripts
```

---

## Development Workflow

### Environment Configuration

```bash
cp .env.example .env
```

**Environment Variables**:
```bash
VITE_API_MODE=mock              # 'mock' or 'real'
VITE_API_BASE_URL=http://localhost:8000
VITE_ENABLE_DEVTOOLS=true
```

### Available Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server (port 3000) |
| `pnpm build` | Production build |
| `pnpm serve` | Preview production build |
| `pnpm test` | Run tests |
| `pnpm tauri:dev` | Start Tauri desktop app (dev mode) |
| `pnpm tauri:build` | Build Tauri desktop app |

---

## Code Conventions

### Import Order

```tsx
// 1. React and third-party libraries
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// 2. Internal modules (using @/ alias)
import { Button } from '@/components/ui/button'
import { useTheme } from '@/stores'

// 3. Types
import type { User } from '@/schemas'
```

### Component Structure

```tsx
// 1. Type definitions
interface Props {
  title: string
  onSave: () => void
}

// 2. Component
export const MyComponent = ({ title, onSave }: Props) => {
  // Hooks
  const { t } = useTranslation()
  const [state, setState] = useState('')

  // Handlers
  const handleClick = () => {}

  // Render
  return <div>{t('key')}</div>
}
```

---

## Styling Guidelines

### Tailwind CSS v4

Use utility classes with Tailwind CSS v4:

```tsx
<div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800">
  <Button variant="primary" className="w-full">
    {t('common.save')}
  </Button>
</div>
```

### cn() Helper

Use the `cn()` helper for conditional classes:

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "primary" && "primary-variant"
)} />
```

---

## Routing Patterns

### File-Based Routes

Routes are automatically generated from `src/routes/`:

- `src/routes/index.tsx` → `/`
- `src/routes/about.tsx` → `/about`
- `src/routes/users/$id.tsx` → `/users/:id`

### Creating a New Route

```tsx
// src/routes/my-page.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my-page')({
  component: MyPageComponent,
})

function MyPageComponent() {
  return <div>My Page</div>
}
```

---

## State Management

### Zustand Slices

- **apiSlice** - API data (users, posts)
- **uiSlice** - UI state (theme, language, sidebar, modals, notifications)
- **taskSlice** - Task management
- **workflowSlice** - Progress tracking

### Usage

```tsx
import { useTheme, useLanguage, useUiActions } from '@/stores'

const theme = useTheme()
const language = useLanguage()
const { setTheme, setLanguage } = useUiActions()
```

### Best Practices

- Use selector hooks for specific state (e.g., `useTheme()` not `useStore()`)
- Keep server state in TanStack Query, client state in Zustand
- Language changes in Zustand automatically sync with i18next

---

## Data Fetching & API Layer

### TanStack Query Hooks

```tsx
import { useItems, useCreateItem } from '@/api/services'

// Fetch items
const { data, isLoading, error } = useItems()

// Create item with automatic cache invalidation
const createMutation = useCreateItem()
createMutation.mutate({ name: 'New Item', price: 100 })
```

### API Configuration

Toggle between mock and real API:

```bash
# .env
VITE_API_MODE=mock  # Uses MSW
VITE_API_MODE=real  # Uses actual backend
```

---

## API Mocking with MSW

Uses MSW + IndexedDB for persistent mock API. Data survives page reloads.

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | List items |
| POST | `/api/items` | Create item |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |
| GET/POST | `/api/users` | Users CRUD |
| POST | `/api/auth/login` | Login (admin/admin) |
| GET | `/api/search` | Search items |

---

## IndexedDB with Dexie

### Overview

Uses **Dexie.js** for persistent mock data storage in IndexedDB.

### Database Setup

```tsx
// src/db/index.ts
import { db, initializeDatabase, resetDatabase } from '@/db'

// Query
const items = await db.items.toArray()
const item = await db.items.get(1)

// Create
const id = await db.items.add({ name: 'New Item', ... })

// Update
await db.items.put({ id: 1, ...updatedData })

// Delete
await db.items.delete(1)

// Reset to seed data
await resetDatabase()
```

### Tables

- **items**: id, name, description, price, category, created_at, updated_at
- **users**: id, email, username, full_name, is_active, created_at

---

## Schema Validation with Zod

### Usage

```tsx
import { ItemSchema, CreateItemSchema } from '@/schemas'

// Validate data
const result = ItemSchema.safeParse(data)
if (result.success) {
  // Use result.data
}

// Type inference
type Item = z.infer<typeof ItemSchema>
```

---

## Internationalization (i18n)

### Overview

Supports **English (en)**, **Korean (ko)**, and **Japanese (ja)** using i18next with advanced features:

- **Type-safe translation keys** - Autocomplete and compile-time checking
- **Pluralization support** - Automatic plural forms
- **Date/time/number formatting** - Locale-aware formatting using Intl API

### Basic Usage

```tsx
import { useTranslation } from 'react-i18next'

export const MyComponent = () => {
  const { t } = useTranslation()
  return <h1>{t('pages.home.title')}</h1>
}
```

### Type-Safe Translations

Translation keys are type-checked via `src/types/i18next.d.ts`:

```tsx
// Autocomplete and type checking for translation keys
t('common.save')        // OK
t('invalid.key')        // TypeScript error
```

### Pluralization

Use plural forms with the `count` parameter:

```tsx
// Translation file (en.json)
{
  "plurals": {
    "item_one": "{{count}} item",
    "item_other": "{{count}} items"
  }
}

// Usage
t('plurals.item', { count: 1 })  // "1 item"
t('plurals.item', { count: 5 })  // "5 items"
```

### Date/Time/Number Formatting

Use built-in formatters with the Intl API:

```tsx
// In translation files
{
  "format": {
    "dateShort": "{{date, dateShort}}",
    "currency": "{{value, currency}}"
  }
}

// Usage
t('format.dateShort', { date: new Date() })  // "Nov 21, 2025" (en) / "2025년 11월 21일" (ko)
t('format.currency', { value: 1000 })        // "$1,000.00" (en) / "₩1,000" (ko)
```

### Available Formatters

| Formatter | Description | Example (en) |
|-----------|-------------|--------------|
| `dateShort` | Short date | "Nov 21, 2025" |
| `dateLong` | Long date with weekday | "Friday, November 21, 2025" |
| `time` | Time only | "2:30:00 PM" |
| `dateTime` | Date and time | "Nov 21, 2025, 2:30 PM" |
| `relativeTime` | Relative time | "in 2 days", "3 hours ago" |
| `number` | Formatted number | "1,234,567" |
| `currency` | Currency (auto per language) | "$1,234.56" (en) / "₩1,234" (ko) |
| `percent` | Percentage | "85%" |

### Helper Functions

Import and use helper functions directly:

```tsx
import { formatDate, formatNumber } from '@/lib/i18n'

// Format dates
formatDate(new Date(), 'dateShort')     // "Nov 21, 2025"
formatDate(new Date(), 'relativeTime')  // "in 2 hours"

// Format numbers
formatNumber(1234.56, 'number')    // "1,234.56"
formatNumber(1234.56, 'currency')  // "$1,234.56"
formatNumber(0.85, 'percent')      // "85%"
```

### Changing Language

```tsx
import { useLanguage, useUiActions } from '@/stores'

const { setLanguage } = useUiActions()
setLanguage('ko') // Syncs with i18next and updates document.lang
```

### Translation Files

Located in `src/locales/`:
- `en.json` - English
- `ko.json` - Korean
- `ja.json` - Japanese

**Important**: When adding translations, add to ALL locale files.

---

## PWA Support

### Overview

Progressive Web App with offline capability using vite-plugin-pwa.

### usePWA Hook

```tsx
import { usePWA } from '@/hooks/usePWA'

const {
  canInstall,           // Can show install prompt
  installPrompt,        // Trigger install
  needRefresh,          // Update available
  updateServiceWorker,  // Apply update
  isOnline,             // Network status
} = usePWA()
```

### PWAPrompt Component

Included in root layout, provides UI for:
- Install prompts
- Update notifications
- Offline indicator

---

## Tauri Desktop App

### Overview

Build native desktop applications using Tauri 2.0 with the existing React frontend.

### Prerequisites

**Linux** (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

**macOS**:
```bash
xcode-select --install
```

**Windows**:
- Microsoft Visual Studio C++ Build Tools
- WebView2 (included with Edge)

### Development

```bash
# Start desktop app in development mode
pnpm tauri:dev

# Build production desktop app
pnpm tauri:build
```

### Configuration

- **tauri.conf.json** - Main Tauri configuration (window size, app name, etc.)
- **Cargo.toml** - Rust dependencies
- **capabilities/default.json** - API permissions for the app

### Tauri API Usage

```tsx
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'

// Call Rust backend
const result = await invoke('my_command', { arg: 'value' })

// Use Tauri plugins
const file = await open({ multiple: false })
```

### Adding Rust Commands

```rust
// src-tauri/src/lib.rs
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

---

## Testing

### Running Tests

```bash
pnpm test
```

### Test Structure

```tsx
// src/components/__tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### i18n Testing

Use the test utilities for i18n testing:

```tsx
import { renderWithI18n } from '@/test/i18n-test-utils'

it('renders translated text', () => {
  renderWithI18n(<MyComponent />)
  expect(screen.getByText('Welcome')).toBeInTheDocument()
})
```

---

## Common Tasks

### Adding a New Page

1. Create route file in `src/routes/`
2. Add translations to all locale files
3. Add navigation link in Header if needed

### Adding a New API Endpoint

1. Add MSW handler in `src/mocks/handlers.ts`
2. Create TanStack Query hook in `src/api/services/`
3. Add Zod schema in `src/schemas/`

### Adding a UI Component

```bash
pnpx shadcn@latest add [component-name]
```

---

## Available shadcn/ui Components

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent } from '@/components/ui/sheet'
```

---

## Important Notes for AI Assistants

### Critical Rules

1. **DO NOT** edit `routeTree.gen.ts` (auto-generated)
2. **Use pnpm** - not npm or yarn
3. **TypeScript strict mode** - no `any` types
4. **TanStack Query** for server state, **Zustand** for client state
5. **i18n** for all user-facing text
6. **Zod** for all API validation

### Common Pitfalls

**DON'T**:
- Use npm/yarn
- Put server state in Zustand
- Hardcode text (use i18n)
- Skip Zod validation
- Forget translations in ALL locale files
- Ignore type safety for i18n keys

**DO**:
- Use `@/` alias for imports
- Invalidate queries after mutations
- Add translations to en.json, ko.json, ja.json
- Use selector hooks for Zustand
- Use type-safe translation keys
- Format dates/numbers using the provided formatters

---

## Quick Reference

```bash
pnpm dev                  # Start dev server
pnpm build                # Production build
pnpm test                 # Run tests
pnpm tauri:dev            # Start Tauri desktop app
pnpm tauri:build          # Build desktop app
pnpx shadcn@latest add X  # Add UI component
```

---

## Changelog

### 2025-11-22
- **Major**: Transformed into interactive course platform for game development
- Added Interactive Course Features section
- Added mindmap components (MindMap, BookView, MindMapNode, MindMapConnector, MindMapControls)
- Added interactive demos (BenchmarkDemo, GameWorldViewer)
- Added content system with course-tree and sub-mindmaps
- Added framer-motion, @msgpack/msgpack, recharts, pako, three.js dependencies
- Added routes for demos (/demo/serialization, /demo/game-world)
- Added topic routes (/topic/$topicId)
- Implemented sub-mindmap drill-down navigation
- Added dual view modes (graph/book)
- Added breadcrumb navigation
- Added course.ts types for MindMapNode, BenchmarkResult, etc.
- Updated directory structure

### 2025-11-21
- Updated repository name to my-spa-template
- Updated project status with latest branch and commit
- Added comprehensive i18n Advanced Features section:
  - Type-safe translation keys with `i18next.d.ts`
  - Pluralization patterns documentation
  - Date/time/number formatting with Intl API
  - Helper functions (`formatDate`, `formatNumber`)
  - Available formatters table
- Added `src/types/` directory to structure
- Improved Code Conventions section
- Improved Testing section with i18n testing utilities

### 2025-11-20 (Update 3)
- Added Tauri 2.0 for desktop app support
- Added @tauri-apps/cli and @tauri-apps/api
- Added src-tauri directory with Rust backend
- Updated vite.config.ts for Tauri compatibility
- Added tauri:dev and tauri:build scripts

### 2025-11-20 (Update 2)
- Added IndexedDB with Dexie for persistent mock data
- Added PWA support with vite-plugin-pwa
- Added i18n with i18next (en, ko, ja)
- Added shadcn/ui components (alert, badge, button, card, dialog, input, label, progress, select, separator, sheet)
- Added LanguageSelector and PWAPrompt components
- Updated MSW handlers to use IndexedDB
- Updated uiSlice with language management

### 2025-11-20
- Added TanStack Query, MSW, Zod documentation
- Added workflowSlice

### 2025-11-18
- Initial CLAUDE.md creation
- Zustand slice pattern implementation
