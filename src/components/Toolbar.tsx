import { Moon, Sun } from 'lucide-react'
import { profile } from '../data/profile'
import type { CV, Locale } from '../data/types'
import type { Theme } from '../hooks/useTheme'
import { Logo } from './Logo'
import { ReadingProgress } from './ReadingProgress'

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

// Barra fina no topo: logo e nome à esquerda; idioma, tema e PDF como texto simples
// à direita. Na base, a linha de progresso da leitura.
export function Toolbar({ cv, locale, onLocaleChange, theme, onToggleTheme }: ToolbarProps) {
  const pdfLabel = profile.pdfUrl ? cv.ui.downloadPdf : cv.ui.savePdf
  const pdfClass = `${control} text-blue-700 uppercase dark:text-blue-300`

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 print:hidden">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-3 px-5 sm:gap-4 sm:px-6">
        <a
          href="#top"
          aria-label={profile.shortName}
          className="flex min-w-0 items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
        >
          <Logo className="h-5 w-auto shrink-0 text-slate-900 dark:text-white" />
          <span className="truncate font-mono text-[0.8125rem] text-slate-900 sm:text-sm dark:text-white">{profile.shortName}</span>
        </a>

        <div className="flex shrink-0 items-center gap-3 font-mono text-xs tracking-wider text-slate-500 sm:gap-5 dark:text-slate-400">
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

      <ReadingProgress />
    </header>
  )
}
