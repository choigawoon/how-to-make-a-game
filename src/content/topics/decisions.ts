import type { MindMapData } from '@/types/course'

// Layer 3: Design Decisions - Trade-offs based on game characteristics
export const decisionsTree: MindMapData = {
  id: 'decisions',
  title: '설계 결정',
  titleEn: 'Design Decisions',
  description: '게임 특성에 따라 달라지는 의사결정 영역',
  centerPosition: { x: 0, y: 0 },
  nodes: [
    // Center node
    {
      id: 'decisions-center',
      title: '설계 선택지',
      titleEn: 'Architecture Decisions',
      description: '주제를 선택하세요',
      position: { x: 0, y: 0 },
      color: 'orange',
      icon: 'GitBranch',
      type: 'topic',
    },
    // Multiplayer Architecture (top)
    {
      id: 'multiplayer-arch',
      title: '멀티플레이 아키텍처',
      titleEn: 'Multiplayer Architecture',
      description: 'P2P vs Client-Server, 권한 모델',
      position: { x: 0, y: -220 },
      color: 'blue',
      icon: 'Users',
      type: 'lesson',
      lessonPath: '/decisions/multiplayer-arch',
    },
    // Physics Processing (top-right)
    {
      id: 'physics-authority',
      title: '물리 처리 방식',
      titleEn: 'Physics Authority',
      description: '서버 vs 클라이언트 물리 연산',
      position: { x: 200, y: -68 },
      color: 'red',
      icon: 'Server',
      type: 'lesson',
      lessonPath: '/decisions/physics-authority',
    },
    // Synchronization Strategy (bottom-right)
    {
      id: 'sync-strategy',
      title: '동기화 전략',
      titleEn: 'Sync Strategy',
      description: '낙관적 vs 비관적, 롤백',
      position: { x: 124, y: 178 },
      color: 'purple',
      icon: 'RefreshCw',
      type: 'lesson',
      lessonPath: '/decisions/sync-strategy',
    },
    // Tick Rate & Interpolation (bottom-left)
    {
      id: 'tickrate',
      title: '틱레이트 & 보간',
      titleEn: 'Tick Rate & Interpolation',
      description: '업데이트 주기와 부드러운 표현',
      position: { x: -124, y: 178 },
      color: 'teal',
      icon: 'Timer',
      type: 'lesson',
      lessonPath: '/decisions/tickrate',
    },
    // Balancing Structure (top-left)
    {
      id: 'balancing',
      title: '밸런싱 구조',
      titleEn: 'Balancing Structure',
      description: '데이터 드리븐 밸런싱 설계',
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
