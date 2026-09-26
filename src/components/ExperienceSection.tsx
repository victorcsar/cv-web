import { BriefcaseBusiness } from 'lucide-react'
import type { CV } from '../data/types'
import { reveal, revealDelay } from '../lib/reveal'
import { RichText } from './RichText'
import { cardClass, Section, Tag } from './Section'

export function ExperienceSection({ cv }: { cv: CV }) {
  return (
    <Section id="experience" title={cv.ui.sections.experience} icon={BriefcaseBusiness}>
      <div className="space-y-10">
        {cv.experience.map((job, jobIndex) => (
          <article key={jobIndex}>
            <header ref={reveal} className="reveal mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between print:mb-3 print:flex-row">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white print:text-base">
                  {job.role}
                </h3>
                <p className="mt-0.5 text-slate-600 dark:text-slate-400 print:text-sm">
                  <span className="font-medium text-blue-700 dark:text-blue-300 print:text-blue-800">{job.company}</span>
                  <span aria-hidden="true"> · </span>
                  {job.location}
                </p>
              </div>
              <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200 print:border-0 print:bg-transparent print:p-0 print:text-sm print:text-slate-700">
                <span className="relative flex size-1.5 print:hidden" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-blue-500 dark:bg-blue-300" />
                </span>
                {job.period}
              </span>
            </header>

            <ul className="grid gap-4 md:grid-cols-2 print:block print:space-y-2">
              {job.items.map((item, i) => (
                <li
                  // Chave pelo índice: trocar de idioma não repete a animação
                  key={i}
                  ref={reveal}
                  style={revealDelay((i % 2) * 110)}
                  className={`${cardClass} reveal group flex flex-col p-5 md:odd:last:col-span-2 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5 dark:hover:border-blue-400/40 print:break-inside-avoid print:border-0 print:p-0`}
                >
                  <h4 className="font-semibold text-slate-900 dark:text-white print:text-sm">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 print:mt-0.5 print:text-xs">
                    <RichText text={item.description} />
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-1 md:mt-auto md:pt-4 print:mt-1 print:gap-x-2 print:gap-y-0 print:pt-0">
                    {item.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
