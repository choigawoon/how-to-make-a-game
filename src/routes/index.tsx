import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { MindMap } from '@/components/mindmap'
import { mainCourseTree } from '@/content'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  // Fit to view on initial load
  useEffect(() => {
    // Small delay to ensure the container is rendered
    const timer = setTimeout(() => {
      const fitButton = document.querySelector('[title="한눈에 보기"]') as HTMLButtonElement
      fitButton?.click()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden">
      <MindMap data={mainCourseTree} />
    </div>
  )
}
