import type { CV } from '../data/types'
import { RichText } from './RichText'
import { dividerClass, labelClass, Section } from './Section'

export function ExperienceSection({ cv }: { cv: CV }) {
  return (
    <Section id="experience" title={cv.ui.sections.experience}>
      <div className="space-y-14">
        {cv.experience.map((job, jobIndex) => (
          <article key={jobIndex}>
            <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row">
              <div>
                <h3 className="font-serif text-2xl leading-tight text-slate-900 sm:text-3xl dark:text-white">{job.role}</h3>
                <p className="mt-1.5">
                  <span className="font-medium text-blue-700 dark:text-blue-300 print:text-blue-800">{job.company}</span>
                  <span className="text-slate-400 dark:text-slate-600"> · </span>
                  {job.location}
                </p>
              </div>
              <p className={`${labelClass} shrink-0`}>{job.period}</p>
            </header>

            <ol className={`${dividerClass} mt-8 border-t border-slate-200 dark:border-slate-800 print:mt-3 print:border-slate-300`}>
              {job.items.map((item, i) => (
                <li key={i} className="grid grid-cols-[2.25rem_1fr] py-6 print:break-inside-avoid print:py-2">
                  {/* Numeração em monoespaçada, como linhas de um arquivo */}
                  <span aria-hidden="true" className="pt-1 font-mono text-xs text-blue-700 dark:text-blue-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-serif text-xl leading-snug text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="mt-2 leading-relaxed text-pretty print:mt-1 print:leading-snug">
                      <RichText text={item.description} />
                    </p>
                    <p className="mt-3 font-mono text-xs leading-relaxed text-slate-500 dark:text-slate-400 print:mt-1.5 print:leading-snug">
                      {item.stack.join(' · ')}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </Section>
  )
}
