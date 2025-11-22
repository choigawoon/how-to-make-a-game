import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, GitBranch, Construction } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { decisionsTree } from '@/content'

export const Route = createFileRoute('/decisions/$categoryId')({
  component: DecisionsPage,
})

// Decision metadata for trade-off comparisons
const decisionMetadata: Record<string, {
  options: Array<{
    name: string
    pros: string[]
    cons: string[]
    useCases: string[]
  }>
  considerations: string[]
}> = {
  'multiplayer-arch': {
    options: [
      {
        name: 'P2P (Peer-to-Peer)',
        pros: ['서버 비용 없음', '낮은 지연시간 가능'],
        cons: ['치트 취약', 'NAT 문제', '확장성 제한'],
        useCases: ['격투 게임', '소규모 협동'],
      },
      {
        name: 'Client-Server',
        pros: ['서버 권한으로 치트 방지', '확장성', '중앙 제어'],
        cons: ['서버 비용', '지연시간 증가'],
        useCases: ['FPS', 'MMORPG', '배틀로얄'],
      },
    ],
    considerations: ['플레이어 수', '치트 민감도', '예산', '지연시간 요구사항'],
  },
  'physics-authority': {
    options: [
      {
        name: '서버 물리',
        pros: ['일관성 보장', '치트 방지'],
        cons: ['입력 지연', '서버 부하'],
        useCases: ['경쟁 게임', 'e스포츠'],
      },
      {
        name: '클라이언트 물리',
        pros: ['즉각적 반응', '서버 부하 감소'],
        cons: ['동기화 문제', '치트 가능'],
        useCases: ['싱글플레이어', '협동 PvE'],
      },
    ],
    considerations: ['반응성 요구사항', '경쟁성', '서버 리소스'],
  },
  'sync-strategy': {
    options: [
      {
        name: '낙관적 동기화',
        pros: ['즉각적 피드백', '좋은 UX'],
        cons: ['롤백 필요', '복잡한 구현'],
        useCases: ['액션 게임', 'FPS'],
      },
      {
        name: '비관적 동기화',
        pros: ['단순한 구현', '일관성 보장'],
        cons: ['입력 지연', '느린 반응'],
        useCases: ['턴제 게임', 'RTS'],
      },
    ],
    considerations: ['게임 템포', '허용 가능한 지연시간', '복잡도 예산'],
  },
  'tickrate': {
    options: [
      {
        name: '높은 틱레이트 (60-128Hz)',
        pros: ['정밀한 히트박스', '부드러운 움직임'],
        cons: ['높은 대역폭', '서버 부하'],
        useCases: ['FPS', '격투 게임'],
      },
      {
        name: '낮은 틱레이트 (10-30Hz)',
        pros: ['낮은 대역폭', '서버 비용 절감'],
        cons: ['보간 필요', '정밀도 감소'],
        useCases: ['MMORPG', '전략 게임'],
      },
    ],
    considerations: ['게임 장르', '정밀도 요구사항', '인프라 비용'],
  },
  'balancing': {
    options: [
      {
        name: '하드코딩',
        pros: ['빠른 개발', '단순함'],
        cons: ['패치 필요', '유연성 부족'],
        useCases: ['소규모 프로젝트', '프로토타입'],
      },
      {
        name: '데이터 드리븐',
        pros: ['핫픽스 가능', '기획자 접근성', 'A/B 테스트'],
        cons: ['초기 설정 복잡', '런타임 오버헤드'],
        useCases: ['라이브 서비스', '대규모 게임'],
      },
    ],
    considerations: ['팀 구성', '업데이트 빈도', '운영 계획'],
  },
}

function DecisionsPage() {
  const { categoryId } = Route.useParams()

  // Find the decision node from the mindmap
  const decisionNode = decisionsTree.nodes.find(node => node.id === categoryId)
  const metadata = decisionMetadata[categoryId]

  if (!decisionNode) {
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
            <GitBranch className="h-5 w-5 text-orange-400" />
            <span className="text-sm text-slate-400">설계 결정</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{decisionNode.title}</h1>
          {decisionNode.titleEn && (
            <p className="text-xl text-slate-400">{decisionNode.titleEn}</p>
          )}
          {decisionNode.description && (
            <p className="text-lg text-slate-300 mt-4">{decisionNode.description}</p>
          )}
        </div>

        {/* Trade-off Comparison */}
        {metadata && (
          <>
            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {metadata.options.map((option, i) => (
                <div key={i} className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                  <h3 className="text-lg font-medium mb-4 text-white">{option.name}</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-green-400 mb-2">장점</h4>
                      <ul className="space-y-1">
                        {option.pros.map((pro, j) => (
                          <li key={j} className="text-sm text-slate-300">+ {pro}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-red-400 mb-2">단점</h4>
                      <ul className="space-y-1">
                        {option.cons.map((con, j) => (
                          <li key={j} className="text-sm text-slate-300">- {con}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-blue-400 mb-2">사용 사례</h4>
                      <div className="flex flex-wrap gap-2">
                        {option.useCases.map((useCase, j) => (
                          <span key={j} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Considerations */}
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 mb-8">
              <h3 className="text-sm font-medium text-slate-400 mb-3">결정 시 고려사항</h3>
              <div className="flex flex-wrap gap-2">
                {metadata.considerations.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Placeholder Content */}
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-800 border-dashed">
          <div className="text-center">
            <Construction className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-400 mb-2">상세 콘텐츠 준비 중</h3>
            <p className="text-slate-500">
              더 자세한 설명과 예제가 곧 추가될 예정입니다.
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
            <h3 className="text-lg font-medium mb-4 text-slate-300">시각화 / 데모</h3>
            <div className="h-48 bg-slate-800/50 rounded flex items-center justify-center">
              <span className="text-slate-500">시각화 영역</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
