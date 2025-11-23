import { createFileRoute } from '@tanstack/react-router'
import { loadContent, getNode } from '@/lib/content'
import { useEffect, useState } from 'react'
import React from 'react'

export const Route = createFileRoute('/learn/$nodeId')({
    component: LearnNodeComponent,
    loader: async ({ params }) => {
        const node = getNode(params.nodeId)
        if (!node) throw new Error('Node not found')
        return { node }
    },
})

function LearnNodeComponent() {
    const { node } = Route.useLoaderData()
    const { nodeId } = Route.useParams()
    const [Content, setContent] = useState<React.ComponentType | null>(null)
    const [meta, setMeta] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        loadContent(nodeId, 'ko').then(data => {
            if (data) {
                setContent(() => data.Content)
                setMeta(data.frontmatter)
            } else {
                setError('Content not found')
            }
        })
    }, [nodeId])

    if (error) return <div className="p-8 text-red-500">Error: {error}</div>
    if (!Content) return <div className="p-8">Loading... (Check console for details)</div>

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{meta?.title || node.id}</h1>
                <div className="flex gap-2">
                    {meta?.tags?.map((tag: string) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
                <Content />
            </div>
        </div>
    )
}
