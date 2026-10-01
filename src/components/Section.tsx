import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  children: ReactNode
}

/** Rótulos, datas e tecnologias: monoespaçada pequena. */
export const labelClass = 'font-mono text-xs tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400'

/** Linha fina que separa itens de uma lista. */
export const dividerClass = 'divide-y divide-slate-200 dark:divide-slate-800 print:divide-slate-300'

export const linkClass =
  'text-slate-900 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-slate-100 dark:decoration-slate-700 dark:hover:text-blue-300 dark:hover:decoration-blue-400'

// Uma seção do currículo: rótulo numa coluna estreita à esquerda, conteúdo à direita.
// No desktop o rótulo acompanha a rolagem enquanto a seção está na tela.
export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-14 border-t border-slate-200 py-10 md:grid md:grid-cols-[10rem_1fr] md:gap-x-10 dark:border-slate-800 print:grid print:grid-cols-[9rem_1fr] print:gap-x-6 print:border-slate-300 print:py-4"
    >
      <h2
        id={`${id}-title`}
        className={`${labelClass} mb-5 md:sticky md:top-20 md:mb-0 md:self-start md:pt-1.5 print:static print:mb-0`}
      >
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
