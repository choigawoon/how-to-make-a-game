# TASKS.md - Project Task List

**Last Updated**: 2025-11-22
**Purpose**: Track completed work and remaining tasks for the interactive course platform

---

## Project Goals

Create an interactive course SSG (Static Site Generator) for game development education:
- Similar to Genially with mindmap-based navigation
- Deployable to GitHub Pages or Cloudflare Pages
- Interactive demos with real-time data visualization

---

## Completed Tasks

### Phase 1: Core Infrastructure
- [x] Set up React + Vite + TanStack Router project
- [x] Configure Tailwind CSS v4
- [x] Add framer-motion for animations
- [x] Define TypeScript types (src/types/course.ts)

### Phase 2: Mindmap Components
- [x] MindMap.tsx - Main canvas with zoom/pan/drag
- [x] MindMapNode.tsx - Individual node with icons
- [x] MindMapConnector.tsx - Bezier curve connections
- [x] MindMapControls.tsx - Zoom/fit buttons
- [x] BookView.tsx - Outline/tree view mode

### Phase 3: Content System
- [x] Main course tree with 6 topics (hexagonal layout)
- [x] Asset management sub-mindmap
- [x] Game world sub-mindmap
- [x] Node color classes for Tailwind styling

### Phase 4: Interactive Demos
- [x] BenchmarkDemo.tsx - Serialization benchmark (JSON vs MessagePack vs Gzip)
- [x] GameWorldViewer.tsx - 3D entity visualization with Three.js
- [x] Lazy loading for Three.js chunk (1MB+)

### Phase 5: Navigation System
- [x] Sub-mindmap drill-down navigation
- [x] Breadcrumb navigation
- [x] View mode toggle (graph/book)
- [x] Back button for returning to parent mindmap
- [x] Node click handlers for demos

### Phase 6: Routes
- [x] Landing page with mindmap (/)
- [x] Topic page (/topic/$topicId)
- [x] Serialization demo (/demo/serialization)
- [x] Game world demo (/demo/game-world)

---

## Remaining Tasks

### High Priority

#### Content Expansion
- [ ] Create sub-mindmaps for remaining 4 topics:
  - [ ] 멀티플레이 정책 (multiplayer-policy)
  - [ ] 게임 엔진 (game-engine)
  - [ ] 빌드 배포 (build-deploy)
  - [ ] 크로스플랫폼 (cross-platform)
- [ ] Add lesson content for each topic node

#### New Interactive Demos
- [ ] Multiplayer sync demo (client prediction, interpolation)
- [ ] Build pipeline visualization
- [ ] Engine architecture demo

#### Deployment
- [ ] Configure GitHub Actions for deployment
- [ ] Set up Cloudflare Pages deployment
- [ ] Optimize build for static hosting

### Medium Priority

#### UI/UX Improvements
- [ ] Add loading states for demo pages
- [ ] Add error boundaries
- [ ] Improve mobile responsiveness for mindmap
- [ ] Add touch gestures for mobile zoom/pan
- [ ] Add keyboard navigation

#### Performance
- [ ] Code splitting for demo components
- [ ] Image optimization
- [ ] Bundle analysis and optimization

#### Accessibility
- [ ] Add ARIA labels to mindmap nodes
- [ ] Keyboard navigation support
- [ ] Screen reader support for demos

### Low Priority

#### Additional Features
- [ ] Progress tracking (completed lessons)
- [ ] Search functionality
- [ ] Print/export to PDF
- [ ] Offline support (PWA caching)
- [ ] Dark/light theme toggle

#### Testing
- [ ] Unit tests for mindmap components
- [ ] Integration tests for navigation
- [ ] E2E tests for demo interactions

#### Documentation
- [ ] Add JSDoc comments to components
- [ ] Create user guide
- [ ] Add inline help for demos

---

## Technical Debt

- [ ] Consider migrating to Astro for better SSG support
- [ ] Optimize Three.js bundle size
- [ ] Add error handling for failed demo loads
- [ ] Improve type safety for node click handlers

---

## Notes for Future Sessions

### Key Files to Know
- `src/routes/index.tsx` - Landing page with navigation logic
- `src/content/course-tree.ts` - Main mindmap data structure
- `src/components/mindmap/MindMap.tsx` - Core mindmap component
- `src/types/course.ts` - Type definitions

### Adding a New Topic
1. Create `src/content/topics/[topic-name].ts`
2. Export from `src/content/index.ts`
3. Add to `subMindmaps` in `src/routes/index.tsx`
4. Create demo component if needed

### Adding a New Demo
1. Create component in `src/components/interactive/`
2. Create route in `src/routes/demo/[demo-name].tsx`
3. Add `lessonPath` to relevant mindmap node
4. Consider lazy loading for large dependencies

### Current Branch
`claude/interactive-course-ssg-01BEM3mCSMCsXsabma4c78gz`

### Build Commands
```bash
pnpm dev      # Development server
pnpm build    # Production build
pnpm serve    # Preview build
```

---

## Recent Commits

- `5eb7f84` - feat: Add sub-mindmap drill-down navigation and book view mode
- `a64f79d` - feat: Add 3D game world simulation demo with lazy loading
- `3934572` - fix: Use browser-compatible @msgpack/msgpack instead of msgpack-lite
- `9ef6e98` - feat: Add demo link to asset management topic page
- `aae5cdf` - feat: Add interactive course platform with mindmap navigation
