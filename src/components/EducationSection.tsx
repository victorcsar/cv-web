import type { CV } from '../data/types'
import { line } from '../lib/reveal'
import { Section } from './Section'

export function EducationSection({ cv }: { cv: CV }) {
  return (
    <Section id="education" title={cv.ui.sections.education} command={`cat ${cv.ui.files.education}`}>
      <ul className="space-y-4 print:space-y-1.5">
        {cv.education.map((edu, i) => (
          <li key={i} style={line(i)} className="out grid grid-cols-[2.25rem_1fr] print:grid-cols-1 print:break-inside-avoid">
            {/* Caixa de tarefa: [x] concluído, [ ] em andamento. O texto ao lado já diz o mesmo. */}
            <span
              aria-hidden="true"
              className={`pt-0.5 font-mono text-xs print:hidden ${
                edu.done ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 dark:text-slate-600'
              }`}
            >
              {edu.done ? '[x]' : '[ ]'}
            </span>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row">
              <div>
                <h3 className="font-mono text-[0.9375rem] font-medium text-slate-900 dark:text-white">{edu.title}</h3>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{edu.institution}</p>
              </div>
              <p className="shrink-0 font-mono text-xs text-slate-500 dark:text-slate-400">{edu.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
