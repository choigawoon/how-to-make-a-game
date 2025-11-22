import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Map, BookOpen, ChevronRight, Home } from 'lucide-react'
import { MindMap } from '@/components/mindmap'
import { BookView } from '@/components/mindmap/BookView'
import { Button } from '@/components/ui/button'
import { LanguageSelector } from '@/components/LanguageSelector'
import {
  mainCourseTree,
  casesTree,
  fundamentalsTree,
  decisionsTree,
} from '@/content'
import type { MindMapData, MindMapNode } from '@/types/course'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

// Map of sub-mindmaps by layer ID
const subMindmaps: Record<string, MindMapData> = {
  'cases': casesTree,
  'fundamentals': fundamentalsTree,
  'decisions': decisionsTree,
}

type ViewMode = 'mindmap' | 'book'

interface BreadcrumbItem {
  id: string
  title: string
  data: MindMapData
}

function LandingPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('mindmap')
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: 'main', title: 'main', data: mainCourseTree },
  ])

  // Helper to get translated title for breadcrumb
  const getBreadcrumbTitle = (id: string): string => {
    if (id === 'main') return t('course.main.center.title')
    return t(`course.layers.${id}.title` as never) as string
  }

  const currentMindmap = breadcrumbs[breadcrumbs.length - 1].data

  // Fit to view on initial load or when mindmap changes
  useEffect(() => {
    if (viewMode === 'mindmap') {
      const timer = setTimeout(() => {
        const fitButton = document.querySelector('[title="한눈에 보기"]') as HTMLButtonElement
        fitButton?.click()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [viewMode, breadcrumbs])

  // Handle node click - drill into sub-mindmap or navigate to lesson
  const handleNodeClick = useCallback((node: MindMapNode) => {
    // If it's a lesson with a path, navigate to it
    if (node.lessonPath) {
      navigate({ to: node.lessonPath })
      return
    }

    // If there's a sub-mindmap for this node, drill into it
    const subMindmap = subMindmaps[node.id]
    if (subMindmap) {
      setBreadcrumbs(prev => [
        ...prev,
        { id: node.id, title: node.id, data: subMindmap },
      ])
      return
    }

    // Otherwise navigate to topic page if exists
    if (node.topicPath) {
      navigate({ to: node.topicPath })
    }
  }, [navigate])

  // Go back to a specific breadcrumb level
  const goToBreadcrumb = useCallback((index: number) => {
    setBreadcrumbs(prev => prev.slice(0, index + 1))
  }, [])

  // Go back one level
  const goBack = useCallback(() => {
    if (breadcrumbs.length > 1) {
      setBreadcrumbs(prev => prev.slice(0, -1))
    }
  }, [breadcrumbs.length])

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950 flex flex-col">
      {/* Top bar */}
      <div className="flex-shrink-0 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.id} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-slate-500 mx-1" />
                )}
                <button
                  onClick={() => goToBreadcrumb(index)}
                  className={`px-2 py-1 rounded hover:bg-slate-800 transition-colors ${
                    index === breadcrumbs.length - 1
                      ? 'text-white font-medium'
                      : 'text-slate-400'
                  }`}
                >
                  {index === 0 ? (
                    <Home className="h-4 w-4" />
                  ) : (
                    getBreadcrumbTitle(crumb.id)
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* View mode toggle */}
            <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('mindmap')}
                className={`h-8 px-3 ${
                  viewMode === 'mindmap'
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Map className="h-4 w-4 mr-1.5" />
                {t('course.ui.graphView')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('book')}
                className={`h-8 px-3 ${
                  viewMode === 'book'
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="h-4 w-4 mr-1.5" />
                {t('course.ui.bookView')}
              </Button>
            </div>

            {/* Language selector */}
            <LanguageSelector variant="buttons" className="text-white" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'mindmap' ? (
          <MindMap
            data={currentMindmap}
            onNodeClick={handleNodeClick}
            onBack={breadcrumbs.length > 1 ? goBack : undefined}
          />
        ) : (
          <div className="h-full overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              <BookView
                data={currentMindmap}
                subMindmaps={subMindmaps}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
