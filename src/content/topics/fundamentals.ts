import type { MindMapData } from '@/types/course'

// Layer 2: Fundamentals - Core principles that never change
export const fundamentalsTree: MindMapData = {
  id: 'fundamentals',
  title: '기본 원리',
  titleEn: 'Fundamentals',
  description: '게임 장르 무관하게 항상 필요한 불변 법칙',
  centerPosition: { x: 0, y: 0 },
  nodes: [
    // Center node
    {
      id: 'fundamentals-center',
      title: '핵심 원리',
      titleEn: 'Core Principles',
      description: '주제를 선택하세요',
      position: { x: 0, y: 0 },
      color: 'green',
      icon: 'Blocks',
      type: 'topic',
    },
    // Modeling & Simulation (top)
    {
      id: 'modeling-simulation',
      title: '모델링 & 시뮬레이션',
      titleEn: 'Modeling & Simulation',
      description: '게임 세계의 상태 정의와 업데이트',
      position: { x: 0, y: -220 },
      color: 'blue',
      icon: 'Box',
      type: 'lesson',
      lessonPath: '/fundamentals/modeling-simulation',
    },
    // Serialization & State (top-right)
    {
      id: 'serialization',
      title: '직렬화 & 상태관리',
      titleEn: 'Serialization & State',
      description: '데이터 저장, 전송, 복원',
      position: { x: 200, y: -68 },
      color: 'teal',
      icon: 'Database',
      type: 'lesson',
      lessonPath: '/fundamentals/serialization',
    },
    // Rendering & Visualization (bottom-right)
    {
      id: 'rendering',
      title: '렌더링 & 시각화',
      titleEn: 'Rendering & Visualization',
      description: '게임 상태를 화면에 표현',
      position: { x: 124, y: 178 },
      color: 'purple',
      icon: 'Monitor',
      type: 'lesson',
      lessonPath: '/fundamentals/rendering',
    },
    // Physics (bottom-left)
    {
      id: 'physics',
      title: '물리 연산',
      titleEn: 'Physics Computation',
      description: '충돌, 중력, 힘의 계산',
      position: { x: -124, y: 178 },
      color: 'orange',
      icon: 'Orbit',
      type: 'lesson',
      lessonPath: '/fundamentals/physics',
    },
    // Networking Basics (top-left)
    {
      id: 'networking',
      title: '네트워크 통신 기초',
      titleEn: 'Network Communication',
      description: 'TCP/UDP, 패킷, 지연시간',
      position: { x: -200, y: -68 },
      color: 'cyan',
      icon: 'Network',
      type: 'lesson',
      lessonPath: '/fundamentals/networking',
    },
  ],
  connections: [
    // Connect center to all topics
    { from: 'fundamentals-center', to: 'modeling-simulation' },
    { from: 'fundamentals-center', to: 'serialization' },
    { from: 'fundamentals-center', to: 'rendering' },
    { from: 'fundamentals-center', to: 'physics' },
    { from: 'fundamentals-center', to: 'networking' },
    // Connect related topics
    { from: 'modeling-simulation', to: 'serialization', style: 'dashed' },
    { from: 'serialization', to: 'rendering', style: 'dashed' },
    { from: 'rendering', to: 'physics', style: 'dashed' },
    { from: 'physics', to: 'networking', style: 'dashed' },
    { from: 'networking', to: 'modeling-simulation', style: 'dashed' },
  ],
}
