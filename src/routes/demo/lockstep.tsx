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
            <CardTitle className="text-lg">락스텝 기반 게임들</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-300 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-900 rounded-lg text-center">
                <div className="font-semibold text-indigo-400">스타크래프트</div>
                <div className="text-xs text-slate-400">RTS - 지연 기반</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-center">
                <div className="font-semibold text-amber-400">에이지 오브 엠파이어</div>
                <div className="text-xs text-slate-400">RTS - 지연 기반</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-center">
                <div className="font-semibold text-cyan-400">팩토리오</div>
                <div className="text-xs text-slate-400">시뮬레이션 - 지연 기반</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-center">
                <div className="font-semibold text-pink-400">격투 게임</div>
                <div className="text-xs text-slate-400">롤백 넷코드</div>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              모든 게임이 락스텝의 핵심 원리(결정론적 시뮬레이션, 입력만 전송)를 공유하지만,
              지연 처리 방식에서 트레이드오프가 발생합니다.
            </p>
          </CardContent>
        </Card>

        {/* Lockstep Evolution */}
        <Card className="bg-slate-800/30 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-lg">락스텝의 진화: 지연 기반 vs 롤백</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-300 space-y-4">
            <p>
              락스텝은 <strong>결정론적 동기화</strong>의 기본 원리입니다. 모든 클라이언트가 동일한 시뮬레이션을
              실행하고 입력만 교환합니다. 하지만 지연을 처리하는 방식에 따라 두 가지 변형이 존재합니다:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded-lg border border-indigo-500/30">
                <h4 className="font-semibold text-indigo-400 mb-2">지연 기반 (Delay-Based)</h4>
                <p className="text-xs mb-2">스타크래프트, 에이지 오브 엠파이어, 철권 7</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>입력을 N프레임 후에 실행</li>
                  <li>상대 입력을 기다림</li>
                  <li>구현이 단순함</li>
                  <li><span className="text-red-400">입력 지연이 항상 존재</span></li>
                  <li><span className="text-red-400">네트워크 불안정 시 게임 멈춤</span></li>
                </ul>
              </div>

              <div className="p-4 bg-slate-900 rounded-lg border border-pink-500/30">
                <h4 className="font-semibold text-pink-400 mb-2">롤백 (Rollback)</h4>
                <p className="text-xs mb-2">철권 8, 스트리트 파이터 6, 길티기어</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>입력을 즉시 처리 (예측)</li>
                  <li>예측이 틀리면 되감고 재실행</li>
                  <li>구현이 복잡함</li>
                  <li><span className="text-green-400">로컬 입력에 지연 없음</span></li>
                  <li><span className="text-yellow-400">예측 실패 시 "순간이동" 현상</span></li>
                </ul>
              </div>
            </div>

            <div className="p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
              <h4 className="font-semibold text-amber-400 mb-2">🎮 철권의 진화</h4>
              <p className="text-xs">
                <strong>철권 7</strong>은 지연 기반 넷코드를 사용해 입력 지연이 5-20프레임까지 변동하며 비판받았습니다.
                <strong>철권 8</strong>은 롤백 넷코드로 전환하여 로컬 입력 반응성을 크게 개선했습니다.
                3D 격투 게임은 캐릭터당 155개 이상의 기술과 복잡한 애니메이션으로 롤백 구현이 어렵지만,
                철권 8은 이를 성공적으로 적용했습니다.
              </p>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg">
              <h4 className="font-semibold text-slate-200 mb-2">트레이드오프</h4>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left border-b border-slate-700">
                    <th className="py-2">항목</th>
                    <th className="py-2">지연 기반</th>
                    <th className="py-2">롤백</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-2">입력 반응성</td>
                    <td className="py-2 text-red-400">느림</td>
                    <td className="py-2 text-green-400">즉시</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2">CPU 부하</td>
                    <td className="py-2 text-green-400">낮음</td>
                    <td className="py-2 text-yellow-400">높음 (재시뮬레이션)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2">메모리 사용</td>
                    <td className="py-2 text-green-400">낮음</td>
                    <td className="py-2 text-yellow-400">높음 (상태 저장)</td>
                  </tr>
                  <tr>
                    <td className="py-2">구현 복잡도</td>
                    <td className="py-2 text-green-400">단순</td>
                    <td className="py-2 text-red-400">복잡</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Other Networking Models */}
        <Card className="bg-slate-800/30 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-lg">다른 네트워킹 모델: 서버 권위</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-300 space-y-4">
            <p>
              락스텝/롤백은 <strong>P2P 방식</strong>입니다. 반면 리그 오브 레전드(LoL) 같은 게임은
              <strong>서버 권위(Server-Authoritative)</strong> 모델을 사용합니다.
            </p>

            <div className="p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
              <h4 className="font-semibold text-cyan-400 mb-2">🎮 리그 오브 레전드의 네트워킹</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li><strong>서버 틱 레이트:</strong> 30Hz (33ms마다 게임 상태 업데이트)</li>
                <li><strong>클라이언트 예측:</strong> 사용하지 않음 (클릭 시 서버 응답 대기)</li>
                <li><strong>보간(Interpolation):</strong> 부드러운 이동을 위해 클라이언트에서 보간 처리</li>
                <li><strong>권장 핑:</strong> 60ms 이하 (밀리초 단위의 게임)</li>
              </ul>
              <p className="text-xs mt-2 text-slate-400">
                LoL에서 클릭 시 약간의 지연이 느껴지는 이유는 클라이언트 예측을 사용하지 않고
                서버 확인을 기다리기 때문입니다. 대신 서버가 게임 상태의 유일한 진실 공급원이 되어
                치팅 방지에 유리합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900 rounded-lg">
                <h4 className="font-semibold text-indigo-400 mb-2">락스텝 (P2P)</h4>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>서버 없이 피어 간 직접 통신</li>
                  <li>모든 클라이언트가 전체 시뮬레이션</li>
                  <li>입력만 전송 (대역폭 ↓)</li>
                  <li>수백 유닛 동기화 가능</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg">
                <h4 className="font-semibold text-cyan-400 mb-2">서버 권위</h4>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>서버가 게임 상태 계산</li>
                  <li>클라이언트는 렌더링 담당</li>
                  <li>상태 전체 전송 (대역폭 ↑)</li>
                  <li>치팅 방지에 유리</li>
                </ul>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              각 모델은 게임 장르에 맞게 선택됩니다. RTS(수백 유닛)는 락스텝, MOBA(10명+치팅 방지)는 서버 권위,
              격투 게임(입력 반응성)은 롤백이 적합합니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
