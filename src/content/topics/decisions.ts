import type { MindMapData } from '@/types/course'

// Layer 3: Design Decisions - Trade-offs based on game characteristics
// Text content is stored in locale files under course.decisions
export const decisionsTree: MindMapData = {
  id: 'decisions',
  centerPosition: { x: 0, y: 0 },
  nodes: [
    // Center node
    {
      id: 'decisions-center',
      position: { x: 0, y: 0 },
      color: 'orange',
      icon: 'GitBranch',
      type: 'topic',
    },
    // Multiplayer Architecture (top)
    {
      id: 'multiplayer-arch',
      position: { x: 0, y: -220 },
      color: 'blue',
      icon: 'Users',
      type: 'lesson',
      lessonPath: '/decisions/multiplayer-arch',
    },
    // Physics Processing (top-right)
    {
      id: 'physics-authority',
      position: { x: 200, y: -68 },
      color: 'red',
      icon: 'Server',
      type: 'lesson',
      lessonPath: '/decisions/physics-authority',
    },
    // Synchronization Strategy (bottom-right)
    {
      id: 'sync-strategy',
      position: { x: 124, y: 178 },
      color: 'purple',
      icon: 'RefreshCw',
      type: 'lesson',
      lessonPath: '/decisions/sync-strategy',
    },
    // Tick Rate & Interpolation (bottom-left)
    {
      id: 'tickrate',
      position: { x: -124, y: 178 },
      color: 'teal',
      icon: 'Timer',
      type: 'lesson',
      lessonPath: '/decisions/tickrate',
    },
    // Balancing Structure (top-left)
    {
      id: 'balancing',
      position: { x: -200, y: -68 },
      color: 'yellow',
      icon: 'Scale',
      type: 'lesson',
      lessonPath: '/decisions/balancing',
    },
  ],
  connections: [
    // Connect center to all topics
    { from: 'decisions-center', to: 'multiplayer-arch' },
    { from: 'decisions-center', to: 'physics-authority' },
    { from: 'decisions-center', to: 'sync-strategy' },
    { from: 'decisions-center', to: 'tickrate' },
    { from: 'decisions-center', to: 'balancing' },
    // Connect related topics
    { from: 'multiplayer-arch', to: 'physics-authority', style: 'dashed' },
    { from: 'physics-authority', to: 'sync-strategy', style: 'dashed' },
    { from: 'sync-strategy', to: 'tickrate', style: 'dashed' },
    { from: 'tickrate', to: 'balancing', style: 'dashed' },
    { from: 'balancing', to: 'multiplayer-arch', style: 'dashed' },
  ],
}
