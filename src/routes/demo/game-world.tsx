import { createFileRoute, Link } from '@tanstack/react-router'
import { lazy, Suspense, useState, useCallback } from 'react'
import { ArrowLeft, Globe, Plus, Trash2, RefreshCw, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import type { GameEntitySample } from '@/types/course'

// Lazy load the heavy 3D component
const GameWorldViewer = lazy(() =>
  import('@/components/interactive/GameWorldViewer').then((m) => ({
    default: m.GameWorldViewer,
  }))
)

export const Route = createFileRoute('/demo/game-world')({
  component: GameWorldDemoPage,
})

// Generate a single random entity
function generateEntity(id: number): GameEntitySample {
  return {
    id,
    name: `Entity_${id}`,
    position: {
      x: Math.random() * 1000,
      y: Math.random() * 50,
      z: Math.random() * 1000,
    },
    rotation: {
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      w: Math.random(),
    },
    health: Math.floor(Math.random() * 100),
    inventory: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
      itemId: Math.floor(Math.random() * 1000),
      quantity: Math.floor(Math.random() * 99) + 1,
      metadata: {
        durability: Math.random(),
        enchantments: ['fire', 'ice', 'lightning'].slice(0, Math.floor(Math.random() * 3)),
      },
    })),
    stats: {
      strength: Math.floor(Math.random() * 100),
      agility: Math.floor(Math.random() * 100),
      intelligence: Math.floor(Math.random() * 100),
    },
    buffs: Array.from({ length: Math.floor(Math.random() * 3) }, () => ({
      id: Math.floor(Math.random() * 50),
      duration: Math.random() * 60,
      stackCount: Math.floor(Math.random() * 5) + 1,
    })),
  }
}

function GameWorldDemoPage() {
  const [entities, setEntities] = useState<GameEntitySample[]>(() =>
    Array.from({ length: 10 }, (_, i) => generateEntity(i + 1))
  )
  const [selectedEntityId, setSelectedEntityId] = useState<number | null>(null)
  const [nextId, setNextId] = useState(11)

  const selectedEntity = entities.find((e) => e.id === selectedEntityId)

  // Add new entity
  const addEntity = useCallback(() => {
    const newEntity = generateEntity(nextId)
    setEntities((prev) => [...prev, newEntity])
    setNextId((prev) => prev + 1)
    setSelectedEntityId(newEntity.id)
  }, [nextId])

  // Remove selected entity
  const removeEntity = useCallback(() => {
    if (selectedEntityId) {
      setEntities((prev) => prev.filter((e) => e.id !== selectedEntityId))
      setSelectedEntityId(null)
    }
  }, [selectedEntityId])

  // Reset all entities
  const resetEntities = useCallback(() => {
    setEntities(Array.from({ length: 10 }, (_, i) => generateEntity(i + 1)))
    setSelectedEntityId(null)
    setNextId(11)
  }, [])

  // Update entity property
  const updateEntity = useCallback(
    (field: string, value: number) => {
      if (!selectedEntityId) return
      setEntities((prev) =>
        prev.map((e) => {
          if (e.id !== selectedEntityId) return e
          if (field === 'health') {
            return { ...e, health: Math.max(0, Math.min(100, value)) }
          }
          if (field.startsWith('stats.')) {
            const stat = field.split('.')[1] as keyof typeof e.stats
            return {
              ...e,
              stats: { ...e.stats, [stat]: Math.max(0, Math.min(100, value)) },
            }
          }
          if (field.startsWith('position.')) {
            const axis = field.split('.')[1] as keyof typeof e.position
            return {
              ...e,
              position: { ...e.position, [axis]: value },
            }
          }
          return e
        })
      )
    },
    [selectedEntityId]
  )

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
                <Globe className="h-5 w-5" />
                게임 월드 시뮬레이션
              </h1>
              <p className="text-sm text-slate-400">
                3D 공간에서 엔티티 데이터 시각화
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* 3D Viewer */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">월드 뷰어</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={addEntity}>
                      <Plus className="h-4 w-4 mr-1" />
                      추가
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={removeEntity}
                      disabled={!selectedEntityId}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      삭제
                    </Button>
                    <Button size="sm" variant="outline" onClick={resetEntities}>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      초기화
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  클릭하여 엔티티 선택 • 드래그로 회전 • 스크롤로 줌
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] rounded-lg overflow-hidden">
                  <Suspense
                    fallback={
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-500" />
                          <p className="text-sm text-slate-400">3D 엔진 로딩 중...</p>
                        </div>
                      </div>
                    }
                  >
                    <GameWorldViewer
                      entities={entities}
                      selectedEntityId={selectedEntityId}
                      onSelectEntity={setSelectedEntityId}
                    />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls & Data Panel */}
          <div className="space-y-4">
            {/* Entity list */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">엔티티 목록 ({entities.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-[200px] overflow-y-auto space-y-1">
                  {entities.map((entity) => (
                    <button
                      key={entity.id}
                      onClick={() => setSelectedEntityId(entity.id)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedEntityId === entity.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{entity.name}</span>
                        <span className="text-xs opacity-70">HP: {entity.health}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected entity editor */}
            {selectedEntity && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{selectedEntity.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Health */}
                  <div className="space-y-2">
                    <Label className="text-xs">체력</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={selectedEntity.health}
                      onChange={(e) => updateEntity('health', Number(e.target.value))}
                      className="h-8 bg-slate-900 border-slate-600"
                    />
                  </div>

                  {/* Position */}
                  <div className="space-y-2">
                    <Label className="text-xs">위치</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['x', 'y', 'z'] as const).map((axis) => (
                        <div key={axis}>
                          <Label className="text-xs text-slate-500">{axis.toUpperCase()}</Label>
                          <Input
                            type="number"
                            value={Math.round(selectedEntity.position[axis])}
                            onChange={(e) =>
                              updateEntity(`position.${axis}`, Number(e.target.value))
                            }
                            className="h-8 bg-slate-900 border-slate-600"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2">
                    <Label className="text-xs">스탯</Label>
                    <div className="space-y-2">
                      {(['strength', 'agility', 'intelligence'] as const).map((stat) => (
                        <div key={stat} className="flex items-center gap-2">
                          <Label className="text-xs text-slate-500 w-16">
                            {stat === 'strength' ? '힘' : stat === 'agility' ? '민첩' : '지능'}
                          </Label>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            value={selectedEntity.stats[stat]}
                            onChange={(e) =>
                              updateEntity(`stats.${stat}`, Number(e.target.value))
                            }
                            className="h-7 bg-slate-900 border-slate-600 flex-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inventory count */}
                  <div className="text-xs text-slate-400">
                    인벤토리: {selectedEntity.inventory.length}개 아이템
                  </div>

                  {/* Buffs */}
                  <div className="text-xs text-slate-400">
                    버프: {selectedEntity.buffs.length}개 활성
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Data preview */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">데이터 구조</CardTitle>
                <CardDescription className="text-xs">
                  직렬화 데모와 동일한 구조
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-slate-900 p-3 rounded overflow-x-auto max-h-[200px]">
                  {selectedEntity
                    ? JSON.stringify(selectedEntity, null, 2)
                    : `// 엔티티를 선택하세요\n// 총 ${entities.length}개 엔티티`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info */}
        <Card className="mt-6 bg-slate-800/30 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg">데이터 모델링 이해하기</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-300 space-y-2">
            <p>
              • <strong>위치/회전</strong>: Vector3와 Quaternion으로 3D 공간 표현
            </p>
            <p>
              • <strong>체력</strong>: 색상으로 시각화 (빨강 → 초록)
            </p>
            <p>
              • <strong>스탯</strong>: 엔티티 크기에 반영
            </p>
            <p>
              • <strong>버프</strong>: 노란색 구체로 표시
            </p>
            <p className="pt-2 text-slate-400">
              이 데이터 구조를 직렬화하면 네트워크 전송이나 저장에 사용할 수 있습니다.
              <Link to="/demo/serialization" className="text-blue-400 hover:underline ml-1">
                직렬화 벤치마크 데모 →
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
