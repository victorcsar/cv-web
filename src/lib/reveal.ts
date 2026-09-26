import type { CSSProperties } from 'react'

// Um único IntersectionObserver para todos os elementos com a classe `reveal`.
let observer: IntersectionObserver | null = null
const pending = new Set<Element>()

function show(el: Element) {
  el.setAttribute('data-visible', '')
  pending.delete(el)
  observer?.unobserve(el)
}

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      for (const entry of entries) {
        if (entry.isIntersecting) show(entry.target)
      }
      // Numa rolagem muito rápida, um elemento pode passar da tela sem nunca
      // "cruzar" a área visível. Os que já ficaram para cima aparecem também.
      for (const el of pending) {
        if (el.getBoundingClientRect().bottom < 0) show(el)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  return observer
}

/**
 * Callback ref: `<li className="reveal" ref={reveal}>`.
 * Pode ser usado em vários elementos ao mesmo tempo.
 */
export function reveal(el: HTMLElement | null) {
  if (!el) return
  if (typeof IntersectionObserver === 'undefined') {
    el.setAttribute('data-visible', '')
    return
  }
  const io = getObserver()
  pending.add(el)
  io.observe(el)
  return () => {
    pending.delete(el)
    io.unobserve(el)
  }
}

/** Atraso em cascata para itens de uma grade (ex.: coluna da esquerda antes da direita). */
export function revealDelay(ms: number): CSSProperties {
  return { '--reveal-delay': `${ms}ms` } as CSSProperties
}
