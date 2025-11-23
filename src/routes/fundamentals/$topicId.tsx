import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Blocks, Construction, Play, AlertTriangle, Wrench, CheckCircle, BookOpen, ExternalLink, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fundamentalsTree } from '@/content'

export const Route = createFileRoute('/fundamentals/$topicId')({
  component: FundamentalsPage,
})

// Demo paths for topics that have interactive demos
const demoPaths: Record<string, string> = {
  'serialization': '/demo/serialization',
  'modeling-simulation': '/demo/lockstep',
}

function FundamentalsPage() {
  const { t } = useTranslation()
  const { topicId } = Route.useParams()

  // Find the topic node from the mindmap
  const topicNode = fundamentalsTree.nodes.find(node => node.id === topicId)
  const demoPath = demoPaths[topicId]

  if (!topicNode) {
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

  // Get translations for this topic (using type assertion for dynamic keys)
  const title = t(`course.fundamentals.${topicId}.title` as never) as string
  const description = t(`course.fundamentals.${topicId}.description` as never) as string
  const concepts = t(`course.fundamentals.${topicId}.concepts` as never, { returnObjects: true }) as string[]
  const usedIn = t(`course.fundamentals.${topicId}.usedIn` as never, { returnObjects: true }) as string[]

  // Get determinism content for modeling-simulation topic
  const hasDeterminism = topicId === 'modeling-simulation'
  const determinism = hasDeterminism ? t(`course.fundamentals.${topicId}.determinism` as never, { returnObjects: true }) as {
    title: string
    why: {
      title: string
      description: string
      benefits: string[]
    }
    causes: {
      title: string
      items: Array<{
        name: string
        description: string
        example: string
      }>
    }
    methodologies: {
      title: string
      items: Array<{
        name: string
        description: string
        usedIn: string
        example: string
      }>
    }
    testing: {
      title: string
      description: string
      items: string[]
    }
    caseStudies: {
      title: string
      items: Array<{
        gameId: string
        title: string
        description: string
      }>
    }
    references: {
      title: string
      items: Array<{
        title: string
        url: string
        description: string
      }>
    }
  } : null

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
            <Blocks className="h-5 w-5 text-green-400" />
            <span className="text-sm text-slate-400">{t('course.ui.fundamental')}</span>
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
            <h3 className="text-sm font-medium text-slate-400 mb-3">{t('course.ui.coreConcepts')}</h3>
            <div className="flex flex-wrap gap-2">
              {concepts.map((concept, i) => (
                <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                  {concept}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <h3 className="text-sm font-medium text-slate-400 mb-3">{t('course.ui.usedIn')}</h3>
            <ul className="space-y-1">
              {usedIn.map((item, i) => (
                <li key={i} className="text-sm text-slate-300">• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Demo Button if available */}
        {demoPath && (
          <div className="mb-8">
            <Link to={demoPath}>
              <Button className="bg-green-600 hover:bg-green-700">
                <Play className="h-4 w-4 mr-2" />
                {t('course.ui.runDemo')}
              </Button>
            </Link>
          </div>
        )}

        {/* Determinism Content for modeling-simulation */}
        {hasDeterminism && determinism ? (
          <div className="space-y-8">
            {/* Section: Why Determinism */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  {determinism.why.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-300">{determinism.why.description}</p>
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">{t('course.ui.benefits')}</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {determinism.why.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-slate-300">{benefit}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section: Causes of Non-Determinism */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  {determinism.causes.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {determinism.causes.items.map((cause, i) => (
                    <div key={i} className="p-4 bg-slate-800/50 rounded-lg">
                      <h4 className="font-medium text-amber-300 mb-2">{cause.name}</h4>
                      <p className="text-sm text-slate-300 mb-2">{cause.description}</p>
                      <p className="text-xs text-slate-500">
                        <span className="text-slate-400">{t('course.ui.example')}:</span> {cause.example}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Section: Methodologies */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-blue-400" />
                  {determinism.methodologies.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {determinism.methodologies.items.map((method, i) => (
                    <div key={i} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <h4 className="font-medium text-blue-300 mb-2">{method.name}</h4>
                      <p className="text-sm text-slate-300 mb-3">{method.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs">
                        <div>
                          <span className="text-slate-400">{t('course.ui.usedInGames')}:</span>{' '}
                          <span className="text-slate-300">{method.usedIn}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">{t('course.ui.example')}:</span>{' '}
                          <span className="text-slate-300">{method.example}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Section: Testing */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-400" />
                  {determinism.testing.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-300">{determinism.testing.description}</p>
                <ul className="list-disc list-inside space-y-2">
                  {determinism.testing.items.map((item, i) => (
                    <li key={i} className="text-sm text-slate-300">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Section: Case Studies */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  {determinism.caseStudies.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {determinism.caseStudies.items.map((caseStudy, i) => (
                    <div key={i} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <h4 className="font-medium text-yellow-300 mb-2">{caseStudy.title}</h4>
                      <p className="text-sm text-slate-300 mb-3">{caseStudy.description}</p>
                      <Link to="/cases/$gameId" params={{ gameId: caseStudy.gameId }}>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Trophy className="h-3 w-3 mr-1" />
                          {t('course.ui.viewCaseStudy')}
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Section: References */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-400" />
                  {determinism.references.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {determinism.references.items.map((ref, i) => (
                    <a
                      key={i}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-purple-300 mb-1 flex items-center gap-2">
                            {ref.title}
                            <ExternalLink className="h-3 w-3" />
                          </h4>
                          <p className="text-xs text-slate-400">{ref.description}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Placeholder Content for other topics */}
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
          </>
        )}
      </main>
    </div>
  )
}
