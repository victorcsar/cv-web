import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  icon: LucideIcon
  children: ReactNode
}

export function Section({ id, title, icon: Icon, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 print:break-inside-auto">
      <div className="mb-5 flex items-center gap-3 print:mb-3">
        <span className="grid size-9 place-items-center rounded-xl bg-blue-600/10 text-blue-600 ring-1 ring-blue-600/15 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/20 print:hidden">
          <Icon size={18} strokeWidth={2} aria-hidden="true" />
        </span>
        <h2
          id={`${id}-title`}
          className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white print:text-base print:uppercase print:tracking-wide"
        >
          {title}
        </h2>
        <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-800 print:from-slate-300" />
      </div>
      {children}
    </section>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-blue-600/10 ring-inset dark:bg-blue-400/10 dark:text-blue-200 dark:ring-blue-400/20 print:bg-transparent print:px-0 print:ring-0">
      {children}
    </span>
  )
}

export const cardClass =
  'rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm shadow-slate-900/[0.03] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-none print:border-slate-300 print:bg-white print:shadow-none'
