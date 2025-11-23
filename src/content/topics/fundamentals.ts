import type { MindMapData } from '@/types/course'

// Layer 2: Fundamentals - Core principles that never change
// Text content is stored in locale files under course.fundamentals
export const fundamentalsTree: MindMapData = {
  id: 'fundamentals',
  centerPosition: { x: 0, y: 0 },
  nodes: [
    // Center node
    {
      id: 'fundamentals-center',
      position: { x: 0, y: 0 },
      color: 'green',
      icon: 'Blocks',
      type: 'topic',
    },
    // Modeling & Simulation (top)
    {
      id: 'modeling-simulation',
      position: { x: 0, y: -220 },
      color: 'blue',
      icon: 'Box',
      type: 'lesson',
      lessonPath: '/fundamentals/modeling-simulation',
    },
    // Serialization & State (top-right)
    {
      id: 'serialization',
      position: { x: 200, y: -68 },
      color: 'teal',
      icon: 'Database',
      type: 'lesson',
      lessonPath: '/fundamentals/serialization',
    },
    // Rendering & Visualization (bottom-right)
    {
      id: 'rendering',
      position: { x: 124, y: 178 },
      color: 'purple',
      icon: 'Monitor',
      type: 'lesson',
      lessonPath: '/fundamentals/rendering',
    },
    // Physics (bottom-left)
    {
      id: 'physics',
      position: { x: -124, y: 178 },
      color: 'orange',
      icon: 'Orbit',
      type: 'lesson',
      lessonPath: '/fundamentals/physics',
    },
    // Networking Basics (top-left)
    {
      id: 'networking',
      position: { x: -200, y: -68 },
      color: 'cyan',
      icon: 'Network',
      type: 'lesson',
      lessonPath: '/fundamentals/networking',
    },
    // Game Loop (bottom)
    {
      id: 'game-loop',
      position: { x: 0, y: 280 },
      color: 'red',
      icon: 'RefreshCw',
      type: 'lesson',
      lessonPath: '/fundamentals/game-loop',
    },
  ],
  connections: [
    // Connect center to all topics
    { from: 'fundamentals-center', to: 'modeling-simulation' },
    { from: 'fundamentals-center', to: 'serialization' },
    { from: 'fundamentals-center', to: 'rendering' },
    { from: 'fundamentals-center', to: 'physics' },
    { from: 'fundamentals-center', to: 'networking' },
    { from: 'fundamentals-center', to: 'game-loop' },
    // Connect related topics
    { from: 'modeling-simulation', to: 'serialization', style: 'dashed' },
    { from: 'serialization', to: 'rendering', style: 'dashed' },
    { from: 'rendering', to: 'physics', style: 'dashed' },
    { from: 'physics', to: 'networking', style: 'dashed' },
    { from: 'networking', to: 'modeling-simulation', style: 'dashed' },
  ],
}
