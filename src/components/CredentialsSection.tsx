import type { CV } from '../data/types'
import { dividerClass, linkClass, Section } from './Section'

export function CredentialsSection({ cv }: { cv: CV }) {
  return (
    <>
      <Section id="certifications" title={cv.ui.sections.certifications}>
        <ul className={dividerClass}>
          {cv.certifications.map((cert, i) => (
            <li
              key={i}
              className="flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row"
            >
              <div>
                <h3 className="font-serif text-xl leading-snug text-slate-900 dark:text-white">{cert.name}</h3>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
              <a href={cert.url} target="_blank" rel="noreferrer" className={`${linkClass} shrink-0 font-mono text-xs`}>
                {cv.ui.viewCredential} ↗
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="languages" title={cv.ui.sections.languages}>
        <ul className={dividerClass}>
          {cv.languages.map((lang, i) => (
            <li
              key={i}
              className="flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row"
            >
              <div>
                <h3 className="font-serif text-xl leading-snug text-slate-900 dark:text-white">{lang.name}</h3>
                {lang.source && <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{lang.source}</p>}
              </div>
              <p className="shrink-0 font-mono text-xs text-slate-500 dark:text-slate-400">{lang.level}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
