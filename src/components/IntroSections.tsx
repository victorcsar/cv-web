import { profile } from '../data/profile'
import type { CV } from '../data/types'
import { line } from '../lib/reveal'
import { RichText } from './RichText'
import { linkClass, Section } from './Section'

const contacts = [
  { label: 'email', text: profile.email, href: `mailto:${profile.email}` },
  { label: 'linkedin', text: profile.linkedin.replace('https://www.', ''), href: profile.linkedin },
  { label: 'github', text: profile.github.replace('https://', ''), href: profile.github },
]

// As três primeiras saídas do terminal: contato, resumo e números.
export function IntroSections({ cv }: { cv: CV }) {
  const { sections, files } = cv.ui

  return (
    <>
      <Section id="contact" title={cv.ui.contact} command={`cat ${files.contact}`}>
        <dl className="space-y-1.5 font-mono text-xs sm:text-sm print:space-y-1">
          {contacts.map(({ label, text, href }, i) => (
            <div key={label} style={line(i)} className="out grid grid-cols-[4.25rem_1fr] gap-x-3 sm:grid-cols-[5.5rem_1fr]">
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

      <Section id="summary" title={sections.summary} command={`cat ${files.summary}`}>
        <p className="out leading-relaxed text-pretty sm:text-[1.0625rem] print:leading-snug">
          <RichText text={cv.summary} />
        </p>
      </Section>

      <Section id="highlights" title={sections.highlights} command={`cat ${files.highlights}`}>
        <dl className="space-y-2 print:space-y-1">
          {cv.highlights.map((h, i) => (
            <div key={i} style={line(i)} className="out grid grid-cols-[4.5rem_1fr] items-baseline gap-x-3 sm:grid-cols-[5.5rem_1fr]">
              <dt className="order-last">{h.label}</dt>
              <dd className="font-mono text-lg font-medium text-blue-700 tabular-nums dark:text-sky-300 print:text-base print:text-blue-800">
                {h.value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  )
}
