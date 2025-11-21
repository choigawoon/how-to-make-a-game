import type { Position } from '@/types/course'

interface MindMapConnectorProps {
  from: Position
  to: Position
  style?: 'solid' | 'dashed'
}

export function MindMapConnector({ from, to, style = 'solid' }: MindMapConnectorProps) {
  // Calculate control points for a curved line
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2

  // Add some curvature based on the distance
  const dx = to.x - from.x
  const dy = to.y - from.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  // Perpendicular offset for curve
  const curvature = distance * 0.1
  const perpX = -dy / distance * curvature
  const perpY = dx / distance * curvature

  const controlX = midX + perpX
  const controlY = midY + perpY

  // Path data for quadratic bezier curve
  const pathData = `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`

  return (
    <path
      d={pathData}
      fill="none"
      stroke="rgba(148, 163, 184, 0.4)"
      strokeWidth={2}
      strokeDasharray={style === 'dashed' ? '8 4' : undefined}
      className="transition-all duration-300"
    />
  )
}
