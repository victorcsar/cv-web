import { Award, ExternalLink, Languages } from 'lucide-react'
import type { CV } from '../data/types'
import { reveal, revealDelay } from '../lib/reveal'
import { cardClass, Section } from './Section'

// Certificações e idiomas lado a lado: são blocos curtos.
export function CredentialsSection({ cv }: { cv: CV }) {
  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-6 print:grid-cols-2 print:gap-6">
      <Section id="certifications" title={cv.ui.sections.certifications} icon={Award}>
        <ul className="space-y-3">
          {cv.certifications.map((cert, i) => (
            <li key={i} ref={reveal} className={`${cardClass} reveal p-5 transition hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-400/40 print:border-0 print:p-0`}>
              <h3 className="font-semibold text-slate-900 dark:text-white print:text-sm">{cert.name}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 print:mt-0 print:text-xs">
                {cert.issuer} · {cert.date}
              </p>
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline dark:text-blue-300 dark:hover:text-blue-200 print:mt-0 print:text-xs"
              >
                {cv.ui.viewCredential}
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="languages" title={cv.ui.sections.languages} icon={Languages}>
        <ul className="space-y-3">
          {cv.languages.map((lang, i) => (
            <li
              key={i}
              ref={reveal}
              style={revealDelay(i * 90)}
              className={`${cardClass} reveal flex items-center justify-between gap-4 p-5 transition hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-400/40 print:border-0 print:p-0`}
            >
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white print:text-sm">{lang.name}</h3>
                {lang.source && (
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 print:mt-0 print:text-xs">{lang.source}</p>
                )}
              </div>
              <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-400/10 dark:text-blue-200 print:bg-transparent print:p-0 print:text-xs print:text-slate-700">
                {lang.level}
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
