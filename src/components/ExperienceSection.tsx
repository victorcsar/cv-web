import type { CV } from '../data/types'
import { line } from '../lib/reveal'
import { RichText } from './RichText'
import { dividerClass, labelClass, Section } from './Section'

export function ExperienceSection({ cv }: { cv: CV }) {
  return (
    <Section id="experience" title={cv.ui.sections.experience} command={cv.ui.commands.experience}>
      <div className="space-y-12">
        {cv.experience.map((job, jobIndex) => (
          <article key={jobIndex}>
            <header style={line(0)} className="out flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row">
              <div>
                {/* O "#" imita um título de arquivo Markdown */}
                <h3 className="font-mono text-lg leading-snug font-medium text-slate-900 sm:text-xl dark:text-white">
                  <span aria-hidden="true" className="text-blue-700 dark:text-sky-400 print:hidden">
                    #{' '}
                  </span>
                  {job.role}
                </h3>
                <p className="mt-1.5">
                  <span className="font-medium text-blue-700 dark:text-sky-300 print:text-blue-800">{job.company}</span>
                  <span className="text-slate-400 dark:text-slate-600"> · </span>
                  {job.location}
                </p>
              </div>
              <p className={`${labelClass} shrink-0`}>{job.period}</p>
            </header>

            <ol className={`${dividerClass} mt-6 border-t border-slate-200 dark:border-slate-800/80 print:mt-3 print:border-slate-300`}>
              {job.items.map((item, i) => (
                <li
                  key={i}
                  style={line(i + 1)}
                  className="out group grid grid-cols-[2.25rem_1fr] py-5 print:break-inside-avoid print:py-2"
                >
                  <span
                    aria-hidden="true"
                    className="pt-0.5 font-mono text-xs text-slate-400 transition-colors group-hover:text-sky-600 dark:text-slate-600 dark:group-hover:text-sky-400"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-mono text-[0.9375rem] font-medium text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="mt-2 leading-relaxed text-pretty print:mt-1 print:leading-snug">
                      <RichText text={item.description} />
                    </p>
                    <p className="mt-2.5 font-mono text-xs leading-relaxed text-slate-500 dark:text-slate-400 print:mt-1.5 print:leading-snug">
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
