import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, GitBranch, Construction } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { decisionsTree } from '@/content'

export const Route = createFileRoute('/decisions/$categoryId')({
  component: DecisionsPage,
})

// Option keys for each decision category
const optionKeys: Record<string, string[]> = {
  'multiplayer-arch': ['p2p', 'client-server'],
  'physics-authority': ['server', 'client'],
  'sync-strategy': ['optimistic', 'pessimistic'],
  'tickrate': ['high', 'low'],
  'balancing': ['hardcoded', 'data-driven'],
}

function DecisionsPage() {
  const { t } = useTranslation()
  const { categoryId } = Route.useParams()

  // Find the decision node from the mindmap
  const decisionNode = decisionsTree.nodes.find(node => node.id === categoryId)
  const options = optionKeys[categoryId] || []

  if (!decisionNode) {
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

  // Get translations for this decision (using type assertion for dynamic keys)
  const title = t(`course.decisions.${categoryId}.title` as never) as string
  const description = t(`course.decisions.${categoryId}.description` as never) as string
  const considerations = t(`course.decisions.${categoryId}.considerations` as never, { returnObjects: true }) as string[]

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
            <GitBranch className="h-5 w-5 text-orange-400" />
            <span className="text-sm text-slate-400">{t('course.ui.designDecision')}</span>
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

        {/* Trade-off Comparison */}
        {options.length > 0 && (
          <>
            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {options.map((optionKey) => {
                const name = t(`course.decisions.${categoryId}.options.${optionKey}.name` as never) as string
                const pros = t(`course.decisions.${categoryId}.options.${optionKey}.pros` as never, { returnObjects: true }) as string[]
                const cons = t(`course.decisions.${categoryId}.options.${optionKey}.cons` as never, { returnObjects: true }) as string[]
                const useCases = t(`course.decisions.${categoryId}.options.${optionKey}.useCases` as never, { returnObjects: true }) as string[]

                return (
                  <div key={optionKey} className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                    <h3 className="text-lg font-medium mb-4 text-white">{name}</h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-400 mb-2">{t('course.ui.pros')}</h4>
                        <ul className="space-y-1">
                          {pros.map((pro, j) => (
                            <li key={j} className="text-sm text-slate-300">+ {pro}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-red-400 mb-2">{t('course.ui.cons')}</h4>
                        <ul className="space-y-1">
                          {cons.map((con, j) => (
                            <li key={j} className="text-sm text-slate-300">- {con}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-blue-400 mb-2">{t('course.ui.useCases')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {useCases.map((useCase, j) => (
                            <span key={j} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Considerations */}
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 mb-8">
              <h3 className="text-sm font-medium text-slate-400 mb-3">{t('course.ui.considerations')}</h3>
              <div className="flex flex-wrap gap-2">
                {considerations.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Placeholder Content */}
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-800 border-dashed">
          <div className="text-center">
            <Construction className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-400 mb-2">{t('course.ui.detailedContentComingSoon')}</h3>
            <p className="text-slate-500">{t('course.ui.detailedContentComingSoonDesc')}</p>
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
            <h3 className="text-lg font-medium mb-4 text-slate-300">{t('course.ui.visualizationDemoSection')}</h3>
            <div className="h-48 bg-slate-800/50 rounded flex items-center justify-center">
              <span className="text-slate-500">{t('course.ui.visualizationPlaceholder')}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
