import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronRight, ChevronDown, BookOpen, Play, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MindMapData, MindMapNode } from '@/types/course'
import { cn } from '@/lib/utils'
import { nodeColorClasses } from '@/content/course-tree'

interface BookViewProps {
  data: MindMapData
  subMindmaps?: Record<string, MindMapData>
  className?: string
}

interface TreeNodeProps {
  node: MindMapNode
  subMindmap?: MindMapData
  level: number
}

function TreeNode({ node, subMindmap, level }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0)
  const colors = nodeColorClasses[node.color] || nodeColorClasses.blue

  const hasChildren = subMindmap && subMindmap.nodes.length > 1
  const childNodes = subMindmap?.nodes.filter(n => n.id !== 'center') || []

  // Determine the link destination
  const linkTo = node.lessonPath || (node.topicPath ? undefined : undefined)
  const isDemo = node.lessonPath?.includes('/demo/')

  return (
    <div className={cn('select-none', level > 0 && 'ml-4')}>
      <div
        className={cn(
          'flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer',
          'hover:bg-slate-800/50 transition-colors',
          'group'
        )}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {/* Expand/collapse icon */}
        {hasChildren ? (
          <button className="p-0.5 hover:bg-slate-700 rounded">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-400" />
            )}
          </button>
        ) : (
          <div className="w-5" />
        )}

        {/* Color indicator */}
        <div className={cn('w-3 h-3 rounded-full', colors.bg)} />

        {/* Title */}
        <span className="flex-1 text-sm font-medium">{node.title}</span>

        {/* Action button for demos */}
        {isDemo && linkTo && (
          <Link
            to={linkTo}
            className={cn(
              'opacity-0 group-hover:opacity-100 transition-opacity',
              'flex items-center gap-1 px-2 py-1 rounded text-xs',
              'bg-blue-600 hover:bg-blue-700 text-white'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <Play className="h-3 w-3" />
            데모
          </Link>
        )}

        {/* Regular link */}
        {!isDemo && linkTo && (
          <Link
            to={linkTo}
            className={cn(
              'opacity-0 group-hover:opacity-100 transition-opacity',
              'flex items-center gap-1 px-2 py-1 rounded text-xs',
              'bg-slate-700 hover:bg-slate-600 text-white'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <FileText className="h-3 w-3" />
            보기
          </Link>
        )}
      </div>

      {/* Description */}
      {node.description && level === 0 && (
        <p className="ml-10 text-xs text-slate-500 pb-1">
          {node.description}
        </p>
      )}

      {/* Children */}
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-l border-slate-700 ml-5">
              {childNodes.map((child) => (
                <TreeNode
                  key={child.id}
                  node={child}
                  level={level + 1}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function BookView({ data, subMindmaps = {}, className = '' }: BookViewProps) {
  const mainNodes = data.nodes.filter(n => n.id !== 'center')

  return (
    <div className={cn('bg-slate-900 rounded-lg p-4', className)}>
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
        <BookOpen className="h-5 w-5 text-slate-400" />
        <h2 className="font-semibold">{data.title}</h2>
      </div>

      <div className="space-y-1">
        {mainNodes.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            subMindmap={subMindmaps[node.id]}
            level={0}
          />
        ))}
      </div>
    </div>
  )
}
