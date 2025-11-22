// Course content type definitions

// Position on the mind map canvas
export interface Position {
  x: number
  y: number
}

// Node types in the mind map
export type NodeType = 'topic' | 'subtopic' | 'lesson'

// Color themes for nodes
export type NodeColor =
  | 'blue'
  | 'green'
  | 'purple'
  | 'orange'
  | 'red'
  | 'teal'
  | 'pink'
  | 'yellow'
  | 'cyan'
  | 'indigo'
  | 'amber'

// Mind map node structure
export interface MindMapNode {
  id: string
  title?: string  // Optional - text stored in locale files
  titleEn?: string  // Optional - for backwards compatibility
  description?: string
  descriptionEn?: string
  position: Position
  color: NodeColor
  icon?: string  // Lucide icon name
  type: NodeType
  // For topic nodes that contain sub-mindmaps
  children?: MindMapNode[]
  // For lesson nodes that link directly to content
  lessonPath?: string
  // For topic nodes that link to a sub-mindmap page
  topicPath?: string
}

// Root mind map data structure
export interface MindMapData {
  id: string
  title?: string  // Optional - text stored in locale files
  titleEn?: string
  description?: string
  centerPosition: Position
  nodes: MindMapNode[]
  connections: MindMapConnection[]
}

// Connection between nodes
export interface MindMapConnection {
  from: string  // node id
  to: string    // node id
  style?: 'solid' | 'dashed'
}

// Lesson metadata
export interface LessonMeta {
  id: string
  title: string
  titleEn?: string
  description?: string
  descriptionEn?: string
  order: number
  estimatedTime?: number  // minutes
  tags?: string[]
  prerequisites?: string[]  // lesson ids
  hasDemo?: boolean
}

// Topic metadata (for sub-mindmaps)
export interface TopicMeta {
  id: string
  title: string
  titleEn?: string
  description?: string
  descriptionEn?: string
  mindmap?: MindMapData  // Nested mindmap
  lessons?: LessonMeta[]
}

// Progress tracking
export interface UserProgress {
  lessonId: string
  completed: boolean
  completedAt?: string
  timeSpent?: number  // seconds
}

export interface CourseProgress {
  topicId: string
  lessons: UserProgress[]
  lastAccessedAt: string
}

// Zoom/Pan state for mind map
export interface ViewState {
  scale: number
  translateX: number
  translateY: number
}

// Benchmark demo types (for serialization demos)
export interface BenchmarkResult {
  format: string
  serializeTime: number  // ms
  deserializeTime: number  // ms
  rawSize: number  // bytes
  compressedSize?: number  // bytes
}

export interface GameEntitySample {
  id: number
  name: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number; w: number }
  health: number
  inventory: Array<{
    itemId: number
    quantity: number
    metadata?: Record<string, unknown>
  }>
  stats: {
    strength: number
    agility: number
    intelligence: number
  }
  buffs: Array<{
    id: number
    duration: number
    stackCount: number
  }>
}

// Animation state for node transitions
export interface TransitionState {
  isTransitioning: boolean
  targetNode: MindMapNode | null
  phase: 'idle' | 'zoom-in' | 'fade-out' | 'navigate'
}
