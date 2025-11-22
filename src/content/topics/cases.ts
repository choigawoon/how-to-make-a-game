import type { MindMapData } from '@/types/course'

// Layer 1: Case Studies - Learn from real games
export const casesTree: MindMapData = {
  id: 'cases',
  title: '사례로 배우기',
  titleEn: 'Case Studies',
  description: '실제 게임들이 2, 3계층을 어떻게 구현했는지',
  centerPosition: { x: 0, y: 0 },
  nodes: [
    // Center node
    {
      id: 'cases-center',
      title: '사례 연구',
      titleEn: 'Case Studies',
      description: '게임을 선택하세요',
      position: { x: 0, y: 0 },
      color: 'blue',
      icon: 'Trophy',
      type: 'topic',
    },
    // Super Mario (top)
    {
      id: 'super-mario',
      title: '슈퍼마리오',
      titleEn: 'Super Mario',
      description: '플랫포머의 정석, 정밀한 물리와 타이밍',
      position: { x: 0, y: -250 },
      color: 'red',
      icon: 'Gamepad2',
      type: 'lesson',
      lessonPath: '/cases/super-mario',
    },
    // MapleStory (top-right)
    {
      id: 'maplestory',
      title: '메이플스토리',
      titleEn: 'MapleStory',
      description: '2D MMORPG, 대규모 동시접속 처리',
      position: { x: 220, y: -125 },
      color: 'orange',
      icon: 'TreePine',
      type: 'lesson',
      lessonPath: '/cases/maplestory',
    },
    // Overwatch (bottom-right)
    {
      id: 'overwatch',
      title: '오버워치',
      titleEn: 'Overwatch',
      description: 'FPS, 클라이언트 예측과 서버 권한',
      position: { x: 220, y: 125 },
      color: 'amber',
      icon: 'Crosshair',
      type: 'lesson',
      lessonPath: '/cases/overwatch',
    },
    // PUBG (bottom)
    {
      id: 'pubg',
      title: '배틀그라운드',
      titleEn: 'PUBG',
      description: '배틀로얄, 대규모 맵과 100인 동기화',
      position: { x: 0, y: 250 },
      color: 'yellow',
      icon: 'Target',
      type: 'lesson',
      lessonPath: '/cases/pubg',
    },
    // League of Legends (bottom-left)
    {
      id: 'lol',
      title: '리그 오브 레전드',
      titleEn: 'League of Legends',
      description: 'MOBA, 결정론적 시뮬레이션',
      position: { x: -220, y: 125 },
      color: 'cyan',
      icon: 'Swords',
      type: 'lesson',
      lessonPath: '/cases/lol',
    },
    // StarCraft (top-left)
    {
      id: 'starcraft',
      title: '스타크래프트',
      titleEn: 'StarCraft',
      description: 'RTS, 락스텝과 완벽한 동기화',
      position: { x: -220, y: -125 },
      color: 'indigo',
      icon: 'Rocket',
      type: 'lesson',
      lessonPath: '/cases/starcraft',
    },
  ],
  connections: [
    // Connect center to all games
    { from: 'cases-center', to: 'super-mario' },
    { from: 'cases-center', to: 'maplestory' },
    { from: 'cases-center', to: 'overwatch' },
    { from: 'cases-center', to: 'pubg' },
    { from: 'cases-center', to: 'lol' },
    { from: 'cases-center', to: 'starcraft' },
    // Connect adjacent games
    { from: 'super-mario', to: 'maplestory', style: 'dashed' },
    { from: 'maplestory', to: 'overwatch', style: 'dashed' },
    { from: 'overwatch', to: 'pubg', style: 'dashed' },
    { from: 'pubg', to: 'lol', style: 'dashed' },
    { from: 'lol', to: 'starcraft', style: 'dashed' },
    { from: 'starcraft', to: 'super-mario', style: 'dashed' },
  ],
}
