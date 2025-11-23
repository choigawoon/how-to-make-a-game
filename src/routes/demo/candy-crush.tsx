import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Candy, Info, Lightbulb, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CandyCrushDemo } from '@/components/interactive/CandyCrushDemo'

export const Route = createFileRoute('/demo/candy-crush')({
  component: CandyCrushDemoPage,
})

function CandyCrushDemoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Candy className="h-5 w-5" />
                3매치 퍼즐 연쇄 처리
              </h1>
              <p className="text-sm text-slate-400">
                캔디크러쉬 스타일의 체인 매칭 알고리즘
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <Card className="bg-slate-800/30 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-blue-400" />
              3매치 퍼즐이란?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <p>
              <strong className="text-white">3매치 퍼즐</strong>은 같은 종류의 캔디(또는 보석, 과일 등)를
              3개 이상 연속으로 배치하면 사라지는 퍼즐 게임입니다.
              <span className="text-purple-400"> 캔디크러쉬</span>,
              <span className="text-green-400"> 애니팡</span>,
              <span className="text-blue-400"> 비주얼드</span> 등이 대표적입니다.
            </p>
            <p>
              이 데모에서는 <strong className="text-yellow-400">연쇄 반응(Chain Reaction)</strong>의
              처리 방법을 시각화합니다. 매치가 발생하면 → 캔디 제거 → 중력 적용 → 새 캔디 생성 →
              새 매치 확인의 과정이 반복됩니다.
            </p>
          </CardContent>
        </Card>

        {/* Demo */}
        <CandyCrushDemo />

        {/* Implementation Tips */}
        <Card className="bg-slate-800/30 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              구현 팁
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <h4 className="font-medium text-sm text-white mb-2">매치 탐색 최적화</h4>
                <p className="text-xs">
                  전체 보드를 매번 스캔하는 대신, 변경된 셀 주변만 검사하면 성능이 향상됩니다.
                </p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <h4 className="font-medium text-sm text-white mb-2">애니메이션 타이밍</h4>
                <p className="text-xs">
                  각 단계별 애니메이션 시간을 조절하여 플레이어가 연쇄를 인지할 수 있도록 합니다.
                </p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <h4 className="font-medium text-sm text-white mb-2">점수 시스템</h4>
                <p className="text-xs">
                  연쇄가 높을수록 점수 배율이 증가합니다. 예: 1연쇄 x1, 2연쇄 x1.5, 3연쇄 x2...
                </p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <h4 className="font-medium text-sm text-white mb-2">특수 캔디 생성</h4>
                <p className="text-xs">
                  4개 매치 → 줄무늬 캔디, 5개 T/L 매치 → 폭탄, 5개 직선 → 컬러폭탄 등
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code Example */}
        <Card className="bg-slate-800/30 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Code className="h-5 w-5 text-green-400" />
              실제 구현 예시
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs text-slate-300 overflow-x-auto p-4 bg-slate-900/50 rounded-lg">
{`// 연쇄 매칭 처리 메인 루프
async function processMatches(grid: Grid): Promise<number> {
  let chainCount = 0

  while (true) {
    // 1. 매치 찾기
    const matches = findAllMatches(grid)
    if (matches.length === 0) break

    chainCount++

    // 2. 매치된 캔디 제거 + 점수 계산
    const score = calculateScore(matches, chainCount)
    await animateRemoval(matches)
    removeCandies(grid, matches)

    // 3. 중력 적용
    await animateFalling(grid)
    applyGravity(grid)

    // 4. 빈 공간 채우기
    await animateSpawn(grid)
    fillEmptySpaces(grid)
  }

  return chainCount
}

// 매치 탐색 (가로/세로)
function findAllMatches(grid: Grid): Match[] {
  const matches: Match[] = []

  // 가로 탐색
  for (let row = 0; row < ROWS; row++) {
    let count = 1
    for (let col = 1; col < COLS; col++) {
      if (grid[row][col] === grid[row][col-1]) {
        count++
      } else {
        if (count >= 3) {
          matches.push({
            type: 'horizontal',
            row,
            startCol: col - count,
            length: count
          })
        }
        count = 1
      }
    }
    if (count >= 3) {
      matches.push({
        type: 'horizontal',
        row,
        startCol: COLS - count,
        length: count
      })
    }
  }

  // 세로 탐색도 동일한 방식
  // ...

  return mergeOverlappingMatches(matches)
}`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
