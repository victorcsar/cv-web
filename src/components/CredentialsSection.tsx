import type { CV } from '../data/types'
import { line } from '../lib/reveal'
import { linkClass, Section } from './Section'

const rowClass = 'out flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row'
const titleClass = 'font-mono text-[0.9375rem] font-medium text-slate-900 dark:text-white'
const detailClass = 'mt-0.5 text-sm text-slate-500 dark:text-slate-400'

export function CredentialsSection({ cv }: { cv: CV }) {
  const { sections, files } = cv.ui

  return (
    <>
      <Section id="certifications" title={sections.certifications} command={`cat ${files.certifications}`}>
        <ul className="space-y-4 print:space-y-1.5">
          {cv.certifications.map((cert, i) => (
            <li key={i} style={line(i)} className={rowClass}>
              <div>
                <h3 className={titleClass}>{cert.name}</h3>
                <p className={detailClass}>
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

      <Section id="languages" title={sections.languages} command={`cat ${files.languages}`}>
        <ul className="space-y-4 print:space-y-1.5">
          {cv.languages.map((lang, i) => (
            <li key={i} style={line(i)} className={rowClass}>
              <div>
                <h3 className={titleClass}>{lang.name}</h3>
                {lang.source && <p className={detailClass}>{lang.source}</p>}
              </div>
              <p className="shrink-0 font-mono text-xs text-slate-500 dark:text-slate-400">{lang.level}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
