import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Clock, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LockstepDemo } from '@/components/interactive/LockstepDemo'

export const Route = createFileRoute('/demo/lockstep')({
  component: LockstepDemoPage,
})

function LockstepDemoPage() {
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
                <Clock className="h-5 w-5" />
                락스텝 동기화 데모
              </h1>
              <p className="text-sm text-slate-400">
                스타크래프트 스타일의 결정론적 동기화 체험
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
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-400" />
              왜 스타크래프트는 지연 설정이 있을까?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-300 space-y-4">
            <p>
              스타크래프트를 해보신 분이라면 <strong>게임 속도 설정</strong>과 함께
              <strong>네트워크 지연(Latency)</strong> 설정을 본 적이 있을 것입니다.
              Low, Medium, High 중 선택하는 이 설정은 단순히 "랙"을 조절하는 것이 아닙니다.
            </p>
            <p>
              락스텝 네트워킹에서는 모든 플레이어의 입력이 모인 후에야
              시뮬레이션이 진행됩니다. <strong>지연 설정</strong>은 입력을 몇 프레임 뒤에
              실행할지를 결정합니다:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Low</strong>: 2프레임 지연 - 빠른 반응이지만 끊김 위험</li>
              <li><strong>Medium</strong>: 3프레임 지연 - 균형 잡힌 기본값</li>
              <li><strong>High</strong>: 4프레임 지연 - 느리지만 안정적인 동기화</li>
            </ul>
            <p>
              아래 데모에서 직접 유닛을 조종하며 지연 설정이 게임플레이에
              미치는 영향을 체험해보세요!
            </p>
          </CardContent>
        </Card>

        {/* Demo */}
        <LockstepDemo />

        {/* Additional Info */}
        <Card className="bg-slate-800/30 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-lg">락스텝의 장단점</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-300">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-400 mb-2">장점</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>완벽한 동기화 보장</li>
                  <li>네트워크 대역폭 절약 (입력만 전송)</li>
                  <li>리플레이 시스템 구현 용이</li>
                  <li>수백 유닛도 동기화 가능</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-2">단점</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>입력 지연이 항상 존재</li>
                  <li>비결정론적 연산 사용 불가</li>
                  <li>부동소수점 연산 주의 필요</li>
                  <li>한 명이 느리면 전체가 느려짐</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-world examples */}
        <Card className="bg-slate-800/30 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-lg">락스텝을 사용하는 게임들</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-300">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-900 rounded-lg text-center">
                <div className="font-semibold text-indigo-400">스타크래프트</div>
                <div className="text-xs text-slate-400">RTS</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-center">
                <div className="font-semibold text-amber-400">에이지 오브 엠파이어</div>
                <div className="text-xs text-slate-400">RTS</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-center">
                <div className="font-semibold text-cyan-400">팩토리오</div>
                <div className="text-xs text-slate-400">시뮬레이션</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-center">
                <div className="font-semibold text-pink-400">격투 게임들</div>
                <div className="text-xs text-slate-400">GGPO 롤백</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
