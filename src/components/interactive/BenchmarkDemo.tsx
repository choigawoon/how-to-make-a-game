import { useState, useCallback } from 'react'
import * as msgpack from 'msgpack-lite'
import pako from 'pako'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Play, RotateCcw, Download, Upload } from 'lucide-react'
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
import type { BenchmarkResult, GameEntitySample } from '@/types/course'

interface BenchmarkDemoProps {
  className?: string
}

// Generate sample game world data
function generateSampleData(entityCount: number): GameEntitySample[] {
  return Array.from({ length: entityCount }, (_, i) => ({
    id: i + 1,
    name: `Entity_${i + 1}`,
    position: {
      x: Math.random() * 1000,
      y: Math.random() * 100,
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
  }))
}

// Benchmark a serialization format
function benchmarkFormat(
  data: GameEntitySample[],
  format: string,
  useCompression: boolean
): BenchmarkResult {
  let serializedBytes: Uint8Array
  let jsonString: string | null = null

  // Serialize
  const serializeStart = performance.now()

  switch (format) {
    case 'JSON':
      jsonString = JSON.stringify(data)
      serializedBytes = new TextEncoder().encode(jsonString)
      break
    case 'MessagePack':
      serializedBytes = msgpack.encode(data)
      break
    default:
      jsonString = JSON.stringify(data)
      serializedBytes = new TextEncoder().encode(jsonString)
  }

  const serializeTime = performance.now() - serializeStart

  // Compress if enabled
  let compressedSize = serializedBytes.length
  if (useCompression) {
    const compressed = pako.deflate(serializedBytes)
    compressedSize = compressed.length
  }

  // Deserialize
  const deserializeStart = performance.now()

  switch (format) {
    case 'JSON':
      if (jsonString) JSON.parse(jsonString)
      break
    case 'MessagePack':
      msgpack.decode(serializedBytes)
      break
    default:
      if (jsonString) JSON.parse(jsonString)
  }

  const deserializeTime = performance.now() - deserializeStart

  return {
    format,
    serializeTime,
    deserializeTime,
    rawSize: serializedBytes.length,
    compressedSize: useCompression ? compressedSize : undefined,
  }
}

export function BenchmarkDemo({ className = '' }: BenchmarkDemoProps) {
  const [entityCount, setEntityCount] = useState(100)
  const [useCompression, setUseCompression] = useState(false)
  const [results, setResults] = useState<BenchmarkResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [sampleData, setSampleData] = useState<GameEntitySample[]>([])

  const runBenchmark = useCallback(async () => {
    setIsRunning(true)

    // Generate new sample data
    const data = generateSampleData(entityCount)
    setSampleData(data)

    // Small delay for UI update
    await new Promise(resolve => setTimeout(resolve, 50))

    // Run benchmarks for each format
    const formats = ['JSON', 'MessagePack']
    const benchmarkResults: BenchmarkResult[] = []

    for (const format of formats) {
      // Run multiple iterations and average
      const iterations = 5
      let totalSerialize = 0
      let totalDeserialize = 0
      let rawSize = 0
      let compressedSize = 0

      for (let i = 0; i < iterations; i++) {
        const result = benchmarkFormat(data, format, useCompression)
        totalSerialize += result.serializeTime
        totalDeserialize += result.deserializeTime
        rawSize = result.rawSize
        if (result.compressedSize) compressedSize = result.compressedSize
      }

      benchmarkResults.push({
        format,
        serializeTime: totalSerialize / iterations,
        deserializeTime: totalDeserialize / iterations,
        rawSize,
        compressedSize: useCompression ? compressedSize : undefined,
      })
    }

    setResults(benchmarkResults)
    setIsRunning(false)
  }, [entityCount, useCompression])

  const resetDemo = useCallback(() => {
    setResults([])
    setSampleData([])
  }, [])

  // Prepare chart data
  const timeChartData = results.map(r => ({
    name: r.format,
    '직렬화 (ms)': Number(r.serializeTime.toFixed(2)),
    '역직렬화 (ms)': Number(r.deserializeTime.toFixed(2)),
  }))

  const sizeChartData = results.map(r => ({
    name: r.format,
    '원본 크기 (KB)': Number((r.rawSize / 1024).toFixed(2)),
    ...(r.compressedSize && {
      '압축 크기 (KB)': Number((r.compressedSize / 1024).toFixed(2)),
    }),
  }))

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg">벤치마크 설정</CardTitle>
          <CardDescription>
            테스트할 데이터 크기와 옵션을 설정하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>엔티티 수</Label>
              <Select
                value={String(entityCount)}
                onValueChange={(v) => setEntityCount(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10개</SelectItem>
                  <SelectItem value="100">100개</SelectItem>
                  <SelectItem value="500">500개</SelectItem>
                  <SelectItem value="1000">1,000개</SelectItem>
                  <SelectItem value="5000">5,000개</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>압축</Label>
              <Select
                value={useCompression ? 'on' : 'off'}
                onValueChange={(v) => setUseCompression(v === 'on')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="off">압축 없음</SelectItem>
                  <SelectItem value="on">gzip 압축</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={runBenchmark}
              disabled={isRunning}
              className="flex-1"
            >
              {isRunning ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  실행 중...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  벤치마크 실행
                </>
              )}
            </Button>
            <Button variant="outline" onClick={resetDemo}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <>
          {/* Time comparison chart */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Download className="w-5 h-5" />
                직렬화/역직렬화 시간
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="직렬화 (ms)" fill="#3b82f6" />
                    <Bar dataKey="역직렬화 (ms)" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Size comparison chart */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="w-5 h-5" />
                데이터 크기
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sizeChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="원본 크기 (KB)" fill="#8b5cf6" />
                    {useCompression && (
                      <Bar dataKey="압축 크기 (KB)" fill="#f59e0b" />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Detailed results table */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg">상세 결과</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 px-3">포맷</th>
                      <th className="text-right py-2 px-3">직렬화</th>
                      <th className="text-right py-2 px-3">역직렬화</th>
                      <th className="text-right py-2 px-3">원본</th>
                      {useCompression && (
                        <th className="text-right py-2 px-3">압축</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result) => (
                      <tr key={result.format} className="border-b border-slate-700/50">
                        <td className="py-2 px-3 font-medium">{result.format}</td>
                        <td className="text-right py-2 px-3">
                          {result.serializeTime.toFixed(2)} ms
                        </td>
                        <td className="text-right py-2 px-3">
                          {result.deserializeTime.toFixed(2)} ms
                        </td>
                        <td className="text-right py-2 px-3">
                          {(result.rawSize / 1024).toFixed(2)} KB
                        </td>
                        {useCompression && (
                          <td className="text-right py-2 px-3">
                            {result.compressedSize
                              ? `${(result.compressedSize / 1024).toFixed(2)} KB`
                              : '-'}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Sample data preview */}
          {sampleData.length > 0 && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg">샘플 데이터 미리보기</CardTitle>
                <CardDescription>
                  첫 번째 엔티티의 데이터 구조
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-slate-900 p-4 rounded-lg overflow-x-auto">
                  {JSON.stringify(sampleData[0], null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
