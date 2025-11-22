import type { MindMapData } from '@/types/course'

// Game World Modeling sub-mindmap
export const gameWorldTree: MindMapData = {
  id: 'game-world',
  title: '게임월드 모델링과 시뮬레이션',
  titleEn: 'Game World Modeling & Simulation',
  description: '게임 세계의 상태를 정의하고 시뮬레이션하는 방법',
  centerPosition: { x: 0, y: 0 },
  nodes: [
    // Center node
    {
      id: 'center',
      title: '게임월드',
      titleEn: 'Game World',
      position: { x: 0, y: 0 },
      color: 'blue',
      icon: 'Globe',
      type: 'topic',
    },
    // Entity Component System
    {
      id: 'ecs',
      title: 'ECS 패턴',
      titleEn: 'Entity Component System',
      description: '엔티티, 컴포넌트, 시스템 아키텍처',
      position: { x: 0, y: -180 },
      color: 'purple',
      icon: 'Boxes',
      type: 'subtopic',
    },
    // World Simulation Demo
    {
      id: 'world-sim',
      title: '월드 시뮬레이션',
      titleEn: 'World Simulation',
      description: '3D 공간에서 엔티티 시각화',
      position: { x: 180, y: -90 },
      color: 'green',
      icon: 'Globe',
      type: 'lesson',
      lessonPath: '/demo/game-world',
    },
    // State Management
    {
      id: 'state',
      title: '상태 관리',
      titleEn: 'State Management',
      description: '게임 상태 저장과 동기화',
      position: { x: 180, y: 90 },
      color: 'teal',
      icon: 'Database',
      type: 'subtopic',
    },
    // Physics
    {
      id: 'physics',
      title: '물리 시뮬레이션',
      titleEn: 'Physics Simulation',
      description: '충돌, 중력, 힘 계산',
      position: { x: 0, y: 180 },
      color: 'orange',
      icon: 'Zap',
      type: 'subtopic',
    },
    // Spatial Partitioning
    {
      id: 'spatial',
      title: '공간 분할',
      titleEn: 'Spatial Partitioning',
      description: 'Octree, BSP, Grid 구조',
      position: { x: -180, y: 90 },
      color: 'pink',
      icon: 'Grid3x3',
      type: 'subtopic',
    },
    // Time & Ticks
    {
      id: 'time',
      title: '시간 & 틱',
      titleEn: 'Time & Ticks',
      description: '고정 타임스텝, 델타 타임',
      position: { x: -180, y: -90 },
      color: 'red',
      icon: 'Clock',
      type: 'subtopic',
    },
  ],
  connections: [
    { from: 'center', to: 'ecs' },
    { from: 'center', to: 'world-sim' },
    { from: 'center', to: 'state' },
    { from: 'center', to: 'physics' },
    { from: 'center', to: 'spatial' },
    { from: 'center', to: 'time' },
    { from: 'ecs', to: 'world-sim', style: 'dashed' },
    { from: 'world-sim', to: 'state', style: 'dashed' },
    { from: 'state', to: 'physics', style: 'dashed' },
  ],
}
