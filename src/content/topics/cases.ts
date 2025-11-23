import type { MindMapData } from '@/types/course'

// Layer 1: Case Studies - Learn from real games
// Text content is stored in locale files under course.cases
export const casesTree: MindMapData = {
  id: 'cases',
  centerPosition: { x: 0, y: 0 },
  nodes: [
    // Center node
    {
      id: 'cases-center',
      position: { x: 0, y: 0 },
      color: 'blue',
      icon: 'Trophy',
      type: 'topic',
    },
    // Super Mario (top)
    {
      id: 'super-mario',
      position: { x: 0, y: -250 },
      color: 'red',
      icon: 'Gamepad2',
      type: 'lesson',
      lessonPath: '/cases/super-mario',
    },
    // MapleStory (top-right)
    {
      id: 'maplestory',
      position: { x: 220, y: -125 },
      color: 'orange',
      icon: 'TreePine',
      type: 'lesson',
      lessonPath: '/cases/maplestory',
    },
    // Overwatch (bottom-right)
    {
      id: 'overwatch',
      position: { x: 220, y: 125 },
      color: 'amber',
      icon: 'Crosshair',
      type: 'lesson',
      lessonPath: '/cases/overwatch',
    },
    // PUBG (bottom)
    {
      id: 'pubg',
      position: { x: 0, y: 250 },
      color: 'yellow',
      icon: 'Target',
      type: 'lesson',
      lessonPath: '/cases/pubg',
    },
    // League of Legends (bottom-left)
    {
      id: 'lol',
      position: { x: -220, y: 125 },
      color: 'cyan',
      icon: 'Swords',
      type: 'lesson',
      lessonPath: '/cases/lol',
    },
    // StarCraft (top-left) - Links to lockstep demo
    {
      id: 'starcraft',
      position: { x: -220, y: -125 },
      color: 'indigo',
      icon: 'Rocket',
      type: 'lesson',
      lessonPath: '/demo/lockstep',
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
