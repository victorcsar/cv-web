import { Moon, Sun } from 'lucide-react'
import { profile } from '../data/profile'
import type { CV, Locale } from '../data/types'
import type { Theme } from '../hooks/useTheme'
import { Logo } from './Logo'

interface ToolbarProps {
  cv: CV
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  theme: Theme
  onToggleTheme: () => void
}

const locales: Locale[] = ['pt', 'en']

const control =
  'rounded-sm transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 dark:hover:text-white'

// Barra fina no topo: logo à esquerda; idioma, tema e PDF como texto simples à direita.
export function Toolbar({ cv, locale, onLocaleChange, theme, onToggleTheme }: ToolbarProps) {
  const pdfLabel = profile.pdfUrl ? cv.ui.downloadPdf : cv.ui.savePdf
  const pdfClass = `${control} text-blue-700 uppercase dark:text-blue-300`

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 print:hidden">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 px-5 sm:px-6">
        <a
          href="#top"
          aria-label={profile.shortName}
          className="flex items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
        >
          <Logo className="h-5 w-auto text-slate-900 dark:text-white" />
          <span className="hidden font-mono text-sm text-slate-900 sm:block dark:text-white">{profile.shortName}</span>
        </a>

        <div className="flex items-center gap-5 font-mono text-xs tracking-wider text-slate-500 dark:text-slate-400">
          <div role="group" aria-label={cv.ui.switchLanguage} className="flex items-center gap-1.5">
            {locales.map((value, i) => (
              <span key={value} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                    /
                  </span>
                )}
                <button
                  type="button"
                  aria-pressed={locale === value}
                  onClick={() => onLocaleChange(value)}
                  className={`${control} uppercase ${locale === value ? 'text-slate-900 dark:text-white' : ''}`}
                >
                  {value}
                </button>
              </span>
            ))}
          </div>

          <button type="button" onClick={onToggleTheme} aria-label={cv.ui.toggleTheme} title={cv.ui.toggleTheme} className={control}>
            {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>

          {profile.pdfUrl ? (
            <a href={profile.pdfUrl} download aria-label={pdfLabel} title={pdfLabel} className={pdfClass}>
              PDF ↓
            </a>
          ) : (
            <button type="button" onClick={() => window.print()} aria-label={pdfLabel} title={pdfLabel} className={pdfClass}>
              PDF ↓
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
