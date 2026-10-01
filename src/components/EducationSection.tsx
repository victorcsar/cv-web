import type { CV } from '../data/types'
import { dividerClass, Section } from './Section'

export function EducationSection({ cv }: { cv: CV }) {
  return (
    <Section id="education" title={cv.ui.sections.education}>
      <ul className={dividerClass}>
        {cv.education.map((edu, i) => (
          <li
            key={i}
            className="flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row print:break-inside-avoid print:py-1.5"
          >
            <div>
              <h3 className="font-serif text-xl leading-snug text-slate-900 dark:text-white">{edu.title}</h3>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{edu.institution}</p>
            </div>
            {/* Em andamento fica em azul; concluído, neutro */}
            <p
              className={`shrink-0 font-mono text-xs ${
                edu.done ? 'text-slate-500 dark:text-slate-400' : 'text-blue-700 dark:text-blue-300 print:text-blue-800'
              }`}
            >
              {edu.status}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
