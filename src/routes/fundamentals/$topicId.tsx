import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Blocks, Construction, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fundamentalsTree } from '@/content'

export const Route = createFileRoute('/fundamentals/$topicId')({
  component: FundamentalsPage,
})

// Topic metadata for additional context
const topicMetadata: Record<string, {
  concepts: string[]
  usedIn: string[]
  hasDemo?: boolean
  demoPath?: string
}> = {
  'modeling-simulation': {
    concepts: ['게임 루프', '상태 머신', 'ECS 패턴', '월드 업데이트'],
    usedIn: ['모든 게임'],
  },
  'serialization': {
    concepts: ['JSON', 'MessagePack', 'Protocol Buffers', '압축', '상태 스냅샷'],
    usedIn: ['저장/로드', '네트워크 전송', '리플레이'],
    hasDemo: true,
    demoPath: '/demo/serialization',
  },
  'rendering': {
    concepts: ['렌더링 파이프라인', '보간', '프레임 독립성', 'LOD'],
    usedIn: ['모든 게임'],
  },
  'physics': {
    concepts: ['충돌 감지', '강체 역학', 'Raycast', '트리거'],
    usedIn: ['플랫포머', 'FPS', '레이싱'],
  },
  'networking': {
    concepts: ['TCP vs UDP', '지연시간', '패킷 손실', '대역폭'],
    usedIn: ['멀티플레이어 게임'],
  },
}

function FundamentalsPage() {
  const { topicId } = Route.useParams()

  // Find the topic node from the mindmap
  const topicNode = fundamentalsTree.nodes.find(node => node.id === topicId)
  const metadata = topicMetadata[topicId]

  if (!topicNode) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">페이지를 찾을 수 없습니다</h1>
          <Link to="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              돌아가기
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Blocks className="h-5 w-5 text-green-400" />
            <span className="text-sm text-slate-400">기본 원리</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{topicNode.title}</h1>
          {topicNode.titleEn && (
            <p className="text-xl text-slate-400">{topicNode.titleEn}</p>
          )}
          {topicNode.description && (
            <p className="text-lg text-slate-300 mt-4">{topicNode.description}</p>
          )}
        </div>

        {/* Metadata */}
        {metadata && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <h3 className="text-sm font-medium text-slate-400 mb-3">핵심 개념</h3>
              <div className="flex flex-wrap gap-2">
                {metadata.concepts.map((concept, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <h3 className="text-sm font-medium text-slate-400 mb-3">활용 분야</h3>
              <ul className="space-y-1">
                {metadata.usedIn.map((item, i) => (
                  <li key={i} className="text-sm text-slate-300">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Demo Button if available */}
        {metadata?.hasDemo && metadata.demoPath && (
          <div className="mb-8">
            <Link to={metadata.demoPath}>
              <Button className="bg-green-600 hover:bg-green-700">
                <Play className="h-4 w-4 mr-2" />
                데모 실행하기
              </Button>
            </Link>
          </div>
        )}

        {/* Placeholder Content */}
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-800 border-dashed">
          <div className="text-center">
            <Construction className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-400 mb-2">콘텐츠 준비 중</h3>
            <p className="text-slate-500">
              이 페이지의 상세 내용이 곧 추가될 예정입니다.
            </p>
          </div>
        </div>

        {/* Theory + Visualization placeholder */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <h3 className="text-lg font-medium mb-4 text-slate-300">이론 설명</h3>
            <div className="h-48 bg-slate-800/50 rounded flex items-center justify-center">
              <span className="text-slate-500">이론 설명 영역</span>
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <h3 className="text-lg font-medium mb-4 text-slate-300">시각화</h3>
            <div className="h-48 bg-slate-800/50 rounded flex items-center justify-center">
              <span className="text-slate-500">시각화 영역</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
