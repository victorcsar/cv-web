import type { CSSProperties } from 'react'

// Um único IntersectionObserver para todos os blocos `.term`.
// Quando o bloco entra na tela ele ganha `data-visible`, e o CSS (index.css)
// digita o comando e "imprime" a saída.
let observer: IntersectionObserver | null = null
const pending = new Set<Element>()

// Mesmos tempos do index.css (.term): pausa antes de digitar e tempo por caractere.
const TYPE_DELAY = 150
const TYPE_SPEED = 40
/** Tempo reservado para a saída aparecer antes do próximo comando. */
const OUTPUT_TIME = 320
/** Espera máxima na fila: quem rola rápido não fica olhando para uma tela vazia. */
const MAX_WAIT = 1200

/** Momento em que o "terminal" fica livre para o próximo comando. */
let busyUntil = 0

function show(el: Element, wait = 0) {
  if (el instanceof HTMLElement && wait > 0) {
    el.style.setProperty('--type-delay', `${TYPE_DELAY + wait}ms`)
  }
  el.setAttribute('data-visible', '')
  pending.delete(el)
  observer?.unobserve(el)
}

// Blocos que aparecem juntos (ao abrir a página, por exemplo) rodam em fila,
// um comando depois do outro, como num terminal de verdade.
function enqueue(el: Element) {
  const now = performance.now()
  const wait = Math.min(Math.max(busyUntil - now, 0), MAX_WAIT)
  const chars = Number(getComputedStyle(el).getPropertyValue('--n')) || 0
  busyUntil = now + wait + TYPE_DELAY + chars * TYPE_SPEED + OUTPUT_TIME
  show(el, wait)
}

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (entering.length === 0) return

      // Numa rolagem muito rápida, um bloco pode passar da tela sem nunca
      // "cruzar" a área visível. Os que já ficaram para cima aparecem na hora.
      for (const el of pending) {
        if (el.getBoundingClientRect().bottom < 0) show(el)
      }
      for (const entry of entering) enqueue(entry.target)
    },
    { rootMargin: '0px 0px -12% 0px' },
  )
  return observer
}

/** Callback ref: `<section className="term" ref={reveal}>`. */
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

/** Tamanho do comando, para o CSS saber quantos caracteres digitar. */
export function typed(command: string): CSSProperties {
  return { '--n': command.length } as CSSProperties
}

/** Ordem da linha na saída: cada uma aparece um instante depois da anterior. */
export function line(index: number): CSSProperties {
  return { '--i': Math.min(index, 12) } as CSSProperties
}
