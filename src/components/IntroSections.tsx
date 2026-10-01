import { profile } from '../data/profile'
import type { CV } from '../data/types'
import { RichText } from './RichText'
import { linkClass, Section } from './Section'

const contacts = [
  { label: 'email', text: profile.email, href: `mailto:${profile.email}` },
  { label: 'linkedin', text: profile.linkedin.replace('https://www.', ''), href: profile.linkedin },
  { label: 'github', text: profile.github.replace('https://', ''), href: profile.github },
]

// As três primeiras linhas do currículo: contato, resumo e números.
export function IntroSections({ cv }: { cv: CV }) {
  return (
    <>
      <Section id="contact" title={cv.ui.contact}>
        <dl className="grid grid-cols-[4.25rem_1fr] gap-x-3 gap-y-2 font-mono text-xs print:gap-y-1 sm:grid-cols-[4.75rem_1fr] sm:gap-x-4 sm:text-sm">
          {contacts.map(({ label, text, href }) => (
            <div key={label} className="contents">
              <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
              <dd className="min-w-0">
                <a
                  href={href}
                  className={`${linkClass} break-all`}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {text}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="summary" title={cv.ui.sections.summary}>
        <p className="font-serif text-xl leading-relaxed text-pretty text-slate-700 sm:text-[1.375rem] dark:text-slate-200 print:text-base print:leading-snug">
          <RichText text={cv.summary} />
        </p>
      </Section>

      <Section id="highlights" title={cv.ui.sections.highlights}>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 print:grid-cols-4">
          {cv.highlights.map((h) => (
            <div key={h.label} className="flex flex-col">
              <dt className="mt-2 text-sm leading-snug text-slate-500 dark:text-slate-400">{h.label}</dt>
              <dd className="order-first font-serif text-4xl leading-none text-slate-900 tabular-nums sm:text-5xl dark:text-white print:text-3xl">
                {h.value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  )
}
