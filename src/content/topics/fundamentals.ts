import type { MindMapData } from '@/types/course'

// Layer 2: Fundamentals - Core principles that never change
// Core concept: Game = Modeling & Simulation of game world + Input/Output
// Text content is stored in locale files under course.fundamentals
export const fundamentalsTree: MindMapData = {
  id: 'fundamentals',
  centerPosition: { x: 0, y: 0 },
  nodes: [
    // Center node - 기본 원리
    {
      id: 'center',
      position: { x: 0, y: 0 },
      color: 'green',
      icon: 'Blocks',
      type: 'topic',
    },
    // Modeling & Simulation (TOP - The CORE of game development)
    // 게임을 만든다 = 게임 세계를 모델링하고 시뮬레이션한다
    {
      id: 'modeling-simulation',
      position: { x: 0, y: -220 },
      color: 'blue',
      icon: 'Box',
      type: 'lesson',
      lessonPath: '/fundamentals/modeling-simulation',
    },
    // Rendering & Visualization (BELOW modeling - visualizes the game state)
    // 모델링&시뮬레이션의 결과물인 게임 상태를 시각화
    {
      id: 'rendering',
      position: { x: 0, y: 220 },
      color: 'purple',
      icon: 'Monitor',
      type: 'lesson',
      lessonPath: '/fundamentals/rendering',
    },
    // State Optimization Tools (LEFT - physics, kinematic, bezier, etc.)
    // 상태를 효율적으로 표현하기 위한 도구들
    {
      id: 'state-tools',
      position: { x: -220, y: 0 },
      color: 'orange',
      icon: 'Wrench',
      type: 'lesson',
      lessonPath: '/fundamentals/state-tools',
    },
    // Serialization & State Persistence (RIGHT)
    // 상태를 저장하고 불러오기
    {
      id: 'serialization',
      position: { x: 220, y: 0 },
      color: 'teal',
      icon: 'Database',
      type: 'lesson',
      lessonPath: '/fundamentals/serialization',
    },
    // Networking (BOTTOM-RIGHT - sharing state)
    // 상태를 네트워크로 공유
    {
      id: 'networking',
      position: { x: 160, y: 160 },
      color: 'cyan',
      icon: 'Network',
      type: 'lesson',
      lessonPath: '/fundamentals/networking',
    },
  ],
  connections: [
    // Connect center to all topics
    { from: 'center', to: 'modeling-simulation' },
    { from: 'center', to: 'rendering' },
    { from: 'center', to: 'state-tools' },
    { from: 'center', to: 'serialization' },
    { from: 'center', to: 'networking' },

    // KEY CONNECTION: Modeling → Rendering (게임 상태 → 시각화)
    // This is the core flow: create state → display state
    { from: 'modeling-simulation', to: 'rendering', style: 'solid' },

    // Modeling uses state-tools for efficient state representation
    // 물리, kinematic, bezier 등을 활용해 상태를 효율적으로 표현
    { from: 'modeling-simulation', to: 'state-tools', style: 'dashed' },

    // Rendering also uses state-tools for optimization
    { from: 'state-tools', to: 'rendering', style: 'dashed' },

    // Serialization persists the game state
    { from: 'modeling-simulation', to: 'serialization', style: 'dashed' },

    // Networking uses serialization for state sync
    { from: 'serialization', to: 'networking', style: 'dashed' },
  ],
}
