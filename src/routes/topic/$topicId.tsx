import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, BookOpen, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mainCourseTree, getNodeById } from '@/content'

export const Route = createFileRoute('/topic/$topicId')({
  component: TopicPage,
})

function TopicPage() {
  const { topicId } = Route.useParams()
  const node = getNodeById(mainCourseTree, topicId)

  if (!node) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">주제를 찾을 수 없습니다</h1>
          <Button asChild>
            <Link to="/">마인드맵으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Placeholder lessons for demo purposes
  // In a real app, this would come from the topic's meta.json
  const placeholderLessons = [
    {
      id: '01-intro',
      title: '소개',
      description: '이 주제의 기본 개념을 알아봅니다.',
      estimatedTime: 10,
    },
    {
      id: '02-basics',
      title: '기초 개념',
      description: '핵심 이론과 원리를 학습합니다.',
      estimatedTime: 20,
    },
    {
      id: '03-practice',
      title: '실습',
      description: '실제 예제를 통해 배운 내용을 적용합니다.',
      estimatedTime: 30,
    },
  ]

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
              <h1 className="text-xl font-bold">{node.title}</h1>
              {node.description && (
                <p className="text-sm text-slate-400">{node.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            학습 콘텐츠
          </h2>
          <p className="text-slate-400 text-sm">
            이 주제에서는 {node.title}에 대해 깊이 있게 다룹니다.
          </p>
        </div>

        {/* Lesson list */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {placeholderLessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-base">{lesson.title}</CardTitle>
                    {lesson.estimatedTime && (
                      <CardDescription className="text-xs">
                        약 {lesson.estimatedTime}분
                      </CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400">{lesson.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming soon notice */}
        <div className="mt-12 p-6 rounded-lg bg-slate-800/30 border border-slate-700 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-slate-500" />
          <h3 className="text-lg font-semibold mb-2">콘텐츠 준비 중</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            이 주제의 상세 콘텐츠는 현재 준비 중입니다.
            에셋 관리 주제의 직렬화 벤치마크 데모를 먼저 확인해보세요.
          </p>
        </div>
      </div>
    </div>
  )
}
