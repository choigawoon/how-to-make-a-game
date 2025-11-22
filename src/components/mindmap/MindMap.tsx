import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import type { MindMapData, MindMapNode as MindMapNodeType, ViewState, TransitionState } from '@/types/course'
import { MindMapNode } from './MindMapNode'
import { MindMapConnector } from './MindMapConnector'
import { MindMapControls } from './MindMapControls'
import { Button } from '@/components/ui/button'

interface MindMapProps {
  data: MindMapData
  className?: string
  onNodeClick?: (node: MindMapNodeType) => void
  onBack?: () => void
}

export function MindMap({ data, className = '', onNodeClick, onBack }: MindMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // View state for zoom and pan
  const [viewState, setViewState] = useState<ViewState>({
    scale: 1,
    translateX: 0,
    translateY: 0,
  })

  // Transition state for node click animations
  const [transition, setTransition] = useState<TransitionState>({
    isTransitioning: false,
    targetNode: null,
    phase: 'idle',
  })

  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Handle mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newScale = Math.min(Math.max(viewState.scale * delta, 0.3), 3)

    setViewState(prev => ({
      ...prev,
      scale: newScale,
    }))
  }, [viewState.scale])

  // Handle mouse down for dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return // Only left click
    setIsDragging(true)
    setDragStart({ x: e.clientX - viewState.translateX, y: e.clientY - viewState.translateY })
  }, [viewState.translateX, viewState.translateY])

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    setViewState(prev => ({
      ...prev,
      translateX: e.clientX - dragStart.x,
      translateY: e.clientY - dragStart.y,
    }))
  }, [isDragging, dragStart])

  // Handle mouse up to stop dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Fit all nodes in view
  const fitToView = useCallback(() => {
    if (!containerRef.current || data.nodes.length === 0) return

    const container = containerRef.current.getBoundingClientRect()
    const padding = 100

    // Calculate bounding box of all nodes
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    data.nodes.forEach(node => {
      minX = Math.min(minX, node.position.x - 80)
      maxX = Math.max(maxX, node.position.x + 80)
      minY = Math.min(minY, node.position.y - 40)
      maxY = Math.max(maxY, node.position.y + 40)
    })

    const contentWidth = maxX - minX
    const contentHeight = maxY - minY

    const scaleX = (container.width - padding * 2) / contentWidth
    const scaleY = (container.height - padding * 2) / contentHeight
    const scale = Math.min(scaleX, scaleY, 1.5)

    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2

    setViewState({
      scale,
      translateX: container.width / 2 - centerX * scale,
      translateY: container.height / 2 - centerY * scale,
    })
  }, [data.nodes])

  // Zoom in
  const zoomIn = useCallback(() => {
    setViewState(prev => ({
      ...prev,
      scale: Math.min(prev.scale * 1.2, 3),
    }))
  }, [])

  // Zoom out
  const zoomOut = useCallback(() => {
    setViewState(prev => ({
      ...prev,
      scale: Math.max(prev.scale * 0.8, 0.3),
    }))
  }, [])

  // Handle node click - animate and call callback
  const handleNodeClick = useCallback(async (node: MindMapNodeType) => {
    if (node.id === 'center' || transition.isTransitioning) return

    // Start transition
    setTransition({
      isTransitioning: true,
      targetNode: node,
      phase: 'zoom-in',
    })

    // Calculate target position to center the node
    const container = containerRef.current?.getBoundingClientRect()
    if (!container) return

    const targetScale = 2.5
    const targetX = container.width / 2 - node.position.x * targetScale
    const targetY = container.height / 2 - node.position.y * targetScale

    // Animate to node
    setViewState({
      scale: targetScale,
      translateX: targetX,
      translateY: targetY,
    })

    // Wait for animation then call callback
    setTimeout(() => {
      setTransition(prev => ({ ...prev, phase: 'fade-out' }))

      setTimeout(() => {
        // Call the onNodeClick callback if provided
        if (onNodeClick) {
          onNodeClick(node)
        }

        // Reset transition state
        setTransition({
          isTransitioning: false,
          targetNode: null,
          phase: 'idle',
        })
      }, 300)
    }, 400)
  }, [transition.isTransitioning, onNodeClick])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-slate-950 ${className}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: `${50 * viewState.scale}px ${50 * viewState.scale}px`,
          backgroundPosition: `${viewState.translateX}px ${viewState.translateY}px`,
        }}
      />

      {/* Canvas with transform */}
      <motion.div
        className="absolute"
        style={{
          transform: `translate(${viewState.translateX}px, ${viewState.translateY}px) scale(${viewState.scale})`,
          transformOrigin: '0 0',
        }}
        animate={{
          transform: `translate(${viewState.translateX}px, ${viewState.translateY}px) scale(${viewState.scale})`,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
      >
        {/* Connections (render first, below nodes) */}
        <svg
          className="absolute overflow-visible"
          style={{ pointerEvents: 'none' }}
        >
          {data.connections.map((connection, index) => {
            const fromNode = data.nodes.find(n => n.id === connection.from)
            const toNode = data.nodes.find(n => n.id === connection.to)
            if (!fromNode || !toNode) return null

            return (
              <MindMapConnector
                key={`${connection.from}-${connection.to}-${index}`}
                from={fromNode.position}
                to={toNode.position}
                style={connection.style}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {data.nodes.map(node => (
          <MindMapNode
            key={node.id}
            node={node}
            onClick={() => handleNodeClick(node)}
            isCenter={node.id === 'center'}
            isTarget={transition.targetNode?.id === node.id}
          />
        ))}
      </motion.div>

      {/* Back button */}
      {onBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="absolute top-4 left-4 z-10 bg-slate-800/80 hover:bg-slate-700 text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          뒤로
        </Button>
      )}

      {/* Controls */}
      <MindMapControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onFitToView={fitToView}
        scale={viewState.scale}
      />

      {/* Fade overlay during transition */}
      {transition.phase === 'fade-out' && (
        <motion.div
          className="absolute inset-0 bg-slate-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  )
}
