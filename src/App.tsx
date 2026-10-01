import { CredentialsSection } from './components/CredentialsSection'
import { EducationSection } from './components/EducationSection'
import { ExperienceSection } from './components/ExperienceSection'
import { Hero } from './components/Hero'
import { IntroSections } from './components/IntroSections'
import { SkillsSection } from './components/SkillsSection'
import { Toolbar } from './components/Toolbar'
import { profile } from './data/profile'
import { useLocale } from './hooks/useLocale'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { locale, cv, setLocale } = useLocale()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-dvh">
      <Toolbar cv={cv} locale={locale} onLocaleChange={setLocale} theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-4xl px-5 sm:px-6 print:max-w-none print:px-0">
        <Hero cv={cv} />
        <IntroSections cv={cv} />
        <ExperienceSection cv={cv} />
        <SkillsSection cv={cv} />
        <EducationSection cv={cv} />
        <CredentialsSection cv={cv} />
      </main>

      <footer className="mx-auto max-w-4xl px-5 sm:px-6 print:hidden">
        <div className="flex flex-col gap-1 border-t border-slate-200 py-8 font-mono text-xs text-slate-500 sm:flex-row sm:justify-between dark:border-slate-800 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} {profile.shortName} · {cv.ui.updatedAt}
          </p>
          <p>{cv.ui.footerNote}</p>
        </div>
      </footer>
    </div>
  )
}
