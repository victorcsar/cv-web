import type { ReactNode } from 'react'
import { reveal, typed } from '../lib/reveal'

/** Rótulos e datas: monoespaçada pequena. */
export const labelClass = 'font-mono text-xs tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400'

/** Linha fina que separa itens de uma lista. */
export const dividerClass = 'divide-y divide-slate-200 dark:divide-slate-800/80 print:divide-slate-300'

export const linkClass =
  'text-slate-900 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-slate-100 dark:decoration-slate-700 dark:hover:text-sky-300 dark:hover:decoration-sky-400'

interface PromptProps {
  command?: string
  /** `true` mantém o cursor piscando (o último prompt da página). */
  idle?: boolean
}

// Uma linha de terminal: `victor@cesar:~$ comando`. O comando é digitado pelo CSS
// quando o bloco `.term` em volta entra na tela. No celular o prompt encurta para `~$`.
export function Prompt({ command = '', idle = false }: PromptProps) {
  return (
    <p aria-hidden="true" className="prompt font-mono text-[0.8125rem] leading-6 sm:text-sm print:hidden">
      <span className="hidden sm:inline">
        <span className="text-blue-700 dark:text-blue-400">victor@cesar</span>
        <span className="text-slate-400 dark:text-slate-600">:</span>
      </span>
      <span className="text-sky-700 dark:text-sky-400">~</span>
      <span className="text-slate-400 dark:text-slate-500">$ </span>
      <span className="type text-slate-900 dark:text-white">{command}</span>
      <span className={`cursor text-sky-600 dark:text-sky-400 ${idle ? '' : 'cursor-temp'}`} />
    </p>
  )
}

interface SectionProps {
  id: string
  title: string
  /** Comando que "abre" a seção, como `cat resumo.md`. */
  command: string
  children: ReactNode
}

// Uma seção do currículo, como a saída de um comando no terminal.
// No papel o comando some e o título aparece numa coluna à esquerda.
export function Section({ id, title, command, children }: SectionProps) {
  return (
    <section
      id={id}
      ref={reveal}
      style={typed(command)}
      aria-labelledby={`${id}-title`}
      className="term scroll-mt-16 py-7 print:grid print:grid-cols-[9rem_1fr] print:gap-x-6 print:border-t print:border-slate-300 print:py-4"
    >
      <h2 id={`${id}-title`} className={`${labelClass} sr-only print:not-sr-only`}>
        {title}
      </h2>
      <Prompt command={command} />
      <div className="mt-4 min-w-0 print:mt-0">{children}</div>
    </section>
  )
}
