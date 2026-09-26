import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  /** Valor como aparece no CV: '3.000', '3,000', '~100', '100+'. */
  value: string
  /** Espera antes de começar, para acompanhar a animação de entrada do card. */
  delay?: number
  duration?: number
}

const PATTERN = /^(\D*)([\d.,]+)(\D*)$/

function groupDigits(n: number, separator: string) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Conta de zero até o valor quando o número aparece na tela.
export function CountUp({ value, delay = 0, duration = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  // Com "reduzir movimento" ativo, já começa no valor final.
  const [progress, setProgress] = useState(() => (prefersReducedMotion() ? 1 : 0))

  const match = PATTERN.exec(value)
  const isNumber = match !== null
  const target = match ? Number(match[2].replace(/[.,]/g, '')) : 0
  const separator = match?.[2].match(/[.,]/)?.[0] ?? ''

  // As dependências não mudam ao trocar de idioma (só o separador de milhar muda),
  // então a contagem roda uma vez só.
  useEffect(() => {
    const el = ref.current
    if (!el || !isNumber || prefersReducedMotion()) return

    let frame = 0
    let timeout = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      timeout = window.setTimeout(() => {
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          setProgress(1 - (1 - t) ** 3) // ease-out cúbico
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      }, delay)
    })
    io.observe(el)

    return () => {
      io.disconnect()
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [isNumber, delay, duration])

  if (!match) return <>{value}</>

  const current = groupDigits(Math.round(target * progress), separator)

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {match[1]}
        {current}
        {match[3]}
      </span>
      <span className="sr-only">{value}</span>
    </>
  )
}
