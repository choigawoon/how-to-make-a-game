import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, Wifi, WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface LockstepDemoProps {
  className?: string
}

// Unit types
type UnitShape = 'square' | 'triangle' | 'circle'

interface Unit {
  id: number
  shape: UnitShape
  x: number
  y: number
  targetX: number
  targetY: number
  color: string
  selected: boolean
  player: 1 | 2
}

interface Command {
  type: 'move' | 'select'
  unitId?: number
  targetX?: number
  targetY?: number
  frame: number
  player: 1 | 2
}

interface GameState {
  units: Unit[]
  frame: number
}

// Latency settings (in frames at 15fps)
const LATENCY_SETTINGS = {
  low: { frames: 2, name: 'Low', ms: '~133ms' },
  medium: { frames: 3, name: 'Medium', ms: '~200ms' },
  high: { frames: 4, name: 'High', ms: '~267ms' },
}

// Colors for players
const PLAYER_COLORS = {
  1: '#3b82f6', // Blue
  2: '#ef4444', // Red
}

// Initial units
function createInitialUnits(): Unit[] {
  return [
    // Player 1 units (left side)
    { id: 1, shape: 'square', x: 60, y: 80, targetX: 60, targetY: 80, color: PLAYER_COLORS[1], selected: false, player: 1 },
    { id: 2, shape: 'triangle', x: 60, y: 150, targetX: 60, targetY: 150, color: PLAYER_COLORS[1], selected: false, player: 1 },
    { id: 3, shape: 'circle', x: 60, y: 220, targetX: 60, targetY: 220, color: PLAYER_COLORS[1], selected: false, player: 1 },
    // Player 2 units (right side)
    { id: 4, shape: 'square', x: 340, y: 80, targetX: 340, targetY: 80, color: PLAYER_COLORS[2], selected: false, player: 2 },
    { id: 5, shape: 'triangle', x: 340, y: 150, targetX: 340, targetY: 150, color: PLAYER_COLORS[2], selected: false, player: 2 },
    { id: 6, shape: 'circle', x: 340, y: 220, targetX: 340, targetY: 220, color: PLAYER_COLORS[2], selected: false, player: 2 },
  ]
}

// Draw a unit on canvas
function drawUnit(ctx: CanvasRenderingContext2D, unit: Unit) {
  ctx.fillStyle = unit.color
  ctx.strokeStyle = unit.selected ? '#fbbf24' : '#1e293b'
  ctx.lineWidth = unit.selected ? 3 : 1

  const size = 20

  switch (unit.shape) {
    case 'square':
      ctx.beginPath()
      ctx.rect(unit.x - size / 2, unit.y - size / 2, size, size)
      ctx.fill()
      ctx.stroke()
      break
    case 'triangle':
      ctx.beginPath()
      ctx.moveTo(unit.x, unit.y - size / 2)
      ctx.lineTo(unit.x + size / 2, unit.y + size / 2)
      ctx.lineTo(unit.x - size / 2, unit.y + size / 2)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      break
    case 'circle':
      ctx.beginPath()
      ctx.arc(unit.x, unit.y, size / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      break
  }
}

// Check if point is inside unit
function isPointInUnit(x: number, y: number, unit: Unit): boolean {
  const size = 20
  return Math.abs(x - unit.x) < size && Math.abs(y - unit.y) < size
}

export function LockstepDemo({ className = '' }: LockstepDemoProps) {
  const [latency, setLatency] = useState<'low' | 'medium' | 'high'>('medium')
  const [isRunning, setIsRunning] = useState(false)
  const [gameState, setGameState] = useState<GameState>({
    units: createInitialUnits(),
    frame: 0,
  })
  const [pendingCommands, setPendingCommands] = useState<{ p1: Command[], p2: Command[] }>({ p1: [], p2: [] })
  const [inputQueue, setInputQueue] = useState<Command[]>([])
  const [stats, setStats] = useState({ p1Inputs: 0, p2Inputs: 0, syncedFrames: 0 })

  const canvas1Ref = useRef<HTMLCanvasElement>(null)
  const canvas2Ref = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef<number>(0)

  // Render game state to canvas
  const renderCanvas = useCallback((canvas: HTMLCanvasElement | null, highlightPlayer: 1 | 2) => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 1
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw player indicator
    ctx.fillStyle = PLAYER_COLORS[highlightPlayer]
    ctx.globalAlpha = 0.1
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = 1

    // Draw units
    gameState.units.forEach(unit => drawUnit(ctx, unit))

    // Draw frame counter
    ctx.fillStyle = '#94a3b8'
    ctx.font = '12px monospace'
    ctx.fillText(`Frame: ${gameState.frame}`, 10, canvas.height - 10)
  }, [gameState])

  // Render both canvases
  useEffect(() => {
    renderCanvas(canvas1Ref.current, 1)
    renderCanvas(canvas2Ref.current, 2)
  }, [renderCanvas])

  // Game loop
  useEffect(() => {
    if (!isRunning) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    const frameInterval = 1000 / 15 // 15 FPS for clear visibility of lockstep

    const gameLoop = (currentTime: number) => {
      if (currentTime - lastFrameTimeRef.current >= frameInterval) {
        lastFrameTimeRef.current = currentTime

        setGameState(prevState => {
          const newFrame = prevState.frame + 1
          const delayFrames = LATENCY_SETTINGS[latency].frames

          // Process commands that are ready (scheduled for this frame)
          const commandsToExecute = inputQueue.filter(cmd => cmd.frame + delayFrames <= newFrame)

          // Update units based on commands
          let newUnits = [...prevState.units]

          commandsToExecute.forEach(cmd => {
            if (cmd.type === 'select' && cmd.unitId !== undefined) {
              newUnits = newUnits.map(u => ({
                ...u,
                selected: u.id === cmd.unitId && u.player === cmd.player
              }))
            } else if (cmd.type === 'move' && cmd.targetX !== undefined && cmd.targetY !== undefined) {
              newUnits = newUnits.map(u => {
                if (u.selected && u.player === cmd.player) {
                  return { ...u, targetX: cmd.targetX!, targetY: cmd.targetY! }
                }
                return u
              })
            }
          })

          // Remove processed commands
          setInputQueue(prev => prev.filter(cmd => cmd.frame + delayFrames > newFrame))

          // Move units towards targets
          newUnits = newUnits.map(unit => {
            const dx = unit.targetX - unit.x
            const dy = unit.targetY - unit.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist > 2) {
              const speed = 3
              return {
                ...unit,
                x: unit.x + (dx / dist) * speed,
                y: unit.y + (dy / dist) * speed,
              }
            }
            return unit
          })

          setStats(prev => ({ ...prev, syncedFrames: newFrame }))

          return { units: newUnits, frame: newFrame }
        })
      }

      animationRef.current = requestAnimationFrame(gameLoop)
    }

    animationRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isRunning, latency, inputQueue])

  // Handle canvas click
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>, player: 1 | 2) => {
    if (!isRunning) return

    const canvas = e.currentTarget
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if clicked on a unit
    const clickedUnit = gameState.units.find(u => u.player === player && isPointInUnit(x, y, u))

    const command: Command = clickedUnit
      ? { type: 'select', unitId: clickedUnit.id, frame: gameState.frame, player }
      : { type: 'move', targetX: x, targetY: y, frame: gameState.frame, player }

    // Add to input queue (will be delayed based on latency setting)
    setInputQueue(prev => [...prev, command])

    // Update stats
    setStats(prev => ({
      ...prev,
      [player === 1 ? 'p1Inputs' : 'p2Inputs']: prev[player === 1 ? 'p1Inputs' : 'p2Inputs'] + 1
    }))

    // Visual feedback for pending command
    setPendingCommands(prev => ({
      ...prev,
      [player === 1 ? 'p1' : 'p2']: [...prev[player === 1 ? 'p1' : 'p2'], command]
    }))

    // Clear pending after delay
    setTimeout(() => {
      setPendingCommands(prev => ({
        ...prev,
        [player === 1 ? 'p1' : 'p2']: prev[player === 1 ? 'p1' : 'p2'].slice(1)
      }))
    }, LATENCY_SETTINGS[latency].frames * (1000 / 15))
  }, [isRunning, gameState, latency])

  // Reset game
  const resetGame = useCallback(() => {
    setIsRunning(false)
    setGameState({ units: createInitialUnits(), frame: 0 })
    setInputQueue([])
    setPendingCommands({ p1: [], p2: [] })
    setStats({ p1Inputs: 0, p2Inputs: 0, syncedFrames: 0 })
  }, [])

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg">게임 설정</CardTitle>
          <CardDescription>
            지연 시간 설정을 변경하여 락스텝 동기화의 영향을 체험하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>네트워크 지연 (Latency)</Label>
              <Select
                value={latency}
                onValueChange={(v) => setLatency(v as 'low' | 'medium' | 'high')}
                disabled={isRunning}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low ({LATENCY_SETTINGS.low.ms})</SelectItem>
                  <SelectItem value="medium">Medium ({LATENCY_SETTINGS.medium.ms})</SelectItem>
                  <SelectItem value="high">High ({LATENCY_SETTINGS.high.ms})</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>입력 지연 프레임</Label>
              <div className="h-10 px-3 py-2 bg-slate-900 rounded-md flex items-center text-sm">
                {LATENCY_SETTINGS[latency].frames} 프레임 지연
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1"
              variant={isRunning ? 'secondary' : 'default'}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  일시 정지
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  시작
                </>
              )}
            </Button>
            <Button variant="outline" onClick={resetGame}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Game Area */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Player 1 */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              플레이어 1 (Host)
              {pendingCommands.p1.length > 0 && (
                <span className="text-xs text-yellow-400 animate-pulse">
                  입력 대기 중...
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <canvas
              ref={canvas1Ref}
              width={400}
              height={300}
              className="w-full border border-slate-600 rounded cursor-crosshair"
              onClick={(e) => handleCanvasClick(e, 1)}
            />
            <p className="text-xs text-slate-400 mt-2">
              유닛 클릭: 선택 | 빈 곳 클릭: 이동
            </p>
          </CardContent>
        </Card>

        {/* Player 2 */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              플레이어 2 (Client)
              {pendingCommands.p2.length > 0 && (
                <span className="text-xs text-yellow-400 animate-pulse">
                  입력 대기 중...
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <canvas
              ref={canvas2Ref}
              width={400}
              height={300}
              className="w-full border border-slate-600 rounded cursor-crosshair"
              onClick={(e) => handleCanvasClick(e, 2)}
            />
            <p className="text-xs text-slate-400 mt-2">
              유닛 클릭: 선택 | 빈 곳 클릭: 이동
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            {isRunning ? (
              <Wifi className="w-5 h-5 text-green-400" />
            ) : (
              <WifiOff className="w-5 h-5 text-slate-400" />
            )}
            동기화 상태
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">{stats.p1Inputs}</div>
              <div className="text-xs text-slate-400">P1 입력</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{stats.syncedFrames}</div>
              <div className="text-xs text-slate-400">동기화 프레임</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">{stats.p2Inputs}</div>
              <div className="text-xs text-slate-400">P2 입력</div>
            </div>
          </div>

          {inputQueue.length > 0 && (
            <div className="mt-4 p-3 bg-slate-900 rounded-lg">
              <div className="text-sm text-yellow-400 mb-2">
                대기 중인 명령: {inputQueue.length}개
              </div>
              <div className="text-xs text-slate-400">
                {inputQueue.slice(0, 3).map((cmd, i) => (
                  <div key={i}>
                    [{cmd.player === 1 ? 'P1' : 'P2'}] {cmd.type} @ frame {cmd.frame}
                    → 실행 예정: frame {cmd.frame + LATENCY_SETTINGS[latency].frames}
                  </div>
                ))}
                {inputQueue.length > 3 && (
                  <div>... 외 {inputQueue.length - 3}개</div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Explanation */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg">락스텝 동기화란?</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-300 space-y-4">
          <p>
            <strong>락스텝(Lockstep)</strong>은 스타크래프트, 에이지 오브 엠파이어 같은 RTS 게임에서
            사용하는 네트워크 동기화 방식입니다.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-900 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">작동 원리</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>모든 플레이어가 <strong>같은 시뮬레이션</strong>을 실행</li>
                <li>입력만 네트워크로 전송 (유닛 위치 X)</li>
                <li>입력은 N프레임 후에 실행됨</li>
                <li>모든 클라이언트가 동일한 결과</li>
              </ul>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg">
              <h4 className="font-semibold text-amber-400 mb-2">지연 설정의 의미</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li><strong>Low</strong>: 빠른 반응, 불안정한 연결에서 끊김</li>
                <li><strong>Medium</strong>: 균형 잡힌 설정 (기본값)</li>
                <li><strong>High</strong>: 느린 반응, 안정적인 동기화</li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            💡 <strong>실험해보세요:</strong> 지연을 High로 설정하면 클릭 후 유닛이 움직이기까지
            눈에 띄는 딜레이가 생깁니다. 이것이 바로 스타크래프트에서 "랙"으로 느껴지는 현상입니다.
            실제로는 네트워크 지연을 보상하기 위한 의도적인 설계입니다.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
