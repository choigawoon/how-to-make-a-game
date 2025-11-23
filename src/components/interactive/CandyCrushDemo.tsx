import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, RotateCcw, SkipForward, Shuffle } from 'lucide-react'

// Candy types with colors
const CANDY_TYPES = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'] as const
type CandyType = (typeof CANDY_TYPES)[number]

interface Cell {
  type: CandyType
  id: number
  isMatched: boolean
  isFalling: boolean
  isNew: boolean
}

interface MatchGroup {
  cells: [number, number][]
  type: CandyType
}

interface ChainStep {
  grid: Cell[][]
  matches: MatchGroup[]
  phase: 'initial' | 'matched' | 'removed' | 'falling' | 'filled' | 'complete'
  description: string
  chainNumber: number
}

const GRID_SIZE = 8
const CANDY_COLORS: Record<CandyType, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-400',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
}

const CANDY_EMOJIS: Record<CandyType, string> = {
  red: '🍎',
  blue: '🫐',
  green: '🍏',
  yellow: '🍋',
  purple: '🍇',
  orange: '🍊',
}

interface CandyCrushDemoProps {
  className?: string
}

export function CandyCrushDemo({ className = '' }: CandyCrushDemoProps) {
  const [steps, setSteps] = useState<ChainStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [totalChains, setTotalChains] = useState(0)

  // Generate random candy type
  const randomCandy = useCallback((): CandyType => {
    return CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)]
  }, [])

  // Create initial grid
  const createGrid = useCallback((): Cell[][] => {
    let id = 0
    const grid: Cell[][] = []

    for (let row = 0; row < GRID_SIZE; row++) {
      const gridRow: Cell[] = []
      for (let col = 0; col < GRID_SIZE; col++) {
        let type = randomCandy()

        // Avoid initial 3-matches
        while (
          (col >= 2 && gridRow[col - 1]?.type === type && gridRow[col - 2]?.type === type) ||
          (row >= 2 && grid[row - 1]?.[col]?.type === type && grid[row - 2]?.[col]?.type === type)
        ) {
          type = randomCandy()
        }

        gridRow.push({
          type,
          id: id++,
          isMatched: false,
          isFalling: false,
          isNew: false,
        })
      }
      grid.push(gridRow)
    }

    return grid
  }, [randomCandy])

  // Clone grid
  const cloneGrid = (grid: Cell[][]): Cell[][] => {
    return grid.map(row => row.map(cell => ({ ...cell })))
  }

  // Find all matches in grid
  const findMatches = (grid: Cell[][]): MatchGroup[] => {
    const matches: MatchGroup[] = []
    const matchedCells = new Set<string>()

    // Check horizontal matches
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE - 2; col++) {
        const type = grid[row][col].type
        if (grid[row][col + 1].type === type && grid[row][col + 2].type === type) {
          const group: [number, number][] = [[row, col], [row, col + 1], [row, col + 2]]

          // Extend match
          let k = col + 3
          while (k < GRID_SIZE && grid[row][k].type === type) {
            group.push([row, k])
            k++
          }

          // Check if any cell in this match is already matched
          const isNewMatch = group.some(([r, c]) => !matchedCells.has(`${r},${c}`))
          if (isNewMatch) {
            matches.push({ cells: group, type })
            group.forEach(([r, c]) => matchedCells.add(`${r},${c}`))
          }

          col = k - 1
        }
      }
    }

    // Check vertical matches
    for (let col = 0; col < GRID_SIZE; col++) {
      for (let row = 0; row < GRID_SIZE - 2; row++) {
        const type = grid[row][col].type
        if (grid[row + 1][col].type === type && grid[row + 2][col].type === type) {
          const group: [number, number][] = [[row, col], [row + 1, col], [row + 2, col]]

          // Extend match
          let k = row + 3
          while (k < GRID_SIZE && grid[k][col].type === type) {
            group.push([k, col])
            k++
          }

          // Check if any cell in this match is already matched
          const isNewMatch = group.some(([r, c]) => !matchedCells.has(`${r},${c}`))
          if (isNewMatch) {
            matches.push({ cells: group, type })
            group.forEach(([r, c]) => matchedCells.add(`${r},${c}`))
          }

          row = k - 1
        }
      }
    }

    return matches
  }

  // Process chain matching
  const processChainMatching = useCallback((initialGrid: Cell[][]): ChainStep[] => {
    const steps: ChainStep[] = []
    let grid = cloneGrid(initialGrid)
    let chainNumber = 0

    // Initial state
    steps.push({
      grid: cloneGrid(grid),
      matches: [],
      phase: 'initial',
      description: '초기 상태: 보드에서 3개 이상 연결된 캔디를 찾습니다',
      chainNumber: 0,
    })

    let matches = findMatches(grid)

    while (matches.length > 0) {
      chainNumber++

      // Mark matched cells
      const matchedGrid = cloneGrid(grid)
      matches.forEach(match => {
        match.cells.forEach(([row, col]) => {
          matchedGrid[row][col].isMatched = true
        })
      })

      steps.push({
        grid: matchedGrid,
        matches,
        phase: 'matched',
        description: `${chainNumber}연쇄: ${matches.length}개 매치 발견! (${matches.reduce((sum, m) => sum + m.cells.length, 0)}개 캔디)`,
        chainNumber,
      })

      // Remove matched cells (set to null temporarily)
      const removedGrid = cloneGrid(matchedGrid)
      matches.forEach(match => {
        match.cells.forEach(([row, col]) => {
          removedGrid[row][col] = {
            type: 'red', // placeholder
            id: -1,
            isMatched: false,
            isFalling: false,
            isNew: false,
          }
        })
      })

      steps.push({
        grid: removedGrid,
        matches,
        phase: 'removed',
        description: '매치된 캔디 제거: 빈 공간 생성',
        chainNumber,
      })

      // Apply gravity - candies fall down
      const fallingGrid = cloneGrid(removedGrid)
      for (let col = 0; col < GRID_SIZE; col++) {
        const column: Cell[] = []

        // Collect non-empty cells
        for (let row = GRID_SIZE - 1; row >= 0; row--) {
          if (fallingGrid[row][col].id !== -1) {
            column.push({ ...fallingGrid[row][col], isFalling: true })
          }
        }

        // Fill column from bottom
        for (let row = GRID_SIZE - 1; row >= 0; row--) {
          const cellIndex = GRID_SIZE - 1 - row
          if (cellIndex < column.length) {
            fallingGrid[row][col] = column[cellIndex]
          } else {
            fallingGrid[row][col] = {
              type: 'red',
              id: -1,
              isMatched: false,
              isFalling: false,
              isNew: false,
            }
          }
        }
      }

      steps.push({
        grid: fallingGrid,
        matches: [],
        phase: 'falling',
        description: '중력 적용: 캔디가 아래로 떨어짐',
        chainNumber,
      })

      // Fill empty spaces with new candies
      const filledGrid = cloneGrid(fallingGrid)
      let newId = Date.now()
      for (let col = 0; col < GRID_SIZE; col++) {
        for (let row = 0; row < GRID_SIZE; row++) {
          if (filledGrid[row][col].id === -1) {
            filledGrid[row][col] = {
              type: randomCandy(),
              id: newId++,
              isMatched: false,
              isFalling: false,
              isNew: true,
            }
          } else {
            filledGrid[row][col].isFalling = false
          }
        }
      }

      steps.push({
        grid: filledGrid,
        matches: [],
        phase: 'filled',
        description: '새 캔디 생성: 위에서 새로운 캔디가 떨어짐',
        chainNumber,
      })

      // Update grid for next iteration
      grid = cloneGrid(filledGrid)
      grid.forEach(row => row.forEach(cell => {
        cell.isNew = false
      }))

      // Check for new matches
      matches = findMatches(grid)
    }

    // Complete
    steps.push({
      grid: cloneGrid(grid),
      matches: [],
      phase: 'complete',
      description: `완료! 총 ${chainNumber}연쇄 발생`,
      chainNumber,
    })

    return steps
  }, [randomCandy])

  // Initialize with a guaranteed chain scenario
  const initializeWithChain = useCallback(() => {
    // Create a grid that will have chain reactions
    let grid = createGrid()

    // Modify grid to create guaranteed matches
    // Set up a scenario where one match creates another
    if (grid[3] && grid[4] && grid[5]) {
      // Create a vertical match
      grid[3][3].type = 'red'
      grid[4][3].type = 'red'
      grid[5][3].type = 'red'

      // Set up candies that will form a match after falling
      grid[2][3].type = 'blue'
      grid[1][3].type = 'blue'
      grid[0][3].type = 'blue'

      // Another match to trigger
      grid[6][2].type = 'green'
      grid[6][3].type = 'green'
      grid[6][4].type = 'green'
    }

    const newSteps = processChainMatching(grid)
    setSteps(newSteps)
    setCurrentStepIndex(0)
    setTotalChains(newSteps[newSteps.length - 1]?.chainNumber || 0)
    setIsPlaying(false)
  }, [createGrid, processChainMatching])

  // Generate random scenario
  const generateRandom = useCallback(() => {
    const grid = createGrid()
    const newSteps = processChainMatching(grid)
    setSteps(newSteps)
    setCurrentStepIndex(0)
    setTotalChains(newSteps[newSteps.length - 1]?.chainNumber || 0)
    setIsPlaying(false)
  }, [createGrid, processChainMatching])

  // Initialize on mount
  useEffect(() => {
    initializeWithChain()
  }, [initializeWithChain])

  // Auto-play
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length - 1) {
      setIsPlaying(false)
      return
    }

    const timer = setTimeout(() => {
      setCurrentStepIndex(prev => prev + 1)
    }, 800)

    return () => clearTimeout(timer)
  }, [isPlaying, currentStepIndex, steps.length])

  const currentStep = steps[currentStepIndex]

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
    }
  }

  const togglePlay = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0)
    }
    setIsPlaying(!isPlaying)
  }

  const reset = () => {
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  if (!currentStep) return null

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>연쇄 매칭 시뮬레이터</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {currentStepIndex + 1} / {steps.length}
              </Badge>
              {totalChains > 0 && (
                <Badge variant="default" className="bg-purple-600">
                  {totalChains}연쇄
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Control Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={togglePlay} variant="default" size="sm">
              {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
              {isPlaying ? '일시정지' : '재생'}
            </Button>
            <Button onClick={nextStep} variant="outline" size="sm" disabled={currentStepIndex >= steps.length - 1}>
              <SkipForward className="h-4 w-4 mr-1" />
              다음 단계
            </Button>
            <Button onClick={reset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-1" />
              처음부터
            </Button>
            <Button onClick={generateRandom} variant="outline" size="sm">
              <Shuffle className="h-4 w-4 mr-1" />
              새 보드
            </Button>
          </div>

          {/* Status */}
          <div className="p-3 bg-slate-900/50 rounded-lg">
            <p className="text-sm font-medium text-slate-300">{currentStep.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Game Grid */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div
              className="grid gap-1 p-3 bg-slate-900/70 rounded-lg"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              }}
            >
              {currentStep.grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl
                      transition-all duration-300
                      ${cell.id === -1
                        ? 'bg-slate-800/50'
                        : cell.isMatched
                          ? `${CANDY_COLORS[cell.type]} ring-2 ring-white animate-pulse scale-110`
                          : cell.isFalling
                            ? `${CANDY_COLORS[cell.type]} opacity-80`
                            : cell.isNew
                              ? `${CANDY_COLORS[cell.type]} ring-2 ring-yellow-400`
                              : `${CANDY_COLORS[cell.type]} hover:scale-105`
                      }
                    `}
                  >
                    {cell.id !== -1 && CANDY_EMOJIS[cell.type]}
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Explanation */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg">알고리즘 설명</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className={`p-3 rounded-lg ${currentStep.phase === 'initial' || currentStep.phase === 'matched' ? 'bg-blue-900/30 border border-blue-500' : 'bg-slate-900/30'}`}>
              <h4 className="font-medium text-sm text-blue-400 mb-1">1. 매치 탐색</h4>
              <p className="text-xs text-slate-400">가로/세로로 3개 이상 연속된 같은 캔디를 찾습니다. O(N²) 시간복잡도.</p>
            </div>
            <div className={`p-3 rounded-lg ${currentStep.phase === 'removed' ? 'bg-red-900/30 border border-red-500' : 'bg-slate-900/30'}`}>
              <h4 className="font-medium text-sm text-red-400 mb-1">2. 매치 제거</h4>
              <p className="text-xs text-slate-400">매치된 캔디를 제거하고 점수를 계산합니다. 연쇄가 높을수록 보너스 점수!</p>
            </div>
            <div className={`p-3 rounded-lg ${currentStep.phase === 'falling' ? 'bg-yellow-900/30 border border-yellow-500' : 'bg-slate-900/30'}`}>
              <h4 className="font-medium text-sm text-yellow-400 mb-1">3. 중력 적용</h4>
              <p className="text-xs text-slate-400">빈 공간 위의 캔디들이 아래로 떨어집니다. 각 열을 독립적으로 처리.</p>
            </div>
            <div className={`p-3 rounded-lg ${currentStep.phase === 'filled' ? 'bg-green-900/30 border border-green-500' : 'bg-slate-900/30'}`}>
              <h4 className="font-medium text-sm text-green-400 mb-1">4. 새 캔디 생성</h4>
              <p className="text-xs text-slate-400">빈 공간을 랜덤 캔디로 채웁니다. 새 매치가 생기면 1단계로 돌아가 연쇄 발생!</p>
            </div>
          </div>

          {/* Code snippet */}
          <div className="mt-4 p-3 bg-slate-900/50 rounded-lg">
            <h4 className="font-medium text-sm text-slate-300 mb-2">핵심 루프</h4>
            <pre className="text-xs text-slate-400 overflow-x-auto">
{`while (hasMatches(grid)) {
  matches = findMatches(grid)
  removeMatches(grid, matches)
  applyGravity(grid)
  fillEmptySpaces(grid)
  chainCount++
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
