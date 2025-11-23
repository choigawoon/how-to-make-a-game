import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { ArrowLeft, Trophy, Construction, Gamepad2, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { loadContent, getNode } from '@/lib/content'

// Map of game IDs to their demo paths
const GAME_DEMOS: Record<string, { path: string; titleKey: string; descriptionKey: string }> = {
  'super-mario': {
    path: '/demo/mario-jump',
    titleKey: 'course.demos.marioJump.title',
    descriptionKey: 'course.demos.marioJump.description',
  },
  'starcraft': {
    path: '/demo/lockstep',
    titleKey: 'course.demos.lockstep.title',
    descriptionKey: 'course.demos.lockstep.description',
  },
}

export const Route = createFileRoute('/cases/$gameId')({
  component: CaseStudyPage,
})

function CaseStudyPage() {
  const { t } = useTranslation()
  const { gameId } = Route.useParams()
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const data = await loadContent(gameId)
      setContent(data)
      setLoading(false)
    }
    load()
  }, [gameId])

  // Find the game node from the mindmap
  const gameNode = getNode(gameId)

  if (!gameNode) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('course.ui.pageNotFound')}</h1>
          <Link to="/">
            <Button>{t('course.ui.goHome')}</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading...</div>
  }

  const frontmatter = content?.frontmatter || {}
  const title = frontmatter.title || t(`course.cases.${gameId}.title` as never)
  const description = frontmatter.description || t(`course.cases.${gameId}.description` as never)
  const genre = frontmatter.genre || t(`course.cases.${gameId}.genre` as never)
  const year = frontmatter.year || t(`course.cases.${gameId}.year` as never)
  const keyFeatures = frontmatter.keyFeatures || t(`course.cases.${gameId}.keyFeatures` as never, { returnObjects: true }) || []
  const fundamentals = frontmatter.fundamentals || t(`course.cases.${gameId}.fundamentals` as never, { returnObjects: true }) || []
  const decisions = frontmatter.decisions || t(`course.cases.${gameId}.decisions` as never, { returnObjects: true }) || []

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('course.ui.backToHome')}
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-blue-400" />
            <span className="text-sm text-slate-400">{t('course.ui.caseStudy')}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-lg text-slate-300 mt-4">{description}</p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <h3 className="text-sm font-medium text-slate-400 mb-3">{t('course.ui.gameInfo')}</h3>
            <div className="space-y-2">
              <p><span className="text-slate-400">{t('course.ui.genre')}:</span> {genre}</p>
              <p><span className="text-slate-400">{t('course.ui.releaseYear')}:</span> {year}</p>
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <h3 className="text-sm font-medium text-slate-400 mb-3">{t('course.ui.keyFeatures')}</h3>
            <ul className="space-y-1">
              {keyFeatures.map((feature: string, i: number) => (
                <li key={i} className="text-sm">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Layers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <h3 className="text-sm font-medium text-green-400 mb-3">{t('course.ui.relatedFundamentals')}</h3>
            <div className="flex flex-wrap gap-2">
              {fundamentals.map((item: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <h3 className="text-sm font-medium text-orange-400 mb-3">{t('course.ui.relatedDecisions')}</h3>
            <div className="flex flex-wrap gap-2">
              {decisions.map((item: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Demo Section */}
        {GAME_DEMOS[gameId] && (
          <div className="mb-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-500/20 rounded-lg">
                    <Gamepad2 className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      {t(GAME_DEMOS[gameId].titleKey as never) as string}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {t(GAME_DEMOS[gameId].descriptionKey as never) as string}
                    </p>
                  </div>
                </div>
                <Link to={GAME_DEMOS[gameId].path}>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Play className="h-4 w-4 mr-2" />
                    {t('course.ui.runDemo')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder Content */}
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-800 border-dashed">
          <div className="text-center">
            <Construction className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-400 mb-2">{t('course.ui.contentComingSoon')}</h3>
            <p className="text-slate-500">{t('course.ui.contentComingSoonDesc')}</p>
          </div>
        </div>

        {/* Theory + Visualization placeholder */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <h3 className="text-lg font-medium mb-4 text-slate-300">{t('course.ui.theorySection')}</h3>
            <div className="h-48 bg-slate-800/50 rounded flex items-center justify-center">
              <span className="text-slate-500">{t('course.ui.theoryPlaceholder')}</span>
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <h3 className="text-lg font-medium mb-4 text-slate-300">{t('course.ui.visualizationSection')}</h3>
            <div className="h-48 bg-slate-800/50 rounded flex items-center justify-center">
              <span className="text-slate-500">{t('course.ui.visualizationPlaceholder')}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
