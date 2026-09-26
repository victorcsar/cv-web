import { Mail, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import type { CV } from '../data/types'
import { GithubIcon, LinkedinIcon } from './icons'
import { RichText } from './RichText'
import { cardClass } from './Section'

const linkButton =
  'inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-400/50 dark:hover:text-blue-300 print:h-auto print:border-0 print:bg-transparent print:px-0 print:text-xs print:text-slate-700'

export function Hero({ cv }: { cv: CV }) {
  const linkedinLabel = profile.linkedin.replace('https://www.', '')
  const githubLabel = profile.github.replace('https://', '')

  return (
    <div id="top" className="pt-10 sm:pt-16 print:pt-0">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="relative w-fit shrink-0 print:hidden">
          <div
            aria-hidden="true"
            className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 opacity-60 blur-md dark:opacity-40"
          />
          <img
            src={profile.photo}
            alt={profile.name}
            width={480}
            height={480}
            className="relative size-28 rounded-full object-cover ring-4 ring-white sm:size-36 dark:ring-slate-950"
          />
        </div>

        <div>
          <p className="mb-3 inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 print:hidden">
            <MapPin size={15} aria-hidden="true" />
            {cv.location}
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-balance text-slate-900 sm:text-5xl dark:text-white print:text-3xl">
            {profile.name}
          </h1>
          <p className="mt-3 bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl dark:from-blue-300 dark:to-sky-300 print:mt-1 print:bg-none print:text-lg print:text-blue-800">
            {cv.role}
          </p>
        </div>
      </div>

      <nav aria-label={cv.ui.contact} className="mt-6 flex flex-wrap gap-2.5 print:mt-2 print:gap-x-5 print:gap-y-1">
        <a href={`mailto:${profile.email}`} className={linkButton}>
          <Mail size={17} aria-hidden="true" />
          {profile.email}
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className={linkButton}>
          <LinkedinIcon size={16} />
          <span className="sm:hidden print:hidden">LinkedIn</span>
          <span className="hidden sm:inline print:inline">{linkedinLabel}</span>
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className={linkButton}>
          <GithubIcon size={16} />
          <span className="sm:hidden print:hidden">GitHub</span>
          <span className="hidden sm:inline print:inline">{githubLabel}</span>
        </a>
        <span className="hidden items-center gap-2 text-xs text-slate-700 print:inline-flex">
          <MapPin size={15} aria-hidden="true" />
          {cv.location}
        </span>
      </nav>

      <section aria-labelledby="summary-title" className="mt-10 print:mt-5">
        <h2 id="summary-title" className="sr-only print:not-sr-only print:mb-1.5 print:text-base print:font-semibold print:uppercase print:tracking-wide">
          {cv.ui.sections.summary}
        </h2>
        <p className="max-w-3xl text-base leading-relaxed text-pretty text-slate-600 sm:text-lg dark:text-slate-300 print:max-w-none print:text-sm">
          <RichText text={cv.summary} />
        </p>
      </section>

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 print:hidden">
        {cv.highlights.map((h) => (
          <div key={h.label} className={`${cardClass} flex flex-col p-4 sm:p-5`}>
            <dt className="text-sm leading-snug text-slate-500 dark:text-slate-400">{h.label}</dt>
            <dd className="order-first mb-1 text-2xl font-bold tracking-tight text-blue-600 sm:text-3xl dark:text-blue-300">
              {h.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
