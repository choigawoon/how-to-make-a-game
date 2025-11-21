import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Globe,
  Users,
  Cog,
  Database,
  Rocket,
  Monitor,
  Gamepad2,
  FileJson,
  Archive,
  Package,
  Download,
  HardDrive,
  GitBranch,
} from 'lucide-react'
import type { MindMapNode as MindMapNodeType } from '@/types/course'
import { nodeColorClasses } from '@/content/course-tree'
import { cn } from '@/lib/utils'

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  Globe,
  Users,
  Cog,
  Database,
  Rocket,
  Monitor,
  Gamepad2,
  FileJson,
  Archive,
  Package,
  Download,
  HardDrive,
  GitBranch,
}

interface MindMapNodeProps {
  node: MindMapNodeType
  onClick: () => void
  isCenter?: boolean
  isTarget?: boolean
}

export function MindMapNode({ node, onClick, isCenter = false, isTarget = false }: MindMapNodeProps) {
  const colors = nodeColorClasses[node.color] || nodeColorClasses.blue

  // Get the icon component
  const IconComponent = node.icon ? iconMap[node.icon] : null

  return (
    <motion.div
      className={cn(
        'absolute cursor-pointer select-none',
        'transform -translate-x-1/2 -translate-y-1/2',
      )}
      style={{
        left: node.position.x,
        top: node.position.y,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isTarget ? { scale: 1.2 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <div
        className={cn(
          'relative flex flex-col items-center justify-center',
          'rounded-2xl border-2 shadow-lg',
          'transition-all duration-200',
          colors.bg,
          colors.border,
          colors.text,
          isCenter ? 'w-40 h-40 rounded-full' : 'w-48 min-h-24 p-4',
          !isCenter && 'hover:shadow-xl hover:shadow-current/20',
        )}
      >
        {/* Icon */}
        {IconComponent && (
          <IconComponent
            className={cn(
              'mb-2',
              isCenter ? 'w-12 h-12' : 'w-8 h-8'
            )}
          />
        )}

        {/* Title */}
        <div className={cn(
          'font-bold text-center leading-tight',
          isCenter ? 'text-lg' : 'text-sm'
        )}>
          {node.title}
        </div>

        {/* Description (for non-center nodes) */}
        {!isCenter && node.description && (
          <div className="mt-1 text-xs text-center opacity-80 line-clamp-2">
            {node.description}
          </div>
        )}

        {/* Glow effect on hover */}
        <div className={cn(
          'absolute inset-0 rounded-2xl',
          isCenter && 'rounded-full',
          'bg-white/0 hover:bg-white/10 transition-colors duration-200'
        )} />
      </div>

      {/* Pulse animation for clickable nodes */}
      {!isCenter && (
        <motion.div
          className={cn(
            'absolute inset-0 rounded-2xl border-2',
            colors.border,
            'opacity-0'
          )}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      )}
    </motion.div>
  )
}
