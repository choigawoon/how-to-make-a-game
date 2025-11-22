import type { MindMapData } from '@/types/course'

// Asset Management sub-mindmap
export const assetManagementTree: MindMapData = {
  id: 'asset-management',
  title: '에셋 관리',
  titleEn: 'Asset Management',
  description: '게임 데이터의 직렬화, 압축, 최적화',
  centerPosition: { x: 0, y: 0 },
  nodes: [
    // Center node
    {
      id: 'center',
      title: '에셋 관리',
      titleEn: 'Asset Management',
      position: { x: 0, y: 0 },
      color: 'teal',
      icon: 'Database',
      type: 'topic',
    },
    // Serialization formats
    {
      id: 'serialization',
      title: '직렬화 포맷',
      titleEn: 'Serialization Formats',
      description: 'JSON, MessagePack, Protobuf, BSON 비교',
      position: { x: 0, y: -200 },
      color: 'blue',
      icon: 'FileJson',
      type: 'subtopic',
      lessonPath: '/demo/serialization',
    },
    // Compression
    {
      id: 'compression',
      title: '압축 기법',
      titleEn: 'Compression',
      description: 'gzip, LZ4, Zstandard',
      position: { x: 200, y: -100 },
      color: 'green',
      icon: 'Archive',
      type: 'subtopic',
    },
    // Asset bundling
    {
      id: 'bundling',
      title: '에셋 번들링',
      titleEn: 'Asset Bundling',
      description: '리소스 패키징과 로딩',
      position: { x: 200, y: 100 },
      color: 'orange',
      icon: 'Package',
      type: 'subtopic',
    },
    // Streaming
    {
      id: 'streaming',
      title: '스트리밍 로드',
      titleEn: 'Streaming Load',
      description: '대용량 월드 로딩 전략',
      position: { x: 0, y: 200 },
      color: 'purple',
      icon: 'Download',
      type: 'subtopic',
    },
    // Caching
    {
      id: 'caching',
      title: '캐싱 전략',
      titleEn: 'Caching Strategy',
      description: '메모리와 디스크 캐싱',
      position: { x: -200, y: 100 },
      color: 'pink',
      icon: 'HardDrive',
      type: 'subtopic',
    },
    // Versioning
    {
      id: 'versioning',
      title: '버전 관리',
      titleEn: 'Versioning',
      description: '에셋 버전과 마이그레이션',
      position: { x: -200, y: -100 },
      color: 'red',
      icon: 'GitBranch',
      type: 'subtopic',
    },
  ],
  connections: [
    { from: 'center', to: 'serialization' },
    { from: 'center', to: 'compression' },
    { from: 'center', to: 'bundling' },
    { from: 'center', to: 'streaming' },
    { from: 'center', to: 'caching' },
    { from: 'center', to: 'versioning' },
    // Related connections
    { from: 'serialization', to: 'compression', style: 'dashed' },
    { from: 'compression', to: 'bundling', style: 'dashed' },
    { from: 'bundling', to: 'streaming', style: 'dashed' },
    { from: 'streaming', to: 'caching', style: 'dashed' },
  ],
}
