import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MindMapControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onFitToView: () => void
  scale: number
}

export function MindMapControls({
  onZoomIn,
  onZoomOut,
  onFitToView,
  scale,
}: MindMapControlsProps) {
  const zoomPercentage = Math.round(scale * 100)

  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
      {/* Zoom percentage indicator */}
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center">
        <span className="text-xs text-slate-300 font-mono">
          {zoomPercentage}%
        </span>
      </div>

      {/* Control buttons */}
      <div className="flex flex-col gap-1 bg-slate-800/90 backdrop-blur-sm rounded-lg p-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          className="h-9 w-9 text-slate-300 hover:text-white hover:bg-slate-700"
          title="확대"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          className="h-9 w-9 text-slate-300 hover:text-white hover:bg-slate-700"
          title="축소"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>

        <div className="h-px bg-slate-600 mx-1" />

        <Button
          variant="ghost"
          size="icon"
          onClick={onFitToView}
          className="h-9 w-9 text-slate-300 hover:text-white hover:bg-slate-700"
          title="한눈에 보기"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
