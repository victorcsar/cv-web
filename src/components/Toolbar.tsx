import { Download, Moon, Printer, Sun } from 'lucide-react'
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

const locales: { value: Locale; label: string }[] = [
  { value: 'pt', label: 'PT' },
  { value: 'en', label: 'EN' },
]

const iconButton =
  'grid size-9 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'

export function Toolbar({ cv, locale, onLocaleChange, theme, onToggleTheme }: ToolbarProps) {
  const pdfButtonClass =
    'inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 dark:shadow-none'

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-slate-50/75 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/70 print:hidden">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#top" aria-label={profile.shortName} className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-blue-500">
          <Logo className="h-6 w-auto text-slate-900 dark:text-white" />
          <span className="hidden text-sm font-semibold text-slate-900 sm:block dark:text-white">
            {profile.shortName}
          </span>
        </a>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            role="group"
            aria-label={cv.ui.switchLanguage}
            className="flex rounded-lg bg-slate-200/60 p-0.5 dark:bg-slate-800/80"
          >
            {locales.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                aria-pressed={locale === value}
                onClick={() => onLocaleChange(value)}
                className={`h-8 rounded-md px-2.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-blue-500 ${
                  locale === value
                    ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-950 dark:text-blue-300'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button type="button" onClick={onToggleTheme} aria-label={cv.ui.toggleTheme} title={cv.ui.toggleTheme} className={iconButton}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {profile.pdfUrl ? (
            <a href={profile.pdfUrl} download className={pdfButtonClass}>
              <Download size={16} aria-hidden="true" />
              <span className="hidden sm:inline">{cv.ui.downloadPdf}</span>
              <span className="sr-only sm:hidden">{cv.ui.downloadPdf}</span>
            </a>
          ) : (
            <button type="button" onClick={() => window.print()} className={pdfButtonClass}>
              <Printer size={16} aria-hidden="true" />
              <span className="hidden sm:inline">{cv.ui.savePdf}</span>
              <span className="sr-only sm:hidden">{cv.ui.savePdf}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
