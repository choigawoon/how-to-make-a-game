import graphData from '@/content/graph.json'

export type NodeType = 'root' | 'category' | 'concept' | 'lesson' | 'example'

export interface GraphNode {
    id: string
    type: NodeType
    position: { x: number; y: number }
    data: {
        icon: string
        color: string
        [key: string]: any
    }
}

export interface GraphEdge {
    source: string
    target: string
    type: string
    style?: string
}

export interface KnowledgeGraph {
    nodes: GraphNode[]
    edges: GraphEdge[]
}

export const graph: KnowledgeGraph = graphData as KnowledgeGraph

function parseFrontmatter(raw: string) {
    const match = raw.match(/^---\n([\s\S]*?)\n---/)
    if (!match) return {}

    const frontmatter: any = {}
    const lines = match[1].split('\n')
    for (const line of lines) {
        const [key, ...values] = line.split(':')
        if (key && values.length) {
            let value = values.join(':').trim()
            // Handle arrays like ["a", "b"]
            if (value.startsWith('[') && value.endsWith(']')) {
                value = JSON.parse(value)
            } else {
                // Remove quotes if present
                value = value.replace(/^["']|["']$/g, '')
            }
            frontmatter[key.trim()] = value
        }
    }
    return frontmatter
}

export async function loadContent(nodeId: string, locale: string = 'ko') {
    try {
        // Dynamic import for MDX content (Component)
        const modules = import.meta.glob('../content/nodes/*.mdx')
        // Dynamic import for raw content (Frontmatter)
        const rawModules = import.meta.glob('../content/nodes/*.mdx', { query: '?raw', import: 'default' })

        const path = `../content/nodes/${nodeId}.${locale}.mdx`

        if (modules[path] && rawModules[path]) {
            let Content = null
            let frontmatter = {}

            try {
                const raw = await rawModules[path]() as string
                console.log('Raw content loaded')
                frontmatter = parseFrontmatter(raw)
            } catch (e) {
                console.error('Failed to load raw content', e)
            }

            try {
                const mod = await modules[path]() as any
                Content = mod.default
            } catch (e) {
                console.error('Failed to load component', e)
            }

            return {
                frontmatter,
                Content
            }
        } else {
            console.error('Module not found for path:', path)
        }
        return null
    } catch (error) {
        console.error(`Failed to load content for ${nodeId}`, error)
        return null
    }
}

export function getGraph() {
    return graph
}

export function getNode(id: string) {
    return graph.nodes.find(n => n.id === id)
}

export function getOutgoingEdges(nodeId: string) {
    return graph.edges.filter(e => e.source === nodeId)
}

export function getIncomingEdges(nodeId: string) {
    return graph.edges.filter(e => e.target === nodeId)
}
