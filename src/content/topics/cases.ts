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
    // Candy Crush (outer ring - between super-mario and maplestory)
    {
      id: 'candy-crush',
      position: { x: 110, y: -200 },
      color: 'pink',
      icon: 'Candy',
      type: 'lesson',
      lessonPath: '/demo/candy-crush',
    },
    // Fortnite (outer ring - between pubg and overwatch)
    {
      id: 'fortnite',
      position: { x: 110, y: 200 },
      color: 'violet',
      icon: 'Building',
      type: 'lesson',
      lessonPath: '/cases/fortnite',
    },
    // Counter-Strike (outer ring - between starcraft and super-mario)
    {
      id: 'counter-strike',
      position: { x: -110, y: -200 },
      color: 'slate',
      icon: 'Bomb',
      type: 'lesson',
      lessonPath: '/cases/counter-strike',
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
    { from: 'cases-center', to: 'candy-crush' },
    { from: 'cases-center', to: 'fortnite' },
    { from: 'cases-center', to: 'counter-strike' },
    // Connect adjacent games
    { from: 'super-mario', to: 'candy-crush', style: 'dashed' },
    { from: 'candy-crush', to: 'maplestory', style: 'dashed' },
    { from: 'maplestory', to: 'overwatch', style: 'dashed' },
    { from: 'overwatch', to: 'fortnite', style: 'dashed' },
    { from: 'fortnite', to: 'pubg', style: 'dashed' },
    { from: 'pubg', to: 'lol', style: 'dashed' },
    { from: 'lol', to: 'starcraft', style: 'dashed' },
    { from: 'starcraft', to: 'counter-strike', style: 'dashed' },
    { from: 'counter-strike', to: 'super-mario', style: 'dashed' },
  ],
}
