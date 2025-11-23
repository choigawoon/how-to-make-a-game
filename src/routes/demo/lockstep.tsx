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
            <CardTitle className="text-lg flex items-center justify-between">
              <span>락스텝의 진화: 지연 기반 vs 롤백</span>
              <Link to="/decisions/sync-strategy">
                <Button variant="outline" size="sm" className="text-orange-400 border-orange-400/30 hover:bg-orange-400/10">
                  동기화 전략 비교 →
                </Button>
              </Link>
            </CardTitle>
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

        {/* Architecture Comparison: WC3 vs LoL */}
        <Card className="bg-slate-800/30 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>아키텍처 비교: 워크래프트3 vs 리그 오브 레전드</span>
              <Link to="/decisions/multiplayer-arch">
                <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10">
                  더 많은 사례 보기 →
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-300 space-y-4">
            <p>
              LoL은 워크래프트3 유즈맵(DotA)에서 파생되었지만, 네트워킹 아키텍처는 완전히 다릅니다.
              왜 이런 결정을 했을까요?
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
                <h4 className="font-semibold text-indigo-400 mb-2">워크래프트3 / 스타크래프트</h4>
                <p className="text-xs text-slate-400 mb-2">P2P 락스텝 (한 플레이어가 호스트)</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>한 플레이어가 "호스트"(의사 서버) 역할</li>
                  <li>모든 클라이언트가 동일한 결정론적 시뮬레이션 실행</li>
                  <li><strong>입력만 전송</strong> → 대역폭 절약</li>
                  <li>TCP 사용 (끊김보다 렉 선호)</li>
                  <li>호스트 이탈 시 새 호스트 선출 가능</li>
                </ul>
                <div className="mt-2 p-2 bg-slate-900 rounded text-xs">
                  <strong>왜?</strong> 과거 네트워크 대역폭이 매우 제한적이었음.
                  수천 유닛 상태를 매 프레임 전송하는 것은 불가능했음.
                </div>
              </div>

              <div className="p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
                <h4 className="font-semibold text-cyan-400 mb-2">리그 오브 레전드</h4>
                <p className="text-xs text-slate-400 mb-2">전용 서버 권위 (Dedicated Server)</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Riot의 전용 서버가 게임 상태 계산</li>
                  <li>서버가 결정론적 시뮬레이션 실행</li>
                  <li><strong>상태를 전송</strong> → 대역폭 더 사용</li>
                  <li>UDP 사용 (빠른 전송 우선)</li>
                  <li>서버가 단일 진실 공급원 (치팅 방지)</li>
                </ul>
                <div className="mt-2 p-2 bg-slate-900 rounded text-xs">
                  <strong>왜?</strong> 대역폭이 충분해짐 + 경쟁 게임에서 치팅 방지가 중요 +
                  전용 서버 인프라 구축 가능.
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
              <h4 className="font-semibold text-amber-400 mb-2">🎮 DotA → Dota 2의 전환</h4>
              <p className="text-xs">
                <strong>DotA 1</strong>은 워크래프트3 엔진의 P2P 락스텝을 그대로 사용했습니다.
                <strong>Dota 2</strong>는 Valve의 Source 2 엔진으로 재작성되며 클라이언트-서버 모델로 전환했습니다.
                이는 LoL과 동일한 이유: 치팅 방지 + 전용 서버 인프라.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* LoL Command Processing Detail */}
        <Card className="bg-slate-800/30 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-lg">LoL의 커맨드 처리: 클라이언트 예측 vs 서버 대기</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-300 space-y-4">
            <div className="p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
              <h4 className="font-semibold text-cyan-400 mb-2">🎮 리그 오브 레전드의 커맨드 흐름</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li><strong>서버 틱 레이트:</strong> 30Hz (33ms마다 게임 상태 업데이트)</li>
                <li><strong>기본 동작:</strong> 클라이언트 예측 사용 안 함 (서버 응답 대기)</li>
                <li><strong>보간(Interpolation):</strong> 서버 업데이트 사이 부드러운 이동 처리</li>
                <li><strong>클럭 동기화:</strong> 클라이언트 시간이 서버 시간에 점진적으로 수렴</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900 rounded-lg">
                <h4 className="font-semibold text-green-400 mb-2">기본 모드 (예측 OFF)</h4>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>플레이어가 이동 클릭</li>
                  <li>입력이 서버로 전송</li>
                  <li>서버가 처리 후 상태 브로드캐스트</li>
                  <li>클라이언트가 상태 수신 후 렌더링</li>
                </ol>
                <p className="text-xs text-slate-400 mt-2">
                  → 핑만큼 지연이 발생하지만 정확함
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">"이동 예측" 옵션 (예측 ON)</h4>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>플레이어가 이동 클릭</li>
                  <li>클라이언트가 즉시 예측 이동 표시</li>
                  <li>동시에 서버로 전송</li>
                  <li>서버 응답과 불일치 시 보정</li>
                </ol>
                <p className="text-xs text-slate-400 mt-2">
                  → 반응은 빠르지만 "순간이동" 현상 발생 가능
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg">
              <h4 className="font-semibold text-slate-200 mb-2">Riot의 권장 사항</h4>
              <p className="text-xs">
                <span className="text-cyan-400">"이동 예측"</span> 옵션은 <strong>고핑 플레이어</strong>를 위한 것입니다.
                Riot은 "대부분의 경우 이 설정이 필요하지 않으며 스킬에는 영향을 주지 않는다"고 밝혔습니다.
                <strong>안정적인 저핑 연결</strong>에서는 OFF를 권장합니다.
              </p>
            </div>

            <p className="text-xs text-slate-400">
              이것이 LoL에서 클릭 시 약간의 지연이 느껴지는 이유입니다. FPS 게임처럼 즉각적인 반응 대신,
              서버가 게임 상태의 유일한 진실 공급원이 되어 치팅과 비동기화를 방지합니다.
            </p>
          </CardContent>
        </Card>

        {/* Decision Case Study */}
        <Card className="bg-slate-800/30 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>의사결정 사례: 멀티플레이 정책 변경</span>
              <div className="flex gap-2">
                <Link to="/decisions/sync-strategy">
                  <Button variant="outline" size="sm" className="text-orange-400 border-orange-400/30 hover:bg-orange-400/10">
                    동기화 전략 →
                  </Button>
                </Link>
                <Link to="/decisions/multiplayer-arch">
                  <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10">
                    멀티플레이 아키텍처 →
                  </Button>
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-300 space-y-4">
            <p>
              게임의 네트워킹 모델은 고정된 것이 아닙니다. 기술 발전, 플레이어 피드백, 경쟁 환경에 따라
              변경될 수 있습니다. 아래는 실제 멀티플레이 정책 변경 사례입니다.
              더 자세한 분석과 레퍼런스는 <strong>동기화 전략</strong>과 <strong>멀티플레이 아키텍처</strong> 페이지에서 확인하세요.
            </p>

            <div className="p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg">
              <h4 className="font-semibold text-amber-400 mb-2">🎮 철권 7 → 철권 8: 지연 기반에서 롤백으로</h4>
              <div className="space-y-2 text-xs">
                <p>
                  <strong>문제:</strong> 철권 7의 지연 기반 넷코드는 5-20프레임의 입력 지연을 발생시켜
                  온라인 대전의 반응성이 크게 떨어졌습니다. 스트리트 파이터 5, 길티기어 등 경쟁작들이
                  롤백을 채택하면서 비교 대상이 되었습니다.
                </p>
                <p>
                  <strong>결정:</strong> 철권 8에서 롤백 넷코드로 전환. 3D 격투 게임은 캐릭터당 155개 이상의
                  기술과 복잡한 애니메이션으로 롤백 구현이 어렵지만, 개발팀이 이를 감수.
                </p>
                <p>
                  <strong>결과:</strong> 로컬 입력 반응성 대폭 개선. 크로스플랫폼 대전 지원.
                  SF6보다는 약간 떨어지지만 "99%의 매치에서 부드러운 경험" 제공.
                </p>
              </div>
            </div>

            <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
              <h4 className="font-semibold text-indigo-400 mb-2">🎮 왜 스타크래프트는 락스텝을 유지할까?</h4>
              <div className="space-y-2 text-xs">
                <p>
                  <strong>이유 1 - 유닛 수:</strong> 한 경기에 수백 개의 유닛이 존재. 롤백 시 모든 유닛 상태를
                  저장하고 재시뮬레이션하는 것은 메모리와 CPU 부담이 큼.
                </p>
                <p>
                  <strong>이유 2 - 입력 특성:</strong> RTS는 격투 게임만큼 프레임 단위 정밀 입력이 필요하지 않음.
                  2-4프레임 지연은 수용 가능한 수준.
                </p>
                <p>
                  <strong>이유 3 - 레거시:</strong> 결정론적 시뮬레이션이 잘 작동하고 있으며,
                  리플레이 시스템도 이에 의존. 변경 시 대규모 리팩토링 필요.
                </p>
              </div>
            </div>

            <div className="p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
              <h4 className="font-semibold text-cyan-400 mb-2">🎮 왜 LoL은 클라이언트 예측을 기본으로 하지 않을까?</h4>
              <div className="space-y-2 text-xs">
                <p>
                  <strong>이유 1 - 치팅 방지:</strong> 서버가 유일한 진실 공급원이면 클라이언트 조작이 어려움.
                  경쟁 게임에서 공정성이 가장 중요.
                </p>
                <p>
                  <strong>이유 2 - 복잡한 상호작용:</strong> 10명의 챔피언, 미니언, 스킬샷이 복잡하게 상호작용.
                  클라이언트 예측이 틀리면 "순간이동" 현상이 빈번해짐.
                </p>
                <p>
                  <strong>이유 3 - 서버 인프라:</strong> Riot Direct 네트워크로 60ms 이하 핑을 보장.
                  저지연 환경에서는 예측의 이점이 크지 않음.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              각 게임의 네트워킹 결정은 <strong>게임 장르</strong>, <strong>입력 특성</strong>,
              <strong>보안 요구사항</strong>, <strong>인프라 환경</strong>을 종합적으로 고려한 결과입니다.
              정답은 없으며, 트레이드오프를 이해하는 것이 중요합니다.
            </p>
          </CardContent>
        </Card>

        {/* References */}
        <Card className="bg-slate-800/30 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-lg">참고 자료</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-300">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">락스텝 & 롤백 넷코드</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
                  <li>
                    <a href="https://meseta.medium.com/netcode-concepts-part-3-lockstep-and-rollback-f70e9297271" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Netcode Concepts Part 3: Lockstep and Rollback - Medium
                    </a>
                  </li>
                  <li>
                    <a href="https://www.snapnet.dev/blog/netcode-architectures-part-2-rollback/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Netcode Architectures Part 2: Rollback - SnapNet
                    </a>
                  </li>
                  <li>
                    <a href="https://en.wikipedia.org/wiki/GGPO" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      GGPO - Wikipedia
                    </a>
                  </li>
                  <li>
                    <a href="https://www.gabrielgambetta.com/client-side-prediction-server-reconciliation.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Client-Side Prediction and Server Reconciliation - Gabriel Gambetta
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-200 mb-2">철권 8 롤백 넷코드</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
                  <li>
                    <a href="https://esports.gg/news/tekken-8/tekken-8-rollback-netcode/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Tekken 8 Rollback Netcode – All you need to know - esports.gg
                    </a>
                  </li>
                  <li>
                    <a href="https://www.escapistmagazine.com/does-tekken-8-have-rollback-netcode/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Does Tekken 8 Have Rollback Netcode? - Escapist Magazine
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-200 mb-2">리그 오브 레전드 네트워킹</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
                  <li>
                    <a href="https://technology.riotgames.com/news/determinism-league-legends-introduction" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Determinism in League of Legends: Introduction - Riot Games
                    </a>
                  </li>
                  <li>
                    <a href="https://technology.riotgames.com/news/determinism-league-legends-unified-clock" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Determinism in League of Legends: Unified Clock - Riot Games
                    </a>
                  </li>
                  <li>
                    <a href="https://leagueoflegends.fandom.com/wiki/Tick_and_updates" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Tick and updates - League of Legends Wiki
                    </a>
                  </li>
                  <li>
                    <a href="https://technology.riotgames.com/news/fixing-internet-real-time-applications-part-ii" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Fixing the Internet for Real Time Applications: Part II - Riot Games
                    </a>
                  </li>
                  <li>
                    <a href="https://1v9.gg/definitions/league-of-legends/movement-prediction" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      What is Movement Prediction in League of Legends? - 1v9
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-200 mb-2">워크래프트3 / DotA 네트워킹</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
                  <li>
                    <a href="https://www.gamedev.net/forums/topic/331938-how-does-the-networking-of-warcraft-3-work/3165375/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      How does the networking of Warcraft 3 work? - GameDev.net
                    </a>
                  </li>
                  <li>
                    <a href="https://ruoyusun.com/2019/09/30/game-networking-6.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Game Networking Demystified, Part VI: Game Genres and FAQ
                    </a>
                  </li>
                  <li>
                    <a href="https://medium.com/@treeform/dont-use-lockstep-in-rts-games-b40f3dd6fddb" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Don't use Lockstep in RTS games - Medium
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
