import { useEffect, useRef } from 'react'

// Barra de progresso da leitura: uma linha na base da barra do topo que cresce
// da esquerda para a direita conforme a página é rolada.
// Mexe direto no estilo do elemento, no máximo uma vez por quadro, sem
// redesenhar o resto da página.
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ transform: 'scaleX(0)' }}
      className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-blue-600 dark:bg-sky-400"
    />
  )
}
