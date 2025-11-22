import type { MindMapData } from '@/types/course'

// Main course mind map - 6 core topics arranged in a hexagonal pattern
export const mainCourseTree: MindMapData = {
  id: 'main',
  title: '게임 개발 마스터하기',
  titleEn: 'Mastering Game Development',
  description: '게임 개발의 핵심 주제들을 탐험하세요',
  centerPosition: { x: 0, y: 0 },
  nodes: [
    // Center node (title node)
    {
      id: 'center',
      title: '게임 개발',
      titleEn: 'Game Dev',
      description: '핵심 주제를 선택하세요',
      position: { x: 0, y: 0 },
      color: 'purple',
      icon: 'Gamepad2',
      type: 'topic',
    },
    // 1. 게임월드 모델링과 시뮬레이션 (top)
    {
      id: 'game-world',
      title: '게임월드 모델링과 시뮬레이션',
      titleEn: 'Game World Modeling & Simulation',
      description: '게임 세계의 상태를 정의하고 시뮬레이션하는 방법',
      position: { x: 0, y: -300 },
      color: 'blue',
      icon: 'Globe',
      type: 'topic',
      topicPath: '/topic/game-world',
    },
    // 2. 멀티플레이 정책 (top-right)
    {
      id: 'multiplayer',
      title: '멀티플레이 정책',
      titleEn: 'Multiplayer Architecture',
      description: '네트워크 동기화, 서버 구조, 치트 방지',
      position: { x: 260, y: -150 },
      color: 'green',
      icon: 'Users',
      type: 'topic',
      topicPath: '/topic/multiplayer',
    },
    // 3. 게임 엔진 (bottom-right)
    {
      id: 'game-engine',
      title: '게임 엔진',
      titleEn: 'Game Engines',
      description: 'Unity, Unreal, Godot 등 게임 엔진 활용',
      position: { x: 260, y: 150 },
      color: 'orange',
      icon: 'Cog',
      type: 'topic',
      topicPath: '/topic/game-engine',
    },
    // 4. 에셋 관리 (bottom)
    {
      id: 'asset-management',
      title: '에셋 관리',
      titleEn: 'Asset Management',
      description: '데이터 직렬화, 압축, 최적화된 저장 방식',
      position: { x: 0, y: 300 },
      color: 'teal',
      icon: 'Database',
      type: 'topic',
      topicPath: '/topic/asset-management',
    },
    // 5. 빌드 배포 (bottom-left)
    {
      id: 'build-deploy',
      title: '빌드 배포',
      titleEn: 'Build & Deploy',
      description: 'CI/CD, 자동화, 플랫폼별 빌드 설정',
      position: { x: -260, y: 150 },
      color: 'red',
      icon: 'Rocket',
      type: 'topic',
      topicPath: '/topic/build-deploy',
    },
    // 6. 크로스플랫폼 (top-left)
    {
      id: 'cross-platform',
      title: '크로스플랫폼',
      titleEn: 'Cross-Platform',
      description: 'PC, 모바일, 콘솔 동시 지원 전략',
      position: { x: -260, y: -150 },
      color: 'pink',
      icon: 'Monitor',
      type: 'topic',
      topicPath: '/topic/cross-platform',
    },
  ],
  connections: [
    // Connect center to all topics
    { from: 'center', to: 'game-world' },
    { from: 'center', to: 'multiplayer' },
    { from: 'center', to: 'game-engine' },
    { from: 'center', to: 'asset-management' },
    { from: 'center', to: 'build-deploy' },
    { from: 'center', to: 'cross-platform' },
    // Connect adjacent topics (optional, for visual effect)
    { from: 'game-world', to: 'multiplayer', style: 'dashed' },
    { from: 'multiplayer', to: 'game-engine', style: 'dashed' },
    { from: 'game-engine', to: 'asset-management', style: 'dashed' },
    { from: 'asset-management', to: 'build-deploy', style: 'dashed' },
    { from: 'build-deploy', to: 'cross-platform', style: 'dashed' },
    { from: 'cross-platform', to: 'game-world', style: 'dashed' },
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
}
