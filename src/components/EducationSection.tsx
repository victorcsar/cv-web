import { CircleCheck, Clock, GraduationCap } from 'lucide-react'
import type { CV } from '../data/types'
import { cardClass, Section } from './Section'

export function EducationSection({ cv }: { cv: CV }) {
  return (
    <Section id="education" title={cv.ui.sections.education} icon={GraduationCap}>
      <ul className="grid gap-3 sm:grid-cols-2 print:block print:space-y-1.5">
        {cv.education.map((edu) => (
          <li key={edu.title} className={`${cardClass} flex flex-col p-5 sm:odd:last:col-span-2 print:break-inside-avoid print:border-0 print:p-0`}>
            <h3 className="font-semibold text-slate-900 dark:text-white print:text-sm">{edu.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 print:mt-0 print:text-xs">{edu.institution}</p>
            <p
              className={`mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium print:mt-0 print:bg-transparent print:px-0 print:text-slate-600 ${
                edu.done
                  ? 'bg-blue-600 text-white dark:bg-blue-500/20 dark:text-blue-200'
                  : 'bg-sky-50 text-sky-700 ring-1 ring-sky-600/20 ring-inset dark:bg-sky-400/10 dark:text-sky-200 dark:ring-sky-400/25 print:ring-0'
              }`}
            >
              {edu.done ? <CircleCheck size={13} aria-hidden="true" /> : <Clock size={13} aria-hidden="true" />}
              {edu.status}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
