import type { MindMapData } from '@/types/course'

// Main course mind map - 3 layers arranged in triangular pattern
// Text content is stored in locale files under course.main and course.layers
export const mainCourseTree: MindMapData = {
  id: 'main',
  centerPosition: { x: 0, y: 0 },
  nodes: [
    // Center node (title node)
    {
      id: 'center',
      position: { x: 0, y: 0 },
      color: 'purple',
      icon: 'Gamepad2',
      type: 'topic',
    },
    // Layer 1: Case Studies (top)
    {
      id: 'cases',
      position: { x: 0, y: -280 },
      color: 'blue',
      icon: 'Trophy',
      type: 'topic',
    },
    // Layer 2: Fundamentals (bottom-left)
    {
      id: 'fundamentals',
      position: { x: -280, y: 180 },
      color: 'green',
      icon: 'Blocks',
      type: 'topic',
    },
    // Layer 3: Design Decisions (bottom-right)
    {
      id: 'decisions',
      position: { x: 280, y: 180 },
      color: 'orange',
      icon: 'GitBranch',
      type: 'topic',
    },
  ],
  connections: [
    // Connect center to all layers
    { from: 'center', to: 'cases' },
    { from: 'center', to: 'fundamentals' },
    { from: 'center', to: 'decisions' },
    // Connect layers to show relationships
    { from: 'cases', to: 'fundamentals', style: 'dashed' },
    { from: 'cases', to: 'decisions', style: 'dashed' },
    { from: 'fundamentals', to: 'decisions', style: 'dashed' },
  ],
}

// Helper function to get node by id
export function getNodeById(data: MindMapData, id: string) {
  return data.nodes.find(node => node.id === id)
}

// Helper function to get connections for a node
export function getNodeConnections(data: MindMapData, nodeId: string) {
  return data.connections.filter(
    conn => conn.from === nodeId || conn.to === nodeId
  )
}

// Color mapping for Tailwind classes
export const nodeColorClasses: Record<string, { bg: string; border: string; text: string }> = {
  blue: {
    bg: 'bg-blue-500',
    border: 'border-blue-600',
    text: 'text-blue-50',
  },
  green: {
    bg: 'bg-green-500',
    border: 'border-green-600',
    text: 'text-green-50',
  },
  purple: {
    bg: 'bg-purple-500',
    border: 'border-purple-600',
    text: 'text-purple-50',
  },
  orange: {
    bg: 'bg-orange-500',
    border: 'border-orange-600',
    text: 'text-orange-50',
  },
  red: {
    bg: 'bg-red-500',
    border: 'border-red-600',
    text: 'text-red-50',
  },
  teal: {
    bg: 'bg-teal-500',
    border: 'border-teal-600',
    text: 'text-teal-50',
  },
  pink: {
    bg: 'bg-pink-500',
    border: 'border-pink-600',
    text: 'text-pink-50',
  },
  yellow: {
    bg: 'bg-yellow-500',
    border: 'border-yellow-600',
    text: 'text-yellow-900',
  },
  cyan: {
    bg: 'bg-cyan-500',
    border: 'border-cyan-600',
    text: 'text-cyan-50',
  },
  indigo: {
    bg: 'bg-indigo-500',
    border: 'border-indigo-600',
    text: 'text-indigo-50',
  },
  amber: {
    bg: 'bg-amber-500',
    border: 'border-amber-600',
    text: 'text-amber-900',
  },
}
