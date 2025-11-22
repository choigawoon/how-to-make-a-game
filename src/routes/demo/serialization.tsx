import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Database, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BenchmarkDemo } from '@/components/interactive/BenchmarkDemo'

export const Route = createFileRoute('/demo/serialization')({
  component: SerializationDemoPage,
})

function SerializationDemoPage() {
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
                <Database className="h-5 w-5" />
                직렬화 포맷 벤치마크
              </h1>
              <p className="text-sm text-slate-400">
                JSON vs MessagePack 성능 비교
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
              직렬화란?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-300 space-y-4">
            <p>
              게임에서 캐릭터 위치, 인벤토리, 스탯 등의 데이터를 저장하거나
              네트워크로 전송하려면 <strong>직렬화(Serialization)</strong>가 필요합니다.
              직렬화는 메모리의 객체를 바이트 스트림으로 변환하는 과정입니다.
            </p>
            <p>
              각 포맷은 서로 다른 트레이드오프가 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>JSON</strong>: 사람이 읽을 수 있고 디버깅이 쉽지만, 용량이 크고 느림</li>
              <li><strong>MessagePack</strong>: 바이너리 포맷으로 빠르고 작지만, 디버깅이 어려움</li>
              <li><strong>Protobuf</strong>: 스키마 기반으로 매우 효율적이지만, 설정이 복잡함</li>
            </ul>
            <p>
              아래 벤치마크를 통해 실제 성능 차이를 확인해보세요!
            </p>
          </CardContent>
        </Card>

        {/* Benchmark Demo */}
        <BenchmarkDemo />

        {/* Tips */}
        <Card className="bg-slate-800/30 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-lg">실험해보기</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-300 space-y-2">
            <p>• <strong>엔티티 수</strong>를 늘려보세요 - 데이터 양에 따른 성능 변화를 확인할 수 있습니다.</p>
            <p>• <strong>gzip 압축</strong>을 켜보세요 - 압축이 용량과 속도에 미치는 영향을 볼 수 있습니다.</p>
            <p>• 같은 설정으로 여러 번 실행해보세요 - 결과의 일관성을 확인할 수 있습니다.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
