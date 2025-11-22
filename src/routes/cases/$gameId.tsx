import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Trophy, Construction } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { casesTree } from '@/content'

export const Route = createFileRoute('/cases/$gameId')({
  component: CaseStudyPage,
})

// Game metadata for additional context
const gameMetadata: Record<string, {
  genre: string
  year: string
  keyFeatures: string[]
  fundamentals: string[]
  decisions: string[]
}> = {
  'super-mario': {
    genre: '플랫포머',
    year: '1985',
    keyFeatures: ['정밀한 점프 물리', '타이밍 기반 게임플레이', '레벨 디자인'],
    fundamentals: ['물리 연산', '렌더링'],
    decisions: ['틱레이트'],
  },
  'maplestory': {
    genre: '2D MMORPG',
    year: '2003',
    keyFeatures: ['대규모 동시접속', '실시간 전투', '경제 시스템'],
    fundamentals: ['네트워크 통신', '직렬화', '모델링'],
    decisions: ['멀티플레이 아키텍처', '동기화 전략'],
  },
  'overwatch': {
    genre: 'FPS',
    year: '2016',
    keyFeatures: ['클라이언트 예측', '서버 권한', 'Favor the Shooter'],
    fundamentals: ['네트워크 통신', '물리 연산'],
    decisions: ['물리 처리 방식', '동기화 전략', '틱레이트'],
  },
  'pubg': {
    genre: '배틀로얄',
    year: '2017',
    keyFeatures: ['100인 동기화', '대규모 맵', '동적 안전구역'],
    fundamentals: ['네트워크 통신', '모델링'],
    decisions: ['멀티플레이 아키텍처', '물리 처리 방식'],
  },
  'lol': {
    genre: 'MOBA',
    year: '2009',
    keyFeatures: ['결정론적 시뮬레이션', '락스텝', '리플레이 시스템'],
    fundamentals: ['모델링', '네트워크 통신'],
    decisions: ['동기화 전략', '틱레이트', '밸런싱'],
  },
  'starcraft': {
    genre: 'RTS',
    year: '1998',
    keyFeatures: ['완벽한 동기화', '락스텝 네트워킹', '리플레이'],
    fundamentals: ['모델링', '네트워크 통신'],
    decisions: ['동기화 전략', '틱레이트'],
  },
}

function CaseStudyPage() {
  const { gameId } = Route.useParams()

  // Find the game node from the mindmap
  const gameNode = casesTree.nodes.find(node => node.id === gameId)
  const metadata = gameMetadata[gameId]

  if (!gameNode) {
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
            <Trophy className="h-5 w-5 text-blue-400" />
            <span className="text-sm text-slate-400">사례 연구</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{gameNode.title}</h1>
          {gameNode.titleEn && (
            <p className="text-xl text-slate-400">{gameNode.titleEn}</p>
          )}
          {gameNode.description && (
            <p className="text-lg text-slate-300 mt-4">{gameNode.description}</p>
          )}
        </div>

        {/* Metadata */}
        {metadata && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <h3 className="text-sm font-medium text-slate-400 mb-3">게임 정보</h3>
              <div className="space-y-2">
                <p><span className="text-slate-400">장르:</span> {metadata.genre}</p>
                <p><span className="text-slate-400">출시:</span> {metadata.year}</p>
              </div>
            </div>
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <h3 className="text-sm font-medium text-slate-400 mb-3">핵심 특징</h3>
              <ul className="space-y-1">
                {metadata.keyFeatures.map((feature, i) => (
                  <li key={i} className="text-sm">• {feature}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Related Layers */}
        {metadata && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <h3 className="text-sm font-medium text-green-400 mb-3">관련 기본 원리</h3>
              <div className="flex flex-wrap gap-2">
                {metadata.fundamentals.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <h3 className="text-sm font-medium text-orange-400 mb-3">관련 설계 결정</h3>
              <div className="flex flex-wrap gap-2">
                {metadata.decisions.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
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
